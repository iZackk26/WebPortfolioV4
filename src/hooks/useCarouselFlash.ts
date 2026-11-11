import { useCallback, useEffect, useRef, useState } from 'react';

/** Mínimo entre dos barridos al moverse, para que el efecto no canse */
const FLASH_COOLDOWN_MS = 10000;
/** Rango del barrido ocasional en reposo */
const AMBIENT_MIN_MS = 14000;
const AMBIENT_MAX_MS = 22000;

export interface Flash {
  id: string;
  /** Cambia en cada disparo para reiniciar la animación */
  nonce: number;
}

/**
 * Barrido de luz como acento: `fire` respeta el cooldown salvo que se fuerce,
 * y mientras no esté en pausa cruza de vez en cuando una de las tarjetas visibles.
 */
export const useCarouselFlash = (visibleIds: string[], paused: boolean) => {
  const [flash, setFlash] = useState<Flash | null>(null);
  const lastFlashAt = useRef(-Infinity);
  const visibleRef = useRef(visibleIds);

  useEffect(() => {
    visibleRef.current = visibleIds;
  }, [visibleIds]);

  const fire = useCallback((id: string, force = false) => {
    const now = performance.now();
    if (!force && now - lastFlashAt.current < FLASH_COOLDOWN_MS) return;
    lastFlashAt.current = now;
    setFlash({ id, nonce: now });
  }, []);

  useEffect(() => {
    if (paused) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        const pool = visibleRef.current;
        if (pool.length) fire(pool[Math.floor(Math.random() * pool.length)]);
        schedule();
      }, AMBIENT_MIN_MS + Math.random() * (AMBIENT_MAX_MS - AMBIENT_MIN_MS));
    };
    schedule();
    return () => clearTimeout(timer);
  }, [paused, fire]);

  return { flash, fire };
};
