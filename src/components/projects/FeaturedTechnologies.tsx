import { motion } from 'framer-motion';

interface FeaturedTechnologiesProps {
  technologies: string[];
}

const TECH_BASE_DELAY = 0.8;
const TECH_STAGGER_DELAY = 0.05;

export const FeaturedTechnologies = ({ technologies }: FeaturedTechnologiesProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.7 }}
  >
    <h4 className="text-sm font-bold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider mb-3">
      Technologies
    </h4>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: TECH_BASE_DELAY + index * TECH_STAGGER_DELAY }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="px-3 py-1 text-sm bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-lg hover:border-[rgb(var(--color-accent))] transition-colors duration-200"
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </motion.div>
);
