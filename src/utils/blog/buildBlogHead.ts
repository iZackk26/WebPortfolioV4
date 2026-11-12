import type { TFunction } from 'i18next';
import { BLOG_LOCALES, BLOG_PRIMARY_LOCALE, OG_LOCALE, SITE_URL } from '../../constants/blog';
import { findPost, listPosts, postLocales } from '../../services/blogIndex';
import type { BlogLocale, BlogRoute, HeadAlternate, HeadData } from '../../types/blog';
import { blogFeedPath, blogIndexPath, blogPostPath } from './blogRoutes';
import { blogListSchema, blogPostSchema } from './blogSchema';
import { paginate } from './paginate';

const DEFAULT_IMAGE = `${SITE_URL}/og/izackk-v5.jpg`;
const DEFAULT_IMAGE_ALT = 'Isaac Ramírez, software developer: desk with photo, sticky note and stack icons';
const INDEXABLE = 'index, follow, max-image-preview:large, max-snippet:-1';
const NOT_INDEXABLE = 'noindex, follow';

const absolute = (path: string) => `${SITE_URL}${path}`;

/** hreflang recíproco de cada versión + x-default al idioma primario */
const alternatesFor = (locales: BlogLocale[], pathFor: (locale: BlogLocale) => string): HeadAlternate[] => {
  const links = locales.map((locale) => ({ hrefLang: locale, href: absolute(pathFor(locale)) }));
  const primary = links.find((link) => link.hrefLang === BLOG_PRIMARY_LOCALE);
  return primary ? [...links, { hrefLang: 'x-default', href: primary.href }] : links;
};

const indexHead = (route: Extract<BlogRoute, { kind: 'index' }>, t: TFunction): HeadData | null => {
  const { locale, page } = route;
  const posts = listPosts(locale);
  const current = paginate(posts, page);
  if (!current) return null;

  const title = page === 1 ? t('blog.seo.title') : t('blog.seo.pageTitle', { page });
  const description = t('blog.seo.description');
  const canonical = absolute(blogIndexPath(locale, page));
  const shown = current.featured ? [current.featured, ...current.items] : current.items;

  return {
    lang: locale,
    title,
    description,
    canonical,
    robots: posts.length ? INDEXABLE : NOT_INDEXABLE,
    ogType: 'website',
    ogLocale: OG_LOCALE[locale],
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    alternates: alternatesFor([...BLOG_LOCALES], (code) => blogIndexPath(code, page)),
    feed: { title: t('blog.seo.feedTitle'), href: absolute(blogFeedPath(locale)) },
    jsonLd: blogListSchema({ locale, url: canonical, name: title, description, posts: shown }),
  };
};

const postHead = (route: Extract<BlogRoute, { kind: 'post' }>, t: TFunction): HeadData | null => {
  const post = findPost(route.slug, route.locale);
  if (!post) return null;
  const canonical = absolute(blogPostPath(post.locale, post.slug));

  return {
    lang: post.locale,
    title: t('blog.seo.postTitle', { title: post.title }),
    description: post.description,
    canonical,
    robots: INDEXABLE,
    ogType: 'article',
    ogLocale: OG_LOCALE[post.locale],
    image: absolute(post.cover),
    imageAlt: post.coverAlt,
    alternates: alternatesFor(postLocales(post.slug), (code) => blogPostPath(code, post.slug)),
    feed: { title: t('blog.seo.feedTitle'), href: absolute(blogFeedPath(post.locale)) },
    jsonLd: blogPostSchema({ post, url: canonical, homeLabel: t('blog.post.home') }),
    article: { published: post.date, modified: post.updated ?? post.date, tags: post.tags },
  };
};

/**
 * <head> completo de una página del blog, con el `t` ya fijado al idioma de la ruta.
 * Es la única fuente: el prerender lo escribe en el HTML y el cliente lo aplica al navegar.
 * Devuelve null si la ruta no existe (página fuera de rango o post inexistente).
 */
export const buildBlogHead = (route: BlogRoute, t: TFunction): HeadData | null =>
  route.kind === 'index' ? indexHead(route, t) : postHead(route, t);
