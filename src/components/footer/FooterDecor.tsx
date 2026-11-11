import { useTranslation } from 'react-i18next';
import { CV_LINKS, GITHUB_URL, Language } from '../../constants/navigation';

interface FooterDecorProps {
  playing: boolean;
}

const state = (playing: boolean) => (playing ? 'is-playing' : 'is-waiting');

/** Iconos de escritorio a los lados del wordmark: CV en el idioma actual y GitHub. */
export const FooterDecor = ({ playing }: FooterDecorProps) => {
  const { t, i18n } = useTranslation();
  const cv = CV_LINKS[(i18n.language as Language) in CV_LINKS ? (i18n.language as Language) : 'en'];

  return (
    <>
      <a
        href={cv}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('footer.openCv')}
        className={`footer-decor ${state(playing)} absolute bottom-28 left-[2%] hidden w-16 text-center lg:block`}
      >
        <span className="relative mx-auto block h-[58px] w-[46px] rounded-[3px] border border-black/30 bg-gradient-to-b from-white to-[#eef0f3] [clip-path:polygon(0_0,70%_0,100%_24%,100%_100%,0_100%)]">
          <span className="absolute inset-x-1.5 bottom-2.5 rounded-sm bg-gradient-to-b from-[#ff6b5b] to-[#d52b1e] text-[10px] font-bold text-white">
            PDF
          </span>
        </span>
        <span className="win-caption block">cv.pdf</span>
      </a>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={`footer-decor ${state(playing)} absolute bottom-36 right-[2%] hidden w-16 text-center lg:block`}
      >
        <span className="relative mx-auto block h-[46px] w-[58px] rounded-[9px] border border-black bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_10px_rgba(0,0,0,0.2)]">
          <span className="absolute left-2 top-2 font-mono text-[13px] font-semibold text-[#9ff09f]">&gt;_</span>
        </span>
        <span className="win-caption block">github</span>
      </a>
    </>
  );
};
