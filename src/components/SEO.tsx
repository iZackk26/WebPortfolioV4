import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocaleMeta } from '../hooks/useLocaleMeta';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: Record<string, unknown>;
}

export const SEO = ({
  title = 'Isaac Ramírez Rojas | Computer Engineering Student & Software Developer',
  description = 'Isaac Ramírez Rojas (izackk) - Computer Engineering student specializing in automation, digital transformation, and innovative software solutions. Expert in Full-Stack Development, AI/ML, and Cloud Computing. Advanced English (B2/C1).',
  keywords = 'Isaac Ramírez Rojas, Isaac Ramírez, izackk, izackk.com, software developer, computer engineering, full-stack developer, react, typescript, ai ml, cloud computing, automation, digital transformation, portfolio, Costa Rica developer',
  ogImage = '/og-image.jpg',
  type = 'website',
  structuredData
}: SEOProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const { ogLocale } = useLocaleMeta();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const metaTags = {
      description,
      keywords,
      author: 'Isaac Ramírez Rojas',
      'og:title': title,
      'og:description': description,
      'og:image': `${window.location.origin}${ogImage}`,
      'og:url': canonicalUrl,
      'og:type': type,
      'og:site_name': 'Isaac Ramírez Rojas - izackk',
      'og:locale': ogLocale,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': `${window.location.origin}${ogImage}`,
      'twitter:creator': '@izackk_r',
      'twitter:site': '@izackk_r',
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'googlebot': 'index, follow',
      'language': i18n.language,
      'revisit-after': '7 days',
      'rating': 'general',
      'distribution': 'global'
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    });

    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;

    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Isaac Ramírez Rojas',
      alternateName: ['Isaac Ramírez', 'izackk', 'Isaac Ramirez Rojas', 'Isaac Ramirez'],
      givenName: 'Isaac',
      familyName: 'Ramírez Rojas',
      additionalName: 'izackk',
      jobTitle: 'Computer Engineering Student & Software Developer',
      url: window.location.origin,
      knowsLanguage: [
        {
          '@type': 'Language',
          name: 'Spanish',
          alternateName: 'es'
        },
        {
          '@type': 'Language',
          name: 'English',
          alternateName: 'en',
          proficiencyLevel: 'Advanced (B2/C1)'
        }
      ],
      sameAs: [
        'https://www.linkedin.com/in/izack/',
        'https://github.com/iZackk26',
        'https://www.instagram.com/izackk_r/',
        'https://izackk.com'
      ],
      knowsAbout: [
        'Software Development',
        'Full-Stack Development',
        'Artificial Intelligence',
        'Machine Learning',
        'Cloud Computing',
        'Automation',
        'Digital Transformation',
        'React',
        'TypeScript',
        'Python'
      ]
    };

    const dataToUse = structuredData || defaultStructuredData;

    let structuredDataScript = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(dataToUse);

  }, [title, description, keywords, ogImage, canonicalUrl, type, structuredData, i18n.language, ogLocale]);

  return null;
};
