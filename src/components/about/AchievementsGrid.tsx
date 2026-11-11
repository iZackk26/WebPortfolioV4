import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../../constants/about';

const ACHIEVEMENT_BASE_DELAY = 0.7;
const ACHIEVEMENT_STAGGER_DELAY = 0.1;

export const AchievementsGrid = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
  >
    {ACHIEVEMENTS.map((achievement, index) => (
      <motion.div
        key={achievement.label}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: ACHIEVEMENT_BASE_DELAY + index * ACHIEVEMENT_STAGGER_DELAY }}
        whileHover={{ y: -8, scale: 1.05 }}
        className="bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-xl p-4 text-center hover:border-[rgb(var(--color-accent))] transition-colors duration-150"
      >
        <achievement.icon className="text-[rgb(var(--color-accent))] mx-auto mb-2" size={24} />
        <div className="text-2xl font-bold text-[rgb(var(--color-accent))] mb-1">{achievement.value}</div>
        <p className="text-xs text-[rgb(var(--color-text-secondary))]">{achievement.label}</p>
      </motion.div>
    ))}
  </motion.div>
);
