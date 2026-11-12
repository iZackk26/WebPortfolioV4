import { useCallback, useEffect, useState } from 'react';
import { CONSENT_OPEN_EVENT } from '../constants/consent';
import { ANALYTICS_EVENTS } from '../constants/analytics';
import { track } from '../utils/analytics';
import type { ConsentPreferences } from '../types/consent';
import { readConsent, saveConsent } from '../utils/consent';

const NONE: ConsentPreferences = { analytics: false, marketing: false };
const ALL: ConsentPreferences = { analytics: true, marketing: true };

/**
 * Estado del aviso de cookies: si hay que preguntar, si las preferencias están abiertas
 * y las acciones. Las preferencias se reabren desde cualquier parte con CONSENT_OPEN_EVENT.
 */
export const useConsent = () => {
  const [askNow, setAskNow] = useState(() => readConsent() === null);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentPreferences>(() => readConsent() ?? NONE);

  useEffect(() => {
    const open = () => {
      setDraft(readConsent() ?? NONE);
      setPrefsOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  const decide = useCallback((preferences: ConsentPreferences, choice: string) => {
    saveConsent(preferences);
    // Va después de actualizar Consent Mode: con permiso llega completo, sin él como ping sin cookies
    track(ANALYTICS_EVENTS.cookieChoice, { ui_location: 'cookie_consent', item_name: choice });
    setDraft(preferences);
    setAskNow(false);
    setPrefsOpen(false);
  }, []);

  return {
    askNow,
    prefsOpen,
    draft,
    setDraft,
    acceptAll: useCallback(() => decide(ALL, 'accept_all'), [decide]),
    rejectAll: useCallback(() => decide(NONE, 'reject_all'), [decide]),
    saveDraft: useCallback(() => decide(draft, draft.analytics ? 'custom_analytics_on' : 'custom_analytics_off'), [decide, draft]),
    openPrefs: useCallback(() => setPrefsOpen(true), []),
    closePrefs: useCallback(() => setPrefsOpen(false), []),
  };
};
