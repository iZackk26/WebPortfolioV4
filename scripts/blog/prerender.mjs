#!/usr/bin/env node
/**
 * Prerender del blog. Corre después de `vite build` (cliente) y `vite build --ssr`:
 * por cada ruta del blog escribe dist/<ruta>/index.html con el <head> y el contenido ya
 * en el HTML (Google y los crawlers de IA lo leen sin ejecutar JS), más el RSS de cada
 * idioma y las URLs del blog en dist/sitemap.xml. Vercel sirve estos archivos antes que
 * el rewrite del SPA.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const DIST = join(ROOT, 'dist');
const SSR_DIR = join(ROOT, 'dist-ssr');
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
const APP_BLOCK = /<div id="root">\s*<!-- app:start -->[\s\S]*?<!-- app:end -->\s*<\/div>/;

const write = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};

/** Mete el <head> y el HTML de la página en la plantilla que generó Vite */
const fillTemplate = (template, { lang, head, html }) => {
  if (!SEO_BLOCK.test(template) || !APP_BLOCK.test(template)) {
    throw new Error('[prerender] dist/index.html no tiene los marcadores seo:start/end y app:start/end');
  }
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(SEO_BLOCK, head)
    .replace(APP_BLOCK, `<div id="root" data-prerendered>${html}</div>`);
};

const addToSitemap = (entries) => {
  if (!entries.length) return;
  const file = join(DIST, 'sitemap.xml');
  const sitemap = readFileSync(file, 'utf8')
    .replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">')
    .replace('</urlset>', `${entries.join('\n')}\n</urlset>`);
  writeFileSync(file, sitemap);
};

const main = async () => {
  const server = await import(pathToFileURL(join(SSR_DIR, 'entry-server.js')).href);
  const template = readFileSync(join(DIST, 'index.html'), 'utf8');
  const routes = server.blogRoutes();

  for (const route of routes) {
    const page = await server.render(route);
    write(join(DIST, route, 'index.html'), fillTemplate(template, page));
  }
  for (const feed of await server.feeds()) write(join(DIST, feed.path), feed.xml);
  addToSitemap(server.sitemapEntries());

  // El bundle del servidor solo sirve para el prerender: no se publica
  rmSync(SSR_DIR, { recursive: true, force: true });
  console.log(`Blog prerenderizado: ${routes.length} páginas`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
