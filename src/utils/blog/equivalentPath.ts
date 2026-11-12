import { hasTranslation } from '../../services/blogIndex';
import type { BlogLocale, BlogRoute } from '../../types/blog';
import { blogIndexPath, blogPostPath } from './blogRoutes';

/**
 * La misma página del blog en otro idioma. Un post sin esa traducción lleva al índice
 * del idioma elegido, donde aparece con el aviso de que está en el idioma primario.
 */
export const equivalentBlogPath = (route: BlogRoute, locale: BlogLocale) => {
  if (route.kind === 'index') return blogIndexPath(locale, route.page);
  return hasTranslation(route.slug, locale) ? blogPostPath(locale, route.slug) : blogIndexPath(locale);
};
