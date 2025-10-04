import { MINI_CHAT_BOT_PERSONA } from './persona.js';

// Access the Gemini API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Using v1 API with Gemini 2.0 Flash - verified working model
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const POLLINATION_API_URL = 'https://image.pollinations.ai/prompt/';

// Debug: Log API key status (not the actual key)
console.log('API Key loaded:', GEMINI_API_KEY ? 'Yes' : 'No');
console.log('API Key length:', GEMINI_API_KEY?.length || 0);

/**
 * Detects if the user is requesting image generation
 * @param {string} userInput The user's message
 * @returns {boolean} True if image generation is requested
 */
const isImageRequest = (userInput) => {
  const imageKeywords = [
    'generate an image',
    'generate image',
    'create an image',
    'create image',
    'make an image',
    'make image',
    'draw',
    'picture of',
    'image of'
  ];
  const lowerInput = userInput.toLowerCase();
  return imageKeywords.some(keyword => lowerInput.includes(keyword));
};

/**
 * Extracts the image prompt from user input
 * @param {string} userInput The user's message
 * @returns {string} The extracted prompt
 */
const extractImagePrompt = (userInput) => {
  const patterns = [
    /generate (?:an )?image:?\s*(.+)/i,
    /create (?:an )?image:?\s*(.+)/i,
    /make (?:an )?image:?\s*(.+)/i,
    /draw:?\s*(.+)/i,
    /picture of:?\s*(.+)/i,
    /image of:?\s*(.+)/i
  ];

  for (const pattern of patterns) {
    const match = userInput.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return userInput;
};

/**
 * Generates an image using Pollinations AI
 * @param {string} prompt The image generation prompt
 * @returns {Promise<string>} A promise that resolves with markdown image
 */
export const generateImage = async (prompt) => {
  try {
    const cleanPrompt = extractImagePrompt(prompt);
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const imageUrl = `${POLLINATION_API_URL}${encodedPrompt}?width=1024&height=1024&nologo=true&enhance=true`;

    // Return markdown image with the prompt as alt text
    return `Here's your generated image:\n\n![${cleanPrompt}](${imageUrl})\n\n**Prompt:** ${cleanPrompt}`;
  } catch (error) {
    console.error('Error generating image:', error);
    return `Sorry, I couldn't generate the image: ${error.message}`;
  }
};

/**
 * Fetches a text response from Gemini API
 * @param {string} userInput The latest message from the user
 * @param {Array<object>} history The past messages in the conversation
 * @param {string} imageData Optional base64 image data for vision analysis
 * @returns {Promise<string>} A promise that resolves with the bot's response
 */
export const fetchTextResponse = async (userInput, history = [], imageData = null) => {
  console.log('fetchTextResponse called with:', userInput);

  // Check if the API key is missing
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.error('API Key missing!');
    return 'API key not found. Please add your Gemini API key to the .env file.';
  }

  // Filter out image messages from history
  const textHistory = history.filter(msg =>
    !msg.text.includes('![') && !msg.text.includes('Here\'s your generated image')
  );

  // Map our internal message format to the Gemini API format
  const formattedHistory = textHistory.slice(-10).map(message => ({
    role: message.sender === 'user' ? 'user' : 'model',
    parts: [{ text: message.text }],
  }));

  // Build user parts with optional image
  const userParts = [{ text: userInput }];
  if (imageData) {
    // Extract base64 data and mime type
    const matches = imageData.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      const mimeType = matches[1];
      const base64Data = matches[2];
      userParts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data
        }
      });
    }
  }

  // Add the new user input
  const contents = [
    ...formattedHistory,
    { role: 'user', parts: userParts }
  ];

  try {
    console.log('Making request to Gemini API...');
    console.log('URL:', GEMINI_API_URL.substring(0, 80) + '...');

    const requestBody = {
      contents: contents,
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2).substring(0, 200));

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Gemini API Error:', errorData);
      const errorMessage = errorData?.error?.message || `API returned status ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Better error handling for response structure
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response candidates received from API');
    }

    const candidate = data.candidates[0];

    // Check for blocked content
    if (candidate.finishReason === 'SAFETY') {
      return 'I apologize, but I cannot provide a response to that request due to safety guidelines.';
    }

    const botMessage = candidate.content?.parts?.[0]?.text;

    if (!botMessage) {
      console.error('Invalid response structure:', data);
      throw new Error('Could not extract text from API response');
    }

    return botMessage;

  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return `Sorry, I encountered an error: ${error.message}. Please try again.`;
  }
};

/**
 * Main function to fetch bot response (handles both text and images)
 * @param {string} userInput The latest message from the user
 * @param {Array<object>} history The past messages in the conversation
 * @param {string} imageData Optional base64 image data for vision analysis
 * @returns {Promise<string>} A promise that resolves with the bot's response
 */
export const fetchBotResponse = async (userInput, history = [], imageData = null) => {
  // Check if user wants to generate an image
  if (isImageRequest(userInput)) {
    return await generateImage(userInput);
  }

  // Otherwise, fetch text response from Gemini (with optional image for analysis)
  return await fetchTextResponse(userInput, history, imageData);
};
