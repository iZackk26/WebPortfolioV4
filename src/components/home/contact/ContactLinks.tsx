import { useTranslation } from 'react-i18next';
import { ANALYTICS_EVENTS } from '../../../constants/analytics';
import { track } from '../../../utils/analytics';
import { CONTACT_EMAIL, COPY_FEEDBACK_MS } from '../../../constants/contact';
import { SOCIAL_LINKS } from '../../../constants/navigation';
import { SOCIAL_ICON_PATHS } from '../../../constants/socialIcons';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { useToast } from '../../../hooks/useToast';

const DIRECT_LINKS = SOCIAL_LINKS.filter((link) => link.label in SOCIAL_ICON_PATHS);

/** Alternativas directas: copiar el correo y los íconos de LinkedIn y GitHub. */
export const ContactLinks = () => {
  const { t } = useTranslation();
  const { copy } = useCopyToClipboard(COPY_FEEDBACK_MS);
  const { show } = useToast();

  const copyEmail = async () => {
    const ok = await copy(CONTACT_EMAIL);
    if (ok) track(ANALYTICS_EVENTS.contactCopyEmail, { ui_location: 'home_contact' });
    show({ key: ok ? 'toast.copied' : 'toast.copyFailed', tone: ok ? 'success' : 'error', values: { email: CONTACT_EMAIL } });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[12.5px] text-black/40">
      <span>{t('contact.or')}</span>
      <button type="button" className="contact-chip" onClick={copyEmail}>
        {t('contact.copy')}
      </button>
      {DIRECT_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className="contact-chip contact-icon"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={SOCIAL_ICON_PATHS[link.label]} />
          </svg>
        </a>
      ))}
    </div>
  );
};
