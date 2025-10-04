import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'; // A small, secure, URL-friendly, unique string ID generator
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWindow from './components/ChatWindow';
import DarkModeToggle from './components/DarkModeToggle';
import Sidebar from './components/Sidebar';
import { fetchBotResponse } from './api.js';

// This function will be used to create a new chat session
const createNewSession = () => ({
  id: nanoid(),
  name: `Chat ${new Date().toLocaleString()}`,
  messages: [
    { sender: 'bot', text: "Hello! I'm MiniChatBot. How can I help you study today?" }
  ],
});

function App() {
  // === THEME STATE ===
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);


  // === CHAT SESSION STATE ===
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state is global now

  // Load state from localStorage on initial mount
  useEffect(() => {
    let loadedSessions = [];
    try {
      const savedSessions = localStorage.getItem('chat_sessions');
      if (savedSessions) {
        loadedSessions = JSON.parse(savedSessions);
      }
    } catch (error) {
      console.error("Failed to parse sessions from localStorage", error);
    }

    if (loadedSessions.length > 0) {
      setSessions(loadedSessions);
      const savedActiveId = localStorage.getItem('active_chat_session_id');
      const sessionExists = loadedSessions.some(s => s.id === savedActiveId);
      setActiveSessionId(sessionExists ? savedActiveId : loadedSessions[0].id);
    } else {
      const newSession = createNewSession();
      setSessions([newSession]);
      setActiveSessionId(newSession.id);
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (sessions.length > 0 && activeSessionId) {
      localStorage.setItem('chat_sessions', JSON.stringify(sessions));
      localStorage.setItem('active_chat_session_id', activeSessionId);
    }
  }, [sessions, activeSessionId]);

  // Find the active session based on the ID
  const activeSession = sessions.find(s => s.id === activeSessionId);

  // Function to add a message to the active session
  const addMessageToSession = (message) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, message] }
          : session
      )
    );
  };

  // The main logic for handling a user's message
  const handleSendMessage = async (userInput, imageData = null) => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: userInput };
    addMessageToSession(userMessage);
    setIsLoading(true);

    try {
      // Get the message history for the active session for context
      const messageHistory = activeSession.messages;
      console.log('Sending message:', userInput);
      console.log('Has image:', !!imageData);
      console.log('History length:', messageHistory.length);

      const botResponse = await fetchBotResponse(userInput, messageHistory, imageData);
      console.log('Bot response received:', botResponse?.substring(0, 100));

      const botMessage = { sender: 'bot', text: botResponse };
      addMessageToSession(botMessage);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage = { sender: 'bot', text: `Error: ${error.message || "Sorry, I couldn't get a response. Please try again."}` };
      addMessageToSession(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for image uploads
  const handleImageUpload = async (imageData, prompt) => {
    // Show the uploaded image in chat history
    const imageMessage = {
      sender: 'user',
      text: `![Uploaded Image](${imageData})\n\n${prompt}`
    };
    addMessageToSession(imageMessage);
    setIsLoading(true);

    try {
      const messageHistory = activeSession.messages;
      console.log('Sending image with prompt:', prompt);

      const botResponse = await fetchBotResponse(prompt, messageHistory, imageData);
      console.log('Bot response received:', botResponse?.substring(0, 100));

      const botMessage = { sender: 'bot', text: botResponse };
      addMessageToSession(botMessage);
    } catch (error) {
      console.error('Error in handleImageUpload:', error);
      const errorMessage = { sender: 'bot', text: `Error: ${error.message || "Sorry, I couldn't analyze the image. Please try again."}` };
      addMessageToSession(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // We will add functions to create, switch, and delete sessions later
  const handleClearChat = () => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [
                { sender: 'bot', text: "Chat cleared! Let's start over. What's on your mind?" }
              ]
            }
          : session
      )
    );
  };

  const handleNewChat = () => {
    const newSession = createNewSession();
    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
  };

  const handleSwitchChat = (sessionId) => {
    setActiveSessionId(sessionId);
  };

  const handleDeleteChat = (sessionIdToDelete) => {
    setSessions(prev => prev.filter(s => s.id !== sessionIdToDelete));
    // If the active session was deleted, switch to the first available session
    if (activeSessionId === sessionIdToDelete) {
      // After filtering, the first session in the updated list becomes active.
      // A more robust implementation might check if there are any sessions left.
      const remainingSessions = sessions.filter(s => s.id !== sessionIdToDelete);
      if (remainingSessions.length > 0) {
        setActiveSessionId(remainingSessions[0].id);
      } else {
        // If no sessions are left, create a new one.
        handleNewChat();
      }
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Full Height */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 md:z-0 transition-transform duration-300 h-screen`}>
        <Sidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onNewChat={handleNewChat}
          onSwitchChat={(id) => {
            handleSwitchChat(id);
            setIsSidebarOpen(false);
          }}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-grow flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden bg-gradient-to-br from-orange-50/30 via-amber-50/30 to-yellow-50/30 dark:from-orange-950/10 dark:via-amber-950/10 dark:to-yellow-950/10">
          {activeSession ? (
            <ChatWindow
              messages={activeSession.messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              onImageUpload={handleImageUpload}
            />
          ) : (
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400">Loading chats...</p>
            </div>
          )}
        </main>
        <Footer />
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
