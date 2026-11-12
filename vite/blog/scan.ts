import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, posix } from 'node:path';
import { BLOG_LOCALES, BLOG_PRIMARY_LOCALE } from '../../src/constants/blog';
import type { BlogLocale, PostMeta } from '../../src/types/blog';
import { extractHeadings, readingStats } from './body';
import { parseFrontmatter, splitFrontmatter } from './frontmatter';

/** Carpeta del contenido, relativa a la raíz del proyecto */
export const CONTENT_DIR = 'content/blog';
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Post leído del disco: metadatos + la ruta de la portada para importarla */
export interface ScannedPost {
  meta: Omit<PostMeta, 'cover'>;
  /** Ruta de la portada desde la raíz (/content/blog/<slug>/cover.webp) */
  coverImport: string;
}

const readLocale = (root: string, slug: string, locale: BlogLocale): ScannedPost & { draft: boolean } => {
  const file = posix.join(CONTENT_DIR, slug, `${locale}.mdx`);
  const { raw, body } = splitFrontmatter(readFileSync(join(root, file), 'utf8'));
  const { cover, draft, ...rest } = parseFrontmatter(raw, file);
  const coverFile = posix.join(CONTENT_DIR, slug, cover.slice(2));
  if (!existsSync(join(root, coverFile))) throw new Error(`[blog] ${file}: no existe la portada ${coverFile}`);

  return {
    draft,
    coverImport: `/${coverFile}`,
    meta: { ...rest, slug, locale, headings: extractHeadings(body), ...readingStats(body) },
  };
};

/**
 * Lee content/blog/<slug>/<idioma>.mdx. El idioma primario es obligatorio; las
 * traducciones, opcionales. Los borradores solo se incluyen si `includeDrafts`.
 * Devuelve los posts ordenados del más reciente al más antiguo.
 */
export const scanPosts = (root: string, includeDrafts: boolean): ScannedPost[] => {
  const dir = join(root, CONTENT_DIR);
  if (!existsSync(dir)) return [];

  const posts: ScannedPost[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue;
    const slug = entry.name;
    if (!SLUG.test(slug)) throw new Error(`[blog] ${CONTENT_DIR}/${slug}: la carpeta debe ir en kebab-case`);
    if (!existsSync(join(dir, slug, `${BLOG_PRIMARY_LOCALE}.mdx`))) {
      throw new Error(`[blog] ${CONTENT_DIR}/${slug}: falta ${BLOG_PRIMARY_LOCALE}.mdx (idioma primario)`);
    }

    const primary = readLocale(root, slug, BLOG_PRIMARY_LOCALE);
    // El borrador se decide en el idioma primario: una traducción no publica sola
    if (primary.draft && !includeDrafts) continue;
    posts.push(primary);

    for (const locale of BLOG_LOCALES.filter((code) => code !== BLOG_PRIMARY_LOCALE)) {
      if (existsSync(join(dir, slug, `${locale}.mdx`))) posts.push(readLocale(root, slug, locale));
    }
  }
  return posts.sort((a, b) => Date.parse(b.meta.date) - Date.parse(a.meta.date));
};
