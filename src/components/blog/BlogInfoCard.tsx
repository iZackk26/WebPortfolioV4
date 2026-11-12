import { useTranslation } from 'react-i18next';
import { BLOG_LOCALES } from '../../constants/blog';
import { LOCALE_META } from '../../i18n/registry';
import { lastUpdated, listPosts, topTags } from '../../services/blogIndex';
import type { BlogLocale } from '../../types/blog';
import { blogFeedPath } from '../../utils/blog/blogRoutes';
import { formatPostDate, tagLabel } from '../../utils/blog/formatDate';
import { Window } from '../ui/Window';

const TOP_TAGS = 3;
const DT = 'text-right font-mono text-[12.5px] leading-[1.7] text-black/60';

/** Ficha "Obtener información" del blog: cuántos posts, cuándo se actualizó, idiomas y feed */
export const BlogInfoCard = ({ locale }: { locale: BlogLocale }) => {
  const { t } = useTranslation();
  const count = listPosts(locale).length;
  const updated = lastUpdated(locale);
  const tags = topTags(locale, TOP_TAGS);

  return (
    <div className="w-full max-w-[380px] rotate-[1.5deg] justify-self-center">
      <Window title={t('blog.info.window')}>
        <div className="flex items-center gap-3.5 border-b border-black/10 p-[16px_18px]">
          <span aria-hidden="true" className="legal-file-icon">/blog</span>
          <div>
            <p className="m-0 text-[17px] font-medium text-black">{t('blog.info.name')}</p>
            <p className="m-0 font-mono text-xs text-black/60">izackk · blog</p>
          </div>
        </div>
        <dl className="m-0 grid grid-cols-[96px_minmax(0,1fr)] gap-x-3 gap-y-2 p-[10px_18px_16px] text-left text-sm">
          <dt className={DT}>{t('blog.info.posts')}</dt>
          <dd className="m-0 text-black">{t('blog.info.postsValue', { count })}</dd>
          {updated && (
            <>
              <dt className={DT}>{t('blog.info.updated')}</dt>
              <dd className="m-0 text-black">
                <time dateTime={updated}>{formatPostDate(updated, locale)}</time>
              </dd>
            </>
          )}
          <dt className={DT}>{t('blog.info.languages')}</dt>
          <dd className="m-0 text-black">{BLOG_LOCALES.map((code) => LOCALE_META[code]?.label ?? code).join(' · ')}</dd>
          <dt className={DT}>{t('blog.info.feed')}</dt>
          <dd className="m-0">
            <a href={blogFeedPath(locale)} className="blog-more text-sm" type="application/rss+xml">
              RSS · feed.xml
            </a>
          </dd>
          {tags.length > 0 && (
            <>
              <dt className={DT}>{t('blog.info.topics')}</dt>
              <dd className="m-0 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="method-badge" data-actor="me">
                    {tagLabel(tag)}
                  </span>
                ))}
              </dd>
            </>
          )}
        </dl>
      </Window>
    </div>
  );
};
