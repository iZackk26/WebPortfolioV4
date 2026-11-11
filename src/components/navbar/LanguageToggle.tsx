import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY } from '../../constants/navigation';

interface LanguageToggleProps {
  revealIndex: number;
}

export const LanguageToggle = ({ revealIndex }: LanguageToggleProps) => {
  const { t, i18n } = useTranslation();
  const next = i18n.language === 'en' ? 'es' : 'en';

  const toggle = () => {
    i18n.changeLanguage(next);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento disponible: el idioma solo dura la sesión
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('nav.switch_language')}
      className="nav-reveal silver-fill ml-auto shrink-0 rounded-full px-3 py-1.5 text-[12.5px] font-medium font-mono transition-transform active:scale-[0.97]"
      style={{ ['--i' as string]: revealIndex }}
    >
      {next.toUpperCase()}
    </button>
  );
};
