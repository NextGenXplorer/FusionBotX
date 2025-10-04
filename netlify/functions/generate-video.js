import Bytez from 'bytez.js';

export const handler = async (event) => {
  // CORS headers for all responses
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    // Fix: Remove VITE_ prefix for Netlify Functions
    const BYTEZ_API_KEY = process.env.BYTEZ_API_KEY;

    if (!BYTEZ_API_KEY) {
      console.error('BYTEZ_API_KEY environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Bytez API key not configured. Please set BYTEZ_API_KEY in Netlify environment variables.' }),
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
        headers,
        body: JSON.stringify({ error }),
      };
    }

    console.log('Video generated successfully:', output);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ output }),
    };

  } catch (error) {
    console.error('Server error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
