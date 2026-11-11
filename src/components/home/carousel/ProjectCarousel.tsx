import { FocusEvent, KeyboardEvent, PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CAROUSEL_AUTOPLAY_MS, FEATURED_PROJECTS } from '../../../constants/featuredProjects';
import { FEATURED_SECTION_ID } from '../../../constants/intro';
import { getCarouselSlot, useCarousel } from '../../../hooks/useCarousel';
import { useCarouselFlash } from '../../../hooks/useCarouselFlash';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import { CarouselCard } from './CarouselCard';
import { CarouselControls } from './CarouselControls';
import { CarouselProgress } from './CarouselProgress';

const SWIPE_THRESHOLD_PX = 40;
const BOOT_STAGGER_MS = 1200;
const TOTAL = FEATURED_PROJECTS.length;

/** Carrusel de proyectos principales: dos ventanas a la vez, movimiento con profundidad 3D. */
export const ProjectCarousel = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInViewOnce<HTMLElement>(0.25);
  const { index, direction, step, goTo, setPaused, autoplay } = useCarousel(TOTAL, CAROUSEL_AUTOPLAY_MS);
  const [booting, setBooting] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const visibleIds = useMemo(
    () => [FEATURED_PROJECTS[index].id, FEATURED_PROJECTS[(index + 1) % TOTAL].id],
    [index]
  );
  const { flash, fire } = useCarouselFlash(visibleIds, !inView || !autoplay);

  // Entrada: las dos ventanas llegan una tras otra y la primera estrena el barrido
  useEffect(() => {
    if (!inView) return;
    setBooting(true);
    fire(FEATURED_PROJECTS[0].id, true);
    const timer = setTimeout(() => setBooting(false), BOOT_STAGGER_MS);
    return () => clearTimeout(timer);
  }, [inView, fire]);

  // Al moverse, el barrido (con cooldown) va sobre la ventana que acaba de llegar
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fire(direction > 0 ? visibleIds[1] : visibleIds[0]);
  }, [index, direction, visibleIds, fire]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) step(dx < 0 ? 1 : -1);
  };
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
  };

  return (
    <section
      ref={ref}
      id={FEATURED_SECTION_ID}
      aria-roledescription="carousel"
      aria-label={t('featured.label')}
      className="mx-auto mt-4 max-w-[1120px] scroll-mt-28 px-4 md:px-6"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={onBlur}
    >
      <CarouselControls index={index} total={TOTAL} onPrevious={() => step(-1)} onNext={() => step(1)} />

      <div
        className="carousel-viewport mt-4"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className={`carousel-track ${booting ? 'is-booting' : ''}`}>
          {FEATURED_PROJECTS.map((project, i) => (
            <CarouselCard
              key={project.id}
              project={project}
              position={i + 1}
              total={TOTAL}
              slot={inView ? getCarouselSlot(i, index, TOTAL) : 'wait-right'}
              flashNonce={flash?.id === project.id ? flash.nonce : null}
            />
          ))}
        </div>
      </div>

      <CarouselProgress projects={FEATURED_PROJECTS} index={index} running={inView && autoplay} onSelect={goTo} />
    </section>
  );
};
