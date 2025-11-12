import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export const SEO = ({
  title = 'Portfolio | Computer Engineering Student & Software Developer',
  description = 'Passionate Computer Engineering student specializing in automation, digital transformation, and innovative software solutions. Expert in Full-Stack Development, AI/ML, and Cloud Computing.',
  keywords = 'software developer, computer engineering, full-stack developer, react, typescript, ai ml, cloud computing, automation, digital transformation, portfolio',
  ogImage = '/og-image.jpg'
}: SEOProps) => {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const metaTags = {
      description,
      keywords,
      author: 'Portfolio Developer',
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'og:url': canonicalUrl,
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
      'robots': 'index, follow',
      'language': 'English, Spanish',
      'revisit-after': '7 days'
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

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
};
