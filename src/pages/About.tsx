import { useTranslation } from 'react-i18next';
import { Target, Award, TrendingUp, Users, Lightbulb, BookOpen, Code, Server, Cloud, Database, Cpu, Layers, GitBranch, Smartphone, Download } from 'lucide-react';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const TRON_TRAIL_INTERVAL = 10000;

export const About = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTronTrail, setShowTronTrail] = useState(false);

  const handleDownloadCV = () => {
    const cvPath = i18n.language === 'es' ? '/cv-es.pdf' : '/cv-en.pdf';
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = i18n.language === 'es' ? 'isaac-ramirez-rojas-CV-es.pdf' : 'isaac-ramirez-rojas-CV-en.pdf';
    link.click();
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const skillsTimeline = [
    {
      title: 'Frontend Development',
      icon: Smartphone,
      skills: ['React & TypeScript', 'React Native', 'Tailwind CSS', 'Responsive Design'],
      side: 'left'
    },
    {
      title: 'Backend Development',
      icon: Server,
      skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'GraphQL'],
      side: 'right'
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Linux'],
      side: 'left'
    },
    {
      title: 'AI/ML & Data',
      icon: Cpu,
      skills: ['Face Recognition', 'Model Optimization', 'Vector Databases', 'Embeddings'],
      side: 'right'
    },
    {
      title: 'Database Design',
      icon: Database,
      skills: ['PostgreSQL', 'SQL Optimization', 'Vector Search', 'Database Architecture'],
      side: 'left'
    },
    {
      title: 'Version Control & Collaboration',
      icon: GitBranch,
      skills: ['Git', 'GitHub', 'CI/CD Pipelines', 'Code Review'],
      side: 'right'
    },
    {
      title: 'Architecture & Design',
      icon: Layers,
      skills: ['System Design', 'Microservices', 'API Design', 'Scalable Solutions'],
      side: 'left'
    }
  ];

  const achievements = [
    { icon: Code, label: 'Projects Built', value: '15+' },
    { icon: Award, label: 'Technologies', value: '20+' },
    { icon: Users, label: 'Team Projects', value: '3+' },
    { icon: TrendingUp, label: 'Years Experience', value: '1+' }
  ];

  const interests = [
    { icon: Lightbulb, text: 'AI & Machine Learning' },
    { icon: Code, text: 'Full-Stack Development' },
    { icon: Target, text: 'Process Automation' },
    { icon: BookOpen, text: 'Continuous Learning' }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: [0.34, 1.56, 0.64, 1]
      }
    })
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTronTrail(true);
      setTimeout(() => setShowTronTrail(false), 3000);
    }, TRON_TRAIL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO
        title="About Isaac Ramírez | Computer Engineering Student & Developer"
        description="Learn about Isaac Ramírez's journey as a Computer Engineering student. Passionate about automation, AI/ML, cloud computing, and creating innovative software solutions. Advanced English proficiency (B2/C1)."
        keywords="Isaac Ramírez, about me, computer engineering student, software developer, automation engineer, ai ml developer, cloud computing, professional profile, advanced english"
      />
      <div className="min-h-screen pt-16" ref={containerRef}>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-16"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-4">
                <motion.h1
                  variants={fadeInUp}
                  custom={0}
                  className="text-5xl sm:text-6xl font-bold"
                >
                  {t('about.title')}
                </motion.h1>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadCV}
                  className="relative inline-flex items-center space-x-2 px-6 py-3 bg-[rgb(var(--color-accent))] text-white rounded-xl font-semibold hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-200 shadow-lg shadow-[rgb(var(--color-accent))]/20 overflow-hidden"
                >
                  <Download size={20} />
                  <span>{t('about.downloadCV')}</span>

                  {showTronTrail && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ overflow: 'visible' }}
                    >
                      <defs>
                        <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.6)" />
                          <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <motion.rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="12"
                        ry="12"
                        fill="none"
                        stroke="url(#trailGradient)"
                        strokeWidth="3"
                        filter="url(#glow)"
                        strokeDasharray="80 1000"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -1080 }}
                        transition={{
                          duration: 3.5,
                          ease: 'linear'
                        }}
                      />
                    </svg>
                  )}
                </motion.button>
              </div>
              <motion.div
                variants={scaleIn}
                custom={1}
                className="w-24 h-1 bg-[rgb(var(--color-accent))] rounded-full"
              />
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12 mb-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideInLeft}
                className="lg:col-span-2 space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="prose prose-lg max-w-none"
                >
                  <p className="text-lg text-[rgb(var(--color-text-secondary))] leading-relaxed">
                    {t('about.introduction')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-colors duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 bg-[rgb(var(--color-accent))] rounded-lg"
                    >
                      <Target className="text-white" size={24} />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{t('about.motivation')}</h3>
                      <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">
                        {t('about.motivationText')}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className="bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-xl p-4 text-center hover:border-[rgb(var(--color-accent))] transition-colors duration-150"
                    >
                      <achievement.icon className="text-[rgb(var(--color-accent))] mx-auto mb-2" size={24} />
                      <div className="text-2xl font-bold text-[rgb(var(--color-accent))] mb-1">
                        {achievement.value}
                      </div>
                      <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                        {achievement.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideInRight}
              >
                <motion.div
                  style={{ y: parallaxY }}
                  className="lg:sticky lg:top-24 space-y-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] hover:border-[rgb(var(--color-accent))] shadow-md transition-all duration-300"
                  >
                    <img
                      src="/photo02.webp"
                      alt="Isaac Ramírez"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-xl p-6"
                  >
                    <p className="text-sm font-semibold text-[rgb(var(--color-text-secondary))] mb-3">
                      Currently Learning
                    </p>
                    <div className="space-y-2">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="px-3 py-2 bg-[rgb(var(--color-bg-secondary))] rounded-lg text-sm border border-transparent hover:border-[rgb(var(--color-accent))] transition-all duration-150"
                      >
                        Cybersecurity
                      </motion.div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="px-3 py-2 bg-[rgb(var(--color-bg-secondary))] rounded-lg text-sm border border-transparent hover:border-[rgb(var(--color-accent))] transition-all duration-150"
                      >
                        Cloud Architecture
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold mb-2">Areas of Interest</h2>
                <p className="text-[rgb(var(--color-text-secondary))]">
                  What drives my passion for technology
                </p>
              </motion.div>

              <Marquee gradient={false} speed={40} className="py-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={`${interest.text}-${index}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="mx-6 flex items-center space-x-3 px-6 py-3 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl hover:border-[rgb(var(--color-accent))] transition-colors duration-150"
                  >
                    <interest.icon size={20} className="text-[rgb(var(--color-accent))]" />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {interest.text}
                    </span>
                  </motion.div>
                ))}
              </Marquee>
            </motion.div>
          </div>
        </section>

        <section className="relative py-32 bg-[rgb(var(--color-bg-primary))]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:via-black/20 dark:to-black/30 via-black/5 to-black/10" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t('about.technicalSkills')}</h2>
              <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
                A comprehensive journey through my technical expertise
              </p>
            </motion.div>

            <div className="relative max-w-6xl mx-auto">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(var(--color-border))] via-[rgb(var(--color-accent))]/30 to-[rgb(var(--color-border))] hidden md:block" />

              {skillsTimeline.map((item, index) => (
                <div key={item.title} className="relative mb-24 last:mb-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : ''
                      }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: item.side === 'left' ? -80 : 80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                      className="flex-1 w-full"
                    >
                      <div className={`flex ${item.side === 'right' ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="inline-block"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.15 }}
                              transition={{ duration: 0.6 }}
                              className="w-12 h-12 rounded-full bg-[rgb(var(--color-accent))]/10 border border-[rgb(var(--color-accent))]/30 flex items-center justify-center flex-shrink-0"
                            >
                              <item.icon className="text-[rgb(var(--color-accent))]" size={24} />
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                          </div>

                          <div className="flex flex-wrap gap-2 max-w-md">
                            {item.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.8 }}
                                transition={{
                                  duration: 0.3,
                                  delay: skillIndex * 0.08,
                                  ease: [0.34, 1.56, 0.64, 1]
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgb(var(--color-bg-secondary))]/50 backdrop-blur-sm border border-[rgb(var(--color-border))]/50 rounded-full hover:border-[rgb(var(--color-accent))]/50 transition-all duration-200"
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.2,
                                    delay: skillIndex * 0.08
                                  }}
                                  className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-accent))]"
                                />
                                <span className="text-[#000000] dark:text-gray-100 text-xs font-medium">
                                  {skill}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                      className="relative z-10 flex-shrink-0 hidden md:block"
                    >
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        className="w-4 h-4 rounded-full bg-[rgb(var(--color-accent))] border-4 border-[rgb(var(--color-bg-primary))] shadow-lg shadow-[rgb(var(--color-accent))]/20"
                      />
                    </motion.div>

                    <div className="flex-1 w-full md:block hidden" />
                  </motion.div>

                  {index < skillsTimeline.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0.25, 0.4, 0.25, 1]
                      }}
                      className="absolute left-1/2 -translate-x-1/2 top-4 w-px h-full bg-gradient-to-b from-[rgb(var(--color-accent))]/50 to-transparent origin-top hidden md:block"
                      style={{ height: 'calc(100% + 6rem)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
