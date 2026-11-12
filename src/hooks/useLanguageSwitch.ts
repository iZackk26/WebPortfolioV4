import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BLOG_LOCALES } from '../constants/blog';
import { changeAppLanguage, nextLanguage } from '../i18n/language';
import { blogLocaleFor } from '../utils/blog/blogRoutes';
import { equivalentBlogPath } from '../utils/blog/equivalentPath';
import { useBlogRoute } from './useBlogRoute';

/**
 * Siguiente idioma del botón y cómo pasar a él. En el blog solo alterna sus idiomas y
 * navega a la URL equivalente; en el resto del sitio recorre todos los idiomas.
 */
export const useLanguageSwitch = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const blogRoute = useBlogRoute();

  if (!blogRoute) {
    const next = nextLanguage(i18n.language);
    return { next, switchLanguage: () => void changeAppLanguage(next) };
  }

  const current = blogLocaleFor(i18n.language);
  const next = BLOG_LOCALES[(BLOG_LOCALES.indexOf(current) + 1) % BLOG_LOCALES.length];
  return {
    next,
    switchLanguage: () => {
      void changeAppLanguage(next);
      navigate(equivalentBlogPath(blogRoute, next));
    },
  };
};
