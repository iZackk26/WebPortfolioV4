import { useTranslation } from 'react-i18next';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import { Window } from '../../ui/Window';
import { DecisionsColumn } from './DecisionsColumn';
import { ToolsColumn } from './ToolsColumn';
import { MethodFlow } from './MethodFlow';

/** "IA sí. Vibe-coding no.": cómo trabajo con IA, debajo de la constancia en GitHub. */
export const MethodSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInViewOnce<HTMLElement>(0.3);

  return (
    <section
      ref={ref}
      aria-labelledby="method-title"
      className="mx-auto flex max-w-[1120px] flex-col items-center gap-3.5 px-4 pt-24 text-center md:pt-28"
    >
      <span className="carousel-kicker">{t('method.kicker')}</span>
      <h2
        id="method-title"
        className="method-title m-0 text-balance text-[clamp(34px,5.5vw,56px)] font-medium leading-none tracking-[-0.05em] text-black"
      >
        {t('method.titleYes')} <s className="whitespace-nowrap">{t('method.titleStruck')}</s> <span className="text-[#c42b1c]">{t('method.titleNo')}</span>
      </h2>
      <p className="m-0 max-w-[48ch] text-balance text-[17px] text-black/60">{t('method.lede')}</p>

      <div className="mt-4 w-full max-w-[980px] text-left">
        <Window title="metodo.app">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <DecisionsColumn />
            <ToolsColumn playing={inView} />
          </div>
          <MethodFlow running={inView} />
          <p className="m-0 border-t border-black/10 bg-[#fbfbfb] px-[18px] py-3 font-mono text-[12.5px] text-black/40">
            {t('method.pricing')} <b className="font-medium text-black">{t('method.pricingStrong')}</b>
          </p>
        </Window>
      </div>

      <aside className="sticky-note mt-2 w-[min(440px,100%)] -rotate-[1.5deg] text-[15px] text-[#3a3210]">{t('method.hype')}</aside>
    </section>
  );
};
