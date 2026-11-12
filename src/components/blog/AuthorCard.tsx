import { useTranslation } from 'react-i18next';
import { AUTHOR_AVATAR, AUTHOR_SHORT_NAME } from '../../constants/blog';
import { SOCIAL_LINKS } from '../../constants/navigation';
import { AeroButton } from '../ui/AeroButton';

/** Quién escribe, igual en todos los posts: refuerza la misma entidad (Person) en cada página */
export const AuthorCard = () => {
  const { t } = useTranslation();
  const profiles = SOCIAL_LINKS.filter((link) => link.label !== 'Instagram');

  return (
    <section aria-labelledby="blog-author" className="win blog-author mt-7">
      <img src={AUTHOR_AVATAR} alt="" width={72} height={72} loading="lazy" draggable={false} />
      <div className="min-w-0">
        <h2 id="blog-author" className="m-0 text-lg font-medium tracking-[-0.02em] text-black">
          {AUTHOR_SHORT_NAME}
        </h2>
        <p className="m-0 mt-1 max-w-[52ch] text-[14.5px] text-black/60">{t('about.bio')}</p>
        <div className="blog-author-links">
          {profiles.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="me noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <AeroButton to="/about" tone="silver" size="sm">
        {t('blog.post.more')}
      </AeroButton>
    </section>
  );
};
