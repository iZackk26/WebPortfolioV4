import { useEffect } from 'react';
import { IDLE_PREFETCH_TIMEOUT_MS } from '../constants/performance';

type Prefetch = () => Promise<unknown>;

/**
 * Descarga chunks cuando la página ya cargó y el hilo está libre, para que las secciones
 * diferidas estén listas al llegar. Con ahorro de datos o red 2G no precarga.
 */
export const useIdlePrefetch = (prefetch: Prefetch) => {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) return;

    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    // Si falla no pasa nada: la sección lo reintenta al montarse
    const load = () => void prefetch().catch(() => undefined);
    const run = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(load, { timeout: IDLE_PREFETCH_TIMEOUT_MS });
      else timer = setTimeout(load, IDLE_PREFETCH_TIMEOUT_MS);
    };

    if (document.readyState === 'complete') run();
    else window.addEventListener('load', run, { once: true });

    return () => {
      window.removeEventListener('load', run);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      clearTimeout(timer);
    };
  }, [prefetch]);
};
