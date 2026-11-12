import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { BlogListItem, BlogLocale } from '../../types/blog';
import { blogPostPath } from '../../utils/blog/blogRoutes';
import { PostCover } from './PostCover';
import { PostMetaLine } from './PostMetaLine';

interface FeaturedPostProps {
  post: BlogListItem;
  locale: BlogLocale;
}

/** Destacado de la página 1: lo primero que se ve y lo que más se recuerda */
export const FeaturedPost = ({ post, locale }: FeaturedPostProps) => {
  const { t } = useTranslation();
  const lang = post.fallback ? post.locale : undefined;

  return (
    <article className="win blog-card blog-featured">
      <PostCover src={post.cover} priority />
      <div className="blog-featured-body">
        <PostMetaLine post={post} locale={locale} withKind />
        {post.fallback && <span className="blog-fallback">{t('blog.fallbackNotice')}</span>}
        <h3 className="blog-featured-title" lang={lang}>
          <Link to={blogPostPath(post.locale, post.slug)} hrefLang={lang} className="blog-stretched">
            {post.title}
          </Link>
        </h3>
        <p className="blog-featured-text" lang={lang}>
          {post.description}
        </p>
        {/* Pista visual; el enlace accesible es el título */}
        <span className="blog-more" aria-hidden="true">
          {t('blog.readMore')}
        </span>
      </div>
    </article>
  );
};
