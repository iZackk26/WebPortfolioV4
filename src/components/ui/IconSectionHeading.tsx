import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { PAGE_FADE_IN_UP } from '../../constants/animations';

interface IconSectionHeadingProps {
  icon: LucideIcon;
  title: string;
  /** Stagger index consumed by the fade-in-up variant of the parent RevealGroup. */
  staggerIndex?: number;
}

const HEADING_ICON_SIZE = 28;

/** Section `h2` preceded by an accent icon; must live inside a RevealGroup. */
export const IconSectionHeading = ({ icon: Icon, title, staggerIndex = 0 }: IconSectionHeadingProps) => (
  <motion.div variants={PAGE_FADE_IN_UP} custom={staggerIndex} className="flex items-center space-x-3 mb-8">
    <Icon size={HEADING_ICON_SIZE} className="text-[rgb(var(--color-accent))]" />
    <h2 className="text-3xl font-bold">{title}</h2>
  </motion.div>
);
