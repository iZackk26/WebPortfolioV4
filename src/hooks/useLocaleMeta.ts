import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, LOCALE_META } from '../i18n/registry';

/** Datos del idioma actual (CV, og:locale…); se actualiza al cambiar de idioma. */
export const useLocaleMeta = () => {
  const { i18n } = useTranslation();
  return LOCALE_META[i18n.language] ?? LOCALE_META[DEFAULT_LANGUAGE];
};
