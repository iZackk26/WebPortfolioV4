import { useTranslation } from 'react-i18next';
import { relatedPosts } from '../../services/blogIndex';
import type { BlogLocale, PostMeta } from '../../types/blog';
import { BlogSectionHead } from './BlogSectionHead';
import { PostCard } from './PostCard';

/** Posts con temas en común: enlazado interno al terminar de leer */
export const RelatedPosts = ({ post, locale }: { post: PostMeta; locale: BlogLocale }) => {
  const { t } = useTranslation();
  const related = relatedPosts(post, locale);
  if (!related.length) return null;

  return (
    <section aria-labelledby="blog-related" className="mt-16">
      <BlogSectionHead id="blog-related" kicker={t('blog.post.relatedKicker')} title={t('blog.post.relatedTitle')} />
      <div className="blog-grid">
        {related.map((item) => (
          <PostCard key={item.slug} post={item} locale={locale} />
        ))}
      </div>
    </section>
  );
};
