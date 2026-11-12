import type { LocaleMeta, LocaleSections } from './types';
import { mergeLocaleSections } from './mergeLocaleSections';

/**
 * Registro de idiomas a partir de las carpetas de locales/: agregar un idioma es crear
 * locales/<código>/ con su meta.json y las mismas secciones .json que el inglés.
 * No hay idiomas escritos en el código salvo el de respaldo.
 */

/** Idioma de respaldo: va siempre en el bundle y cubre claves que falten en otro */
export const DEFAULT_LANGUAGE = 'en';

const LOCALE_FILE = /^\.\/locales\/([^/]+)\/[^/]+\.json$/;
const languageOf = (path: string) => LOCALE_FILE.exec(path)?.[1] ?? '';

// meta.json de todos los idiomas: pocos bytes, para el botón y el SEO sin bajar textos
const metaByPath = import.meta.glob<LocaleMeta>('./locales/*/meta.json', { eager: true, import: 'default' });

export const LOCALE_META: Record<string, LocaleMeta> = Object.fromEntries(
  Object.entries(metaByPath).map(([path, meta]) => [languageOf(path), meta]),
);

/** Idiomas disponibles, en el orden del ciclo del botón */
export const LANGUAGES = Object.keys(LOCALE_META).sort((a, b) => LOCALE_META[a].order - LOCALE_META[b].order);

export const isSupportedLanguage = (code: string | null | undefined): code is string =>
  Boolean(code && code in LOCALE_META);

// El de respaldo entra en la carga inicial (el string del glob debe ser literal)
export const DEFAULT_SECTIONS: LocaleSections = mergeLocaleSections(
  import.meta.glob<Record<string, unknown>>('./locales/en/*.json', { eager: true, import: 'default' }),
);

// Los demás se piden al usarse (sin meta ni el de respaldo, que ya están); vite.config
// agrupa cada idioma en un solo chunk
const sectionLoaders = import.meta.glob<Record<string, unknown>>(
  ['./locales/*/*.json', '!./locales/*/meta.json', '!./locales/en/*.json'],
  { import: 'default' },
);

/** Descarga y combina todas las secciones de un idioma. */
export const loadSections = async (code: string): Promise<LocaleSections> => {
  const entries = Object.entries(sectionLoaders).filter(([path]) => languageOf(path) === code);
  const loaded = await Promise.all(entries.map(async ([path, load]) => [path, await load()] as const));
  return mergeLocaleSections(Object.fromEntries(loaded));
};
