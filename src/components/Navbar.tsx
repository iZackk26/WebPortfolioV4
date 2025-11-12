import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/certificates', label: t('nav.certificates') }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--color-bg-primary))]/95 backdrop-blur-sm border-b border-[rgb(var(--color-border))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 transition-opacity duration-150 hover:opacity-80">
            <div className="w-10 h-10 rounded-lg bg-[rgb(var(--color-accent))] flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <span className="text-xl font-bold hidden sm:block">Portfolio</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <div
                  className={`px-4 py-2 rounded-lg transition-colors duration-150 ${
                    location.pathname === item.path
                      ? 'bg-[rgb(var(--color-accent))] text-white'
                      : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-bg-secondary))]'
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-lg bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] font-medium hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-150"
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-150"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-primary))]">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={`block px-4 py-3 rounded-lg transition-colors duration-150 ${
                    location.pathname === item.path
                      ? 'bg-[rgb(var(--color-accent))] text-white'
                      : 'text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-bg-secondary))]'
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
