import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import InputBox from './InputBox';
import { fetchBotResponse } from '../api';
import { Trash2, Loader } from 'lucide-react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm MiniChatBot. How can I help you study today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponse = await fetchBotResponse(userInput);
      const botMessage = { sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: "Sorry, I couldn't get a response. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      { sender: 'bot', text: "Chat cleared! Let's start over. What's on your mind?" }
    ]);
  };

  return (
    <div className="w-full max-w-2xl h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700">
      {/* Chat Header with Clear Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-semibold">Chat</h2>
        <button
          onClick={handleClearChat}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-grow p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-start gap-3 my-4"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-bubble-bot text-foreground">
              <Loader className="animate-spin" size={20} />
            </div>
            <div className="p-3 rounded-xl bg-bubble-bot text-foreground shadow-soft">
              <p className="text-sm italic">Typing...</p>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
