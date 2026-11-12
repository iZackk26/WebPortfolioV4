import { useTranslation } from 'react-i18next';
import { FeaturedProject } from '../../../constants/featuredProjects';
import { ANALYTICS_EVENTS, UTM_MEDIUM } from '../../../constants/analytics';
import { track } from '../../../utils/analytics';
import { withUtm } from '../../../utils/utm';
import { AeroButton } from '../../ui/AeroButton';

const LOCATION = 'home_carousel';

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
        <AeroButton
          to={project.caseRoute}
          size="sm"
          onClick={() => track(ANALYTICS_EVENTS.projectOpen, { ui_location: LOCATION, item_name: project.id })}
        >
          {t('featured.viewCase')}
        </AeroButton>
      )}
      {project.siteUrl && (
        <AeroButton
          href={withUtm(project.siteUrl, { medium: UTM_MEDIUM.portfolio, campaign: LOCATION, content: project.id })}
          tone={project.caseRoute ? 'silver' : 'aqua'}
          size="sm"
          onClick={() => track(ANALYTICS_EVENTS.projectVisitSite, { ui_location: LOCATION, item_name: project.id, link_url: project.siteUrl })}
        >
          {t('featured.visitSite')} ↗
        </AeroButton>
      )}
    </div>
  );
};
