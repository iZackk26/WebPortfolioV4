import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { Window } from '../components/ui/Window';
import { RetroButton } from '../components/ui/RetroButton';
import { ClawdTyping } from '../components/wip/ClawdTyping';
import { BuildTerminal } from '../components/wip/BuildTerminal';
import { CONTACT_EMAIL } from '../constants/contact';
import { WipSection } from '../constants/underConstruction';
import { useBuildLog } from '../hooks/useBuildLog';
import { isString, toValidList } from '../utils/translationGuards';

interface UnderConstructionProps {
  section: WipSection;
}

/** Página temporal para las secciones que se están rediseñando en la V5. */
export const UnderConstruction = ({ section }: UnderConstructionProps) => {
  const { t } = useTranslation();
  const title = t(`wip.sections.${section}.title`);
  const file = t(`wip.sections.${section}.file`);
  const lines = toValidList(t('wip.lines', { returnObjects: true, file }), isString);
  const log = useBuildLog(lines);

  return (
    <>
      <SEO title={`${title} | Isaac Ramírez`} description={t('wip.lede')} />
      <section aria-labelledby="wip-title" className="mx-auto flex max-w-[1100px] flex-col items-center gap-3.5 px-4 pb-8 pt-12 text-center">
        <span className="wip-kicker">{t('wip.kicker')}</span>
        <h1 id="wip-title" className="m-0 text-balance text-[clamp(34px,6vw,60px)] font-medium leading-none tracking-[-0.05em] text-black">
          {title}
        </h1>
        <p className="m-0 max-w-[46ch] text-balance text-[17px] text-black/60">{t('wip.lede')}</p>

        <div className="mt-3.5 w-full max-w-[760px] text-left" role="img" aria-label={t('wip.sceneLabel')}>
          <Window title={file}>
            <div className="grid min-h-[290px] grid-cols-1 sm:grid-cols-2">
              <ClawdTyping typing={log.typing} />
              <BuildTerminal visible={log.visible} progress={log.progress} finished={log.finished} />
            </div>
          </Window>
        </div>

        <div className="mt-2.5 flex flex-wrap justify-center gap-3">
          <RetroButton to="/">{t('wip.ctaHome')}</RetroButton>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn-retro gloss silver-fill">
            {t('wip.ctaContact')}
          </a>
        </div>
        <span className="font-mono text-xs text-black/40">{t('wip.note')}</span>
      </section>
    </>
  );
};
