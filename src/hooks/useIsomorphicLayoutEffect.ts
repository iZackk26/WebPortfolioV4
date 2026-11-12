import { useEffect, useLayoutEffect } from 'react';

/** useLayoutEffect en el navegador; en el prerender, useEffect (que no corre y no avisa) */
export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
