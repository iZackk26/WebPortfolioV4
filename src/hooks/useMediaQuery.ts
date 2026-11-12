import { useCallback, useSyncExternalStore } from 'react';

/** En el prerender no hay pantalla: ninguna media query coincide */
const serverSnapshot = () => false;

/**
 * true mientras la media query coincide. Con useSyncExternalStore la hidratación usa el
 * valor del servidor (false) y después React lo actualiza sin desajustes.
 */
export const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (notify: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', notify);
      return () => media.removeEventListener('change', notify);
    },
    [query],
  );
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
};
