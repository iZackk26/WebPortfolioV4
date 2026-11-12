import { PassThrough } from 'node:stream';
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { BLOG_LOCALES, BLOG_PRIMARY_LOCALE } from './constants/blog';
import i18n, { i18nReady } from './i18n/config';
import { ensureLanguage } from './i18n/language';
import { listPosts, postLocales } from './services/blogIndex';
import type { BlogLocale } from './types/blog';
import { blogFeedPath, blogIndexPath, blogPostPath, parseBlogPath } from './utils/blog/blogRoutes';
import { feedXml, sitemapEntries } from './utils/blog/blogXml';
import { buildBlogHead } from './utils/blog/buildBlogHead';
import { renderHeadTags } from './utils/blog/headElements';
import { totalPagesFor } from './utils/blog/paginate';

/**
 * Entrada del prerender (vite build --ssr). scripts/blog/prerender.mjs la importa ya
 * compilada y escribe un HTML estático por cada ruta del blog.
 */

/** Todas las rutas del blog: índice paginado por idioma y cada post en sus idiomas */
export const blogRoutes = () => {
  const pages = totalPagesFor(listPosts(BLOG_PRIMARY_LOCALE).length);
  const indexes = BLOG_LOCALES.flatMap((locale) => Array.from({ length: pages }, (_, i) => blogIndexPath(locale, i + 1)));
  const posts = listPosts(BLOG_PRIMARY_LOCALE).flatMap((post) =>
    postLocales(post.slug).map((locale) => blogPostPath(locale, post.slug)),
  );
  return [...indexes, ...posts];
};

/** Espera a que React resuelva todo (páginas lazy y el MDX del post) y devuelve el HTML */
const renderApp = (url: string) =>
  new Promise<string>((resolve, reject) => {
    const sink = new PassThrough();
    let html = '';
    sink.on('data', (chunk: Buffer) => (html += chunk.toString()));
    sink.on('end', () => resolve(html));
    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      { onAllReady: () => stream.pipe(sink), onShellError: reject, onError: reject },
    );
  });

/** HTML del #root, etiquetas del <head> e idioma de una ruta del blog */
export const render = async (url: string) => {
  const route = parseBlogPath(url);
  if (!route) throw new Error(`[prerender] ${url} no es una ruta del blog`);
  await i18nReady;
  await ensureLanguage(route.locale);
  await i18n.changeLanguage(route.locale);

  const head = buildBlogHead(route, i18n.getFixedT(route.locale));
  if (!head) throw new Error(`[prerender] ${url} no existe`);
  return { lang: route.locale, head: renderHeadTags(head), html: await renderApp(url) };
};

/** RSS de cada idioma */
export const feeds = async () => {
  await i18nReady;
  return Promise.all(
    BLOG_LOCALES.map(async (locale: BlogLocale) => {
      await ensureLanguage(locale);
      const t = i18n.getFixedT(locale);
      return { path: blogFeedPath(locale), xml: feedXml(locale, { title: t('blog.seo.feedTitle'), description: t('blog.seo.description') }) };
    }),
  );
};

export { sitemapEntries };
