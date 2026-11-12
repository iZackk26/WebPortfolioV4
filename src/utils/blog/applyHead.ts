import type { HeadData } from '../../types/blog';
import { BLOG_HEAD_ATTR, headElements } from './headElements';

/**
 * Etiquetas de otras páginas que chocan con las del blog (las de index.html y SEO.tsx).
 * Se quitan al entrar; SEO.tsx las vuelve a crear en la siguiente página.
 */
const CONFLICTS = [
  'link[rel="canonical"]',
  'link[rel="alternate"]',
  'script[type="application/ld+json"]',
  'meta[name="description"]',
  'meta[name="robots"]',
  'meta[name^="twitter:"]',
  'meta[property^="og:"]',
  'meta[property^="article:"]',
].join(',');

/** Quita las etiquetas que puso el blog (al salir de una página del blog) */
export const clearBlogHead = () => {
  document.head.querySelectorAll(`[${BLOG_HEAD_ATTR}]`).forEach((node) => node.remove());
};

/** Aplica en el navegador el mismo <head> que escribe el prerender */
export const applyBlogHead = (head: HeadData) => {
  document.head.querySelectorAll(CONFLICTS).forEach((node) => node.remove());
  clearBlogHead();
  document.title = head.title;

  const fragment = document.createDocumentFragment();
  for (const { tag, attrs, text } of headElements(head)) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    node.setAttribute(BLOG_HEAD_ATTR, '');
    if (text !== undefined) node.textContent = text;
    fragment.append(node);
  }
  document.head.append(fragment);
};
