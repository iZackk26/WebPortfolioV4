import { AUTHOR_NAME, BLOG_LOCALES, BLOG_PRIMARY_LOCALE, SITE_URL } from '../../constants/blog';
import { listPosts, postLocales } from '../../services/blogIndex';
import type { BlogLocale } from '../../types/blog';
import { blogFeedPath, blogIndexPath, blogPostPath } from './blogRoutes';
import { totalPagesFor } from './paginate';

const xml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const absolute = (path: string) => `${SITE_URL}${path}`;
const day = (iso: string) => new Date(iso).toISOString().slice(0, 10);

interface FeedText {
  title: string;
  description: string;
}

/** RSS 2.0 de un idioma: solo los posts escritos en ese idioma (sin los de respaldo) */
export const feedXml = (locale: BlogLocale, text: FeedText) => {
  const posts = listPosts(locale).filter((post) => !post.fallback);
  const items = posts.map((post) => {
    const url = absolute(blogPostPath(post.locale, post.slug));
    return [
      '    <item>',
      `      <title>${xml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${xml(post.description)}</description>`,
      `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      `      <dc:creator>${xml(AUTHOR_NAME)}</dc:creator>`,
      ...post.tags.map((tag) => `      <category>${xml(tag)}</category>`),
      '    </item>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${xml(text.title)}</title>`,
    `    <link>${absolute(blogIndexPath(locale))}</link>`,
    `    <description>${xml(text.description)}</description>`,
    `    <language>${locale}</language>`,
    `    <atom:link href="${absolute(blogFeedPath(locale))}" rel="self" type="application/rss+xml"/>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
};

const urlEntry = (loc: string, lastmod: string | undefined, alternates: { lang: string; href: string }[]) =>
  [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...(lastmod ? [`    <lastmod>${day(lastmod)}</lastmod>`] : []),
    ...alternates.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}"/>`),
    '  </url>',
  ].join('\n');

const withDefault = (links: { lang: string; href: string }[]) => {
  const primary = links.find((link) => link.lang === BLOG_PRIMARY_LOCALE);
  return primary ? [...links, { lang: 'x-default', href: primary.href }] : links;
};

/** Entradas <url> del blog para sitemap.xml, con sus alternativas por idioma */
export const sitemapEntries = () => {
  const entries: string[] = [];
  const primary = listPosts(BLOG_PRIMARY_LOCALE);
  if (!primary.length) return entries;

  const pages = totalPagesFor(primary.length);
  for (let page = 1; page <= pages; page++) {
    const links = withDefault(BLOG_LOCALES.map((lang) => ({ lang, href: absolute(blogIndexPath(lang, page)) })));
    links.filter((link) => link.lang !== 'x-default').forEach((link) => entries.push(urlEntry(link.href, page === 1 ? primary[0].date : undefined, links)));
  }

  for (const post of primary) {
    const links = withDefault(postLocales(post.slug).map((lang) => ({ lang, href: absolute(blogPostPath(lang, post.slug)) })));
    for (const locale of postLocales(post.slug)) {
      const version = listPosts(locale).find((item) => item.slug === post.slug);
      entries.push(urlEntry(absolute(blogPostPath(locale, post.slug)), version?.updated ?? version?.date, links));
    }
  }
  return entries;
};
