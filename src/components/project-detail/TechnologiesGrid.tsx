import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslatedList } from '../../hooks/useTranslatedList';
import type { DetailNamespace } from '../../types/projectDetail';
import { isTechnology } from '../../utils/translationGuards';
import { RevealSection } from './RevealSection';

interface TechnologiesGridProps {
  namespace: DetailNamespace;
  className?: string;
}

const TECHNOLOGY_STAGGER_DELAY = 0.05;

export const TechnologiesGrid = ({ namespace, className }: TechnologiesGridProps) => {
  const { t } = useTranslation();
  const technologies = useTranslatedList(`${namespace}.technologies`, isTechnology);

  return (
    <RevealSection className={className}>
      <h2 className="text-3xl font-bold mb-8">{t(`${namespace}.technologies_title`)}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {technologies.map((technology, index) => (
          <motion.div
            key={`${technology.category}-${technology.name}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * TECHNOLOGY_STAGGER_DELAY }}
            whileHover={{ scale: 1.05 }}
            className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg p-4 hover:border-[rgb(var(--color-accent))] transition-all duration-200"
          >
            <div className="text-sm text-[rgb(var(--color-accent))] font-semibold mb-1">{technology.category}</div>
            <div className="font-bold">{technology.name}</div>
          </motion.div>
        ))}
      </div>
    </RevealSection>
  );
};
