import { PERSON_SCHEMA } from '../../constants/about';
import { AUTHOR_NAME, PERSON_ID, SITE_URL } from '../../constants/blog';
import type { BlogListItem, BlogLocale, PostMeta } from '../../types/blog';
import { blogBase, blogPostPath } from './blogRoutes';

const BLOG_ID = (locale: BlogLocale) => `${SITE_URL}${blogBase(locale)}#blog`;

/** La persona como entidad única (@id): todas las páginas del blog apuntan a ella */
const person = () => {
  // Dentro de @graph el nodo no lleva su propio @context
  const node: Record<string, unknown> = { ...PERSON_SCHEMA };
  delete node['@context'];
  return { ...node, '@id': PERSON_ID, name: AUTHOR_NAME };
};

const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

/** URL de cada post de la lista en su idioma real (el de respaldo va a la versión primaria) */
const itemUrl = (post: BlogListItem) => absolute(blogPostPath(post.locale, post.slug));

interface BlogListSchemaInput {
  locale: BlogLocale;
  url: string;
  name: string;
  description: string;
  posts: BlogListItem[];
}

/** Índice: Blog + ItemList de la página actual + la persona */
export const blogListSchema = ({ locale, url, name, description, posts }: BlogListSchemaInput) => ({
  '@context': 'https://schema.org',
  '@graph': [
    person(),
    {
      '@type': 'Blog',
      '@id': BLOG_ID(locale),
      url: absolute(blogBase(locale)),
      name,
      description,
      inLanguage: locale,
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'CollectionPage',
      url,
      name,
      inLanguage: locale,
      isPartOf: { '@id': BLOG_ID(locale) },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((post, i) => ({ '@type': 'ListItem', position: i + 1, url: itemUrl(post), name: post.title })),
      },
    },
  ],
});

interface PostSchemaInput {
  post: PostMeta;
  url: string;
  homeLabel: string;
}

/** Post: BlogPosting + BreadcrumbList + la persona */
export const blogPostSchema = ({ post, url, homeLabel }: PostSchemaInput) => ({
  '@context': 'https://schema.org',
  '@graph': [
    person(),
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: url,
      headline: post.title,
      description: post.description,
      image: [absolute(post.cover)],
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: post.locale,
      keywords: post.tags.join(', '),
      wordCount: post.words,
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      isPartOf: { '@id': BLOG_ID(post.locale) },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: absolute(blogBase(post.locale)) },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ],
});
