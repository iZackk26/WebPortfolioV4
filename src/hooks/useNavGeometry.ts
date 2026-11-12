import { RefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { NAV_GEOMETRY } from '../constants/navbar';
import type { NavMode } from './useCompactNav';

/**
 * Ancho animado del pill.
 * El contenido se maqueta al ancho final de la barra ('bar') para que el vidrio lo
 * descubra o lo tape sin desplazarlo. Solo el compacto abierto en escritorio usa el
 * ancho de su contenido ('row'), y vuelve a 'bar' cuando termina de encogerse.
 */
export const useNavGeometry = (
  wrapRef: RefObject<HTMLDivElement>,
  contentRef: RefObject<HTMLDivElement>,
  mode: NavMode,
  desktop: boolean,
) => {
  const prevMode = useRef(mode);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    const pill = content?.parentElement;
    if (!wrap || !content || !pill) return;

    const setFullWidth = () => {
      const gutter = desktop ? NAV_GEOMETRY.gutterDesktopPx : NAV_GEOMETRY.gutterMobilePx;
      const full = document.documentElement.clientWidth - gutter * 2 - NAV_GEOMETRY.pillPaddingPx;
      content.style.setProperty('--nav-full', `${full}px`);
    };
    setFullWidth();

    // Barra → círculo: el vidrio de la barra se encoge entero y recorta el contenido
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prevMode.current === 'top' && mode === 'closed' && !reduced) pill.dataset.shrinking = 'true';
    else delete pill.dataset.shrinking;
    // Círculo → barra: sin refracción SVG hasta que termine de crecer
    if (prevMode.current !== 'top' && mode === 'top' && !reduced) pill.dataset.growing = 'true';
    else if (mode !== 'top') delete pill.dataset.growing;

    if (mode === 'open' && desktop) {
      content.dataset.layout = 'row';
      wrap.style.width = `${content.offsetWidth}px`;
    } else {
      if (mode === 'top' || !desktop) content.dataset.layout = 'bar';
      wrap.style.width = mode === 'top' ? '' : `${NAV_GEOMETRY.compactWidthPx}px`;
    }

    prevMode.current = mode;
    window.addEventListener('resize', setFullWidth);
    return () => window.removeEventListener('resize', setFullWidth);
  }, [wrapRef, contentRef, mode, desktop]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    if (!wrap || !content) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.target === wrap && e.propertyName === 'width' && wrap.dataset.mode !== 'open') {
        content.dataset.layout = 'bar';
        delete content.parentElement?.dataset.shrinking;
        delete content.parentElement?.dataset.growing;
      }
    };
    wrap.addEventListener('transitionend', onEnd);
    return () => wrap.removeEventListener('transitionend', onEnd);
  }, [wrapRef, contentRef]);
};
