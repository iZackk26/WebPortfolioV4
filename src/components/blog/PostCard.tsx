import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { BlogListItem, BlogLocale } from '../../types/blog';
import { blogPostPath } from '../../utils/blog/blogRoutes';
import { PostCover } from './PostCover';
import { PostMetaLine } from './PostMetaLine';

interface PostCardProps {
  post: BlogListItem;
  locale: BlogLocale;
}

/**
 * Tarjeta de post: un <article> con un solo enlace (el título, estirado a toda la tarjeta).
 * Si el post no está en el idioma de la página, avisa y su texto lleva el lang real.
 */
export const PostCard = ({ post, locale }: PostCardProps) => {
  const { t } = useTranslation();
  const lang = post.fallback ? post.locale : undefined;

  return (
    <article className="win blog-card">
      <PostCover src={post.cover} />
      <div className="blog-card-body">
        <PostMetaLine post={post} locale={locale} />
        {post.fallback && <span className="blog-fallback">{t('blog.fallbackNotice')}</span>}
        <h3 className="blog-card-title" lang={lang}>
          <Link to={blogPostPath(post.locale, post.slug)} hrefLang={lang} className="blog-stretched">
            {post.title}
          </Link>
        </h3>
        <p className="blog-card-text" lang={lang}>
          {post.description}
        </p>
      </div>
    </article>
  );
};
