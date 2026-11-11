import { useTranslation } from 'react-i18next';
import { Link2, ShoppingCart, TrendingDown } from 'lucide-react';
import { ProjectDetailLayout } from '../../components/project-detail/ProjectDetailLayout';
import { DetailHeroImage, DetailMediaReveal } from '../../components/project-detail/DetailHeroImage';
import { LiveDemoNote } from '../../components/project-detail/LiveDemoNote';
import { OverviewAndFeatures } from '../../components/project-detail/OverviewAndFeatures';
import { ChallengesGrid } from '../../components/project-detail/ChallengesGrid';
import { TechnologiesGrid } from '../../components/project-detail/TechnologiesGrid';
import { ProductionFeatures } from '../../components/project-detail/pura-compra/ProductionFeatures';
import { PURA_COMPRA_DETAIL } from '../../constants/projectDetails';

const CHALLENGE_ICONS = [Link2, TrendingDown, ShoppingCart] as const;

export const PuraCompraDetail = () => {
  const { t } = useTranslation();
  const { namespace, heroImage, liveDemoUrl, logo } = PURA_COMPRA_DETAIL;

  const media = (
    <DetailMediaReveal>
      <DetailHeroImage src={heroImage} alt={t(`${namespace}.title`)} />
      <LiveDemoNote href={liveDemoUrl} />
    </DetailMediaReveal>
  );

  return (
    <ProjectDetailLayout namespace={namespace} logo={logo} media={media}>
      <OverviewAndFeatures namespace={namespace} />
      <ProductionFeatures namespace={namespace} />
      <ChallengesGrid namespace={namespace} icons={CHALLENGE_ICONS} />
      <TechnologiesGrid namespace={namespace} />
    </ProjectDetailLayout>
  );
};
