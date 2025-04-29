import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';

admin.initializeApp();

const storage = new Storage();
const bucket = storage.bucket(process.env.STORAGE_BUCKET || '');

interface StableDiffusionResponse {
  images: string[];
}

export const generateImage = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      );
    }

    const { sketchUrl, prompt } = data;
    const userId = context.auth.uid;

    try {
      // Call Stable Diffusion API
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `Indian architectural style, ${prompt}, highly detailed, professional architectural visualization`,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
        }),
      });

      if (!response.ok) {
        throw new Error(`Stable Diffusion API error: ${response.statusText}`);
      }

      const result: StableDiffusionResponse = await response.json();
      const generatedImageBase64 = result.images[0];

      // Convert base64 to buffer
      const imageBuffer = Buffer.from(generatedImageBase64, 'base64');

      // Upload to Firebase Storage
      const fileName = `generated/${userId}/${Date.now()}.png`;
      const file = bucket.file(fileName);
      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/png',
        },
      });

      // Get public URL
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500', // Long-lived URL
      });

      // Save metadata to Firestore
      await admin.firestore().collection('images').add({
        userId,
        sketchUrl,
        generatedImageUrl: url,
        prompt,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { imageUrl: url };
    } catch (error) {
      console.error('Error generating image:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error generating image',
        error
      );
    }
  }); 