import { useMediaQuery } from './useMediaQuery';

const QUERY = '(prefers-reduced-motion: reduce)';

export const usePrefersReducedMotion = () => useMediaQuery(QUERY);
