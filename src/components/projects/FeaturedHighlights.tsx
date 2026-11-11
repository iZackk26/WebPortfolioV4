import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { HIGHLIGHTS_SEPARATOR } from '../../constants/projectSections';

interface FeaturedHighlightsProps {
  /** i18n key holding the highlights joined by `HIGHLIGHTS_SEPARATOR`. */
  highlightsKey: string;
}

const HIGHLIGHT_BASE_DELAY = 0.6;
const HIGHLIGHT_STAGGER_DELAY = 0.1;

export const FeaturedHighlights = ({ highlightsKey }: FeaturedHighlightsProps) => {
  const { t } = useTranslation();
  const highlights = t(highlightsKey, { defaultValue: '' })
    .split(HIGHLIGHTS_SEPARATOR)
    .filter((highlight) => highlight.length > 0);

  if (highlights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h4 className="text-sm font-bold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider mb-3">
        Key Features
      </h4>
      <div className="space-y-2">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: HIGHLIGHT_BASE_DELAY + index * HIGHLIGHT_STAGGER_DELAY }}
            className="flex items-center space-x-2"
          >
            <CheckCircle size={16} className="text-[rgb(var(--color-accent))] flex-shrink-0" />
            <span className="text-[rgb(var(--color-text-secondary))]">{highlight}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
