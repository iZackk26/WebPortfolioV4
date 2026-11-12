import { AUTHOR_NAME } from '../../constants/blog';
import type { HeadData } from '../../types/blog';

/** Marca de las etiquetas que pone el blog: el cliente las reemplaza o las quita al salir */
export const BLOG_HEAD_ATTR = 'data-blog-head';

export interface HeadElement {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  text?: string;
}

const meta = (key: string, content: string): HeadElement => ({
  tag: 'meta',
  attrs: key.startsWith('og:') || key.startsWith('article:') ? { property: key, content } : { name: key, content },
});

/** Lista de etiquetas del <head> (sin el <title>), en el orden en que se escriben */
export const headElements = (head: HeadData): HeadElement[] => [
  meta('description', head.description),
  meta('author', AUTHOR_NAME),
  meta('robots', head.robots),
  { tag: 'link', attrs: { rel: 'canonical', href: head.canonical } },
  ...head.alternates.map((alt): HeadElement => ({ tag: 'link', attrs: { rel: 'alternate', hreflang: alt.hrefLang, href: alt.href } })),
  { tag: 'link', attrs: { rel: 'alternate', type: 'application/rss+xml', title: head.feed.title, href: head.feed.href } },
  meta('og:type', head.ogType),
  meta('og:site_name', 'Isaac Ramírez Rojas - izackk'),
  meta('og:locale', head.ogLocale),
  meta('og:title', head.title),
  meta('og:description', head.description),
  meta('og:url', head.canonical),
  meta('og:image', head.image),
  meta('og:image:alt', head.imageAlt),
  ...(head.article
    ? [
        meta('article:published_time', head.article.published),
        meta('article:modified_time', head.article.modified),
        ...head.article.tags.map((tag) => meta('article:tag', tag)),
      ]
    : []),
  meta('twitter:card', 'summary_large_image'),
  meta('twitter:creator', '@izackk_r'),
  meta('twitter:title', head.title),
  meta('twitter:description', head.description),
  meta('twitter:image', head.image),
  { tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(head.jsonLd) },
];

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** JSON dentro de <script>: sin "</" para que no cierre la etiqueta */
const escapeScript = (value: string) => value.replace(/</g, '\\u003c');

/** HTML del <head> para el prerender */
export const renderHeadTags = (head: HeadData) => {
  const title = `<title ${BLOG_HEAD_ATTR}>${escapeAttr(head.title)}</title>`;
  const tags = headElements(head).map(({ tag, attrs, text }) => {
    const attributes = Object.entries(attrs).map(([key, value]) => `${key}="${escapeAttr(value)}"`).join(' ');
    return tag === 'script'
      ? `<script ${attributes} ${BLOG_HEAD_ATTR}>${escapeScript(text ?? '')}</script>`
      : `<${tag} ${attributes} ${BLOG_HEAD_ATTR}>`;
  });
  return [title, ...tags].join('\n    ');
};
