import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Prepare for transition
    root.style.setProperty('transition', 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1)');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);

    // Clean up transition after animation completes
    const timeout = setTimeout(() => {
      root.style.removeProperty('transition');
    }, 500);

    return () => clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => {
    // Add View Transition API support for smoother transitions
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
      });
    } else {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
  };

  return { theme, toggleTheme };
};
