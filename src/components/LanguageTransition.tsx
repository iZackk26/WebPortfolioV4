import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface LanguageTransitionProps {
  children: ReactNode;
}

export const LanguageTransition = ({ children }: LanguageTransitionProps) => {
  const { i18n } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={i18n.language}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
