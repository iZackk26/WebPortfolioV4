import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../../hooks/useActiveSection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import type { PostHeading } from '../../types/blog';
import { Window } from '../ui/Window';

const pad = (n: number) => String(n).padStart(2, '0');

/** Índice de los H2 con la sección que se está leyendo marcada */
export const PostToc = ({ headings }: { headings: PostHeading[] }) => {
  const { t } = useTranslation();
  const active = useActiveSection(headings.map((heading) => heading.id));
  const reduced = usePrefersReducedMotion();
  if (!headings.length) return null;

  // Desplaza suave y deja el ancla en la URL sin recargar
  const jump = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(history.state, '', `#${id}`);
  };

  return (
    <Window title={t('blog.post.onThisPage')}>
      <nav aria-label={t('blog.post.onThisPage')} className="blog-toc">
        {headings.map((heading, i) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            aria-current={active === heading.id ? 'location' : undefined}
            onClick={(event) => jump(event, heading.id)}
          >
            <span className="blog-toc-num">{pad(i + 1)}</span>
            {heading.text}
          </a>
        ))}
      </nav>
    </Window>
  );
};
