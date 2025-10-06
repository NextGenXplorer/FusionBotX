# FusionBotX

Welcome to FusionBotX!

FusionBotX is an advanced multi-modal AI-powered conversational study assistant designed to revolutionize student learning through intelligent interactions. The project integrates multiple artificial intelligence services to provide comprehensive learning support including conversational AI, image generation, video creation, text-to-speech, and voice input capabilities. Built using React 19 and modern web technologies, FusionBotX leverages Google Gemini 2.0 Flash API for natural language processing, Pollinations AI for image generation, and GttsApi services for multimedia content creation. The system implements a responsive, mobile-first design with persistent session management, enabling students to engage with educational content across multiple modalities. The application addresses the growing need for interactive, personalized learning tools that adapt to diverse learning styles and subject domains. Through comprehensive testing and deployment on Netlify, the project demonstrates successful integration of AI technologies in educational contexts, providing students with an accessible, 24/7 intelligent tutoring system capable of explaining concepts, solving problems step-by-step, and generating visual and audio content to enhance understanding across mathematics, science, programming, and humanities subjects.

## Technical Stack

- **Frontend:** React, Vite, Tailwind CSS
- **AI Services:** Google Gemini API, Pollinations AI, GttsApi
- **Deployment:** Netlify

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
