import { FormEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BOOKING_URL, CONTACT_EMAIL, MESSAGE_MAX_LENGTH } from '../../../constants/contact';
import { buildMailto } from '../../../utils/mailto';
import { ANALYTICS_EVENTS } from '../../../constants/analytics';
import { track } from '../../../utils/analytics';
import { Window } from '../../ui/Window';
import { AeroButton } from '../../ui/AeroButton';

/** Ventana de "mensaje nuevo" en blanco; al enviar abre el correo del visitante con todo cargado. */
export const ContactForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);
  // "Abrió el formulario" = primer foco en cualquier campo; se cuenta una vez por visita a la página
  const started = useRef(false);
  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    track(ANALYTICS_EVENTS.contactFormStart, { ui_location: 'home_contact' });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError(t('contact.emptyError'));
      messageRef.current?.focus();
      return;
    }
    const finalSubject =
      subject.trim() || (name.trim() ? t('contact.subjectFrom', { name: name.trim() }) : t('contact.defaultSubject'));
    track(ANALYTICS_EVENTS.contactSend, { ui_location: 'home_contact' });
    window.location.href = buildMailto(CONTACT_EMAIL, finalSubject, message);
  };

  return (
    <form onSubmit={onSubmit} onFocus={onFirstFocus} noValidate className="w-[min(600px,100%)] text-left">
      <Window title={t('contact.window')}>
        <div className="contact-field">
          <label>{t('contact.to')}</label>
          <span className="contact-to">{CONTACT_EMAIL}</span>
        </div>
        <div className="contact-field">
          <label htmlFor="contact-name">{t('contact.from')}</label>
          <input id="contact-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('contact.namePlaceholder')} />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-subject">{t('contact.subject')}</label>
          <input id="contact-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t('contact.subjectPlaceholder')} />
        </div>
        <textarea
          id="contact-message"
          ref={messageRef}
          className="contact-message"
          value={message}
          maxLength={MESSAGE_MAX_LENGTH}
          aria-label={t('contact.messageLabel')}
          aria-invalid={Boolean(error)}
          aria-describedby="contact-error"
          placeholder={t('contact.messagePlaceholder')}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError('');
          }}
        />
        <div className="contact-actions">
          <p id="contact-error" role="alert" className="m-0 min-h-[1.3em] text-[13px] text-[#c42b1c]">
            {error}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {BOOKING_URL && (
              <AeroButton href={BOOKING_URL} tone="silver" size="sm">
                {t('contact.bookCall')} ↗
              </AeroButton>
            )}
            <AeroButton type="submit" size="sm">
              {t('contact.send')}
            </AeroButton>
          </div>
        </div>
      </Window>
    </form>
  );
};
