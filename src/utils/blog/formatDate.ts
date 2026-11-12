import { BLOG_TIME_ZONE, DATE_LOCALE } from '../../constants/blog';
import type { BlogLocale } from '../../types/blog';

const formatters = new Map<BlogLocale, Intl.DateTimeFormat>();

/**
 * "Nov 4, 2026" / "4 nov 2026". La zona horaria es fija para que el HTML del prerender
 * y el del navegador coincidan (si no, la hidratación no cuadra).
 */
export const formatPostDate = (iso: string, locale: BlogLocale) => {
  let formatter = formatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(DATE_LOCALE[locale], { dateStyle: 'medium', timeZone: BLOG_TIME_ZONE });
    formatters.set(locale, formatter);
  }
  return formatter.format(new Date(iso));
};

/** Etiqueta legible de un tag en kebab-case: "ai-agents" → "ai agents" */
export const tagLabel = (tag: string) => tag.replace(/-/g, ' ');
