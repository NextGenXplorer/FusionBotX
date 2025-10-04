import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = ({ message }) => {
  const { text, sender } = message;
  const isUser = sender === 'user';

  // Safety check for text
  const messageText = text || '';

  // Check if message contains an image (both generated and uploaded)
  const imageMatch = messageText.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const hasImage = imageMatch !== null;
  const imageUrl = hasImage ? imageMatch[2] : null;

  // Extract text without the image markdown for uploaded images
  let displayText = messageText;
  if (hasImage && isUser) {
    // Remove the image markdown and show only the question
    displayText = messageText.replace(/!\[([^\]]*)\]\(([^)]+)\)\n\n/, '');
  }

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 md:gap-3 mb-4 md:mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Icon */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
          <Sparkles size={14} className="md:w-[18px] md:h-[18px]" />
        </div>
      )}
      {/* Bubble */}
      <div className="relative">
        <div
          className={`max-w-[85%] sm:max-w-xs md:max-w-md lg:max-w-lg p-3 md:p-4 rounded-2xl shadow-lg ${
            isUser
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
              : 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600'
          }`}
        >
          {isUser ? (
            <>
              {hasImage && (
                <div className="mb-2">
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="max-w-full h-auto rounded-lg border-2 border-white/20"
                  />
                </div>
              )}
              <p className="text-sm break-words">{displayText}</p>
            </>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {messageText}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {/* Download Button for Images */}
        {hasImage && !isUser && (
          <button
            onClick={handleDownload}
            className="mt-2 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs md:text-sm font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 flex items-center gap-2"
            title="Download Image"
          >
            <Download className="w-4 h-4" />
            <span>Download Image</span>
          </button>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-lg">
          <User size={14} className="md:w-[18px] md:h-[18px]" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
