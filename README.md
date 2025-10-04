# FusionBotX

Welcome to FusionBotX! This is a smart, friendly study assistant powered by the Gemini API, designed to help you learn, practice, and solve problems across multiple subjects.

This project was built with React (using Vite) and styled with Tailwind CSS.

## Features

- **Conversational AI:** Engage in dynamic conversations with an AI that remembers the context of your chat.
- **Multi-Session Management:** Have multiple, separate chat sessions and switch between them seamlessly.
- **Persistent History:** Your chat sessions are automatically saved to your browser's local storage, so you'll never lose your work.
- **Markdown Rendering:** The chatbot's responses are beautifully formatted, with support for lists, code blocks, bold/italic text, and more.
- **Dark Mode:** A sleek, eye-friendly dark mode that can be toggled on or off and is saved to your preferences.
- **Responsive Design:** A clean, modern, and mobile-first design that looks great on any device.
- **Ready for Deployment:** Includes a `netlify.toml` file for easy deployment to Netlify.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd FusionBotX
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up your environment variables:**
    -   Copy the example environment file:
        ```sh
        cp .env.example .env
        ```
    -   Open the newly created `.env` file and add your Gemini API key:
        ```
        VITE_GEMINI_API_KEY='YOUR_GEMINI_API_KEY_HERE'
        ```

### Running the Development Server

Once you've completed the installation steps, you can run the development server:

```sh
npm run dev
```

This will start the application on a local server, usually `http://localhost:5000`. Open this URL in your browser to see the app in action.
