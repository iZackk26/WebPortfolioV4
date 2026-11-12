import { Fragment, ReactNode } from 'react';
import { ANALYTICS_EVENTS, UTM_MEDIUM } from '../constants/analytics';
import { track } from './analytics';
import { withUtm } from './utm';

/** URL suelta https://… o correo suelto dentro del texto de Max */
export const BARE_LINK = /(https:\/\/[^\s<>()[\]]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/;
/** Puntuación que cierra la frase y no forma parte del enlace ("…/ ." o "…com,") */
const TRAILING = /[.,;:!?'")\]]+$/;
const MAX_PATH_CHARS = 18;
/** Solo estos esquemas se vuelven enlace: un javascript: queda como texto */
const SAFE_LINK = /^(https:\/\/|mailto:)/i;

/** "https://www.flow.visione-edge.com/docs/agentes" → "flow.visione-edge.com/docs/age…" */
export const shortUrl = (href: string) => {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, '');
    const path = url.pathname.replace(/\/$/, '');
    if (!path) return host;
    return `${host}${path.length > MAX_PATH_CHARS ? `${path.slice(0, MAX_PATH_CHARS)}…` : path}`;
  } catch {
    return href;
  }
};

/**
 * Enlace seguro: externo en pestaña nueva con ↗, correo con mailto. A los sitios propios se
 * les agregan UTMs aquí (no en el prompt): así la visita se atribuye a Max aunque el modelo
 * copie mal la URL.
 */
export const ChatLink = ({ href, label }: { href: string; label: string }) => {
  if (!SAFE_LINK.test(href)) return <>{label}</>;
  const external = href.toLowerCase().startsWith('https://');
  const target = external ? withUtm(href, { medium: UTM_MEDIUM.maxChat, campaign: 'max' }) : href;
  return (
    <a
      href={target}
      onClick={() => track(ANALYTICS_EVENTS.chatLinkClick, { ui_location: 'max_chat', link_url: external ? href : 'mailto' })}
      className="max-link"
      title={external ? href : undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer nofollow' } : {})}
    >
      <span className="max-link-text">{label}</span>
      {external && <span className="max-link-arrow" aria-hidden="true">↗</span>}
    </a>
  );
};

/** Convierte una URL o correo suelto en enlace corto; devuelve la puntuación final aparte. */
export const bareLink = (raw: string, key: string): ReactNode => {
  const trailing = TRAILING.exec(raw)?.[0] ?? '';
  const value = trailing ? raw.slice(0, -trailing.length) : raw;
  const isEmail = !value.startsWith('https://');
  return (
    <Fragment key={key}>
      <ChatLink href={isEmail ? `mailto:${value}` : value} label={isEmail ? value : shortUrl(value)} />
      {trailing}
    </Fragment>
  );
};
