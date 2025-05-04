import express, { Request, Response } from 'express';
import cors from 'cors';
import Replicate from 'replicate';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure CORS to allow requests from your frontend
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

app.post('/generate', async (req: Request, res: Response) => {
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
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Replicate backend running on port ${PORT}`);
}); 