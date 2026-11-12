import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, type NavItem } from '../constants/navigation';
import { hasBlogPosts } from '../services/blogIndex';
import { blogIndexPath, blogLocaleFor } from '../utils/blog/blogRoutes';

/**
 * Links de navegación listos para pintar: el del blog apunta a la versión del idioma
 * actual (/es/blog en español) y no aparece mientras no haya posts publicados.
 */
export const useNavItems = (): NavItem[] => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return useMemo(
    () =>
      NAV_ITEMS.filter((item) => !item.blog || hasBlogPosts).map((item) =>
        item.blog ? { ...item, path: blogIndexPath(blogLocaleFor(language)) } : item,
      ),
    [language],
  );
};
