import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { preferredLanguage, showLanguage } from '../i18n/language';
import { blogLocaleFromPath } from '../utils/blog/blogRoutes';

/**
 * En el blog el idioma lo da la URL (/blog en inglés, /es/blog en español), sin pisar la
 * preferencia guardada. Al salir del blog vuelve el idioma que el visitante eligió.
 */
export const useRouteLanguage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    void showLanguage(blogLocaleFromPath(pathname) ?? preferredLanguage()).catch(() => {
      // Sin red para ese idioma: se queda el que ya se muestra
    });
  }, [pathname]);
};
