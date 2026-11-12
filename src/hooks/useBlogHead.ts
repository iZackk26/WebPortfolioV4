import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { BlogRoute } from '../types/blog';
import { applyBlogHead, clearBlogHead } from '../utils/blog/applyHead';
import { buildBlogHead } from '../utils/blog/buildBlogHead';

/** Aplica el <head> de la ruta del blog y lo quita al salir de ella (`route` debe ser estable) */
export const useBlogHead = (route: BlogRoute) => {
  const { i18n } = useTranslation();
  const head = useMemo(() => buildBlogHead(route, i18n.getFixedT(route.locale)), [route, i18n]);

  useEffect(() => {
    if (!head) return;
    applyBlogHead(head);
    return clearBlogHead;
  }, [head]);

  return head;
};
