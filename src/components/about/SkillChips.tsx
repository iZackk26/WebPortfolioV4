import { motion } from 'framer-motion';
import { OVERSHOOT_EASE } from '../../constants/animations';

interface SkillChipsProps {
  skills: string[];
}

const CHIP_STAGGER_DELAY = 0.08;

export const SkillChips = ({ skills }: SkillChipsProps) => (
  <div className="flex flex-wrap gap-2 max-w-md">
    {skills.map((skill, index) => (
      <motion.div
        key={skill}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.3, delay: index * CHIP_STAGGER_DELAY, ease: OVERSHOOT_EASE }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgb(var(--color-bg-secondary))]/50 backdrop-blur-sm border border-[rgb(var(--color-border))]/50 rounded-full hover:border-[rgb(var(--color-accent))]/50 transition-all duration-200"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: index * CHIP_STAGGER_DELAY }}
          className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-accent))]"
        />
        <span className="text-[#000000] text-xs font-medium">{skill}</span>
      </motion.div>
    ))}
  </div>
);
