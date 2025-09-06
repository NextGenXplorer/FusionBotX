import React, { useState } from 'react';
import { Send } from 'lucide-react';

const InputBox = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-grow p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="ml-4 p-2 rounded-full bg-primary text-white disabled:bg-gray-400 dark:disabled:bg-gray-600 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <Send className="h-6 w-6" />
      </button>
    </form>
  );
};

export default InputBox;
