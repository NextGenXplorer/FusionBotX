import Bytez from 'bytez.js';

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    const BYTEZ_API_KEY = process.env.VITE_BYTEZ_API_KEY;

    if (!BYTEZ_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Bytez API key not configured' }),
      };
    }

    console.log('Generating video for prompt:', prompt);

    const sdk = new Bytez(BYTEZ_API_KEY);
    const model = sdk.model('ali-vilab/text-to-video-ms-1.7b');

    const { error, output } = await model.run(prompt);

    if (error) {
      console.error('Bytez error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error }),
      };
    }

    console.log('Video generated successfully:', output);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ output }),
    };

  } catch (error) {
    console.error('Server error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
