/** Arma un enlace mailto: con asunto y cuerpo codificados. */
export const buildMailto = (to: string, subject: string, body: string) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
