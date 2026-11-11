import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Wrench } from 'lucide-react';
import { ProjectDetailLayout } from '../../components/project-detail/ProjectDetailLayout';
import { DetailHeroImage, DetailMediaReveal } from '../../components/project-detail/DetailHeroImage';
import { LiveDemoNote } from '../../components/project-detail/LiveDemoNote';
import { OverviewAndFeatures } from '../../components/project-detail/OverviewAndFeatures';
import { ChallengesGrid } from '../../components/project-detail/ChallengesGrid';
import { TechnologiesGrid } from '../../components/project-detail/TechnologiesGrid';
import { AutomationBento } from '../../components/project-detail/ifixit/AutomationBento';
import { IFIXIT_DETAIL } from '../../constants/projectDetails';

const CHALLENGE_ICONS = [MapPin, Calendar, Wrench] as const;

export const IFixItDetail = () => {
  const { t } = useTranslation();
  const { namespace, heroImage, liveDemoUrl, logo } = IFIXIT_DETAIL;

  const media = (
    <DetailMediaReveal>
      <DetailHeroImage src={heroImage} alt={t(`${namespace}.title`)} />
      <LiveDemoNote href={liveDemoUrl} />
    </DetailMediaReveal>
  );

  return (
    <ProjectDetailLayout namespace={namespace} logo={logo} media={media}>
      <OverviewAndFeatures namespace={namespace} />
      <AutomationBento namespace={namespace} />
      <ChallengesGrid namespace={namespace} icons={CHALLENGE_ICONS} />
      <TechnologiesGrid namespace={namespace} />
    </ProjectDetailLayout>
  );
};
