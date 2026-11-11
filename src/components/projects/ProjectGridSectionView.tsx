import { useTranslation } from 'react-i18next';
import { getProjectsByCategory } from '../../constants/projects';
import type { ProjectGridSection } from '../../constants/projectSections';
import { IconSectionHeading } from '../ui/IconSectionHeading';
import { RevealGroup } from '../ui/RevealGroup';
import { ProjectGridCard } from './ProjectGridCard';

interface ProjectGridSectionViewProps {
  section: ProjectGridSection;
}

const SECTION_REVEAL_AMOUNT = 0.3;

export const ProjectGridSectionView = ({ section }: ProjectGridSectionViewProps) => {
  const { t } = useTranslation();
  const projects = getProjectsByCategory(section.category);

  if (projects.length === 0) return null;

  return (
    <RevealGroup amount={SECTION_REVEAL_AMOUNT} className={section.className}>
      <IconSectionHeading icon={section.icon} title={t(section.titleKey)} />
      <div className={`grid ${section.gridClassName} gap-8`}>
        {projects.map((project, index) => (
          <ProjectGridCard key={project.id} project={project} index={index} size={section.cardSize} />
        ))}
      </div>
    </RevealGroup>
  );
};
