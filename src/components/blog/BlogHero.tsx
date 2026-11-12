import { useTranslation } from 'react-i18next';
import { CONTACT_EMAIL } from '../../constants/contact';
import type { BlogListItem, BlogLocale } from '../../types/blog';
import { blogPostPath } from '../../utils/blog/blogRoutes';
import { AeroButton } from '../ui/AeroButton';
import { BlogInfoCard } from './BlogInfoCard';

interface BlogHeroProps {
  locale: BlogLocale;
  /** Post para el botón "Empezar por el más reciente" */
  latest?: BlogListItem;
}

/** Hero del índice con la composición del About: texto a la izquierda y ficha a la derecha */
export const BlogHero = ({ locale, latest }: BlogHeroProps) => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="blog-title" className="grid grid-cols-1 items-center gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12 lg:pt-16">
      <div className="hero-in">
        <span className="carousel-kicker">{t('blog.kicker')}</span>
        <h1 id="blog-title" className="m-0 mt-1 text-balance text-[clamp(44px,7vw,76px)] font-medium leading-[0.95] tracking-[-0.055em] text-black">
          {t('blog.title')}
        </h1>
        <p className="m-0 mt-5 max-w-[46ch] text-lg text-black">{t('blog.lede')}</p>
        <p className="m-0 mt-2.5 max-w-[46ch] text-[16.5px] text-black/60">{t('blog.sub')}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {latest && <AeroButton to={blogPostPath(latest.locale, latest.slug)}>{t('blog.ctaLatest')}</AeroButton>}
          <AeroButton tone="silver" href={`mailto:${CONTACT_EMAIL}`}>
            {t('blog.ctaContact')}
          </AeroButton>
        </div>
      </div>
      <BlogInfoCard locale={locale} />
    </section>
  );
};
