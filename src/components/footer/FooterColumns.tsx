import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CONSENT_OPEN_EVENT } from '../../constants/consent';
import { CV_LINKS, SOCIAL_LINKS } from '../../constants/navigation';
import { useNavItems } from '../../hooks/useNavItems';

const linkClass = 'w-fit text-black/60 transition hover:text-black active:scale-[0.97]';

const Column = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="flex min-w-0 flex-col gap-2.5">
    <p className="m-0 font-normal text-black">{title}</p>
    {children}
  </div>
);

export const FooterColumns = () => {
  const { t } = useTranslation();
  const navItems = useNavItems();

  return (
    <nav aria-label={t('footer.label')} className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
      <Column title={t('footer.navigation')}>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={linkClass}>
            {t(item.labelKey)}
          </Link>
        ))}
      </Column>

      <Column title={t('footer.resources')}>
        <a href={CV_LINKS.es} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t('footer.cvEs')}
        </a>
        <a href={CV_LINKS.en} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t('footer.cvEn')}
        </a>
        <Link to="/privacy" className={linkClass}>
          {t('footer.privacy')}
        </Link>
        <Link to="/terms" className={linkClass}>
          {t('footer.terms')}
        </Link>
        <button type="button" className={`${linkClass} text-left`} onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
          {t('consent.footerLink')}
        </button>
      </Column>

      <Column title={t('footer.connect')}>
        {SOCIAL_LINKS.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {social.label}
          </a>
        ))}
      </Column>

      <Column title={t('home.name')}>
        <p className="m-0 text-black/60">{t('home.role')}</p>
      </Column>
    </nav>
  );
};
