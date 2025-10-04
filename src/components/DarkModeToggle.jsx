import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-yellow-500 dark:text-yellow-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-lg hover:shadow-xl transition-all duration-200"
      aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? 'moon' : 'sun'}
          initial={{ rotate: -180, opacity: 0, scale: 0 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default DarkModeToggle;
