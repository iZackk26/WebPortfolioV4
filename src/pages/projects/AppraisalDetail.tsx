import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, Smartphone, Zap } from 'lucide-react';
import { ProjectDetailLayout } from '../../components/project-detail/ProjectDetailLayout';
import { DetailHeroImage, DetailMediaReveal } from '../../components/project-detail/DetailHeroImage';
import { OverviewAndFeatures } from '../../components/project-detail/OverviewAndFeatures';
import { ChallengesGrid } from '../../components/project-detail/ChallengesGrid';
import { TechnologiesGrid } from '../../components/project-detail/TechnologiesGrid';
import { APPRAISAL_DETAIL } from '../../constants/projectDetails';

const CHALLENGE_ICONS = [Database, Zap, Smartphone] as const;

export const AppraisalDetail = () => {
  const { t } = useTranslation();
  const { namespace, heroImage, privacyNoteKey } = APPRAISAL_DETAIL;

  const media = (
    <DetailMediaReveal>
      <DetailHeroImage src={heroImage} alt={t(`${namespace}.title`)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-start space-x-2 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg p-4"
      >
        <span className="text-2xl">ℹ️</span>
        <p className="text-sm text-[rgb(var(--color-text-secondary))] italic">{t(privacyNoteKey)}</p>
      </motion.div>
    </DetailMediaReveal>
  );

  return (
    <ProjectDetailLayout namespace={namespace} media={media}>
      <OverviewAndFeatures namespace={namespace} />
      <ChallengesGrid namespace={namespace} icons={CHALLENGE_ICONS} />
      <TechnologiesGrid namespace={namespace} />
    </ProjectDetailLayout>
  );
};
