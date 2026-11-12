import { useTranslation } from 'react-i18next';
import { FeaturedProject } from '../../../constants/featuredProjects';
import { AeroButton } from '../../ui/AeroButton';

interface CarouselCardActionsProps {
  project: FeaturedProject;
}

/** Proyecto privado: solo una nota. Los demás: caso interno y/o sitio en vivo cuando existen. */
export const CarouselCardActions = ({ project }: CarouselCardActionsProps) => {
  const { t } = useTranslation();

  if (project.kind === 'private') {
    return <span className="carousel-private-note">{t('featured.privateNote')}</span>;
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {project.caseRoute && (
        <AeroButton to={project.caseRoute} size="sm">
          {t('featured.viewCase')}
        </AeroButton>
      )}
      {project.siteUrl && (
        <AeroButton href={project.siteUrl} tone={project.caseRoute ? 'silver' : 'aqua'} size="sm">
          {t('featured.visitSite')} ↗
        </AeroButton>
      )}
    </div>
  );
};
