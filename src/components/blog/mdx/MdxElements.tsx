import type { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/** H2 con ancla visible al pasar el mouse (el id lo pone rehype-slug) */
export const Heading2 = ({ id, children, ...rest }: ComponentPropsWithoutRef<'h2'>) => {
  const { t } = useTranslation();
  return (
    <h2 id={id} {...rest}>
      {children}
      {id && (
        <a href={`#${id}`} className="blog-anchor" aria-label={t('blog.post.anchor')}>
          #
        </a>
      )}
    </h2>
  );
};

/** Links internos con el router; los externos en pestaña nueva */
export const Anchor = ({ href = '', children, ...rest }: ComponentPropsWithoutRef<'a'>) => {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...rest} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
};

export const Table = (props: ComponentPropsWithoutRef<'table'>) => (
  <div className="blog-table">
    <table {...props} />
  </div>
);

export const Image = ({ alt = '', ...rest }: ComponentPropsWithoutRef<'img'>) => <img alt={alt} loading="lazy" decoding="async" {...rest} />;
