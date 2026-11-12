import { useTranslation } from 'react-i18next';
import { LOCALE_META } from '../../i18n/registry';
import { useLanguageSwitch } from '../../hooks/useLanguageSwitch';
import { ANALYTICS_EVENTS } from '../../constants/analytics';
import { track } from '../../utils/analytics';

interface LanguageToggleProps {
  revealIndex: number;
}

/** Botón de idioma: cada toque pasa al siguiente idioma disponible y muestra cuál viene (en el blog, su URL equivalente). */
export const LanguageToggle = ({ revealIndex }: LanguageToggleProps) => {
  const { t } = useTranslation();
  const { next, switchLanguage } = useLanguageSwitch();
  const meta = LOCALE_META[next];

  return (
    <button
      type="button"
      onClick={() => {
        track(ANALYTICS_EVENTS.languageChange, { ui_location: 'navbar', item_name: next });
        switchLanguage();
      }}
      aria-label={`${t('nav.switch_language')}: ${meta.label}`}
      lang={next}
      className="nav-lang nav-piece nav-reveal silver-fill shrink-0 rounded-full px-3 py-1.5 text-[12.5px] font-medium font-mono active:scale-[0.97]"
      style={{ ['--i' as string]: revealIndex }}
    >
      {meta.short}
    </button>
  );
};
