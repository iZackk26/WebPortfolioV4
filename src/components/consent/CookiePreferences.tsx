import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import type { ConsentPreferences } from '../../types/consent';
import { AeroButton } from '../ui/AeroButton';
import { Window } from '../ui/Window';
import { ConsentSwitch } from './ConsentSwitch';

interface CookiePreferencesProps {
  draft: ConsentPreferences;
  onChange: (draft: ConsentPreferences) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onClose: () => void;
}

type Category = keyof ConsentPreferences;
const CATEGORIES: Category[] = ['analytics', 'marketing'];

/** Ventana cookies.txt · preferencias (variante A): diálogo modal con foco atrapado */
export const CookiePreferences = ({ draft, onChange, onSave, onAcceptAll, onClose }: CookiePreferencesProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  // Al cerrar, el foco vuelve a lo que abrió el diálogo
  const openerRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement | null);
  useFocusTrap(dialogRef, true, onClose, openerRef);

  return (
    <div className="consent-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-prefs-title"
        className="consent-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <Window title={t('consent.prefsWindow')}>
          <div className="consent-body consent-body--prefs">
            <h2 id="consent-prefs-title" className="sr-only">{t('consent.prefsTitle')}</h2>
            <div className="consent-pref">
              <h3>{t('consent.necessary.title')}</h3>
              <span className="consent-fixed">{t('consent.necessary.always')}</span>
              <p>{t('consent.necessary.text')}</p>
            </div>
            {CATEGORIES.map((category) => (
              <div key={category} className="consent-pref">
                <h3>{t(`consent.${category}.title`)}</h3>
                <ConsentSwitch
                  id={`consent-${category}`}
                  label={t(`consent.${category}.title`)}
                  checked={draft[category]}
                  onChange={(checked) => onChange({ ...draft, [category]: checked })}
                />
                <p>{t(`consent.${category}.text`)}</p>
              </div>
            ))}
            <div className="consent-actions">
              <AeroButton size="sm" onClick={onSave}>
                {t('consent.save')}
              </AeroButton>
              <AeroButton tone="silver" size="sm" onClick={onAcceptAll}>
                {t('consent.acceptAll')}
              </AeroButton>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
};
