import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { useTranslatedList } from '../../hooks/useTranslatedList';
import type { DetailNamespace } from '../../types/projectDetail';
import { isString } from '../../utils/translationGuards';

interface OverviewAndFeaturesProps {
  namespace: DetailNamespace;
}

const OVERVIEW_PARAGRAPH_KEYS = ['overview_p1', 'overview_p2', 'overview_p3'] as const;
const FEATURE_STAGGER_DELAY = 0.1;

/** Two-column block: project overview on the left, key features checklist on the right. */
export const OverviewAndFeatures = ({ namespace }: OverviewAndFeaturesProps) => {
  const { t } = useTranslation();
  const features = useTranslatedList(`${namespace}.features`, isString);

  return (
    <div className="grid lg:grid-cols-2 gap-16 mb-20">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">{t(`${namespace}.overview_title`)}</h2>
        <div className="space-y-4 text-[rgb(var(--color-text-secondary))] leading-relaxed">
          {OVERVIEW_PARAGRAPH_KEYS.map((paragraphKey) => (
            <p key={paragraphKey}>{t(`${namespace}.${paragraphKey}`)}</p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">{t(`${namespace}.features_title`)}</h2>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * FEATURE_STAGGER_DELAY }}
              className="flex items-start space-x-3"
            >
              <CheckCircle size={20} className="text-[rgb(var(--color-accent))] flex-shrink-0 mt-0.5" />
              <span className="text-[rgb(var(--color-text-secondary))]">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
