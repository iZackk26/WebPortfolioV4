import { RefObject, useEffect, useState } from 'react';

/**
 * true cuando el elemento queda a menos de `margin` del viewport, y se queda en true.
 * Sirve para montar secciones pesadas justo antes de que el visitante llegue a ellas.
 */
export const useNearViewport = (ref: RefObject<Element>, margin = '900px 0px') => {
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (near || !el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setNear(true);
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin, near]);

  return near;
};
