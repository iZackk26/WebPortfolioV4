import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PAGE_FADE_IN_UP } from '../../constants/animations';
import { getProjectsByCategory } from '../../constants/projects';
import { RevealGroup } from '../ui/RevealGroup';
import { FeaturedProjectCard } from './FeaturedProjectCard';

const SECTION_REVEAL_AMOUNT = 0.2;

export const FeaturedProjectsSection = () => {
  const { t } = useTranslation();
  const featuredProjects = getProjectsByCategory('professional');

  if (featuredProjects.length === 0) return null;

  return (
    <RevealGroup amount={SECTION_REVEAL_AMOUNT} className="mb-24">
      <motion.div variants={PAGE_FADE_IN_UP} custom={1} className="flex items-center space-x-2 mb-8">
        <div className="px-3 py-1 bg-[rgb(var(--color-accent))] text-white text-sm font-semibold rounded-full">
          FEATURED
        </div>
        <h2 className="text-3xl font-bold">{t('projects.professional')}</h2>
      </motion.div>

      <div className="space-y-8">
        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
      </div>
    </RevealGroup>
  );
};
