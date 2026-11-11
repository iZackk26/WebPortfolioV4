import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SMOOTH_EASE } from '../../constants/animations';
import type { Project } from '../../constants/projects';
import { FeaturedHighlights } from './FeaturedHighlights';
import { FeaturedTechnologies } from './FeaturedTechnologies';

const CARD_SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: SMOOTH_EASE } },
};

interface FeaturedProjectCardProps {
  project: Project;
}

/** Wide two-column card used for the professional (featured) projects. */
export const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const itemKey = `projects.items.${project.id}`;

  return (
    <motion.div
      variants={CARD_SCALE_IN}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl overflow-hidden hover:border-[rgb(var(--color-accent))] transition-colors duration-300"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="bg-[rgb(var(--color-bg-secondary))] border-b-2 lg:border-b-0 lg:border-r-2 border-[rgb(var(--color-border))] overflow-hidden">
          <motion.img
            src={project.image}
            alt={t(`${itemKey}.title`)}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="p-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-4">{t(`${itemKey}.title`)}</h3>
            <p className="text-lg text-[rgb(var(--color-text-secondary))] leading-relaxed mb-6">
              {t(`${itemKey}.description`)}
            </p>
          </motion.div>

          <FeaturedHighlights highlightsKey={`${itemKey}.highlights`} />
          <FeaturedTechnologies technologies={project.technologies} />

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(project.route)}
            className="w-full sm:w-auto px-6 py-3 bg-[rgb(var(--color-accent))] text-white rounded-lg font-semibold inline-flex items-center justify-center space-x-2 hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-150"
          >
            <span>View Case Study</span>
            <ExternalLink size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
