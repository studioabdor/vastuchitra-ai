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

// Log environment variables (without sensitive data)
console.log('Environment check:', {
  hasToken: !!process.env.REPLICATE_API_TOKEN,
  port: process.env.PORT
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

app.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, style } = req.body;
    
    console.log('Received request:', { prompt, style });

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      console.error('Replicate API token is missing');
      return res.status(500).json({ error: 'Replicate API token is not configured.' });
    }

    // Construct the full prompt with style if provided
    const fullPrompt = style 
      ? `${prompt}, ${style} architectural style, professional architectural visualization, high quality, detailed, 4k, photorealistic`
      : `${prompt}, professional architectural visualization, high quality, detailed, 4k, photorealistic`;

    console.log('Full prompt:', fullPrompt);

    const input = {
      prompt: fullPrompt,
      num_outputs: 1,
      aspect_ratio: "16:9",
      guidance_scale: 7.5,
      output_quality: 100,
      negative_prompt: "blurry, low quality, distorted, unrealistic, amateur, cartoon, painting, sketch, text, watermark"
    };

    console.log('Sending request to Replicate with input:', input);

    try {
      const output = await replicate.run(
        "davisbrown/designer-architecture:0d6f0893b05f14500ce03e45f54290cbffb907d14db49699f2823d0fd35def46",
        { input }
      ) as string[];

      console.log('Replicate response:', output);

      if (!output || !output[0]) {
        throw new Error('No image URL returned from Replicate');
      }

      console.log('Image generated successfully:', output[0]);
      res.json({ url: output[0] });
    } catch (apiError) {
      console.error('Replicate API error:', apiError);
      throw apiError;
    }
  } catch (err: unknown) {
    console.error('Error in generate endpoint:', err);
    const error = err as Error;
    res.status(500).json({ 
      error: error.message || 'Failed to generate image. Please try again.',
      details: error.stack
    });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    hasToken: !!process.env.REPLICATE_API_TOKEN
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Replicate backend running on port ${PORT}`);
}); 