import { ComponentPropsWithoutRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BLOG_COPY_FEEDBACK_MS } from '../../../constants/blog';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';

/** Bloque de código que arma rehype-pretty-code, con botón de copiar */
const CodeBlock = ({ children, className = '', ...rest }: ComponentPropsWithoutRef<'figure'>) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { copied, copy } = useCopyToClipboard(BLOG_COPY_FEEDBACK_MS);
  const onCopy = () => void copy(ref.current?.querySelector('pre')?.innerText ?? '');

  return (
    <figure ref={ref} {...rest} className={`blog-code ${className}`}>
      {children}
      <button type="button" className="blog-code-copy" onClick={onCopy}>
        <span aria-live="polite">{copied ? t('blog.post.copied') : t('blog.post.copyCode')}</span>
      </button>
    </figure>
  );
};

/** <figure> del MDX: si es código resaltado lleva la barra; si no, se queda como figura normal */
export const CodeFigure = (props: ComponentPropsWithoutRef<'figure'> & { 'data-rehype-pretty-code-figure'?: string }) =>
  props['data-rehype-pretty-code-figure'] !== undefined ? <CodeBlock {...props} /> : <figure {...props} />;
