import { Suspense, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReadingProgress } from '../../hooks/useReadingProgress';
import { postBodyComponent } from '../../services/blogBodies';
import type { PostMeta } from '../../types/blog';
import { Window } from '../ui/Window';
import { KeyTakeaways } from './KeyTakeaways';
import { MDX_COMPONENTS } from './mdx/mdxComponents';

/** El artículo en una ventana de lectura: progreso en la barra, puntos clave y el MDX */
export const PostBody = ({ post }: { post: PostMeta }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress(ref);
  const Content = postBodyComponent(post.slug, post.locale);

  const title = (
    <>
      <b className="font-medium text-black/60">{post.slug}.mdx</b>
      <span aria-hidden="true">
        {' · '}
        <span className="blog-progress-label">{progress}%</span>
      </span>
    </>
  );

  return (
    <Window
      title={title}
      className="relative"
      barExtra={<span className="blog-progress" style={{ ['--progress' as string]: `${progress}%` }} aria-hidden="true" />}
    >
      <div ref={ref} className="blog-prose">
        <KeyTakeaways items={post.takeaways} />
        <Suspense fallback={<p className="text-black/60">{t('blog.post.loading')}</p>}>
          <Content components={MDX_COMPONENTS} />
        </Suspense>
      </div>
    </Window>
  );
};
