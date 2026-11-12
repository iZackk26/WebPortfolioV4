import { useTranslation } from 'react-i18next';

/** Resumen al inicio del post (frontmatter `takeaways`): frases cortas, fáciles de citar */
export const KeyTakeaways = ({ items }: { items: string[] }) => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="blog-takeaways" className="blog-takeaways">
      <h2 id="blog-takeaways">{t('blog.post.takeaways')}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
