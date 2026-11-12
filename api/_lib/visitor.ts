import { geolocation } from '@vercel/functions';

/**
 * Contexto del visitante que acompaña cada pregunta a Max, para la analítica en Supabase.
 * Nunca incluye la IP: solo su hash salado (clientId) y la geolocalización que da Vercel.
 * Todo viene de headers que pone Vercel o el navegador, así que se recorta y se trata como texto.
 */
export interface VisitorContext {
  clientId: string;
  sessionId: string;
  country: string;
  region: string;
  city: string;
  userAgent: string;
  page: string;
  browserLang: string;
}

const clip = (value: string | null | undefined, max: number) => (value ?? '').slice(0, max);

/** Solo la ruta de la página desde la que se escribió (sin dominio ni query, que pueden traer datos) */
const pagePath = (referer: string | null) => {
  if (!referer) return '';
  try {
    return clip(new URL(referer).pathname, 200);
  } catch {
    return '';
  }
};

export const visitorContext = (request: Request, clientId: string, sessionId: string): VisitorContext => {
  const geo = geolocation(request);
  return {
    clientId,
    sessionId,
    country: clip(geo.country, 2),
    region: clip(geo.countryRegion, 80),
    city: clip(geo.city, 80),
    userAgent: clip(request.headers.get('user-agent'), 400),
    page: pagePath(request.headers.get('referer')),
    browserLang: clip(request.headers.get('accept-language')?.split(',')[0], 40),
  };
};
