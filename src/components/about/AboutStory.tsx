import { useTranslation } from 'react-i18next';
import { isString, toValidList } from '../../utils/translationGuards';
import { Window } from '../ui/Window';
import { SectionHeading } from './SectionHeading';

/** Mi historia: el relato en una ventana y la idea central en una nota adhesiva. */
export const AboutStory = () => {
  const { t } = useTranslation();
  const paragraphs = toValidList(t('about.story.paragraphs', { returnObjects: true }), isString);

  return (
    <section aria-labelledby="about-story" className="mx-auto flex max-w-[1120px] flex-col items-center gap-3 px-4 pt-28 text-center">
      <SectionHeading id="about-story" kicker={t('about.story.kicker')} title={t('about.story.title')} />
      <div className="mt-3.5 grid w-full max-w-[980px] grid-cols-1 items-center gap-9 text-left md:grid-cols-[minmax(0,1fr)_340px]">
        <Window title="historia.md">
          <div className="flex flex-col gap-3 p-[20px_22px] text-[16.5px] leading-[1.65] text-[#232323]">
            {paragraphs.map((text) => (
              <p key={text} className="m-0">
                {text}
              </p>
            ))}
          </div>
        </Window>
        <blockquote className="sticky-note m-0 w-full max-w-[380px] justify-self-center rotate-2 p-[22px_22px_18px]">
          <p className="m-0 text-[19px] font-medium leading-[1.45] tracking-[-0.03em] text-[#3a3210]">{t('about.story.quote')}</p>
          <cite className="mt-2.5 block font-mono text-[12.5px] not-italic text-[rgba(90,70,0,0.7)]">— Isaac</cite>
        </blockquote>
      </div>
    </section>
  );
};
