import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { config } from 'firebase-functions/v2';
import { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';
import * as admin from 'firebase-admin';
import Replicate from 'replicate';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Storage
const storage = new Storage();
const bucketName = process.env.STORAGE_BUCKET || admin.storage().bucket().name;
const bucket = storage.bucket(bucketName);

// Replicate Secrets
const replicateToken = config().replicate.token;
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || replicateToken.value(),
});

// Types and Interfaces
interface ReplicateResponse {
  id: string;
  version: string;
  urls: {
    get: string;
    cancel: string;
  };
  created_at: string;
  completed_at: string | null;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  input: {
    prompt: string;
  };
  output?: string[];
  error?: string;
}

interface GenerateImageRequest {
  prompt: string;
  style?: string;
  negativePrompt?: string;
}

interface GenerateImageResponse {
  imageUrl: string;
  prompt: string;
  style?: string;
  createdAt: admin.firestore.Timestamp;
}

interface UserQuota {
  dailyLimit: number;
  usedToday: number;
  lastReset: admin.firestore.Timestamp;
}

// Constants
const DAILY_GENERATION_LIMIT = 10;
const URL_EXPIRATION_DAYS = 7;
const MAX_PROMPT_LENGTH = 500;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Helper Functions
const validatePrompt = (prompt: string): void => {
  if (!prompt || typeof prompt !== 'string') {
    throw new HttpsError('invalid-argument', 'Prompt must be a non-empty string');
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new HttpsError('invalid-argument', `Prompt must not exceed ${MAX_PROMPT_LENGTH} characters`);
  }
};

const checkUserQuota = async (userId: string): Promise<void> => {
  const quotaRef = admin.firestore().collection('userQuotas').doc(userId);
  const quotaDoc = await quotaRef.get();

  if (!quotaDoc.exists) {
    await quotaRef.set({
      dailyLimit: DAILY_GENERATION_LIMIT,
      usedToday: 0,
      lastReset: admin.firestore.Timestamp.now()
    });
    return;
  }

  const quota = quotaDoc.data() as UserQuota;
  const now = admin.firestore.Timestamp.now();
  const lastReset = quota.lastReset.toDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (lastReset < today) {
    await quotaRef.update({
      usedToday: 0,
      lastReset: now
    });
    return;
  }

  if (quota.usedToday >= quota.dailyLimit) {
    throw new HttpsError('resource-exhausted', 'Daily generation limit reached');
  }
};

const updateUserQuota = async (userId: string): Promise<void> => {
  const quotaRef = admin.firestore().collection('userQuotas').doc(userId);
  await quotaRef.update({
    usedToday: admin.firestore.FieldValue.increment(1)
  });
};

const waitForPrediction = async (predictionId: string, retryCount = 0): Promise<string[]> => {
  try {
    const prediction = await replicate.predictions.get(predictionId);
    
    if (prediction.status === 'succeeded' && prediction.output) {
      return prediction.output;
    }
    
    if (prediction.status === 'failed' || prediction.status === 'canceled') {
      throw new Error(`Prediction ${prediction.status}: ${prediction.error || 'Unknown error'}`);
    }
    
    if (retryCount >= MAX_RETRIES) {
      throw new Error('Prediction timed out after maximum retries');
    }
    
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return waitForPrediction(predictionId, retryCount + 1);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new HttpsError('internal', `Error checking prediction status: ${errorMessage}`);
  }
};

// Main Function
export const generateImage = onCall<GenerateImageRequest, GenerateImageResponse>(
  {
    timeoutSeconds: 540,
    memory: "2GiB",
  },
  async (request) => {
    const { auth, data } = request;

    if (!auth) {
      throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    if (!data) {
      throw new HttpsError('invalid-argument', 'The function must be called with data containing the prompt.');
    }

    const { prompt, style, negativePrompt } = data;
    const userId = auth.uid;

    try {
      // Validate input
      validatePrompt(prompt);
      await checkUserQuota(userId);

      // Create prediction
      const prediction = await replicate.predictions.create({
        version: "db21e9ba61d9b2d02d959e98b2b3182bf09739b68c721eb1b73423b576961cb0",
        input: {
          prompt: style ? `${prompt}, ${style}` : prompt,
          negative_prompt: negativePrompt || "",
          width: 1024,
          height: 1024,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
        },
      });

      // Wait for prediction to complete
      const output = await waitForPrediction(prediction.id);
      
      if (!output || output.length === 0) {
        throw new HttpsError('internal', 'No output returned from Replicate');
      }

      // Download and save image
      const imageBuffer = await fetch(output[0])
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => Buffer.from(arrayBuffer));

      const fileName = `generated/${userId}/${Date.now()}.png`;
      const file = bucket.file(fileName);

      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/png',
          metadata: {
            userId,
            prompt,
            style,
            generatedAt: new Date().toISOString()
          }
        }
      });

      // Generate signed URL
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + (URL_EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
      });

      // Update quota and save record
      await updateUserQuota(userId);

      const generationRecord: GenerateImageResponse = {
        imageUrl: url,
        prompt,
        style,
        createdAt: admin.firestore.Timestamp.now()
      };

      await admin.firestore()
        .collection('images')
        .add({
          ...generationRecord,
          userId
        });

      return generationRecord;
    } catch (error: unknown) {
      console.error('Image generation error:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpsError('internal', `Error generating image: ${errorMessage}`);
    }
  }
) as any; // Type assertion to fix the return type issue
