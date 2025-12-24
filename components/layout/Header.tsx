
import React from 'react';
import { Sun, Moon, Globe, Zap } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useAppContext();

  return (
    <header className="bg-light-bg dark:bg-dark-bg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-primary p-1.5 rounded-lg text-white shadow-lg shadow-brand-primary/20">
              <Zap size={22} fill="currentColor" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-sans">
              Kaz<span className="text-brand-primary">AI</span>
            </h1>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button
                onClick={toggleLanguage}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-card transition-all active:scale-95"
                aria-label="Toggle language"
            >
                <div className="flex items-center space-x-1">
                    <Globe size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">{language}</span>
                </div>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-card transition-all active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
