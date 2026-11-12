/** Lo que expone la Network Information API (Chrome/Android); Safari y Firefox no la tienen. */
interface NetworkInfo {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
}

/** Por debajo de esto (Mbps) la red se considera lenta */
const SLOW_DOWNLINK_MBPS = 1.5;

const readConnection = (): NetworkInfo | undefined =>
  (navigator as Navigator & { connection?: NetworkInfo }).connection;

/**
 * true con ahorro de datos o red 2G/3G. Sin la API (Safari) asume red buena: el navegador
 * igual elige por srcset y solo se pierde la precarga adaptativa.
 */
export const isSlowConnection = () => {
  const connection = readConnection();
  if (!connection) return false;
  if (connection.saveData) return true;
  if (/(^|-)2g|3g/.test(connection.effectiveType ?? '')) return true;
  return connection.downlink !== undefined && connection.downlink < SLOW_DOWNLINK_MBPS;
};

export interface PrefetchImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}

/**
 * Descarga imágenes a la caché HTTP con prioridad baja, sin pintarlas. Con srcSet y sizes
 * el navegador elige el mismo archivo que usará la <img> real (no baja HD de más en 1×).
 */
export const prefetchImages = (images: readonly PrefetchImage[]) => {
  for (const { src, srcSet, sizes } of images) {
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'low';
    if (sizes) img.sizes = sizes;
    if (srcSet) img.srcset = srcSet;
    img.src = src;
  }
};
