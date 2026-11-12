import { KeyboardEvent, PointerEvent, FocusEvent, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCompactNav } from '../../hooks/useCompactNav';
import { useNavGeometry } from '../../hooks/useNavGeometry';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useOutsidePointer } from '../../hooks/useOutsidePointer';
import { DESKTOP_QUERY } from '../../constants/navbar';
import { AvatarButton } from './AvatarButton';
import { NavLinks } from './NavLinks';
import { LanguageToggle } from './LanguageToggle';
import { LiquidGlassFilter } from './LiquidGlassFilter';

/**
 * Navbar liquid glass: barra completa arriba; al hacer scroll, círculo con pulso que
 * se abre estilo Spotlight con hover (mouse), click/tap o foco por teclado.
 */
export const Navbar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const nav = useCompactNav();
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const dismissRefs = useMemo(() => [wrapRef, sheetRef], []);
  const { close } = nav;

  useEffect(() => close(), [pathname, close]);
  useNavGeometry(wrapRef, contentRef, nav.mode, desktop);
  useOutsidePointer(dismissRefs, nav.open, close);

  const onPointerEnter = (e: PointerEvent) => e.pointerType === 'mouse' && nav.engage();
  const onPointerLeave = (e: PointerEvent) => e.pointerType === 'mouse' && nav.release();
  // Solo el foco por teclado abre; en táctil el tap lo maneja el botón de la foto
  const onFocus = (e: FocusEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).matches(':focus-visible')) nav.engage();
  };
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) nav.release();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !nav.open) return;
    // Primero el foco (dispara engage) y después cerrar, para que gane el cierre
    avatarRef.current?.focus();
    close();
  };

  return (
    <>
      <LiquidGlassFilter />
      <div
        ref={wrapRef}
        className="nav-wrap"
        data-mode={nav.mode}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <span className="nav-pulse" aria-hidden="true" />
        <nav aria-label={t('nav.main')} className="nav-pill" data-mode={nav.mode} data-open={nav.open}>
          <div className="nav-shell glass-aqua" aria-hidden="true" />
          <div ref={contentRef} className="nav-content">
            <AvatarButton ref={avatarRef} open={nav.open} onClick={nav.toggle} />
            <span className="nav-name nav-text whitespace-nowrap text-[15px] font-medium md:hidden">
              {t('home.name')}
            </span>
            <NavLinks layout="pill" />
            <LanguageToggle revealIndex={1} />
          </div>
        </nav>
      </div>

      <div
        id="nav-sheet"
        ref={sheetRef}
        data-open={nav.open}
        className="nav-sheet glass-aqua md:hidden"
        onKeyDown={onKeyDown}
      >
        <NavLinks layout="sheet" onNavigate={close} />
      </div>

      <div className="h-24" aria-hidden="true" />
    </>
  );
};
