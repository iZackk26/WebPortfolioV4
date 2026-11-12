import {
  ANALYTICS_COOKIE_PREFIXES,
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
} from '../constants/consent';
import type { ConsentPreferences, ConsentRecord } from '../types/consent';

/**
 * Consent Mode v2 avanzado: el <head> (utils/tagManagerSnippet.ts) deja todo denegado,
 * aplica la decisión guardada y carga Tag Manager. Aquí solo se actualiza el estado
 * cuando el visitante decide en el aviso. GA4 dentro de GTM exige analytics_storage.
 */
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// gtag debe empujar el objeto `arguments`, no un array: así lo lee GTM
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params -- formato exigido por Google
  window.dataLayer.push(arguments);
}

const signals = ({ analytics, marketing }: ConsentPreferences) => {
  const ads = marketing ? 'granted' : 'denied';
  return {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
};

const clearAnalyticsCookies = () => {
  const domains = ['', `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) continue;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
  }
};

/** Aplica la decisión: actualiza Consent Mode y, si se retira la analítica, borra sus cookies */
const applyConsent = (preferences: ConsentPreferences) => {
  gtag('consent', 'update', signals(preferences));
  if (!preferences.analytics) clearAnalyticsCookies();
};

/** Decisión vigente o null si no hay, venció o es de una versión anterior */
export const readConsent = (): ConsentRecord | null => {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw) as Partial<ConsentRecord>;
    const fresh = typeof record.decidedAt === 'number' && Date.now() - record.decidedAt < CONSENT_MAX_AGE_MS;
    if (record.version !== CONSENT_VERSION || !fresh) return null;
    return { version: CONSENT_VERSION, decidedAt: record.decidedAt as number, analytics: record.analytics === true, marketing: record.marketing === true };
  } catch {
    return null;
  }
};

export const saveConsent = (preferences: ConsentPreferences) => {
  const record: ConsentRecord = { ...preferences, version: CONSENT_VERSION, decidedAt: Date.now() };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Sin almacenamiento: la decisión vale solo para esta visita
  }
  applyConsent(preferences);
};
