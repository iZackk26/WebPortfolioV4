import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../constants/navigation';

interface NavLinksProps {
  /** 'pill': fila dentro del navbar; 'sheet': lista vertical en móvil */
  layout: 'pill' | 'sheet';
  onNavigate?: () => void;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link nav-text ${isActive ? 'aqua-fill gloss' : ''}`;

export const NavLinks = ({ layout, onNavigate }: NavLinksProps) => {
  const { t } = useTranslation();

  if (layout === 'sheet') {
    return (
      <>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} className={linkClass} onClick={onNavigate}>
            {t(item.labelKey)}
          </NavLink>
        ))}
      </>
    );
  }

  return (
    <ul className="hidden md:flex items-center gap-0.5 ml-1">
      {NAV_ITEMS.map((item, index) => (
        <li key={item.path} className="nav-reveal" style={{ ['--i' as string]: index }}>
          <NavLink to={item.path} end={item.path === '/'} className={linkClass} onClick={onNavigate}>
            {t(item.labelKey)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
