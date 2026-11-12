import { useEffect, useState } from 'react';

/** Id de la sección visible más arriba, para marcar el índice mientras se lee. */
export const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');

  useEffect(() => {
    const targets = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // "Activa" es la sección que cruza la franja bajo el navbar fijo (las anclas dejan 100px arriba)
      { rootMargin: '-120px 0px -60% 0px' },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [key]);

  return active;
};
