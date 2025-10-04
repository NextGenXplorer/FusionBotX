import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import InputBox from './InputBox';
import { Trash2, Loader } from 'lucide-react';

const ChatWindow = ({ messages, isLoading, onSendMessage, onClearChat, onImageUpload }) => {
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="w-full max-w-3xl h-full flex flex-col bg-white dark:bg-slate-800 rounded-none md:rounded-2xl shadow-none md:shadow-2xl border-0 md:border border-slate-200 dark:border-slate-700">
      {/* Chat Header with Clear Button */}
      <div className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-yellow-500/5">
        <h2 className="text-base md:text-lg font-semibold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">Chat</h2>
        <button
          onClick={onClearChat}
          className="p-2 md:p-2.5 rounded-xl hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-all duration-200"
          title="Clear Chat"
        >
          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-grow p-3 md:p-6 overflow-y-auto">
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
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
              <Loader className="animate-spin" size={18} />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700 shadow-lg border border-slate-200 dark:border-slate-600">
              <p className="text-sm italic text-slate-600 dark:text-slate-400">Thinking...</p>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <InputBox onSendMessage={onSendMessage} isLoading={isLoading} onImageUpload={onImageUpload} />
    </div>
  );
};

export default ChatWindow;
