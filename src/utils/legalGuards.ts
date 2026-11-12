import type { LegalAction, LegalBlock, LegalClause, LegalFact } from '../types/legal';

/**
 * Validación de los documentos legales que llegan de los locales. Un archivo roto se
 * degrada a "no se muestra esa pieza" en lugar de tumbar la página.
 */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

export const isLegalBlock = (value: unknown): value is LegalBlock => {
  if (!isRecord(value)) return false;
  switch (value.type) {
    case 'p':
    case 'h3':
      return typeof value.text === 'string';
    case 'ul':
      return isStringList(value.items);
    case 'table':
      return isStringList(value.head) && Array.isArray(value.rows) && value.rows.every(isStringList);
    default:
      return false;
  }
};

export const isLegalClause = (value: unknown): value is LegalClause =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.title === 'string' &&
  Array.isArray(value.blocks) &&
  (value.action === undefined || value.action === 'cookies');

export const isLegalFact = (value: unknown): value is LegalFact =>
  isRecord(value) && typeof value.label === 'string' && typeof value.value === 'string';

export const isLegalAction = (value: unknown): value is LegalAction =>
  isRecord(value) &&
  typeof value.label === 'string' &&
  typeof value.target === 'string' &&
  (value.tone === 'aqua' || value.tone === 'silver');
