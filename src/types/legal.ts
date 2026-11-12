/** Piezas de texto de una cláusula legal; el contenido vive en los locales, no en el código. */
export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] };

export interface LegalClause {
  id: string;
  title: string;
  blocks: LegalBlock[];
  /** Acción extra al final de la cláusula (hoy solo el botón de preferencias de cookies) */
  action?: 'cookies';
}

export interface LegalFact {
  label: string;
  value: string;
}

/** Botón del hero: ancla dentro de la página, ruta interna o abrir las preferencias de cookies */
export interface LegalAction {
  label: string;
  target: string;
  tone: 'aqua' | 'silver';
}

/** Sección de i18n de cada documento legal (legal_privacy, legal_terms) */
export type LegalDocKey = 'legal_privacy' | 'legal_terms';
