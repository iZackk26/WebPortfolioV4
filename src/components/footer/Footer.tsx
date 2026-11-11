import { useTranslation } from 'react-i18next';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { FooterColumns } from './FooterColumns';
import { FooterDecor } from './FooterDecor';
import { Wordmark } from './Wordmark';

/** Footer V5: columnas tranquilas + wordmark "zackk" en teclas que entran en ola. */
export const Footer = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative mx-auto mt-16 max-w-[1200px] overflow-hidden px-4 pb-5 pt-16 md:px-[6%]">
      <FooterDecor playing={inView} />
      <FooterColumns />
      <div className="mt-11 lg:mx-[6%]">
        <Wordmark playing={inView} />
      </div>
      <p className="mt-7 text-center text-xs text-black/45">
        © {year} {t('home.name')} · {t('footer.rights')}
      </p>
    </footer>
  );
};
