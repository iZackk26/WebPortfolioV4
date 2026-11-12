import {
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_WAIT_FOR_UPDATE_MS,
  GTM_SCRIPT_URL,
} from '../constants/consent';

interface SnippetConfig {
  key: string;
  version: number;
  maxAge: number;
  wait: number;
  src: string;
}

/**
 * Corre inline en el <head>, antes que nada (Consent Mode v2 avanzado):
 * 1. Consent Mode en "denied" para todo.
 * 2. Si hay una decisión guardada vigente, la aplica ya, antes de que GTM evalúe sus tags.
 * 3. Carga Tag Manager. Va en el HTML para que Google (y Tag Assistant) lo detecten.
 * Debe ser autocontenida: se serializa con toString() y no puede usar nada de afuera.
 */
function bootTagManager(cfg: SnippetConfig) {
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params -- GTM lee el objeto `arguments`
    w.dataLayer.push(arguments);
  }
  const state = (analytics: boolean, marketing: boolean) => ({
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
  gtag('consent', 'default', { ...state(false, false), wait_for_update: cfg.wait });
  try {
    const record = JSON.parse(localStorage.getItem(cfg.key) || 'null');
    const fresh = record && record.version === cfg.version && Date.now() - record.decidedAt < cfg.maxAge;
    if (fresh) gtag('consent', 'update', state(record.analytics === true, record.marketing === true));
  } catch {
    // Sin almacenamiento: se queda todo denegado
  }
  gtag('js', new Date());
  const script = document.createElement('script');
  script.async = true;
  script.src = cfg.src;
  document.head.appendChild(script);
}

/** Script listo para inyectar en index.html (lo usa vite.config.ts) */
export const tagManagerHeadSnippet = () => {
  const cfg: SnippetConfig = {
    key: CONSENT_STORAGE_KEY,
    version: CONSENT_VERSION,
    maxAge: CONSENT_MAX_AGE_MS,
    wait: CONSENT_WAIT_FOR_UPDATE_MS,
    src: GTM_SCRIPT_URL,
  };
  return `(${bootTagManager.toString()})(${JSON.stringify(cfg)});`;
};
