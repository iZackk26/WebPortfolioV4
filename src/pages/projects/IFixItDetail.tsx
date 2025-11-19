import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Wrench, MapPin, Calendar, Car, Search, Image, MessageSquare, Bell, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const IFixItDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get features from i18n
  const features: string[] = t('ifixit_detail.features', { returnObjects: true }) as string[];

  // Get technologies from i18n
  const technologies: Array<{ name: string; category: string }> = t('ifixit_detail.technologies', { returnObjects: true }) as Array<{ name: string; category: string }>;

  // Get challenges from i18n
  const challengesData: Array<{ title: string; description: string }> = t('ifixit_detail.challenges', { returnObjects: true }) as Array<{ title: string; description: string }>;

  // Map icons to challenges
  const challengeIcons = [MapPin, Calendar, Wrench];
  const challenges = challengesData.map((challenge, index) => ({
    ...challenge,
    icon: challengeIcons[index]
  }));

  return (
    <div className="min-h-screen pt-16">
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
            <span>{t('ifixit_detail.back')}</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-block px-3 py-1 bg-[rgb(var(--color-accent))] text-white text-sm font-semibold rounded-full mb-4">
              {t('ifixit_detail.category')}
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 flex items-center gap-4">
              <img
                src="/ifixit/ifixit-logo.png"
                alt="iFixIt Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
              {t('ifixit_detail.title')}
            </h1>
            <p className="text-xl text-[rgb(var(--color-text-secondary))] leading-relaxed max-w-4xl">
              {t('ifixit_detail.description')}
            </p>
          </motion.div>
        </div>
      </section>

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
                src="/ifixit/iFix-Preview.png"
                alt={t('pura_compra_detail.title')}
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-2 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg p-4">
                <span className="text-xl">🚀</span>
                <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                  {t('pura_compra_detail.live_demo_text', { defaultValue: 'Want to see it in action? Visit the' })}{' '}
                  <a
                    href="https://i-fix-it.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--color-accent))] hover:underline font-semibold"
                  >
                    live demo
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">{t('ifixit_detail.overview_title')}</h2>
              <div className="space-y-4 text-[rgb(var(--color-text-secondary))] leading-relaxed">
                <p>{t('ifixit_detail.overview_p1')}</p>
                <p>{t('ifixit_detail.overview_p2')}</p>
                <p>{t('ifixit_detail.overview_p3')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">{t('ifixit_detail.features_title')}</h2>
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
                    <CheckCircle size={20} className="text-[rgb(var(--color-accent))] flex-shrink-0 mt-0.5" />
                    <span className="text-[rgb(var(--color-text-secondary))]">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Automation Section - Bento Box Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[rgb(var(--color-text))] via-[rgb(var(--color-accent))] to-[rgb(var(--color-text))] bg-clip-text text-transparent">
                  {t('ifixit_detail.automation_title')}
                </h2>
              </motion.div>
              <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
                {t('ifixit_detail.automation_subtitle')}
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto">
              {/* Búsqueda por Placas - Large Featured Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-2 lg:col-span-3 md:row-span-2 bg-gradient-to-br from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-accent))]/5 border-2 border-[rgb(var(--color-accent))]/20 rounded-2xl p-8 relative overflow-hidden group hover:border-[rgb(var(--color-accent))]/40 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[rgb(var(--color-accent))]/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[rgb(var(--color-accent))]/5 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[rgb(var(--color-accent))]/15 rounded-xl flex items-center justify-center mb-6">
                    <Search size={32} className="text-[rgb(var(--color-accent))]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[rgb(var(--color-text))]">
                    {t('ifixit_detail.automation_search_title')}
                  </h3>
                  <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed text-lg">
                    {t('ifixit_detail.automation_search_desc')}
                  </p>
                </div>
              </motion.div>

              {/* Gestión de Estados - Medium Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2 lg:col-span-3 md:row-span-1 bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl p-6 hover:border-[rgb(var(--color-accent))]/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Bell size={32} className="text-blue-400/70" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('ifixit_detail.automation_status_title')}
                    </h3>
                    <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
                      {t('ifixit_detail.automation_status_desc')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Gestor de Imágenes - Tall Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-gradient-to-b from-emerald-500/8 to-teal-500/5 border-2 border-emerald-500/15 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-card))]/80 to-transparent" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 bg-emerald-500/15 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <Image size={28} className="text-emerald-400/70" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {t('ifixit_detail.automation_images_title')}
                  </h3>
                  <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed flex-grow">
                    {t('ifixit_detail.automation_images_desc')}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg border border-emerald-500/20" />
                    <div className="w-12 h-12 bg-teal-500/10 rounded-lg border border-teal-500/20" />
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg border border-emerald-500/20" />
                  </div>
                </div>
              </motion.div>

              {/* Registro de Comentarios - Wide Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2 lg:col-span-2 md:row-span-1 bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl p-6 hover:border-[rgb(var(--color-accent))]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare size={24} className="text-orange-400/70" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {t('ifixit_detail.automation_comments_title')}
                </h3>
                <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
                  {t('ifixit_detail.automation_comments_desc')}
                </p>
              </motion.div>

              {/* App Móvil para Clientes - NEW Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="md:col-span-2 lg:col-span-2 md:row-span-1 bg-gradient-to-br from-cyan-500/10 to-blue-500/8 border-2 border-cyan-500/15 rounded-2xl p-6 hover:border-cyan-500/30 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/15 rounded-lg flex items-center justify-center">
                    <Smartphone size={20} className="text-cyan-400/70" />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded font-medium border border-cyan-500/20">iOS</span>
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded font-medium border border-cyan-500/20">Android</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {t('ifixit_detail.automation_mobile_title')}
                </h3>
                <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
                  {t('ifixit_detail.automation_mobile_desc')}
                </p>
              </motion.div>

              {/* Responsive - Accent Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="md:col-span-2 lg:col-span-2 md:row-span-1 bg-gradient-to-br from-purple-500/10 to-pink-500/8 border-2 border-purple-500/15 rounded-2xl p-6 hover:border-purple-500/30 hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-500/15 rounded-lg flex items-center justify-center mb-3">
                  <Smartphone size={24} className="text-purple-400/70" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {t('ifixit_detail.automation_responsive_title')}
                </h3>
                <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
                  {t('ifixit_detail.automation_responsive_desc')}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">{t('ifixit_detail.challenges_title')}</h2>
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">{t('ifixit_detail.technologies_title')}</h2>
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
