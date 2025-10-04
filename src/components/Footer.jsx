import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-center py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1.5">
        Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Love
      </p>
    </footer>
  );
};

export default Footer;
