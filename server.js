import express from 'express';
import cors from 'cors';
import Bytez from 'bytez.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const BYTEZ_API_KEY = process.env.VITE_BYTEZ_API_KEY;

    if (!BYTEZ_API_KEY) {
      return res.status(500).json({ error: 'Bytez API key not configured' });
    }

    console.log('Generating video for prompt:', prompt);

    const sdk = new Bytez(BYTEZ_API_KEY);
    const model = sdk.model('ali-vilab/text-to-video-ms-1.7b');

    const { error, output } = await model.run(prompt);

    if (error) {
      console.error('Bytez error:', error);
      return res.status(500).json({ error });
    }

    console.log('Video generated successfully:', output);
    res.json({ output });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Video generation server running on http://localhost:${PORT}`);
});
