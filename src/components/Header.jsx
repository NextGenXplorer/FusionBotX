import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative border-b border-[var(--color-border)] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5">
      <div className="text-center py-6 px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            MiniChatBot
          </h1>
        </div>
        <p className="text-sm text-[var(--color-muted)]">
          Your AI-powered study companion
        </p>
      </div>
    </header>
  );
};

export default Header;
