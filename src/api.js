import { MINI_CHAT_BOT_PERSONA } from './persona.js';

// Access the Gemini API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Fetches a response from the real Gemini API, including conversation history.
 * @param {string} userInput The latest message from the user.
 * @param {Array<object>} history The past messages in the conversation.
 * @returns {Promise<string>} A promise that resolves with the bot's response.
 */
export const fetchBotResponse = async (userInput, history = []) => {
  // Check if the API key is missing
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    return 'API key not found. Please add your Gemini API key to the .env file.';
  }

  // Map our internal message format to the Gemini API format
  const formattedHistory = history.map(message => ({
    role: message.sender === 'user' ? 'user' : 'model',
    parts: [{ text: message.text }],
  }));

  // Add the new user input to the end of the history
  const contents = [
    ...formattedHistory,
    { role: 'user', parts: [{ text: userInput }] }
  ];

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        system_instruction: {
          parts: [{ text: MINI_CHAT_BOT_PERSONA }],
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `API call failed with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const botMessage = data.candidates[0]?.content?.parts[0]?.text;

    if (!botMessage) {
      throw new Error('Could not parse a valid response from the API.');
    }

    return botMessage;

  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return `Sorry, something went wrong while trying to connect to the AI: ${error.message}`;
  }
};
