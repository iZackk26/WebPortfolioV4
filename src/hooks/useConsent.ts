import { useCallback, useEffect, useState } from 'react';
import { CONSENT_OPEN_EVENT } from '../constants/consent';
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

  const decide = useCallback((preferences: ConsentPreferences) => {
    saveConsent(preferences);
    setDraft(preferences);
    setAskNow(false);
    setPrefsOpen(false);
  }, []);

  return {
    askNow,
    prefsOpen,
    draft,
    setDraft,
    acceptAll: useCallback(() => decide(ALL), [decide]),
    rejectAll: useCallback(() => decide(NONE), [decide]),
    saveDraft: useCallback(() => decide(draft), [decide, draft]),
    openPrefs: useCallback(() => setPrefsOpen(true), []),
    closePrefs: useCallback(() => setPrefsOpen(false), []),
  };
};
