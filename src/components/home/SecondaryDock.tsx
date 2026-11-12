import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PROJECTS } from '../../constants/projects';
import { FEATURED_PROJECT_IDS } from '../../constants/featuredProjects';
import { AeroButton } from '../ui/AeroButton';

const SECONDARY_PROJECTS = PROJECTS.filter((project) => !FEATURED_PROJECT_IDS.has(project.id));

/** Ventanas minimizadas de los proyectos secundarios y acceso a la página de proyectos. */
export const SecondaryDock = () => {
  const { t } = useTranslation();

  return (
    <section aria-label={t('featured.more.dock')} className="mt-12 flex flex-col items-center gap-3 px-4">
      <nav className="project-dock" aria-label={t('featured.more.dock')}>
        {SECONDARY_PROJECTS.map((project) => (
          <Link key={project.id} to={project.route}>
            <span className="dock-win" aria-hidden="true">
              <img src={project.image} alt="" loading="lazy" decoding="async" />
            </span>
            {t(`featured.dock.${project.id}`)}
          </Link>
        ))}
      </nav>
      <AeroButton to="/projects" tone="silver" size="sm">
        {t('featured.more.viewAll')} →
      </AeroButton>
    </section>
  );
};
