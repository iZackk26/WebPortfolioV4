import { useConsent } from '../../hooks/useConsent';
import { CookieNotice } from './CookieNotice';
import { CookiePreferences } from './CookiePreferences';

/** Raíz del consentimiento: aviso mientras no haya decisión y preferencias bajo demanda */
export const CookieConsent = () => {
  const consent = useConsent();

  return (
    <>
      {consent.askNow && !consent.prefsOpen && (
        <CookieNotice onAccept={consent.acceptAll} onReject={consent.rejectAll} onConfigure={consent.openPrefs} />
      )}
      {consent.prefsOpen && (
        <CookiePreferences
          draft={consent.draft}
          onChange={consent.setDraft}
          onSave={consent.saveDraft}
          onAcceptAll={consent.acceptAll}
          onClose={consent.closePrefs}
        />
      )}
    </>
  );
};
