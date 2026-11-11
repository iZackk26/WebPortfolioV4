import { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Direction each bento card enters from; values mirror the original per-card animations. */
const BENTO_REVEALS = {
  scale: { initial: { opacity: 0, scale: 0.9 }, inView: { opacity: 1, scale: 1 } },
  up: { initial: { opacity: 0, y: 30 }, inView: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -20 }, inView: { opacity: 1, x: 0 } },
} as const;

export type BentoReveal = keyof typeof BENTO_REVEALS;

interface BentoCardProps {
  reveal: BentoReveal;
  delay: number;
  className: string;
  children: ReactNode;
}

export const BentoCard = ({ reveal, delay, className, children }: BentoCardProps) => (
  <motion.div
    initial={BENTO_REVEALS[reveal].initial}
    whileInView={BENTO_REVEALS[reveal].inView}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);
