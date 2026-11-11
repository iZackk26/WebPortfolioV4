import { useTranslation } from 'react-i18next';
import { FeaturedProject } from '../../../constants/featuredProjects';
import { RetroButton } from '../../ui/RetroButton';

interface CarouselCardActionsProps {
  project: FeaturedProject;
}

const SIZE = '!h-[38px] !px-4 !text-[15px]';

/** Proyecto privado: solo una nota. Los demás: caso interno y/o sitio en vivo cuando existen. */
export const CarouselCardActions = ({ project }: CarouselCardActionsProps) => {
  const { t } = useTranslation();

  if (project.kind === 'private') {
    return <span className="carousel-private-note">{t('featured.privateNote')}</span>;
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {project.caseRoute && (
        <RetroButton to={project.caseRoute} className={SIZE}>
          {t('featured.viewCase')}
        </RetroButton>
      )}
      {project.siteUrl && (
        <RetroButton href={project.siteUrl} variant={project.caseRoute ? 'silver' : 'aqua'} className={SIZE}>
          {t('featured.visitSite')} ↗
        </RetroButton>
      )}
    </div>
  );
};
