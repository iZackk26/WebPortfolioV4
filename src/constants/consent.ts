/** Contenedor de Google Tag Manager; GA4 está configurado dentro de él. */
export const GTM_ID = 'GTM-5M27LJ6D';
export const GTM_SCRIPT_URL = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

export const CONSENT_STORAGE_KEY = 'izackk-consent';
/** Subirla vuelve a preguntar a todos (p. ej. si se agrega una categoría nueva) */
export const CONSENT_VERSION = 1;
/** Pasado este tiempo la decisión vence y el aviso vuelve a salir */
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

/** Evento global para reabrir las preferencias (enlace "Cookies" del footer) */
export const CONSENT_OPEN_EVENT = 'izackk:consent-open';

/** En pantallas chicas el aviso es la ventana completa; en grandes, la cápsula */
export const CONSENT_MOBILE_QUERY = '(max-width: 639px)';

/** Cookies que deja GA4; se borran si el visitante retira el permiso */
export const ANALYTICS_COOKIE_PREFIXES = ['_ga', '_gid', '_gat'];

/** Cuánto espera GTM una actualización de consentimiento antes de evaluar sus tags */
export const CONSENT_WAIT_FOR_UPDATE_MS = 500;
