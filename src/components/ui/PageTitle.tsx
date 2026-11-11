import { motion } from 'framer-motion';
import { PAGE_FADE_IN_UP } from '../../constants/animations';
import { RevealGroup } from './RevealGroup';

interface PageTitleProps {
  title: string;
}

const TITLE_REVEAL_AMOUNT = 0.3;

/** Page heading with an accent underline that grows from the left. */
export const PageTitle = ({ title }: PageTitleProps) => (
  <RevealGroup amount={TITLE_REVEAL_AMOUNT} className="mb-16">
    <motion.h1 variants={PAGE_FADE_IN_UP} custom={0} className="text-5xl sm:text-6xl font-bold mb-4">
      {title}
    </motion.h1>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-24 h-1 bg-[rgb(var(--color-accent))] rounded-full origin-left"
    />
  </RevealGroup>
);
