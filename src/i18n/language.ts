import i18n from 'i18next';
import { LANGUAGE_STORAGE_KEY } from '../constants/navigation';
import { retryImport } from '../utils/retryImport';
import { blogLocaleFromPath } from '../utils/blog/blogRoutes';
import { DEFAULT_LANGUAGE, LANGUAGES, LOCALE_META, isSupportedLanguage, loadSections } from './registry';

/** Baja las traducciones del idioma si todavía no están cargadas. */
export const ensureLanguage = async (code: string) => {
  if (i18n.hasResourceBundle(code, 'translation')) return;
  const sections = await retryImport(() => loadSections(code));
  i18n.addResourceBundle(code, 'translation', sections, true, true);
};

/** <html lang> y reglas de texto del idioma (p. ej. no partir palabras en coreano). */
export const applyDocumentLanguage = (code: string) => {
  // En el prerender no hay documento: el <html lang> lo escribe el script de prerender
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.lang = code;
  root.style.wordBreak = LOCALE_META[code]?.wordBreak ?? '';
};

/** Carga y cambia el idioma sin recordarlo (lo usa el blog, cuyo idioma lo da la URL). */
export const showLanguage = async (code: string) => {
  if (!isSupportedLanguage(code) || i18n.language === code) return;
  await ensureLanguage(code);
  await i18n.changeLanguage(code);
};

/** Único punto para cambiar de idioma por elección del visitante: lo muestra y lo recuerda. */
export const changeAppLanguage = async (code: string) => {
  if (!isSupportedLanguage(code)) return;
  await showLanguage(code);
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    // Sin almacenamiento disponible: el idioma solo dura la sesión
  }
};

/** Siguiente idioma del ciclo del botón. */
export const nextLanguage = (current: string) => LANGUAGES[(LANGUAGES.indexOf(current) + 1) % LANGUAGES.length];

/** Idioma guardado; si no hay, el primero del navegador que el sitio soporte. */
export const preferredLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isSupportedLanguage(stored)) return stored;
  } catch {
    // Sin almacenamiento: se decide por el navegador
  }
  const fromBrowser = navigator.languages.map((tag) => tag.split('-')[0]).find(isSupportedLanguage);
  return fromBrowser ?? DEFAULT_LANGUAGE;
};

/** Idioma de arranque: en el blog manda la URL (/es/blog…); en el resto, la preferencia. */
export const initialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  return blogLocaleFromPath(window.location.pathname) ?? preferredLanguage();
};
