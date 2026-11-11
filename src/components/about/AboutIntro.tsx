import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target } from 'lucide-react';
import { SMOOTH_EASE } from '../../constants/animations';
import { AchievementsGrid } from './AchievementsGrid';

const SLIDE_IN_LEFT: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: SMOOTH_EASE } },
};

const INTRO_REVEAL_AMOUNT = 0.2;

/** Left column of the About hero: introduction, motivation card and achievement stats. */
export const AboutIntro = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: INTRO_REVEAL_AMOUNT }}
      variants={SLIDE_IN_LEFT}
      className="lg:col-span-2 space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        <p className="text-lg text-[rgb(var(--color-text-secondary))] leading-relaxed">{t('about.introduction')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        className="bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-colors duration-300"
      >
        <div className="flex items-start space-x-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="p-2 bg-[rgb(var(--color-accent))] rounded-lg"
          >
            <Target className="text-white" size={24} />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold mb-2">{t('about.motivation')}</h3>
            <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">{t('about.motivationText')}</p>
          </div>
        </div>
      </motion.div>

      <AchievementsGrid />
    </motion.div>
  );
};
