import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY } from '../constants/navigation';
import { mergeLocaleSections } from './mergeLocaleSections';

const DEFAULT_LANGUAGE = 'en';

// Each JSON file is one top-level section; its file name becomes the key (es/about.json -> about.*).
const englishSections = import.meta.glob<Record<string, unknown>>('./locales/en/*.json', {
  eager: true,
  import: 'default',
});
const spanishSections = import.meta.glob<Record<string, unknown>>('./locales/es/*.json', {
  eager: true,
  import: 'default',
});

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: mergeLocaleSections(englishSections) },
      es: { translation: mergeLocaleSections(spanishSections) },
    },
    lng: localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
