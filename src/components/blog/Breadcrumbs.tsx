import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { BlogLocale } from '../../types/blog';
import { blogIndexPath } from '../../utils/blog/blogRoutes';

interface BreadcrumbsProps {
  locale: BlogLocale;
  current: string;
}

/** Inicio / Blog / post (lo mismo va en JSON-LD como BreadcrumbList) */
export const Breadcrumbs = ({ locale, current }: BreadcrumbsProps) => {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('blog.post.breadcrumb')} className="blog-crumbs pt-10">
      <ol>
        <li>
          <Link to="/">{t('blog.post.home')}</Link>
        </li>
        <li>
          <Link to={blogIndexPath(locale)}>Blog</Link>
        </li>
        <li>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
};
