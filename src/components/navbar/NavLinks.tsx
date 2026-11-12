import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../constants/navigation';

interface NavLinksProps {
  /** 'pill': fila dentro del navbar; 'sheet': lista vertical en móvil */
  layout: 'pill' | 'sheet';
  onNavigate?: () => void;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link nav-text ${isActive ? 'aero' : ''}`;

export const NavLinks = ({ layout, onNavigate }: NavLinksProps) => {
  const { t } = useTranslation();

  const links = NAV_ITEMS.map((item) => (
    <NavLink key={item.path} to={item.path} end={item.path === '/'} className={linkClass} onClick={onNavigate}>
      {t(item.labelKey)}
    </NavLink>
  ));

  if (layout === 'sheet') return <>{links}</>;

  return (
    <ul
      id="nav-links"
      className="nav-links nav-piece nav-reveal hidden md:flex items-center gap-0.5"
      style={{ ['--i' as string]: 0 }}
    >
      {links.map((link) => (
        <li key={link.key}>{link}</li>
      ))}
    </ul>
  );
};
