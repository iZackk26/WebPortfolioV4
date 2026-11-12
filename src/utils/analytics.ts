import type { AnalyticsEvent } from '../constants/analytics';

/** Parámetros fijos de todos los eventos: una variable de GTM por cada uno, sin sorpresas */
export interface AnalyticsParams {
  /** Dónde ocurrió (navbar, home_carousel, contact…) */
  ui_location?: string;
  /** Sobre qué (id del proyecto, idioma, decisión de cookies…) */
  item_name?: string;
  /** Destino, en los clics a enlaces */
  link_url?: string;
}

/**
 * Manda un evento al dataLayer de Tag Manager. Si GTM no cargó (bloqueador, sin red) el
 * evento queda en la cola y no rompe nada. Nunca recibe texto escrito por el visitante.
 */
export const track = (event: AnalyticsEvent, params: AnalyticsParams = {}) => {
  try {
    window.dataLayer = window.dataLayer || [];
    // Se envían los tres siempre: GTM conserva el último valor de cada clave y un evento
    // sin link_url heredaría el del evento anterior
    window.dataLayer.push({
      event,
      ui_location: params.ui_location,
      item_name: params.item_name,
      link_url: params.link_url,
    });
  } catch {
    // La analítica nunca debe romper la interfaz
  }
};
