import { motion, type TargetAndTransition } from 'framer-motion';
import type { OperatingSystem } from '../../types/certificates';
import { IconImage } from './IconImage';

export interface OperatingSystemGroupStyle {
  gridClassName: string;
  cardPaddingClassName: string;
  iconSize: number;
  staggerDelay: number;
  iconHover: TargetAndTransition;
  iconHoverDuration: number;
  revealDelay: number;
  className?: string;
}

interface OperatingSystemGroupProps {
  title: string;
  systems: OperatingSystem[];
  groupStyle: OperatingSystemGroupStyle;
}

export const OperatingSystemGroup = ({ title, systems, groupStyle }: OperatingSystemGroupProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: groupStyle.revealDelay }}
    className={groupStyle.className}
  >
    <h3 className="text-xl font-bold mb-4 text-[rgb(var(--color-text-secondary))]">{title}</h3>
    <div className={`grid ${groupStyle.gridClassName}`}>
      {systems.map((system, index) => (
        <motion.div
          key={system.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * groupStyle.staggerDelay }}
          whileHover={{ y: -8, scale: 1.05 }}
          className={`bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl ${groupStyle.cardPaddingClassName} hover:border-[rgb(var(--color-accent))] transition-all duration-300 flex flex-col items-center justify-center text-center`}
        >
          <motion.div
            whileHover={groupStyle.iconHover}
            transition={{ duration: groupStyle.iconHoverDuration }}
            className="mb-3"
          >
            <IconImage src={system.iconPath} alt={system.name} size={groupStyle.iconSize} />
          </motion.div>
          <span className="text-sm font-semibold text-[rgb(var(--color-text-secondary))]">{system.name}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
