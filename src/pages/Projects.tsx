import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ExternalLink, Smartphone, Brain, GraduationCap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const aiProjects = [
    {
      id: 'faceAntiSpoofing',
      image: "spoofing.png",
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning']
    },
    {
      id: 'stateDetection',
      image: "cart.jpeg",
      technologies: ['Machine Learning', 'Python', 'Optimization']
    },
    {
      id: 'vectorDB',
      image: "face-detection.png",
      technologies: ['Vector DB', 'Embeddings', 'Cloud', 'Semantic Search']
    }
  ];

  const universityProjects = [
    {
      id: 'iFixIt',
      image: 'ifix-it.webp',
      technologies: ['PostgreSQL', 'Node.js', 'React', 'Tailwind CSS', 'Google Maps']
    },
    {
      id: 'puraCompra',
      image: 'puracompra.png',
      technologies: ['SQL', 'Node.js', 'Sequelize', 'React', 'Tailwind CSS']
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  return (
    <>
      <SEO
        title="Isaac Ramírez Projects | Software Development & AI/ML Portfolio"
        description="Explore Isaac Ramírez's portfolio of software development projects including AI/ML solutions, web applications, automation tools, and cloud-native applications."
        keywords="Isaac Ramírez projects, software projects, ai ml projects, web development, automation projects, cloud projects, portfolio projects, react projects, python projects"
      />
      <div className="min-h-screen pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-16"
            >
              <motion.h1
                variants={fadeInUp}
                custom={0}
                className="text-5xl sm:text-6xl font-bold mb-4"
              >
                {t('projects.title')}
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-1 bg-[rgb(var(--color-accent))] rounded-full origin-left"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-24"
            >
              <motion.div
                variants={fadeInUp}
                custom={1}
                className="flex items-center space-x-2 mb-8"
              >
                <div className="px-3 py-1 bg-[rgb(var(--color-accent))] text-white text-sm font-semibold rounded-full">
                  FEATURED
                </div>
                <h2 className="text-3xl font-bold">{t('projects.professional')}</h2>
              </motion.div>

              <motion.div
                variants={scaleIn}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl overflow-hidden hover:border-[rgb(var(--color-accent))] transition-colors duration-300"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="bg-[rgb(var(--color-bg-secondary))] border-b-2 lg:border-b-0 lg:border-r-2 border-[rgb(var(--color-border))] overflow-hidden">
                    <motion.img
                      src="/app-design.png"
                      alt="Appraisal App"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                  <div className="p-12 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h3 className="text-3xl font-bold mb-4">
                        {t('projects.items.appraisal.title')}
                      </h3>
                      <p className="text-lg text-[rgb(var(--color-text-secondary))] leading-relaxed mb-6">
                        {t('projects.items.appraisal.description')}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <h4 className="text-sm font-bold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider mb-3">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {t('projects.items.appraisal.highlights').split(', ').map((highlight: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle size={16} className="text-[rgb(var(--color-accent))] flex-shrink-0" />
                            <span className="text-[rgb(var(--color-text-secondary))]">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <h4 className="text-sm font-bold text-[rgb(var(--color-text-secondary))] uppercase tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['React Native', 'Formly', 'TypeScript', 'Offline-First'].map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1 text-sm bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-lg hover:border-[rgb(var(--color-accent))] transition-colors duration-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/projects/appraisal')}
                      className="w-full sm:w-auto px-6 py-3 bg-[rgb(var(--color-accent))] text-white rounded-lg font-semibold inline-flex items-center justify-center space-x-2 hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-150"
                    >
                      <span>View Case Study</span>
                      <ExternalLink size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-20 -mt-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/25" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-20"
            >
              <motion.div
                variants={fadeInUp}
                custom={0}
                className="flex items-center space-x-3 mb-8"
              >
                <Brain size={28} className="text-[rgb(var(--color-accent))]" />
                <h2 className="text-3xl font-bold">{t('projects.ai')}</h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {aiProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -12 }}
                    className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl overflow-hidden hover:border-[rgb(var(--color-accent))] transition-all duration-300 flex flex-col"
                  >
                    {/* Fixed height image container */}
                    <div className="bg-[rgb(var(--color-bg-secondary))] border-b border-[rgb(var(--color-border))] h-48 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.id}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.03 }}
                      />
                    </div>

                    {/* Card content with flex-grow to push button to bottom */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Title section - fixed height */}
                      <h3 className="text-xl font-bold mb-3 min-h-[56px]">
                        {t(`projects.items.${project.id}.title`)}
                      </h3>

                      {/* Description section - flex-grow to fill available space */}
                      <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed mb-4 flex-grow">
                        {t(`projects.items.${project.id}.description`)}
                      </p>

                      {/* Technologies section - fixed at bottom with consistent spacing */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 min-h-[32px]">
                          {project.technologies.slice(0, 2).map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 text-xs bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-lg hover:border-[rgb(var(--color-accent))] transition-colors duration-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        {/* Button - always at the bottom */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="w-full py-2.5 bg-[rgb(var(--color-accent))] text-white rounded-lg font-semibold text-sm hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-150"
                        >
                          {t('projects.viewDetails')}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                variants={fadeInUp}
                custom={0}
                className="flex items-center space-x-3 mb-8"
              >
                <GraduationCap size={28} className="text-[rgb(var(--color-accent))]" />
                <h2 className="text-3xl font-bold">{t('projects.university')}</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {universityProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ y: -12 }}
                    className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl overflow-hidden hover:border-[rgb(var(--color-accent))] transition-all duration-300 flex flex-col"
                  >
                    {/* Fixed height image container */}
                    <div className="bg-[rgb(var(--color-bg-secondary))] border-b border-[rgb(var(--color-border))] h-64 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.id}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.03 }}
                      />
                    </div>

                    {/* Card content with flex-grow */}
                    <div className="p-8 flex flex-col flex-grow">
                      {/* Title section */}
                      <h3 className="text-2xl font-bold mb-4">
                        {t(`projects.items.${project.id}.title`)}
                      </h3>

                      {/* Description section - flex-grow */}
                      <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed mb-4 flex-grow">
                        {t(`projects.items.${project.id}.description`)}
                      </p>

                      {/* Technologies and button section - fixed at bottom */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 min-h-[32px]">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.15 + techIndex * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 text-xs bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-lg hover:border-[rgb(var(--color-accent))] transition-colors duration-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="w-full py-3 bg-[rgb(var(--color-accent))] text-white rounded-lg font-semibold hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-150"
                        >
                          {t('projects.viewDetails')}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};
