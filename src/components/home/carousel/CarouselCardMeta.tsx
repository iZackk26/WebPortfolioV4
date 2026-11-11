import { useTranslation } from 'react-i18next';
import { FeaturedProject } from '../../../constants/featuredProjects';

interface CarouselCardMetaProps {
  project: FeaturedProject;
  position: number;
}

const LockIcon = () => (
  <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true">
    <rect x="3" y="7" width="10" height="8" rx="2" fill="currentColor" />
    <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/** Número, tipo de proyecto y rol, en una sola línea. */
export const CarouselCardMeta = ({ project, position }: CarouselCardMetaProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="font-mono text-[11px] text-black/40">{String(position).padStart(2, '0')}</span>
      <span className="carousel-kind" data-kind={project.kind}>
        {project.kind === 'private' && <LockIcon />}
        {t(`featured.kinds.${project.kind}`)}
      </span>
      {project.role && (
        <span className="font-mono text-xs text-black/50">
          {t('featured.rolePrefix')} · {t(`featured.roles.${project.role}`)}
        </span>
      )}
    </div>
  );
};
