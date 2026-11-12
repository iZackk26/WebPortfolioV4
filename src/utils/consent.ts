import {
  ANALYTICS_COOKIE_PREFIXES,
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  GTM_SCRIPT_URL,
} from '../constants/consent';
import type { ConsentPreferences, ConsentRecord } from '../types/consent';

/**
 * Consent Mode v2 en modo básico: todo arranca denegado y Tag Manager solo se carga
 * después de que el visitante acepta la analítica. Antes de eso no sale nada hacia Google.
 */
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// gtag debe empujar el objeto `arguments`, no un array: así lo lee GTM. Los parámetros
// solo tipan la llamada; el valor real sale de `arguments`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
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

/** Va antes de todo: deja declarado que no hay permiso hasta que el visitante decida */
export const initConsentDefaults = () => {
  window.dataLayer = window.dataLayer || [];
  gtag('consent', 'default', signals({ analytics: false, marketing: false }));
};

let gtmLoaded = false;
const loadTagManager = () => {
  if (gtmLoaded) return;
  gtmLoaded = true;
  gtag('js', new Date());
  const script = document.createElement('script');
  script.async = true;
  script.src = GTM_SCRIPT_URL;
  document.head.appendChild(script);
};

const clearAnalyticsCookies = () => {
  const domains = ['', `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) continue;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
  }
};

/** Aplica la decisión: actualiza Consent Mode y carga GTM solo si hay permiso */
export const applyConsent = (preferences: ConsentPreferences) => {
  gtag('consent', 'update', signals(preferences));
  if (preferences.analytics) loadTagManager();
  else clearAnalyticsCookies();
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

/** Al arrancar la app: defaults denegados y, si ya había permiso, se carga GTM de una vez */
export const bootConsent = () => {
  initConsentDefaults();
  const record = readConsent();
  if (record) applyConsent(record);
};
