import { useTranslation } from 'react-i18next';
import { CONSENT_MOBILE_QUERY } from '../../constants/consent';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AeroButton } from '../ui/AeroButton';
import { Window } from '../ui/Window';

interface CookieNoticeProps {
  onAccept: () => void;
  onReject: () => void;
  onConfigure: () => void;
}

/**
 * Aviso inicial. Escritorio: cápsula de vidrio abajo al centro (variante B).
 * Móvil: ventana cookies.txt a todo el ancho (variante A). Aceptar y rechazar pesan igual.
 */
export const CookieNotice = ({ onAccept, onReject, onConfigure }: CookieNoticeProps) => {
  const { t } = useTranslation();
  const mobile = useMediaQuery(CONSENT_MOBILE_QUERY);

  const configure = (
    <button type="button" className="consent-link" onClick={onConfigure}>
      {t('consent.configure')}
    </button>
  );
  const reject = (
    <AeroButton tone="silver" size="sm" onClick={onReject}>
      {t('consent.reject')}
    </AeroButton>
  );
  const accept = (
    <AeroButton size="sm" onClick={onAccept}>
      {t('consent.accept')}
    </AeroButton>
  );

  if (mobile) {
    return (
      <section className="consent-sheet" aria-label={t('consent.label')}>
        <Window title={t('consent.window')}>
          <div className="consent-body">
            <p>{t('consent.message')}</p>
            <div className="consent-actions consent-actions--fill">
              {accept}
              {reject}
            </div>
            <div className="consent-actions">{configure}</div>
          </div>
        </Window>
      </section>
    );
  }

  return (
    <section className="consent-pill" aria-label={t('consent.label')}>
      <p>{t('consent.messageShort')}</p>
      <div className="consent-actions">
        {configure}
        {reject}
        {accept}
      </div>
    </section>
  );
};
