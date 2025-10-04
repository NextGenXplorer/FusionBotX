import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-center py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <p className="text-xs text-[var(--color-muted)] flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        Powered by Gemini API
      </p>
    </footer>
  );
};

export default Footer;
