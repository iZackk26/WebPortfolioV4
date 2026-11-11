/** Métricas y niveles de color calculados a partir del mapa de contribuciones. */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ActivityStats {
  activeDays: number;
  longestStreak: number;
  peak: { count: number; week: number; day: number };
  /** Umbrales (cuartiles de los días activos) para los niveles 1–4 */
  thresholds: [number, number, number];
}

export const computeActivityStats = (weeks: number[][]): ActivityStats => {
  const flat = weeks.flat();
  let longestStreak = 0;
  let run = 0;
  flat.forEach((n) => {
    run = n > 0 ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
  });

  const peak = { count: 0, week: 0, day: 0 };
  weeks.forEach((week, w) =>
    week.forEach((count, d) => {
      if (count > peak.count) Object.assign(peak, { count, week: w, day: d });
    })
  );

  const active = flat.filter((n) => n > 0).sort((a, b) => a - b);
  const quantile = (p: number) => active[Math.floor((active.length - 1) * p)] ?? 0;

  return {
    activeDays: active.length,
    longestStreak,
    peak,
    thresholds: [quantile(0.25), quantile(0.5), quantile(0.75)],
  };
};

export const levelFor = (count: number, [q1, q2, q3]: ActivityStats['thresholds']): ContributionLevel => {
  if (count === 0) return 0;
  if (count <= q1) return 1;
  if (count <= q2) return 2;
  if (count <= q3) return 3;
  return 4;
};

/** Fecha del día `day` (0 = domingo) de la semana `week`, contando desde `firstDay` */
export const dateOf = (firstDay: string, week: number, day: number) => {
  const date = new Date(`${firstDay}T00:00:00`);
  date.setDate(date.getDate() + week * 7 + day);
  return date;
};
