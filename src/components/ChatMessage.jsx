import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = ({ message }) => {
  const { text, sender } = message;
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Icon */}
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
          <Sparkles size={18} />
        </div>
      )}
      {/* Bubble */}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
            : 'bg-[var(--color-surface)] text-foreground border border-[var(--color-border)]'
        }`}
      >
        {isUser ? (
          <p className="text-sm break-words">{text}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg">
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
