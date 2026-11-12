import { useTranslation } from 'react-i18next';

interface SectionSkeletonProps {
  /** Alto reservado (clase de page-skeleton.css) para que no salte el scroll al montar */
  size: 'work' | 'contact' | 'page';
  /** Ventanas de contenido que imita */
  windows?: number;
}

/** Placeholder de sección: título, bajada y ventanas vacías con un brillo que pasa. */
export const SectionSkeleton = ({ size, windows = 1 }: SectionSkeletonProps) => {
  const { t } = useTranslation();

  return (
    <div className={`skel-section skel-${size}`} role="status" aria-busy="true">
      <span className="sr-only">{t('common.loading')}</span>
      <div className="skel skel-title" />
      <div className="skel skel-line" />
      {Array.from({ length: windows }, (_, i) => (
        <div key={i} className="skel-win" aria-hidden="true">
          <div className="win-bar">
            <i className="win-dot" />
            <i className="win-dot" />
            <i className="win-dot" />
          </div>
          <div className="skel-win-body">
            <div className="skel skel-row" />
            <div className="skel skel-row is-short" />
            <div className="skel skel-row" />
          </div>
        </div>
      ))}
    </div>
  );
};
