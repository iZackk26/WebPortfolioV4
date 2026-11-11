import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SKILLS_TIMELINE } from '../../constants/about';
import { SkillsTimelineItem } from './SkillsTimelineItem';

export const SkillsTimeline = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-32 bg-[rgb(var(--color-bg-primary))]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">{t('about.technicalSkills')}</h2>
          <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
            A comprehensive journey through my technical expertise
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(var(--color-border))] via-[rgb(var(--color-accent))]/30 to-[rgb(var(--color-border))] hidden md:block" />
          {SKILLS_TIMELINE.map((area, index) => (
            <SkillsTimelineItem key={area.title} area={area} isLast={index === SKILLS_TIMELINE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};
