import { useTranslation } from 'react-i18next';
import type { BlogLocale, PostMeta } from '../../types/blog';
import { formatPostDate } from '../../utils/blog/formatDate';

interface PostMetaLineProps {
  post: PostMeta;
  /** Idioma de la página (no del post): las fechas se leen en el idioma de la interfaz */
  locale: BlogLocale;
  withKind?: boolean;
}

/** "CASE STUDY · Nov 4, 2026 · 8 min read" */
export const PostMetaLine = ({ post, locale, withKind = false }: PostMetaLineProps) => {
  const { t } = useTranslation();

  return (
    <div className="blog-meta">
      {withKind && (
        <span className="method-badge" data-actor="me">
          {t(`blog.kind.${post.kind}`)}
        </span>
      )}
      <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
      <i className="blog-meta-dot" aria-hidden="true" />
      <span>{t('blog.minutes', { count: post.minutes })}</span>
    </div>
  );
};
