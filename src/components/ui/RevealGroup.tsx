import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealGroupProps {
  /** Fraction of the element that must be visible to trigger the reveal. */
  amount: number;
  className?: string;
  children: ReactNode;
}

/** Container that switches its children's variants from `hidden` to `visible` once it enters the viewport. */
export const RevealGroup = ({ amount, className, children }: RevealGroupProps) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount }} className={className}>
    {children}
  </motion.div>
);
