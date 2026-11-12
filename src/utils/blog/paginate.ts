import { BLOG_PAGE_SIZE } from '../../constants/blog';
import type { BlogListItem, BlogPage } from '../../types/blog';

/** El destacado: el marcado con `featured`, o el más reciente */
const pickFeatured = (posts: BlogListItem[]) => posts.find((post) => post.featured) ?? posts[0];

/** Cantidad de páginas: el destacado va aparte y la rejilla lleva BLOG_PAGE_SIZE por página */
export const totalPagesFor = (count: number) => Math.max(1, Math.ceil(Math.max(0, count - 1) / BLOG_PAGE_SIZE));

/**
 * Página n del índice. La 1 trae el destacado y los siguientes 9; las demás, 9 cada una.
 * Devuelve null si la página no existe.
 */
export const paginate = (posts: BlogListItem[], page: number): BlogPage | null => {
  const totalPages = totalPagesFor(posts.length);
  if (!Number.isInteger(page) || page < 1 || page > totalPages) return null;

  const featured = pickFeatured(posts);
  const rest = posts.filter((post) => post !== featured);
  const start = (page - 1) * BLOG_PAGE_SIZE;

  return {
    page,
    totalPages,
    totalPosts: posts.length,
    featured: page === 1 ? featured : undefined,
    items: rest.slice(start, start + BLOG_PAGE_SIZE),
  };
};

/** Números a mostrar en la paginación: 1 … actual±1 … última */
export const pageWindow = (page: number, totalPages: number): (number | 'gap')[] => {
  const shown = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((n) => n >= 1 && n <= totalPages)
    .sort((a, b) => a - b);
  return shown.flatMap((n, i) => (i > 0 && n - shown[i - 1] > 1 ? ['gap' as const, n] : [n]));
};
