import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../constants/projects';
import type { ProjectCardSize } from '../../constants/projectSections';

interface CardSizeStyle {
  imageHeight: string;
  body: string;
  title: string;
  description: string;
  button: string;
  visibleTechnologies: number;
  staggerDelay: number;
}

const CARD_SIZE_STYLES: Record<ProjectCardSize, CardSizeStyle> = {
  compact: {
    imageHeight: 'h-48',
    body: 'p-6',
    title: 'text-xl font-bold mb-3 min-h-[56px]',
    description: 'text-sm leading-relaxed mb-4',
    button: 'py-2.5 text-sm',
    visibleTechnologies: 2,
    staggerDelay: 0.1,
  },
  large: {
    imageHeight: 'h-64',
    body: 'p-8',
    title: 'text-2xl font-bold mb-4',
    description: 'leading-relaxed mb-4',
    button: 'py-3',
    visibleTechnologies: 4,
    staggerDelay: 0.15,
  },
};

const TECH_STAGGER_DELAY = 0.05;

interface ProjectGridCardProps {
  project: Project;
  index: number;
  size: ProjectCardSize;
}

export const ProjectGridCard = ({ project, index, size }: ProjectGridCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const style = CARD_SIZE_STYLES[size];
  const cardDelay = index * style.staggerDelay;
  const title = t(`projects.items.${project.id}.title`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: cardDelay }}
      whileHover={{ y: -12 }}
      className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl overflow-hidden hover:border-[rgb(var(--color-accent))] transition-all duration-300 flex flex-col"
    >
      <div className={`bg-[rgb(var(--color-bg-secondary))] border-b border-[rgb(var(--color-border))] ${style.imageHeight} overflow-hidden`}>
        <motion.img
          src={project.image}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        />
      </div>

      <div className={`${style.body} flex flex-col flex-grow`}>
        <h3 className={style.title}>{title}</h3>
        <p className={`text-[rgb(var(--color-text-secondary))] ${style.description} flex-grow`}>
          {t(`projects.items.${project.id}.description`)}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 min-h-[32px]">
            {project.technologies.slice(0, style.visibleTechnologies).map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: cardDelay + techIndex * TECH_STAGGER_DELAY }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 text-xs bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-lg hover:border-[rgb(var(--color-accent))] transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(project.route)}
            className={`w-full ${style.button} bg-[rgb(var(--color-accent))] text-white rounded-lg font-semibold hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-150`}
          >
            {t('projects.viewDetails')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
