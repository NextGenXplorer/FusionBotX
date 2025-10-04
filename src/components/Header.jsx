import React from 'react';
import { Sparkles, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="relative border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-amber-500/10 dark:from-orange-500/5 dark:via-orange-400/5 dark:to-amber-500/5">
      <div className="flex items-center justify-between py-4 px-3 md:py-6 md:px-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>

        {/* Title */}
        <div className="flex-1 text-center md:text-center">
          <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400 animate-pulse" />
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 dark:from-orange-400 dark:via-orange-300 dark:to-amber-400 bg-clip-text text-transparent">
              FusionBotX
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
            Your AI-powered assistant
          </p>
        </div>

        {/* Spacer for mobile to center title */}
        <div className="md:hidden w-10"></div>
      </div>
    </header>
  );
};

export default Header;
