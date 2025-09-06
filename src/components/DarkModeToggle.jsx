import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-yellow-500 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? 'moon' : 'sun'}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default DarkModeToggle;
