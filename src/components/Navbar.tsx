import { Moon, Sun, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCompact = scrolled && !isHovered;

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          width: isCompact ? '56px' : 'calc(100% - 48px)',
          height: isCompact ? '56px' : '64px',
          borderRadius: isCompact ? '28px' : '32px',
          x: isCompact ? '24px' : '24px',
          y: isCompact ? '24px' : '16px'
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
          mass: 0.8
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-0 left-0 z-50 bg-[rgb(var(--color-bg-primary))]/90 backdrop-blur-xl border border-[rgb(var(--color-border))]/50 shadow-lg overflow-hidden"
        style={{
          willChange: 'transform, width, height, border-radius',
          contain: 'layout style paint'
        }}
      >
        <div className="relative w-full h-full flex items-center">
          <motion.div
            animate={{
              opacity: isCompact ? 0 : 1,
              pointerEvents: isCompact ? 'none' : 'auto'
            }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 flex items-center justify-between px-6 lg:px-8"
            style={{ willChange: 'opacity' }}
          >
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
              <Link to="/" className="relative group flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))] flex items-center justify-center overflow-hidden border-2 border-[rgb(var(--color-border))] shadow-lg shadow-[rgb(var(--color-accent))]/20">
                    <img
                      src="/icon.jpeg"
                      alt="Isaac"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </motion.div>
              </Link>

              <div className="hidden md:flex items-center space-x-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="relative px-5 py-2.5 rounded-full group"
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-[rgb(var(--color-accent))] shadow-lg shadow-[rgb(var(--color-accent))]/30"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          />
                        )}

                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-[rgb(var(--color-accent))]"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 0.1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        <motion.span
                          key={`${item.path}-${i18n.language}`}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className={`relative z-10 font-medium transition-colors duration-200 ${isActive
                            ? 'text-white'
                            : 'text-[rgb(var(--color-text-secondary))] group-hover:text-[rgb(var(--color-text-primary))]'
                            }`}
                        >
                          {item.label}
                        </motion.span>
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
                  className="hidden sm:flex items-center px-4 py-2 rounded-full bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] font-semibold hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-200 border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-accent))] shadow-sm relative overflow-hidden"
                >
                  <motion.span
                    key={i18n.language}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="relative z-10"
                  >
                    {i18n.language === 'en' ? 'ES' : 'EN'}
                  </motion.span>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-accent))]/0 via-[rgb(var(--color-accent))]/20 to-[rgb(var(--color-accent))]/0"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeInOut'
                    }}
                    key={`lang-shimmer-${i18n.language}`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="hidden sm:flex p-2.5 rounded-full bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-200 border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-accent))] shadow-sm relative overflow-hidden"
                >
                  <motion.div
                    key={theme}
                    initial={{ y: -30, opacity: 0, rotate: -180 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 30, opacity: 0, rotate: 180 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-accent))]/0 via-[rgb(var(--color-accent))]/20 to-[rgb(var(--color-accent))]/0"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 0.5,
                      ease: 'easeInOut',
                      repeat: 0
                    }}
                    key={`shimmer-${theme}`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2.5 rounded-full bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] border border-[rgb(var(--color-border))] shadow-sm"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              opacity: isCompact ? 1 : 0,
              pointerEvents: isCompact ? 'auto' : 'none'
            }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: 'opacity' }}
          >
            <Link to="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))] flex items-center justify-center overflow-hidden border-2 border-[rgb(var(--color-border))] shadow-lg shadow-[rgb(var(--color-accent))]/40">
                  <img
                    src="/icon.jpeg"
                    alt="Isaac"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                </div>
                <motion.div
                  className="absolute -inset-1 rounded-full border-2 border-[rgb(var(--color-accent))]"
                  animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeOut'
                  }}
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-24 left-6 right-6 z-40 md:hidden border border-[rgb(var(--color-border))]/50 bg-[rgb(var(--color-bg-primary))]/95 backdrop-blur-xl overflow-hidden rounded-3xl shadow-lg"
        >
          <div className="px-6 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`px-5 py-3 rounded-xl transition-all duration-200 ${isActive
                      ? 'bg-[rgb(var(--color-accent))] text-white shadow-lg shadow-[rgb(var(--color-accent))]/30'
                      : 'text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-bg-secondary))] hover:text-[rgb(var(--color-text-primary))]'
                      }`}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}

            <div className="flex items-center space-x-3 pt-4 border-t border-[rgb(var(--color-border))]/50">
              <button
                onClick={toggleLanguage}
                className="flex-1 px-4 py-3 rounded-xl bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] font-semibold hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-200 border border-[rgb(var(--color-border))]"
              >
                {i18n.language === 'en' ? 'Español' : 'English'}
              </button>

              <button
                onClick={toggleTheme}
                className="px-4 py-3 rounded-xl bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-200 border border-[rgb(var(--color-border))]"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="h-24" />
    </>
  );
};
