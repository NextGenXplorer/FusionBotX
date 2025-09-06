// Access the Gemini API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Fetches a response from the real Gemini API.
 * @param {string} userInput The message from the user.
 * @returns {Promise<string>} A promise that resolves with the bot's response.
 */
export const fetchBotResponse = async (userInput) => {
  // Check if the API key is missing
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    return 'API key not found. Please add your Gemini API key to the .env file.';
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userInput }] }],
      }),
    });

    if (!response.ok) {
      // Try to parse the error response from the API
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `API call failed with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // The actual path to the response text might differ based on the Gemini API version.
    // This path is based on common structures for the gemini-pro model.
    const botMessage = data.candidates[0]?.content?.parts[0]?.text;

    if (!botMessage) {
      throw new Error('Could not parse a valid response from the API.');
    }

    return botMessage;

  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    // Return a user-friendly error message
    return `Sorry, something went wrong while trying to connect to the AI: ${error.message}`;
  }
};
