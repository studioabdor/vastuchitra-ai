const express = require('express');
const cors = require('cors');
const Replicate = require('replicate');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://vastu-architect-ai.web.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

app.post('/generate', async (req, res) => {
  try {
    const { prompt, style } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }
    const input = {
      prompt: `${prompt}${style ? ', style: ' + style : ''}`,
      num_outputs: 1,
      aspect_ratio: "16:9",
      guidance_scale: 3.5,
      output_quality: 100
    };
    const output = await replicate.run(
      "davisbrown/designer-architecture:0d6f0893b05f14500ce03e45f54290cbffb907d14db49699f2823d0fd35def46",
      { input }
    );
    res.json({ url: output[0] });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Replicate backend running on port ${PORT}`);
});
