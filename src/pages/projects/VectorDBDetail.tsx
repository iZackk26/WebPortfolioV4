import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Database, Search, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const VectorDBDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Load i18n arrays
  const features: string[] = t('crps_detail.features', { returnObjects: true }) as string[];

  const technologies: Array<{ name: string; category: string }> = t(
    'crps_detail.technologies',
    { returnObjects: true }
  ) as Array<{ name: string; category: string }>;

  const challengesData: Array<{ title: string; description: string }> = t(
    'crps_detail.challenges',
    { returnObjects: true }
  ) as Array<{ title: string; description: string }>;

  // Map icons to challenges
  const challengeIcons = [Database, Search, Cpu];
  const challenges = challengesData.map((challenge, index) => ({
    ...challenge,
    icon: challengeIcons[index]
  }));

  return (
    <div className="min-h-screen pt-16">
      {/* HEADER SECTION */}
      <section className="py-12 bg-gradient-to-b from-transparent to-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate('/projects')}
            className="inline-flex items-center space-x-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-accent))] transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={20} />
            <span>{t('crps_detail.back')}</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-block px-3 py-1 bg-[rgb(var(--color-accent))] text-white text-sm font-semibold rounded-full mb-4">
              {t('crps_detail.category')}
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              {t('crps_detail.title')}
            </h1>

            <p className="text-xl text-[rgb(var(--color-text-secondary))] leading-relaxed max-w-4xl">
              {t('crps_detail.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* IMAGE BANNER */}
      <section className="py-16 bg-[rgb(var(--color-bg-secondary))]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="aspect-video max-w-4xl mx-auto bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl overflow-hidden">
              <img
                src="/Embedding.png"
                alt={t('appraisal_detail.title')}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>


      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* OVERVIEW & FEATURES */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                {t('crps_detail.overview_title')}
              </h2>

              <div className="space-y-4 text-[rgb(var(--color-text-secondary))] leading-relaxed">
                <p>{t('crps_detail.overview_p1')}</p>
                <p>{t('crps_detail.overview_p2')}</p>
                <p>{t('crps_detail.overview_p3')}</p>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                {t('crps_detail.features_title')}
              </h2>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle size={20} className="text-[rgb(var(--color-accent))] mt-0.5" />
                    <span className="text-[rgb(var(--color-text-secondary))]">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CHALLENGES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">
              {t('crps_detail.challenges_title')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl p-6 hover:border-[rgb(var(--color-accent))] transition-all duration-300"
                >
                  <challenge.icon size={40} className="text-[rgb(var(--color-accent))] mb-4" />

                  <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>

                  <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TECHNOLOGIES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">
              {t('crps_detail.technologies_title')}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg p-4 hover:border-[rgb(var(--color-accent))] transition-all duration-200"
                >
                  <div className="text-sm text-[rgb(var(--color-accent))] font-semibold mb-1">
                    {tech.category}
                  </div>
                  <div className="font-bold">{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
