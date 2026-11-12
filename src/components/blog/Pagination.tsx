import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { BlogLocale } from '../../types/blog';
import { blogIndexPath } from '../../utils/blog/blogRoutes';
import { pageWindow } from '../../utils/blog/paginate';

interface PaginationProps {
  locale: BlogLocale;
  page: number;
  totalPages: number;
}

const BTN = 'aero aero-btn';

/**
 * Paginación con enlaces reales (/blog/page/n): Google sigue los <a href> y no hace
 * scroll ni clic, así que cada página es una URL propia y rastreable.
 */
export const Pagination = ({ locale, page, totalPages }: PaginationProps) => {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const edge = (target: number, label: string, enabled: boolean) =>
    enabled ? (
      <Link to={blogIndexPath(locale, target)} className={`${BTN} aero--silver aero-btn--sm`}>
        {label}
      </Link>
    ) : (
      <span className={`${BTN} aero--silver aero-btn--sm`} aria-disabled="true">
        {label}
      </span>
    );

  return (
    <nav className="blog-pager" aria-label={t('blog.pagination.label')}>
      {edge(page - 1, t('blog.pagination.newer'), page > 1)}
      <ol>
        {pageWindow(page, totalPages).map((item, i) =>
          item === 'gap' ? (
            <li key={`gap-${i}`} className="blog-pager-gap" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item} data-current={item === page || undefined}>
              <Link
                to={blogIndexPath(locale, item)}
                aria-label={t('blog.pagination.page', { page: item })}
                aria-current={item === page ? 'page' : undefined}
                className={`${BTN} aero-btn--icon ${item === page ? '' : 'aero--silver'}`}
              >
                {item}
              </Link>
            </li>
          ),
        )}
      </ol>
      {edge(page + 1, t('blog.pagination.older'), page < totalPages)}
    </nav>
  );
};
