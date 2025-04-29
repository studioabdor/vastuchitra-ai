import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Storage
const storage = new Storage();
const bucketName = process.env.STORAGE_BUCKET || admin.storage().bucket().name;
const bucket = storage.bucket(bucketName);

// Validate environment variables
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
if (!STABILITY_API_KEY) {
  throw new Error('STABILITY_API_KEY environment variable is not set');
}

// Types and Interfaces
interface StableDiffusionResponse {
  images: string[];
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

// Main Function
export const generateImage = onCall<GenerateImageRequest, GenerateImageResponse>(
  {
    timeoutSeconds: 540,
    memory: "2GiB",
  },
  async (request) => {
    const { auth, data } = request;

    if (!auth) {
      throw new HttpsError("unauthenticated", "The function must be called while authenticated.");
    }

    if (!data) {
      throw new HttpsError("invalid-argument", "The function must be called with data containing the prompt.");
    }

    const { prompt, style, negativePrompt } = data;
    const userId = auth.uid;

    try {
      // Validate input
      validatePrompt(prompt);
      await checkUserQuota(userId);

      // Prepare the API request
      const apiRequest = {
        text_prompts: [
          {
            text: style ? `${prompt}, ${style}` : prompt,
            weight: 1
          },
          ...(negativePrompt ? [{
            text: negativePrompt,
            weight: -1
          }] : [])
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      };

      // Call Stability AI API
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
        },
        body: JSON.stringify(apiRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stability AI API error: ${errorData.message || response.statusText}`);
      }

      const result: StableDiffusionResponse = await response.json();
      const generatedImageBase64 = result.images[0];
      const imageBuffer = Buffer.from(generatedImageBase64, 'base64');

      // Generate unique filename
      const fileName = `generated/${userId}/${Date.now()}.png`;
      const file = bucket.file(fileName);

      // Save image to storage
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

      // Generate signed URL with reasonable expiration
      const [url] = await file.getSignedUrl({ 
        action: 'read', 
        expires: Date.now() + (URL_EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
      });

      // Update user quota
      await updateUserQuota(userId);

      // Save generation record
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
    } catch (error) {
      console.error('Image generation error:', error);
      if (error instanceof HttpsError) {
        throw error;
      }
      throw new HttpsError('internal', 'Error generating image', error);
    }
  }
);
