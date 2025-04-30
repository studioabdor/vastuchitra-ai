"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
const storage_1 = require("@google-cloud/storage");
const node_fetch_1 = require("node-fetch");
const admin = require("firebase-admin");
// Initialize Firebase Admin and Replicate API
admin.initializeApp();
const replicate_1 = require("replicate");
// Initialize Storage
const storage = new storage_1.Storage();
const bucketName = process.env.STORAGE_BUCKET || admin.storage().bucket().name;
const bucket = storage.bucket(bucketName);
//Replicate Secrets
const replicateToken = (0, v2_1.config)().replicate.token;
const replicate = new replicate_1.default({
    auth: replicateToken.value(),
});
;
// Constants
const DAILY_GENERATION_LIMIT = 10;
const URL_EXPIRATION_DAYS = 7;
const MAX_PROMPT_LENGTH = 500;
// Helper Functions
const validatePrompt = (prompt) => {
    if (!prompt || typeof prompt !== 'string') {
        throw new Error('invalid-argument: Prompt must be a non-empty string');
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
        throw new Error(`invalid-argument: Prompt must not exceed ${MAX_PROMPT_LENGTH} characters`);
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
        throw new Error('resource-exhausted: Daily generation limit reached');
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
            throw new Error("unauthenticated: The function must be called while authenticated.");
        }
        if (!data) {
            throw new Error("invalid-argument: The function must be called with data containing the prompt.");
        }
        const { prompt, style, negativePrompt } = data;
        const userId = auth.uid;
        try {
            // Validate input
            validatePrompt(prompt);
            await checkUserQuota(userId);
            const replicateResponse = await replicate.predictions.create({
                version: "db21e9ba61d9b2d02d959e98b2b3182bf09739b68c721eb1b73423b576961cb0",
                input: { prompt: style ? `${prompt}, ${style}` : prompt, negative_prompt: negativePrompt || "", width: 1024, height: 1024 },
            });
            let predictionComplete = false;
            let output = null;
            while (!predictionComplete) {
                const checkResult = await replicate.predictions.get(replicateResponse.id);
                if (checkResult.status === "succeeded") {
                    output = checkResult.output || null;
                    predictionComplete = true;
                }
                else if (checkResult.status === "failed" || checkResult.status === "canceled") {
                    throw new Error(`Replicate API error: ${checkResult.status}`);
                }
                else {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
                }
            }
            if (!output)
                throw new Error('No output returned from replicate.');
            const imageBuffer = await (0, node_fetch_1.default)(output[0]).then(res => res.arrayBuffer()).then(arrayBuffer => Buffer.from(arrayBuffer));
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
            await admin.firestore().collection('images').add(Object.assign(Object.assign({}, generationRecord), { userId }));
            return generationRecord;
        }
        catch (error) {
            console.error('Image generation error:', error);
            throw new Error('internal: Error generating image: ' + error);
        }
    })();
});
//# sourceMappingURL=index.js.map