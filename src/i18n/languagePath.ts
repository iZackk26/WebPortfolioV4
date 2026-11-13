import { parseBlogPath } from '../utils/blog/blogRoutes';
import { isSupportedLanguage } from './registry';

/** Link con idioma: /ko, /es/about… → el idioma y la ruta real sin el prefijo */
export interface LanguageLink {
  code: string;
  path: string;
}

/**
 * Detecta un link compartido con el idioma al inicio (/en, /es, /ko). El blog en español
 * (/es/blog…) no cuenta: ahí el prefijo es parte de la URL canónica.
 */
export const languageLinkFromPath = (pathname: string): LanguageLink | null => {
  if (parseBlogPath(pathname)) return null;
  const [, first, ...rest] = pathname.split('/');
  if (!isSupportedLanguage(first)) return null;
  return { code: first, path: `/${rest.join('/')}` };
};
