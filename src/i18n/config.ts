import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, DEFAULT_SECTIONS, LANGUAGES } from './registry';
import { applyDocumentLanguage, ensureLanguage, initialLanguage } from './language';

/**
 * Arranca i18n con el idioma de respaldo ya en el bundle y, si el visitante usa otro,
 * baja solo ese antes del primer render. Si falla, queda el de respaldo.
 */
export const i18nReady = (async () => {
  await i18n.use(initReactI18next).init({
    resources: { [DEFAULT_LANGUAGE]: { translation: DEFAULT_SECTIONS } },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES,
    interpolation: { escapeValue: false },
  });
  i18n.on('languageChanged', applyDocumentLanguage);
  applyDocumentLanguage(DEFAULT_LANGUAGE);

  const language = initialLanguage();
  if (language === DEFAULT_LANGUAGE) return;
  try {
    await ensureLanguage(language);
    await i18n.changeLanguage(language);
  } catch {
    // Sin red para ese idioma: se muestra el de respaldo
  }
})();

export default i18n;
