
import React, { useState, useEffect, useCallback } from 'react';
import { AppProvider } from './contexts/AppContext';
import HomePage from './components/pages/HomePage';
import AiMentorPage from './components/pages/AiMentorPage';
import StartupPlannerPage from './components/pages/StartupPlannerPage';
import CommunityPage from './components/pages/CommunityPage';
import CoursesPage from './components/pages/CoursesPage';
import Header from './components/layout/Header';
import { Page, Language } from './types';
import { Bot, Lightbulb, MessageSquare, Home, BookOpen } from 'lucide-react';
import strings from './lib/i18n';


const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [activePage, setActivePage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);
  
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
        if (prev === 'ru') return 'en';
        if (prev === 'en') return 'kk';
        return 'ru';
    });
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'mentor':
        return <AiMentorPage />;
      case 'planner':
        return <StartupPlannerPage />;
      case 'community':
        return <CommunityPage />;
      case 'courses':
        return <CoursesPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  const NavItem = ({ page, icon: Icon, labelKey }: { page: Page, icon: React.ElementType, labelKey: keyof typeof strings }) => (
    <button
      onClick={() => setActivePage(page)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 ${
        activePage === page ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-primary/70'
      }`}
    >
      <Icon size={24} strokeWidth={activePage === page ? 2.5 : 2} />
      <span className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${activePage === page ? 'opacity-100' : 'opacity-60'}`}>
        {strings[labelKey][language]}
      </span>
    </button>
  );

  return (
    <AppProvider value={{ theme, toggleTheme, language, toggleLanguage, strings }}>
      <div className="bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-4 sm:px-6 lg:px-8 overflow-y-auto pb-20">
          {renderPage()}
        </main>
        <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-dark-card/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-900 z-50">
          <nav className="flex justify-around items-center h-16 container mx-auto">
             <NavItem page="home" icon={Home} labelKey="navHome" />
             <NavItem page="mentor" icon={Bot} labelKey="navMentor" />
             <NavItem page="courses" icon={BookOpen} labelKey="navCourses" />
             <NavItem page="planner" icon={Lightbulb} labelKey="navPlanner" />
             <NavItem page="community" icon={MessageSquare} labelKey="navCommunity" />
          </nav>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
