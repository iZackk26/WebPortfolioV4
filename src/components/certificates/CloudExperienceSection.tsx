import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Cloud } from 'lucide-react';
import { CLOUD_PROVIDERS } from '../../constants/certificates';
import { IconSectionHeading } from '../ui/IconSectionHeading';
import { RevealGroup } from '../ui/RevealGroup';
import { IconImage } from './IconImage';

const SECTION_REVEAL_AMOUNT = 0.2;
const PROVIDER_ICON_SIZE = 72;
const CARD_STAGGER_DELAY = 0.1;
const ICON_EXTRA_DELAY = 0.2;

export const CloudExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <RevealGroup amount={SECTION_REVEAL_AMOUNT} className="mb-20">
      <IconSectionHeading icon={Cloud} title={t('certificates.cloudExperience')} staggerIndex={1} />

      <div className="grid md:grid-cols-3 gap-8">
        {CLOUD_PROVIDERS.map((provider, index) => (
          <motion.div
            key={provider.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * CARD_STAGGER_DELAY }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * CARD_STAGGER_DELAY + ICON_EXTRA_DELAY }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              className="mb-6 flex items-center justify-center h-20"
            >
              <IconImage src={provider.iconPath} alt={provider.name} size={PROVIDER_ICON_SIZE} />
            </motion.div>

            <h3 className="text-xl font-bold mb-4">{provider.name}</h3>
            <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed mb-6">
              {t(provider.descriptionKey)}
            </p>

            <div className="flex items-center space-x-2 text-[rgb(var(--color-accent))]">
              <CheckCircle size={18} />
              <span className="text-sm font-semibold">Experienced</span>
            </div>
          </motion.div>
        ))}
      </div>
    </RevealGroup>
  );
};
