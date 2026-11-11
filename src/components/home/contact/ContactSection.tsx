import { useTranslation } from 'react-i18next';
import { ContactForm } from './ContactForm';
import { ContactLinks } from './ContactLinks';
import { ContactPhoto } from './ContactPhoto';

/** Cierre de contacto de la Home, entre el dock de proyectos y el footer. */
export const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="contact-title"
      className="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-4 pb-4 pt-24 text-center md:pt-28"
    >
      <h2 id="contact-title" className="m-0 text-balance text-[clamp(36px,6vw,60px)] font-medium leading-none tracking-[-0.05em] text-black">
        {t('contact.title')}
      </h2>
      <p className="m-0 max-w-[46ch] text-balance text-lg text-black/60">{t('contact.lede')}</p>
      <div className="mt-2 grid w-[min(940px,100%)] grid-cols-1 items-center justify-items-center gap-7 lg:grid-cols-[300px_minmax(0,600px)] lg:gap-10">
        <ContactPhoto />
        <ContactForm />
      </div>
      <ContactLinks />
    </section>
  );
};
