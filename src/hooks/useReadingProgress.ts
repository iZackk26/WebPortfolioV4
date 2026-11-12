import { RefObject, useEffect, useState } from 'react';

/** Porcentaje leído de un elemento (0–100), según cuánto pasó por la mitad de la pantalla */
export const useReadingProgress = (ref: RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const { top, height } = node.getBoundingClientRect();
      const read = (window.innerHeight / 2 - top) / Math.max(height, 1);
      setProgress(Math.round(Math.min(1, Math.max(0, read)) * 100));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref]);

  return progress;
};
