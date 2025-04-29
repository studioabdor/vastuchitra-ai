"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const https_1 = require("firebase-functions/v2/https");
const storage_1 = require("@google-cloud/storage");
const node_fetch_1 = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp();
const storage = new storage_1.Storage();
const bucketName = process.env.STORAGE_BUCKET || admin.storage().bucket().name;
const bucket = storage.bucket(bucketName);
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
            throw new https_1.HttpsError("invalid-argument", "The function must be called with one argument 'data' containing the prompt.");
        }
        if (!data.prompt || typeof data.prompt !== 'string') {
            throw new https_1.HttpsError("invalid-argument", "The function must be called with one argument 'prompt' containing the text prompt for image generation.");
        }
        const { prompt } = data;
        const userId = auth.uid;
        try {
            const response = await (0, node_fetch_1.default)('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
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
            const result = await response.json();
            const generatedImageBase64 = result.images[0];
            const imageBuffer = Buffer.from(generatedImageBase64, 'base64');
            const fileName = `generated/${userId}/${Date.now()}.png`;
            const file = bucket.file(fileName);
            await file.save(imageBuffer, { metadata: { contentType: 'image/png' } });
            const [url] = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' });
            await admin.firestore().collection('images').add({ userId, generatedImageUrl: url, prompt, createdAt: admin.firestore.FieldValue.serverTimestamp() });
            return { imageUrl: url };
        }
        catch (error) {
            throw new https_1.HttpsError('unknown', 'Error generating image', JSON.stringify(error));
        }
    })()
        .then((res) => res);
});
//# sourceMappingURL=index.js.map