"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
const storage_1 = require("@google-cloud/storage");
const node_fetch_1 = require("node-fetch");
const admin = require("firebase-admin");
// Initialize Firebase Admin
admin.initializeApp();
// Initialize Storage
const storage = new storage_1.Storage();
const bucketName = process.env.STORAGE_BUCKET || admin.storage().bucket().name;
const bucket = storage.bucket(bucketName);
// Constants
const DAILY_GENERATION_LIMIT = 10;
const URL_EXPIRATION_DAYS = 7;
const MAX_PROMPT_LENGTH = 500;
// Helper Functions
const validatePrompt = (prompt) => {
    if (!prompt || typeof prompt !== 'string') {
        throw new https_1.HttpsError('invalid-argument', 'Prompt must be a non-empty string');
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
        throw new https_1.HttpsError('invalid-argument', `Prompt must not exceed ${MAX_PROMPT_LENGTH} characters`);
    }
};
const checkUserQuota = async (userId) => {
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
    const quota = quotaDoc.data();
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
        throw new https_1.HttpsError('resource-exhausted', 'Daily generation limit reached');
    }
};
const updateUserQuota = async (userId) => {
    const quotaRef = admin.firestore().collection('userQuotas').doc(userId);
    await quotaRef.update({
        usedToday: admin.firestore.FieldValue.increment(1)
    });
};
// Main Function
exports.generateImage = (0, https_1.onCall)({
    timeoutSeconds: 540,
    memory: "2GiB",
}, (request) => {
    return (async () => {
        const { auth, data } = request;
        if (!auth) {
            throw new https_1.HttpsError("unauthenticated", "The function must be called while authenticated.");
        }
        if (!data) {
            throw new https_1.HttpsError("invalid-argument", "The function must be called with data containing the prompt.");
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
            const response = await (0, node_fetch_1.default)('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(0, v2_1.config)().stability.key}`,
                },
                body: JSON.stringify(apiRequest),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Stability AI API error: ${errorData.message || response.statusText}`);
            }
            const result = await response.json();
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
            const generationRecord = {
                imageUrl: url,
                prompt,
                style,
                createdAt: admin.firestore.Timestamp.now()
            };
            await admin.firestore()
                .collection('images')
                .add(Object.assign(Object.assign({}, generationRecord), { userId }));
            return generationRecord;
        }
        catch (error) {
            console.error('Image generation error:', error);
            if (error instanceof https_1.HttpsError) {
                throw error;
            }
            throw new https_1.HttpsError('internal', 'Error generating image', error);
        }
    })();
});
//# sourceMappingURL=index.js.map