import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FeaturedProject } from '../../../constants/featuredProjects';
import { CarouselSlot } from '../../../hooks/useCarousel';
import { Window } from '../../ui/Window';
import { CarouselShot } from './CarouselShot';
import { CarouselCardMeta } from './CarouselCardMeta';
import { CarouselCardActions } from './CarouselCardActions';

interface CarouselCardProps {
  project: FeaturedProject;
  position: number;
  total: number;
  slot: CarouselSlot;
  flashNonce: number | null;
}

export const CarouselCard = ({ project, position, total, slot, flashNonce }: CarouselCardProps) => {
  const { t } = useTranslation();
  const key = `featured.items.${project.id}`;
  const hidden = slot !== 'a' && slot !== 'b';
  const byline = t(`${key}.byline`, { defaultValue: '' });
  const ref = useRef<HTMLElement>(null);

  // inert saca del orden de tabulación los enlaces de las tarjetas ocultas
  useEffect(() => {
    ref.current?.toggleAttribute('inert', hidden);
  }, [hidden]);

  return (
    <article
      ref={ref}
      className="carousel-card"
      data-slot={slot}
      role="group"
      aria-roledescription="slide"
      aria-label={t('featured.slide', { current: position, total })}
      aria-hidden={hidden}
    >
      <Window title={project.fileName}>
        <CarouselShot media={project.media} alt={t(`${key}.alt`)} flashNonce={flashNonce} />
        <div className="flex flex-1 flex-col gap-2.5 p-[16px_18px_18px]">
          <CarouselCardMeta project={project} position={position} />
          <h3 className="m-0 text-[22px] font-medium tracking-[-0.04em] text-black">{t(`${key}.title`)}</h3>
          {byline && <p className="-mt-1 m-0 font-mono text-xs text-black/40">{byline}</p>}
          <p className="m-0 text-[15px] leading-relaxed text-black/60">{t(`${key}.description`)}</p>
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label={t('projects.technologies')}>
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-md border border-black/10 bg-[#f4f4f4] px-[7px] py-px font-mono text-xs text-black/70">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-1">
            <CarouselCardActions project={project} />
          </div>
        </div>
      </Window>
    </article>
  );
};
