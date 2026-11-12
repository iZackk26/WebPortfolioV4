import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_EMAIL } from '../../constants/contact';
import { useChat } from '../../hooks/useChat';
import { AeroButton } from '../ui/AeroButton';

interface BlogCtaProps {
  /** 'close': cierre centrado del índice · 'card': ventana al final del post */
  variant: 'close' | 'card';
  id: string;
  kicker: string;
  title: string;
  text: string;
}

/**
 * Invitación a escribir o a preguntarle a Max. Va después de entregar el contenido,
 * nunca a mitad de la lectura.
 */
export const BlogCta = ({ variant, id, kicker, title, text }: BlogCtaProps) => {
  const { t } = useTranslation();
  const { toggle } = useChat();
  const askMax = (event: MouseEvent<HTMLButtonElement>) => toggle(event.currentTarget, 'right');

  const actions = (
    <div className={`flex flex-wrap gap-3 ${variant === 'close' ? 'justify-center' : ''}`}>
      <AeroButton href={`mailto:${CONTACT_EMAIL}`}>{t('blog.close.contact')}</AeroButton>
      <button type="button" className="aero aero-btn aero--silver aero-btn--md" onClick={askMax}>
        {t('blog.close.max')}
      </button>
    </div>
  );

  if (variant === 'card') {
    return (
      <section aria-labelledby={id} className="win blog-cta-card mt-7">
        <div>
          <span className="carousel-kicker">{kicker}</span>
          <h2 id={id} className="m-0 mt-0.5 text-balance text-[clamp(22px,2.8vw,30px)] font-medium leading-[1.1] tracking-[-0.045em] text-black">
            {title}
          </h2>
          <p className="m-0 mt-2 max-w-[52ch] text-black/60">{text}</p>
        </div>
        {actions}
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className="mt-24 grid justify-items-center gap-3 text-center">
      <span className="carousel-kicker">{kicker}</span>
      <h2 id={id} className="m-0 text-balance text-[clamp(28px,4vw,44px)] font-medium leading-[1.02] tracking-[-0.05em] text-black">
        {title}
      </h2>
      <p className="m-0 max-w-[50ch] text-[16.5px] text-black/60">{text}</p>
      <div className="mt-3">{actions}</div>
    </section>
  );
};
