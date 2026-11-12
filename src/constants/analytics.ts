/**
 * Eventos propios que el sitio manda a GA4 a través del dataLayer de Tag Manager.
 * En GTM una sola etiqueta "GA4 Event" los reenvía todos (ver docs/ga4-eventos.md).
 * Descargas del CV y clics salientes no están aquí: GA4 los mide solo (Enhanced Measurement).
 */
export const ANALYTICS_EVENTS = {
  chatOpen: 'chat_open',
  chatMessage: 'chat_message',
  chatNewConversation: 'chat_new_conversation',
  chatLinkClick: 'chat_link_click',
  contactFormStart: 'contact_form_start',
  contactSend: 'contact_send',
  contactCopyEmail: 'contact_copy_email',
  projectOpen: 'project_open',
  projectVisitSite: 'project_visit_site',
  languageChange: 'language_change',
  cookieChoice: 'cookie_choice',
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** Origen con el que se etiquetan los enlaces salientes a sitios propios */
export const UTM_SOURCE = 'izackk.com';

/** Medios de las UTMs: desde qué parte del portafolio salió la visita */
export const UTM_MEDIUM = {
  portfolio: 'portfolio',
  maxChat: 'max_chat',
} as const;

/**
 * Solo estos dominios reciben UTMs: son de Isaac o de sus clientes y alguien mira su
 * analítica. A LinkedIn o GitHub no se les agrega nada (no sirve y ensucia el enlace).
 */
export const UTM_DOMAINS = ['flow.visione-edge.com', 'visione-edge.com', 'thegrowth-path.com', 'valuaciondigital.com'];
