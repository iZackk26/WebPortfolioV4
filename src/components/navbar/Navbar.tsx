import { KeyboardEvent, PointerEvent, FocusEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCompactNav } from '../../hooks/useCompactNav';
import { NAV_ITEMS } from '../../constants/navigation';
import { AvatarButton } from './AvatarButton';
import { NavLinks } from './NavLinks';
import { LanguageToggle } from './LanguageToggle';
import { LiquidGlassFilter } from './LiquidGlassFilter';

/** Navbar pill liquid glass: completo arriba, compacto (foto + ≡) al hacer scroll. */
export const Navbar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const nav = useCompactNav();
  const { close } = nav;

  useEffect(() => close(), [pathname, close]);

  const onPointerEnter = (e: PointerEvent) => e.pointerType === 'mouse' && nav.engage();
  const onPointerLeave = (e: PointerEvent) => e.pointerType === 'mouse' && nav.release();
  // Solo el foco por teclado expande; en táctil el tap lo maneja el botón de la foto
  const onFocus = (e: FocusEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).matches(':focus-visible')) nav.engage();
  };
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) nav.release();
  };
  const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && nav.close();

  return (
    <>
      <LiquidGlassFilter />
      <nav
        aria-label={t('nav.main')}
        data-state={nav.expanded ? 'expanded' : 'compact'}
        className="nav-pill glass-aqua gloss"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <AvatarButton expanded={nav.expanded} menuOpen={nav.sheetOpen} onClick={nav.toggleFromAvatar} />
        <span className="nav-reveal nav-text whitespace-nowrap text-[15px] font-medium md:hidden">
          {t('home.name')}
        </span>
        <NavLinks layout="pill" />
        <LanguageToggle revealIndex={NAV_ITEMS.length} />
      </nav>

      <div
        id="nav-sheet"
        data-open={nav.sheetOpen}
        className="nav-sheet glass-aqua md:hidden"
        onKeyDown={onKeyDown}
      >
        <NavLinks layout="sheet" onNavigate={nav.close} />
      </div>

      <div className="h-24" aria-hidden="true" />
    </>
  );
};
