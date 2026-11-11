import { useTranslation } from 'react-i18next';
import { Brain, Shield, Zap } from 'lucide-react';
import { ProjectDetailLayout } from '../../components/project-detail/ProjectDetailLayout';
import { DetailHeroImage } from '../../components/project-detail/DetailHeroImage';
import { OverviewAndFeatures } from '../../components/project-detail/OverviewAndFeatures';
import { ChallengesGrid } from '../../components/project-detail/ChallengesGrid';
import { TechnologiesGrid } from '../../components/project-detail/TechnologiesGrid';
import { FACE_ANTI_SPOOFING_DETAIL } from '../../constants/projectDetails';

const CHALLENGE_ICONS = [Shield, Zap, Brain] as const;

export const FaceAntiSpoofingDetail = () => {
  const { t } = useTranslation();
  const { namespace, heroImage } = FACE_ANTI_SPOOFING_DETAIL;

  return (
    <ProjectDetailLayout namespace={namespace} media={<DetailHeroImage src={heroImage} alt={t(`${namespace}.title`)} />}>
      <OverviewAndFeatures namespace={namespace} />
      <ChallengesGrid namespace={namespace} icons={CHALLENGE_ICONS} />
      <TechnologiesGrid namespace={namespace} />
    </ProjectDetailLayout>
  );
};
