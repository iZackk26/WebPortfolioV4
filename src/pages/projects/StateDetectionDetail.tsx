import { Target, TrendingUp, Video } from 'lucide-react';
import { ProjectDetailLayout } from '../../components/project-detail/ProjectDetailLayout';
import { OverviewAndFeatures } from '../../components/project-detail/OverviewAndFeatures';
import { ChallengesGrid } from '../../components/project-detail/ChallengesGrid';
import { TechnologiesGrid } from '../../components/project-detail/TechnologiesGrid';
import { ShowcaseVideos } from '../../components/project-detail/state-detection/ShowcaseVideos';
import { SystemStatesSection } from '../../components/project-detail/state-detection/SystemStatesSection';
import { ModelDemoSection } from '../../components/project-detail/state-detection/ModelDemoSection';
import { STATE_DETECTION_DETAIL } from '../../constants/projectDetails';

const CHALLENGE_ICONS = [Target, TrendingUp, Video] as const;

export const StateDetectionDetail = () => {
  const { namespace, showcaseVideos, demoVideo } = STATE_DETECTION_DETAIL;

  return (
    <ProjectDetailLayout namespace={namespace} media={<ShowcaseVideos sources={showcaseVideos} />}>
      <OverviewAndFeatures namespace={namespace} />
      <SystemStatesSection namespace={namespace} />
      <ChallengesGrid namespace={namespace} icons={CHALLENGE_ICONS} />
      <TechnologiesGrid namespace={namespace} className="mb-20" />
      <ModelDemoSection namespace={namespace} video={demoVideo} />
    </ProjectDetailLayout>
  );
};
