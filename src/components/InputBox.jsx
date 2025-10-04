import React, { useState } from 'react';
import { Send, Image, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InputBox = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleImageGenerate = () => {
    if (imagePrompt.trim()) {
      onSendMessage(`Generate an image: ${imagePrompt}`);
      setImagePrompt('');
      setShowImageMenu(false);
    }
  };

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end gap-3">
          <div className="flex-grow">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowImageMenu(!showImageMenu)}
            className={`p-3 rounded-2xl transition-all duration-200 ${
              showImageMenu
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-[var(--color-background)] border-2 border-[var(--color-border)] text-[var(--color-muted)] hover:border-primary hover:text-primary'
            }`}
            title="Generate Image"
          >
            <Image className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white disabled:from-gray-400 disabled:to-gray-500 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Image Generation Menu */}
      <AnimatePresence>
        {showImageMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--color-border)] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Generate Image
                </h3>
                <button
                  onClick={() => setShowImageMenu(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--color-background)] text-[var(--color-muted)] hover:text-foreground transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleImageGenerate()}
                  placeholder="Describe the image you want to generate..."
                  className="flex-grow px-4 py-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={handleImageGenerate}
                  disabled={!imagePrompt.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium disabled:from-gray-400 disabled:to-gray-500 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputBox;
