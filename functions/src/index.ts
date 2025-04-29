import { HttpsError, onCall } from 'firebase-functions/v2/https';
import {Storage} from '@google-cloud/storage';
import fetch from 'node-fetch';
import * as admin from 'firebase-admin';

admin.initializeApp();


const storage = new Storage();
const bucketName = process.env.STORAGE_BUCKET || admin.storage().bucket().name;
const bucket = storage.bucket(bucketName);


interface StableDiffusionResponse {
  images: string[];
}

export const generateImage = onCall<{ prompt: string }, { imageUrl: string; }>(
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
            throw new HttpsError("invalid-argument", "The function must be called with one argument 'data' containing the prompt.");
        }

        if (!data.prompt || typeof data.prompt !== 'string') {
            throw new HttpsError("invalid-argument", "The function must be called with one argument 'prompt' containing the text prompt for image generation.");
        }

        const { prompt } = data
        const userId = auth.uid;

        try {
            const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
                },
                body: JSON.stringify({
                    text_prompts: [
                        {
                            text: `${prompt}`,
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
            const imageBuffer = Buffer.from(generatedImageBase64, 'base64');
            const fileName = `generated/${userId}/${Date.now()}.png`;
            const file = bucket.file(fileName);
            await file.save(imageBuffer, { metadata: { contentType: 'image/png' } });

            const [url] = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' });

            await admin.firestore().collection('images').add({ userId, generatedImageUrl: url, prompt, createdAt: admin.firestore.FieldValue.serverTimestamp() });
            return { imageUrl: url };
        } catch (error) {
          throw new HttpsError('unknown', 'Error generating image', JSON.stringify(error));
        }
        
    }
);
