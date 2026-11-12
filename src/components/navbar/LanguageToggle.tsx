import { useTranslation } from 'react-i18next';
import { LOCALE_META } from '../../i18n/registry';
import { changeAppLanguage, nextLanguage } from '../../i18n/language';

interface LanguageToggleProps {
  revealIndex: number;
}

/** Botón de idioma: cada toque pasa al siguiente idioma disponible y muestra cuál viene. */
export const LanguageToggle = ({ revealIndex }: LanguageToggleProps) => {
  const { t, i18n } = useTranslation();
  const next = nextLanguage(i18n.language);
  const meta = LOCALE_META[next];

  return (
    <button
      type="button"
      onClick={() => void changeAppLanguage(next)}
      aria-label={`${t('nav.switch_language')}: ${meta.label}`}
      lang={next}
      className="nav-lang nav-piece nav-reveal silver-fill shrink-0 rounded-full px-3 py-1.5 text-[12.5px] font-medium font-mono active:scale-[0.97]"
      style={{ ['--i' as string]: revealIndex }}
    >
      {meta.short}
    </button>
  );
};
