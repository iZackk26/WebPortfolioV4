import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreditCard, Globe, MapPin, Palette, Shield, Zap, type LucideIcon } from 'lucide-react';
import { useTranslatedList } from '../../../hooks/useTranslatedList';
import type { DetailNamespace } from '../../../types/projectDetail';
import { isProductionFeature } from '../../../utils/translationGuards';
import { RevealSection } from '../RevealSection';

/** Icons the locale files may reference by name in `production_features[].icon`. */
const PRODUCTION_FEATURE_ICONS: Record<string, LucideIcon> = {
  CreditCard,
  Shield,
  MapPin,
  Palette,
  Globe,
  Zap,
};

const FEATURE_STAGGER_DELAY = 0.1;

interface ProductionFeaturesProps {
  namespace: DetailNamespace;
}

export const ProductionFeatures = ({ namespace }: ProductionFeaturesProps) => {
  const { t } = useTranslation();
  const features = useTranslatedList(`${namespace}.production_features`, isProductionFeature);

  return (
    <RevealSection className="mb-20">
      <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[rgb(var(--color-accent))] animate-pulse"></div>
          <h2 className="text-2xl font-bold">{t(`${namespace}.production_title`)}</h2>
        </div>
        <p className="text-[rgb(var(--color-text-secondary))] mb-8 leading-relaxed">
          {t(`${namespace}.production_description`)}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const FeatureIcon = PRODUCTION_FEATURE_ICONS[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * FEATURE_STAGGER_DELAY }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-[rgb(var(--color-bg-primary))] border border-[rgb(var(--color-border))] rounded-lg p-5 hover:border-[rgb(var(--color-accent))] transition-all duration-300 group"
              >
                {FeatureIcon && (
                  <FeatureIcon
                    size={24}
                    className="text-[rgb(var(--color-accent))] mb-3 group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <h3 className="font-semibold mb-2 text-sm">{feature.title}</h3>
                <p className="text-xs text-[rgb(var(--color-text-secondary))] leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
};
