import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealSectionProps {
  className?: string;
  children: ReactNode;
}

/** Content block that fades up the first time it scrolls into view. */
export const RevealSection = ({ className, children }: RevealSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
);
