import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * false en el prerender y durante la hidratación, true después. Sirve para lo que
 * depende del navegador (localStorage, consentimiento) y no debe ir en el HTML estático.
 */
export const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
