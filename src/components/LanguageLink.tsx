import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { rememberLanguage } from '../i18n/language';
import { languageLinkFromPath } from '../i18n/languagePath';

/**
 * Ruta de los links con idioma (/ko, /es/about…): guarda ese idioma como preferencia y
 * reemplaza la URL por la real, sin el prefijo, para no duplicar páginas.
 */
export function LanguageLink() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const link = languageLinkFromPath(pathname);
    if (!link) return;
    rememberLanguage(link.code);
    navigate(`${link.path}${search}${hash}`, { replace: true });
  }, [pathname, search, hash, navigate]);

  return null;
}
