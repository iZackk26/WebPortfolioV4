import { motion } from 'framer-motion';
import { OVERSHOOT_EASE, SMOOTH_EASE } from '../../constants/animations';
import type { SkillArea } from '../../types/about';
import { SkillChips } from './SkillChips';

interface SkillsTimelineItemProps {
  area: SkillArea;
  isLast: boolean;
}

const SLIDE_DISTANCE = 80;

export const SkillsTimelineItem = ({ area, isLast }: SkillsTimelineItemProps) => {
  const isRight = area.side === 'right';

  return (
    <div className="relative mb-24 last:mb-0">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col md:flex-row items-center gap-8 ${isRight ? 'md:flex-row-reverse' : ''}`}
      >
        <motion.div
          initial={{ opacity: 0, x: isRight ? SLIDE_DISTANCE : -SLIDE_DISTANCE }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: SMOOTH_EASE }}
          className="flex-1 w-full"
        >
          <div className={`flex ${isRight ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
            <motion.div whileHover={{ y: -8 }} className="inline-block">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-full bg-[rgb(var(--color-accent))]/10 border border-[rgb(var(--color-accent))]/30 flex items-center justify-center flex-shrink-0"
                >
                  <area.icon className="text-[rgb(var(--color-accent))]" size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">{area.title}</h3>
              </div>
              <SkillChips skills={area.skills} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.3, ease: OVERSHOOT_EASE }}
          className="relative z-10 flex-shrink-0 hidden md:block"
        >
          <motion.div
            whileHover={{ scale: 1.3 }}
            className="w-4 h-4 rounded-full bg-[rgb(var(--color-accent))] border-4 border-[rgb(var(--color-bg-primary))] shadow-lg shadow-[rgb(var(--color-accent))]/20"
          />
        </motion.div>

        <div className="flex-1 w-full md:block hidden" />
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.5, ease: SMOOTH_EASE }}
          className="absolute left-1/2 -translate-x-1/2 top-4 w-px h-full bg-gradient-to-b from-[rgb(var(--color-accent))]/50 to-transparent origin-top hidden md:block"
          style={{ height: 'calc(100% + 6rem)' }}
        />
      )}
    </div>
  );
};
