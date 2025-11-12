import { Moon, Sun, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgb(var(--color-bg-primary))]/80 backdrop-blur-xl border-b border-[rgb(var(--color-border))]/50 shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className="relative group flex items-center space-x-3"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))] flex items-center justify-center overflow-hidden border-2 border-[rgb(var(--color-border))] shadow-lg shadow-[rgb(var(--color-accent))]/20 transition-all duration-300 group-hover:shadow-[rgb(var(--color-accent))]/40">
                  <User size={24} className="text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-[rgb(var(--color-accent))]/20"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold hidden sm:block tracking-tight relative"
              >
                Portfolio
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-[rgb(var(--color-accent))]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className="relative px-5 py-2.5 rounded-full group"
                    >
                      <span
                        className={`relative z-10 font-medium transition-colors duration-300 ${
                          isActive
                            ? 'text-white'
                            : 'text-[rgb(var(--color-text-secondary))] group-hover:text-[rgb(var(--color-text-primary))]'
                        }`}
                      >
                        {item.label}
                      </span>

                      <motion.div
                        className="absolute inset-0 rounded-full bg-[rgb(var(--color-accent))]"
                        initial={false}
                        animate={{
                          scale: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0
                        }}
                        whileHover={{ scale: 1, opacity: isActive ? 1 : 0.1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />

                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-full bg-[rgb(var(--color-accent))] shadow-lg shadow-[rgb(var(--color-accent))]/30"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="hidden sm:flex items-center px-4 py-2 rounded-full bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] font-semibold hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-300 border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-accent))] shadow-sm"
              >
                {i18n.language === 'en' ? 'ES' : 'EN'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="hidden sm:flex p-2.5 rounded-full bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-300 border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-accent))] shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 rounded-full bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] border border-[rgb(var(--color-border))] shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden border-t border-[rgb(var(--color-border))]/50 bg-[rgb(var(--color-bg-primary))]/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ x: 4 }}
                        className={`px-5 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-[rgb(var(--color-accent))] text-white shadow-lg shadow-[rgb(var(--color-accent))]/30'
                            : 'text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-bg-secondary))] hover:text-[rgb(var(--color-text-primary))]'
                        }`}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-3 pt-4 border-t border-[rgb(var(--color-border))]/50"
                >
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 px-4 py-3 rounded-xl bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] font-semibold hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-300 border border-[rgb(var(--color-border))]"
                  >
                    {i18n.language === 'en' ? 'Español' : 'English'}
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="px-4 py-3 rounded-xl bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-300 border border-[rgb(var(--color-border))]"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-20" />
    </>
  );
};
