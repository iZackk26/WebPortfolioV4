#!/usr/bin/env node
/**
 * Descarga el mapa de contribuciones de GitHub del último año y lo guarda en
 * src/data/githubActivity.json, que la Home lee al compilar.
 *
 * Usa GITHUB_TOKEN si está definido; si no, la sesión de la CLI `gh`.
 * Uso: npm run sync:github
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const LOGIN = 'iZackk26';
const OUTPUT = fileURLToPath(new URL('../src/data/githubActivity.json', import.meta.url));
const QUERY = `query($login: String!) { user(login: $login) { contributionsCollection {
  restrictedContributionsCount
  contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
} } }`;

const fetchWithToken = async (token) => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);
  return res.json();
};

const fetchWithGh = () =>
  JSON.parse(execFileSync('gh', ['api', 'graphql', '-f', `query=${QUERY}`, '-f', `login=${LOGIN}`], { encoding: 'utf8' }));

const main = async () => {
  const token = process.env.GITHUB_TOKEN;
  const payload = token ? await fetchWithToken(token) : fetchWithGh();
  if (payload.errors) throw new Error(payload.errors.map((e) => e.message).join('; '));

  const collection = payload.data.user.contributionsCollection;
  const { weeks, totalContributions } = collection.contributionCalendar;
  const data = {
    login: LOGIN,
    fetchedAt: new Date().toISOString(),
    firstDay: weeks[0].contributionDays[0].date,
    total: totalContributions,
    privateCount: collection.restrictedContributionsCount,
    weeks: weeks.map((w) => w.contributionDays.map((d) => d.contributionCount)),
  };

  // Una semana por línea para que el archivo siga siendo legible y corto
  const lines = data.weeks.map((w) => `    ${JSON.stringify(w)}`).join(',\n');
  const { weeks: _omit, ...meta } = data;
  const head = JSON.stringify(meta, null, 2).replace(/\n}$/, '');
  writeFileSync(OUTPUT, `${head},\n  "weeks": [\n${lines}\n  ]\n}\n`);
  console.log(`Guardado ${OUTPUT}: ${data.total} contribuciones en ${data.weeks.length} semanas.`);
};

main().catch((err) => {
  console.error(`No se pudo sincronizar la actividad de GitHub: ${err.message}`);
  process.exit(1);
});
