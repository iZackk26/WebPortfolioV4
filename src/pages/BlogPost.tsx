import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthorCard } from '../components/blog/AuthorCard';
import { BlogCta } from '../components/blog/BlogCta';
import { Breadcrumbs } from '../components/blog/Breadcrumbs';
import { PostBody } from '../components/blog/PostBody';
import { PostHero } from '../components/blog/PostHero';
import { PostShare } from '../components/blog/PostShare';
import { PostToc } from '../components/blog/PostToc';
import { RelatedPosts } from '../components/blog/RelatedPosts';
import { BLOG_PRIMARY_LOCALE, SITE_URL } from '../constants/blog';
import { useBlogHead } from '../hooks/useBlogHead';
import { useBlogRoute } from '../hooks/useBlogRoute';
import { findPost } from '../services/blogIndex';
import type { BlogRoute, PostMeta } from '../types/blog';
import { blogIndexPath, blogPostPath } from '../utils/blog/blogRoutes';

type PostRoute = Extract<BlogRoute, { kind: 'post' }>;

const BlogPostView = ({ route, post }: { route: PostRoute; post: PostMeta }) => {
  const { t } = useTranslation();
  useBlogHead(route);
  const url = `${SITE_URL}${blogPostPath(post.locale, post.slug)}`;

  return (
    <div className="blog mx-auto max-w-[1120px] px-4">
      <article lang={post.locale}>
        <Breadcrumbs locale={post.locale} current={post.title} />
        <PostHero post={post} />

        <figure className="win blog-post-cover m-0 mt-11">
          <img src={post.cover} alt={post.coverAlt} width={1200} height={630} draggable={false} />
        </figure>

        <div className="blog-read mt-8">
          <aside className="blog-aside">
            <PostToc headings={post.headings} />
            <PostShare url={url} />
          </aside>
          <PostBody post={post} />
        </div>

        <AuthorCard />
        <BlogCta
          variant="card"
          id="blog-post-cta"
          kicker={t('blog.close.kicker')}
          title={t('blog.post.ctaTitle')}
          text={t('blog.post.ctaText')}
        />
      </article>
      <RelatedPosts post={post} locale={route.locale} />
    </div>
  );
};

/** /blog/<slug> y /es/blog/<slug>; si no existe en ese idioma, vuelve al índice */
export const BlogPost = () => {
  const route = useBlogRoute();
  if (route?.kind !== 'post') return <Navigate to={blogIndexPath(BLOG_PRIMARY_LOCALE)} replace />;
  const post = findPost(route.slug, route.locale);
  if (!post) return <Navigate to={blogIndexPath(route.locale)} replace />;
  return <BlogPostView route={route} post={post} />;
};
