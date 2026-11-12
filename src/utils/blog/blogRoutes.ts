import { BLOG_LOCALES, BLOG_PRIMARY_LOCALE, BLOG_SEGMENT } from '../../constants/blog';
import type { BlogLocale, BlogRoute } from '../../types/blog';

const isBlogLocale = (code: string | undefined): code is BlogLocale =>
  Boolean(code && (BLOG_LOCALES as readonly string[]).includes(code));

/** /blog para el idioma primario, /es/blog para los demás */
export const blogBase = (locale: BlogLocale) =>
  locale === BLOG_PRIMARY_LOCALE ? `/${BLOG_SEGMENT}` : `/${locale}/${BLOG_SEGMENT}`;

/** La página 1 es la base: /blog/page/1 no existe para no duplicar contenido */
export const blogIndexPath = (locale: BlogLocale, page = 1) =>
  page <= 1 ? blogBase(locale) : `${blogBase(locale)}/page/${page}`;

export const blogPostPath = (locale: BlogLocale, slug: string) => `${blogBase(locale)}/${slug}`;

export const blogFeedPath = (locale: BlogLocale) => `${blogBase(locale)}/feed.xml`;

/** Idioma del blog que corresponde a un idioma de la interfaz (ko → inglés) */
export const blogLocaleFor = (language: string): BlogLocale => (isBlogLocale(language) ? language : BLOG_PRIMARY_LOCALE);

const PAGE = /^[1-9]\d*$/;

/** Interpreta una URL del blog; null si no es del blog o no tiene forma válida */
export const parseBlogPath = (pathname: string): BlogRoute | null => {
  const parts = pathname.split('/').filter(Boolean);
  const locale = isBlogLocale(parts[0]) && parts[0] !== BLOG_PRIMARY_LOCALE ? parts.shift() : BLOG_PRIMARY_LOCALE;
  if (parts[0] !== BLOG_SEGMENT || !isBlogLocale(locale)) return null;

  const [, first, second] = parts;
  if (first === undefined) return { kind: 'index', locale, page: 1 };
  if (first === 'page' && second && PAGE.test(second) && parts.length === 3) return { kind: 'index', locale, page: Number(second) };
  if (parts.length === 2 && first !== 'page') return { kind: 'post', locale, slug: first };
  return null;
};

/** Idioma del blog según la URL; null fuera del blog */
export const blogLocaleFromPath = (pathname: string) => parseBlogPath(pathname)?.locale ?? null;
