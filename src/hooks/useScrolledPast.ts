import { useEffect, useState } from 'react';

/** true cuando la ventana se desplazó más de `threshold` px */
export const useScrolledPast = (threshold: number) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  return scrolled;
};
