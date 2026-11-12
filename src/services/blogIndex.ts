import posts from 'virtual:blog-index';
import { BLOG_PRIMARY_LOCALE, RELATED_POSTS } from '../constants/blog';
import type { BlogListItem, BlogLocale, PostMeta } from '../types/blog';

/**
 * Consultas sobre el índice del blog (solo metadatos). El índice ya viene ordenado del
 * más reciente al más antiguo y sin borradores en producción.
 */

const primaryPosts = posts.filter((post) => post.locale === BLOG_PRIMARY_LOCALE);

/** Hay al menos un post publicado: si no, el blog no aparece en la navegación */
export const hasBlogPosts = primaryPosts.length > 0;

/** Versión de un post en un idioma, si existe */
export const findPost = (slug: string, locale: BlogLocale): PostMeta | undefined =>
  posts.find((post) => post.slug === slug && post.locale === locale);

export const hasTranslation = (slug: string, locale: BlogLocale) => Boolean(findPost(slug, locale));

/** Idiomas en los que existe un post (para hreflang) */
export const postLocales = (slug: string): BlogLocale[] =>
  posts.filter((post) => post.slug === slug).map((post) => post.locale);

/**
 * Posts de un idioma. Los que no tienen traducción se listan con la versión primaria
 * y `fallback: true` (la tarjeta avisa y enlaza a la URL del idioma primario).
 */
export const listPosts = (locale: BlogLocale): BlogListItem[] =>
  primaryPosts.map((primary) => {
    const translated = findPost(primary.slug, locale);
    return translated ? { ...translated, fallback: false } : { ...primary, fallback: true };
  });

/** Fecha de la última publicación o actualización de un idioma */
export const lastUpdated = (locale: BlogLocale) =>
  listPosts(locale)
    .map((post) => post.updated ?? post.date)
    .sort((a, b) => Date.parse(b) - Date.parse(a))[0];

/** Temas más usados de un idioma, de mayor a menor */
export const topTags = (locale: BlogLocale, limit: number) => {
  const counts = new Map<string, number>();
  listPosts(locale).forEach((post) => post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([tag]) => tag);
};

/** Posts con más tags en común (a igualdad, el más reciente) */
export const relatedPosts = (post: PostMeta, locale: BlogLocale): BlogListItem[] =>
  listPosts(locale)
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({ other, shared: other.tags.filter((tag) => post.tags.includes(tag)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || Date.parse(b.other.date) - Date.parse(a.other.date))
    .slice(0, RELATED_POSTS)
    .map(({ other }) => other);
