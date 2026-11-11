import { useCallback, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export type CarouselSlot = 'a' | 'b' | 'wait-left' | 'wait-right';

/**
 * Posición de cada tarjeta respecto al índice activo: 'a' y 'b' son las dos visibles;
 * la que acaba de salir espera a la izquierda y el resto a la derecha.
 */
export const getCarouselSlot = (cardIndex: number, activeIndex: number, count: number): CarouselSlot => {
  const distance = (cardIndex - activeIndex + count) % count;
  if (distance === 0) return 'a';
  if (distance === 1) return 'b';
  return distance === count - 1 ? 'wait-left' : 'wait-right';
};

/** Índice circular con autoplay que se pausa al interactuar y se apaga con reduced motion. */
export const useCarousel = (count: number, autoplayMs: number) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const step = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((current) => (current + dir + count) % count);
    },
    [count]
  );

  const goTo = useCallback(
    (target: number) => {
      if (target === index) return;
      setDirection((target - index + count) % count <= count / 2 ? 1 : -1);
      setIndex(target);
    },
    [count, index]
  );

  const autoplay = !paused && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => step(1), autoplayMs);
    return () => clearTimeout(timer);
  }, [index, autoplay, autoplayMs, step]);

  return { index, direction, step, goTo, paused, setPaused, autoplay };
};
