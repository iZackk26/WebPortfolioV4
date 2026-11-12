import mdx from '@mdx-js/rollup';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import type { Plugin } from 'vite';

/**
 * MDX de los posts: el frontmatter se quita del cuerpo (lo lee el índice), los encabezados
 * reciben id estable (rehype-slug) y el código se resalta en el build con Shiki, sin JS
 * en el navegador. Va en fase 'pre', antes del plugin de React.
 */
export const blogMdxPlugin = (): Plugin => ({
  enforce: 'pre',
  ...mdx({
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-light', keepBackground: false, defaultLang: 'plaintext' }],
    ],
  }),
});
