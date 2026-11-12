import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AUTHOR_AVATAR, AUTHOR_SHORT_NAME } from '../../constants/blog';
import type { PostMeta } from '../../types/blog';
import { formatPostDate } from '../../utils/blog/formatDate';

/** Autor, fechas y lectura en una sola línea bajo el título (E-E-A-T sin ficha extra) */
export const PostByline = ({ post }: { post: PostMeta }) => {
  const { t } = useTranslation();

  return (
    <dl className="blog-byline">
      <div className="blog-byline-author">
        <dt className="sr-only">{t('blog.post.author')}</dt>
        <dd>
          <img src={AUTHOR_AVATAR} alt="" width={44} height={44} draggable={false} />
          <span className="grid">
            <Link to="/about" rel="author" className="blog-byline-name">
              {AUTHOR_SHORT_NAME}
            </Link>
            <span className="blog-byline-role">{t('about.info.roleValue')}</span>
          </span>
        </dd>
      </div>
      <div>
        <dt>{t('blog.post.published')}</dt>
        <dd>
          <time dateTime={post.date}>{formatPostDate(post.date, post.locale)}</time>
        </dd>
      </div>
      {post.updated && (
        <div>
          <dt>{t('blog.post.updated')}</dt>
          <dd>
            <time dateTime={post.updated}>{formatPostDate(post.updated, post.locale)}</time>
          </dd>
        </div>
      )}
      <div>
        <dt>{t('blog.post.reading')}</dt>
        <dd>{t('blog.minutes', { count: post.minutes })}</dd>
      </div>
    </dl>
  );
};
