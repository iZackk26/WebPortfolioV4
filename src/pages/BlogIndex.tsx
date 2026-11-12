import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BlogCta } from '../components/blog/BlogCta';
import { BlogEmpty } from '../components/blog/BlogEmpty';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogSectionHead } from '../components/blog/BlogSectionHead';
import { FeaturedPost } from '../components/blog/FeaturedPost';
import { Pagination } from '../components/blog/Pagination';
import { PostCard } from '../components/blog/PostCard';
import { useBlogHead } from '../hooks/useBlogHead';
import { useBlogRoute } from '../hooks/useBlogRoute';
import { listPosts } from '../services/blogIndex';
import type { BlogRoute } from '../types/blog';
import { BLOG_PRIMARY_LOCALE } from '../constants/blog';
import { blogIndexPath } from '../utils/blog/blogRoutes';
import { paginate } from '../utils/blog/paginate';

type IndexRoute = Extract<BlogRoute, { kind: 'index' }>;

const BlogIndexView = ({ route }: { route: IndexRoute }) => {
  const { t } = useTranslation();
  useBlogHead(route);
  const { locale } = route;
  const posts = listPosts(locale);
  const current = paginate(posts, route.page);
  if (!current) return <Navigate to={blogIndexPath(locale)} replace />;

  return (
    <div className="blog mx-auto max-w-[1120px] px-4">
      <BlogHero locale={locale} latest={posts[0]} />

      {posts.length === 0 ? (
        <BlogEmpty />
      ) : (
        <>
          {current.featured && (
            <section aria-labelledby="blog-latest" className="mt-16">
              <BlogSectionHead id="blog-latest" kicker={t('blog.latestKicker')} title={t('blog.latestTitle')} />
              <FeaturedPost post={current.featured} locale={locale} />
            </section>
          )}

          {current.items.length > 0 && (
            <section aria-labelledby="blog-all" className="mt-16">
              <BlogSectionHead
                id="blog-all"
                kicker={t('blog.allKicker')}
                title={t('blog.allTitle')}
                aside={
                  <span className="font-mono text-[13px] text-black/60">
                    {t('blog.pageCount', { page: current.page, total: current.totalPages, count: current.totalPosts })}
                  </span>
                }
              />
              <div className="blog-grid">
                {current.items.map((post) => (
                  <PostCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>
              <Pagination locale={locale} page={current.page} totalPages={current.totalPages} />
            </section>
          )}
        </>
      )}

      <BlogCta
        variant="close"
        id="blog-close"
        kicker={t('blog.close.kicker')}
        title={t('blog.close.title')}
        text={t('blog.close.text')}
      />
    </div>
  );
};

/** /blog, /blog/page/n y sus versiones en otros idiomas */
export const BlogIndex = () => {
  const route = useBlogRoute();
  if (route?.kind !== 'index') return <Navigate to={blogIndexPath(BLOG_PRIMARY_LOCALE)} replace />;
  return <BlogIndexView route={route} />;
};
