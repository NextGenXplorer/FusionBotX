import React from 'react';

const Header = () => {
  return (
    <header className="text-center p-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-primary">
        MiniChatBot – Your Study Buddy
      </h1>
      <p className="text-md text-foreground mt-1">
        Ask questions, solve problems, and learn with AI-powered assistance.
      </p>
    </header>
  );
};

export default Header;
