import { useTranslation } from 'react-i18next';

interface ActivityStatsProps {
  total: number;
  activeDays: number;
  longestStreak: number;
  peak: number;
}

/** Cuatro cifras reales arriba del mapa. */
export const ActivityStats = ({ total, activeDays, longestStreak, peak }: ActivityStatsProps) => {
  const { t, i18n } = useTranslation();
  const fmt = (n: number) => n.toLocaleString(i18n.language);

  const items = [
    { value: fmt(total), label: t('activity.total') },
    { value: fmt(activeDays), label: t('activity.activeDays') },
    { value: t('activity.days', { count: longestStreak }), label: t('activity.longestStreak') },
    { value: fmt(peak), label: t('activity.peakDay') },
  ];

  return (
    <dl className="activity-stats m-0">
      {items.map((item) => (
        <div key={item.label} className="activity-stat">
          <dt className="sr-only">{item.label}</dt>
          <dd className="m-0 text-[30px] font-medium leading-none tracking-[-0.04em] text-black tabular-nums">{item.value}</dd>
          <dd aria-hidden="true" className="m-0 mt-1.5 font-mono text-xs text-black/40">
            {item.label}
          </dd>
        </div>
      ))}
    </dl>
  );
};
