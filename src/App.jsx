import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWindow from './components/ChatWindow';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      <Header />
      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        {/* ChatWindow will now take up the available height */}
        <ChatWindow />
      </main>
      <Footer />
      {/* DarkModeToggle positioned absolutely */}
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}

export default App;
