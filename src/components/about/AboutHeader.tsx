import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { createFadeInUp, OVERSHOOT_EASE } from '../../constants/animations';
import { DownloadCvButton } from './DownloadCvButton';

const TITLE_FADE_IN_UP = createFadeInUp({ offsetY: 60, staggerDelay: 0.2 });

const UNDERLINE_SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: custom * 0.1, ease: OVERSHOOT_EASE },
  }),
};

const HEADER_REVEAL_AMOUNT = 0.3;

export const AboutHeader = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: HEADER_REVEAL_AMOUNT }}
      className="mb-16"
      style={{ overflow: 'visible' }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-4"
        style={{ overflow: 'visible' }}
      >
        <motion.h1 variants={TITLE_FADE_IN_UP} custom={0} className="text-5xl sm:text-6xl font-bold">
          {t('about.title')}
        </motion.h1>
        <DownloadCvButton />
      </div>
      <motion.div variants={UNDERLINE_SCALE_IN} custom={1} className="w-24 h-1 bg-[rgb(var(--color-accent))] rounded-full" />
    </motion.div>
  );
};
