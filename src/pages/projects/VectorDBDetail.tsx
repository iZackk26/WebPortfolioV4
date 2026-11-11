import { useTranslation } from 'react-i18next';
import { Cpu, Database, Search } from 'lucide-react';
import { ProjectDetailLayout } from '../../components/project-detail/ProjectDetailLayout';
import { DetailHeroImage, DetailMediaReveal } from '../../components/project-detail/DetailHeroImage';
import { OverviewAndFeatures } from '../../components/project-detail/OverviewAndFeatures';
import { ChallengesGrid } from '../../components/project-detail/ChallengesGrid';
import { TechnologiesGrid } from '../../components/project-detail/TechnologiesGrid';
import { RevealSection } from '../../components/project-detail/RevealSection';
import { VideoPlayer } from '../../components/video-player/VideoPlayer';
import { VECTOR_DB_DETAIL } from '../../constants/projectDetails';

const CHALLENGE_ICONS = [Database, Search, Cpu] as const;
const VIDEO_TITLE_FALLBACK = 'Video Demonstration';

export const VectorDBDetail = () => {
  const { t } = useTranslation();
  const { namespace, heroImage, demoVideo } = VECTOR_DB_DETAIL;

  const media = (
    <DetailMediaReveal>
      <DetailHeroImage src={heroImage} alt={t(`${namespace}.title`)} />
    </DetailMediaReveal>
  );

  return (
    <ProjectDetailLayout namespace={namespace} media={media}>
      <OverviewAndFeatures namespace={namespace} />
      <ChallengesGrid namespace={namespace} icons={CHALLENGE_ICONS} />
      <TechnologiesGrid namespace={namespace} />

      <RevealSection className="mt-20">
        <h2 className="text-3xl font-bold mb-8">
          {t(`${namespace}.video_title`, { defaultValue: VIDEO_TITLE_FALLBACK })}
        </h2>
        <div className="max-w-4xl mx-auto">
          <VideoPlayer src={demoVideo.src} poster={demoVideo.poster} />
        </div>
      </RevealSection>
    </ProjectDetailLayout>
  );
};
