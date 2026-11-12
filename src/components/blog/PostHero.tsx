import { useTranslation } from 'react-i18next';
import type { PostMeta } from '../../types/blog';
import { tagLabel } from '../../utils/blog/formatDate';
import { PostByline } from './PostByline';

/** Encabezado del post: H1 = title y lede = description del frontmatter (lo mismo que el snippet) */
export const PostHero = ({ post }: { post: PostMeta }) => {
  const { t } = useTranslation();

  return (
    <header className="hero-in max-w-[860px] pt-6">
      <span className="carousel-kicker">
        {t(`blog.kind.${post.kind}`)}
        {post.tags[0] && ` · ${tagLabel(post.tags[0])}`}
      </span>
      <h1 className="m-0 mt-1.5 text-balance text-[clamp(36px,5.6vw,60px)] font-medium leading-none tracking-[-0.05em] text-black">
        {post.title}
      </h1>
      <p className="m-0 mt-5 max-w-[52ch] text-lg text-black/80">{post.description}</p>
      <PostByline post={post} />
      <ul className="blog-topics" aria-label={t('blog.post.topics')}>
        {post.tags.map((tag) => (
          <li key={tag} className="method-badge" data-actor="me">
            {tagLabel(tag)}
          </li>
        ))}
      </ul>
    </header>
  );
};
