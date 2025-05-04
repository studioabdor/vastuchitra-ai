"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const https_1 = require("firebase-functions/v2/https");
const storage_1 = require("@google-cloud/storage");
const node_fetch_1 = require("node-fetch");
const buffer_1 = require("buffer");
const admin = require("firebase-admin");
const firestore_1 = require("firebase-admin/firestore");
const Replicate = require("replicate");
// Initialize Firebase Admin
admin.initializeApp();
const storage = new storage_1.Storage();
const bucketName = process.env.STORAGE_BUCKET || admin.storage().bucket().name;
const bucket = storage.bucket(bucketName); // Bucket
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});
const MAX_PROMPT_LENGTH = 500;
const DAILY_GENERATION_LIMIT = 10;
const URL_EXPIRATION_DAYS = 7;
const validatePrompt = (prompt) => {
    if (!prompt || typeof prompt !== "string") {
        throw new https_1.HttpsError("invalid-argument", "Prompt must be a non-empty string");
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
        throw new https_1.HttpsError("invalid-argument", `Prompt must not exceed ${MAX_PROMPT_LENGTH} characters`);
    }
};
const checkUserQuota = async (userId) => {
    const quotaRef = admin.firestore().collection("userQuotas").doc(userId);
    const quotaDoc = await quotaRef.get();
    if (!quotaDoc.exists) {
        await quotaRef.set({
            dailyLimit: DAILY_GENERATION_LIMIT,
            usedToday: 0,
            lastReset: admin.firestore.Timestamp.now(),
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
            lastReset: now,
        });
        return;
    }
    if (quota.usedToday >= quota.dailyLimit) {
        throw new https_1.HttpsError("resource-exhausted", "Daily generation limit reached");
    }
};
// Main Function
exports.generateImage = (0, https_1.onCall)({
    timeoutSeconds: 540,
    memory: "2GiB",
}, async (request) => {
    try {
        const { auth, data } = request;
        if (!auth) {
            throw new https_1.HttpsError("unauthenticated", "The function must be called while authenticated.");
        }
        if (!data) {
            throw new https_1.HttpsError("invalid-argument", "The function must be called with data containing the prompt.");
        }
        const { prompt, style } = data;
        const userId = auth.uid;
        // Validate input
        validatePrompt(prompt);
        await checkUserQuota(userId);
        // Create prediction
        const prediction = await replicate.predictions.create({
            version: "db21e9ba61d9b2d02d959e98b2b3182bf09739b68c721eb1b73423b576961cb0",
            input: {
                prompt: `${prompt}, ${style}`,
                width: 1024,
                height: 1024,
                num_outputs: 1,
                scheduler: "K_EULER",
                num_inference_steps: 50,
                guidance_scale: 7.5,
            },
        });
        // Wait for prediction to complete
        let predictionComplete = false;
        let output = null;
        while (!predictionComplete) {
            const checkResult = await replicate.predictions.get(prediction.id);
            if (checkResult.status === "succeeded") {
                output = checkResult.output || null;
                predictionComplete = true;
            }
            else if (checkResult.status === "failed" ||
                checkResult.status === "canceled") {
                throw new https_1.HttpsError("internal", `Replicate API error: ${checkResult.status}`);
            }
            else {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
        if (!output)
            throw new https_1.HttpsError("internal", "No output returned from Replicate");
        // Download and save image
        const imageBuffer = await (0, node_fetch_1.default)(output[0])
            .then(res => res.arrayBuffer())
            .then(arrayBuffer => buffer_1.Buffer.from(arrayBuffer));
        const fileName = `generated/${userId}/${Date.now()}.png`;
        const file = bucket.file(fileName);
        const resultSave = file.save(await imageBuffer, {
            metadata: {
                contentType: "image/png",
                metadata: {
                    userId,
                    prompt,
                    style,
                    generatedAt: new Date().toISOString(),
                },
            }
        });
    }
    finally // Generate signed URL
     { }
});
// Generate signed URL
const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + URL_EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
});
admin.firestore().collection('userQuotas').doc(userId).update({ usedToday: firestore_1.FieldValue.increment(1) });
const finalUrl = url[0];
return { url: finalUrl, prompt: prompt, style: style, createdAt: admin.firestore.Timestamp.now() };
try { }
catch (error) {
    throw new https_1.HttpsError('internal', 'Error generating image: ' + (error.message || error));
}
;
//# sourceMappingURL=index.js.map