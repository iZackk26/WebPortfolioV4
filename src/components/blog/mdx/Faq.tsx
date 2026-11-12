interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Preguntas frecuentes de un post: `<Faq items={[{ question: '…', answer: '…' }]} />`.
 * Las respuestas van en el HTML aunque estén cerradas, así que se indexan y se citan.
 */
export const Faq = ({ items }: { items: FaqItem[] }) => (
  <div className="blog-faq">
    {items.map((item, i) => (
      <details key={item.question} open={i === 0}>
        <summary>{item.question}</summary>
        <p className="blog-faq-answer">{item.answer}</p>
      </details>
    ))}
  </div>
);
