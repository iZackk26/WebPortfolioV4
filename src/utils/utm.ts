import { UTM_DOMAINS, UTM_SOURCE } from '../constants/analytics';

interface UtmTags {
  medium: string;
  campaign: string;
  /** Detalle opcional: qué tarjeta o qué enlace exacto */
  content?: string;
}

const isTaggedDomain = (hostname: string) => {
  const host = hostname.replace(/^www\./, '');
  return UTM_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
};

/**
 * Agrega UTMs a un enlace hacia un sitio propio para que su analítica sepa que la visita
 * vino de izackk.com. Respeta las UTMs que el enlace ya traiga y no toca otros dominios.
 */
export const withUtm = (href: string, { medium, campaign, content }: UtmTags) => {
  try {
    const url = new URL(href);
    if (!isTaggedDomain(url.hostname) || url.searchParams.has('utm_source')) return href;
    url.searchParams.set('utm_source', UTM_SOURCE);
    url.searchParams.set('utm_medium', medium);
    url.searchParams.set('utm_campaign', campaign);
    if (content) url.searchParams.set('utm_content', content);
    return url.toString();
  } catch {
    return href;
  }
};
