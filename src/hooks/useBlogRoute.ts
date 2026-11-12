import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { parseBlogPath } from '../utils/blog/blogRoutes';

/** Ruta del blog de la URL actual (estable mientras no cambie el path) */
export const useBlogRoute = () => {
  const { pathname } = useLocation();
  return useMemo(() => parseBlogPath(pathname), [pathname]);
};
