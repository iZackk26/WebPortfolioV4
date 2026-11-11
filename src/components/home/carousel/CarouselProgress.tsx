import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { CAROUSEL_AUTOPLAY_MS, FeaturedProject } from '../../../constants/featuredProjects';

interface CarouselProgressProps {
  projects: FeaturedProject[];
  index: number;
  running: boolean;
  onSelect: (index: number) => void;
}

/** Una barra por proyecto; la activa se llena mientras corre el autoplay. */
export const CarouselProgress = ({ projects, index, running, onSelect }: CarouselProgressProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="carousel-progress mt-6 flex justify-center gap-2"
      style={{ ['--autoplay-ms' as string]: `${CAROUSEL_AUTOPLAY_MS}ms` } as CSSProperties}
    >
      {projects.map((project, i) => (
        <button
          key={project.id}
          type="button"
          onClick={() => onSelect(i)}
          aria-current={i === index}
          aria-label={t('featured.goTo', { title: t(`featured.items.${project.id}.title`) })}
        >
          {/* key reinicia la animación en cada cambio de proyecto o de pausa */}
          <i key={`${index}-${running}`} data-running={i === index && running} />
        </button>
      ))}
    </div>
  );
};
