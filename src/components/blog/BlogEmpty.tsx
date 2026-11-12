import { useTranslation } from 'react-i18next';
import { AeroButton } from '../ui/AeroButton';
import { Window } from '../ui/Window';

/** Estado vacío: todavía no hay posts publicados (la página va con noindex) */
export const BlogEmpty = () => {
  const { t } = useTranslation();

  return (
    <Window title="drafts/" className="mx-auto mt-16 max-w-[560px]">
      <div className="grid justify-items-center gap-3 p-[36px_28px] text-center">
        <span aria-hidden="true" className="legal-file-icon">.mdx</span>
        <h2 className="m-0 mt-2 text-balance text-[26px] font-medium leading-[1.15] tracking-[-0.035em] text-black">{t('blog.empty.title')}</h2>
        <p className="m-0 max-w-[44ch] text-[15.5px] text-black/60">{t('blog.empty.text')}</p>
        <div className="mt-3">
          <AeroButton to="/" tone="silver">
            {t('nav.home')}
          </AeroButton>
        </div>
      </div>
    </Window>
  );
};
