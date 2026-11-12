import { useTranslation } from 'react-i18next';
import { CONSENT_OPEN_EVENT } from '../../constants/consent';
import type { LegalDocKey } from '../../types/legal';
import { isLegalAction, isLegalFact } from '../../utils/legalGuards';
import { toValidList } from '../../utils/translationGuards';
import { AeroButton } from '../ui/AeroButton';
import { Window } from '../ui/Window';

const openCookiePreferences = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));

/** Botón del hero: "cookies" abre las preferencias, "#id" es un ancla y lo demás una ruta interna */
const HeroAction = ({ label, target, tone }: { label: string; target: string; tone: 'aqua' | 'silver' }) => {
  if (target === 'cookies') return <AeroButton tone={tone} onClick={openCookiePreferences}>{label}</AeroButton>;
  if (target.startsWith('#')) {
    return (
      <a href={target} className={`aero aero-btn aero-btn--md ${tone === 'silver' ? 'aero--silver' : ''}`}>
        {label}
      </a>
    );
  }
  return <AeroButton tone={tone} to={target}>{label}</AeroButton>;
};

/** Hero de los documentos legales, con la misma composición que el About: texto y ficha "Obtener información" */
export const LegalHero = ({ doc }: { doc: LegalDocKey }) => {
  const { t } = useTranslation();
  const facts = toValidList(t(`${doc}.facts`, { returnObjects: true }), isLegalFact);
  const actions = toValidList(t(`${doc}.actions`, { returnObjects: true }), isLegalAction);

  return (
    <section aria-labelledby="legal-title" className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-4 pt-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 lg:pt-16">
      <div className="hero-in">
        <span className="carousel-kicker">{t(`${doc}.kicker`)}</span>
        <h1 id="legal-title" className="m-0 mt-1 text-balance text-[clamp(44px,7vw,76px)] font-medium leading-[0.95] tracking-[-0.055em] text-black">
          {t(`${doc}.title`)}
        </h1>
        <p className="m-0 mt-5 max-w-[50ch] text-lg text-black">{t(`${doc}.bio`)}</p>
        <p className="m-0 mt-2.5 max-w-[50ch] text-[16.5px] text-black/60">{t(`${doc}.sub`)}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {actions.map((action) => (
            <HeroAction key={action.target} {...action} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-[400px] rotate-[1.5deg] justify-self-center">
        <Window title={t(`${doc}.factsWindow`)}>
          <div className="flex items-center gap-3.5 border-b border-black/10 p-[16px_18px]">
            <span aria-hidden="true" className="legal-file-icon">.txt</span>
            <div>
              <p className="m-0 text-[17px] font-medium text-black">{t(`${doc}.file`)}</p>
              <p className="m-0 font-mono text-xs text-black/40">{t(`${doc}.version`)}</p>
            </div>
          </div>
          <dl className="m-0 grid grid-cols-[104px_1fr] gap-x-3 gap-y-2 p-[10px_18px_16px] text-left text-sm">
            {facts.map((fact) => (
              <div key={fact.label} className="contents">
                <dt className="text-right font-mono text-[12.5px] leading-[1.7] text-black/40">{fact.label}</dt>
                <dd className="m-0 min-w-0 break-words text-black">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Window>
      </div>
    </section>
  );
};
