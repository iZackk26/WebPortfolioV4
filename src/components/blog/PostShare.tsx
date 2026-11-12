import { useTranslation } from 'react-i18next';
import { BLOG_COPY_FEEDBACK_MS, LINKEDIN_SHARE_URL } from '../../constants/blog';
import { SOCIAL_ICON_PATHS } from '../../constants/socialIcons';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { AeroButton } from '../ui/AeroButton';
import { Window } from '../ui/Window';

/** Copiar el enlace o abrir directo el diálogo de compartir de LinkedIn */
export const PostShare = ({ url }: { url: string }) => {
  const { t } = useTranslation();
  const { copied, copy } = useCopyToClipboard(BLOG_COPY_FEEDBACK_MS);

  return (
    <Window title={t('blog.post.share')} className="blog-share-window">
      <div className="blog-share">
        <AeroButton tone="silver" size="sm" onClick={() => void copy(url)}>
          <span aria-live="polite">{copied ? t('blog.post.copied') : t('blog.post.copyLink')}</span>
        </AeroButton>
        <AeroButton tone="silver" size="icon" href={`${LINKEDIN_SHARE_URL}${encodeURIComponent(url)}`} aria-label={t('blog.post.shareLinkedIn')}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={SOCIAL_ICON_PATHS.LinkedIn} />
          </svg>
        </AeroButton>
      </div>
    </Window>
  );
};
