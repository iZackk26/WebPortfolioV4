interface Stat {
  value: string;
  label: string;
}

/** Cifras destacadas dentro de un post: `<Stats items={[{ value: '4 h', label: '…' }]} />` */
export const Stats = ({ items }: { items: Stat[] }) => (
  <dl className="blog-stats">
    {items.map((stat) => (
      <div key={stat.label} className="blog-stat">
        <dt className="blog-stat-label">{stat.label}</dt>
        <dd className="blog-stat-value m-0">{stat.value}</dd>
      </div>
    ))}
  </dl>
);
