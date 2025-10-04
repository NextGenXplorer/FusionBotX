import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import InputBox from './InputBox';
import { Trash2, Loader } from 'lucide-react';

const ChatWindow = ({ messages, isLoading, onSendMessage, onClearChat }) => {
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="w-full max-w-3xl h-full flex flex-col bg-[var(--color-background)] rounded-2xl shadow-2xl border border-[var(--color-border)]">
      {/* Chat Header with Clear Button */}
      <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Chat</h2>
        <button
          onClick={onClearChat}
          className="p-2.5 rounded-xl hover:bg-red-500/10 text-[var(--color-muted)] hover:text-red-500 transition-all duration-200"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-grow p-6 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-start gap-3 my-4"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
              <Loader className="animate-spin" size={18} />
            </div>
            <div className="p-4 rounded-2xl bg-[var(--color-surface)] text-foreground shadow-lg border border-[var(--color-border)]">
              <p className="text-sm italic text-[var(--color-muted)]">Thinking...</p>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <InputBox onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
