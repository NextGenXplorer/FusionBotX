import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const { text, sender } = message;
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-bubble-user text-white order-2' : 'bg-bubble-bot text-foreground'}`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      {/* Bubble */}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-soft ${isUser ? 'bg-bubble-user text-white order-1' : 'bg-bubble-bot text-foreground'}`}
      >
        <p className="text-sm break-words">{text}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
