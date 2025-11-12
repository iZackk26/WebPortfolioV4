import { useTranslation } from 'react-i18next';
import { ArrowRight, Code2, Database, Cloud, Cpu, Smartphone, Zap, GitBranch, Terminal, Blocks, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';

export const Home = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const technologies = [
    { icon: Code2, name: 'React & TypeScript' },
    { icon: Database, name: 'PostgreSQL' },
    { icon: Cloud, name: 'Cloud Computing' },
    { icon: Cpu, name: 'AI/ML' }
  ];

  const techStackIcons = [
    { icon: Code2, name: 'React', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Terminal, name: 'TypeScript', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Database, name: 'PostgreSQL', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Smartphone, name: 'React Native', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Cloud, name: 'AWS', color: 'text-[rgb(var(--color-accent))]' },
    { icon: GitBranch, name: 'Git', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Zap, name: 'Node.js', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Cpu, name: 'AI/ML', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Blocks, name: 'Docker', color: 'text-[rgb(var(--color-accent))]' },
    { icon: Workflow, name: 'CI/CD', color: 'text-[rgb(var(--color-accent))]' }
  ];

  const getScrollOpacity = (threshold: number) => {
    const opacity = Math.min(scrollY / threshold, 1);
    return opacity;
  };

  const getScrollTransform = (threshold: number, distance: number) => {
    const progress = Math.min(scrollY / threshold, 1);
    return progress * distance;
  };

  return (
    <>
      <SEO
        title="Isaac Ramírez | Computer Engineering Student & Full-Stack Developer"
        description="Isaac Ramírez - Computer Engineering student specializing in automation, digital transformation, and innovative software solutions. Expert in Full-Stack Development, AI/ML, Cloud Computing, React, TypeScript, and Python. Advanced English (B2/C1)."
        keywords="Isaac Ramírez, software developer, computer engineering, full-stack developer, react developer, typescript, python, ai ml, machine learning, cloud computing, aws, automation, digital transformation, web development, portfolio"
      />
      <div className="min-h-screen pt-16">
        <section className="min-h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3 space-y-8">
                <div>
                  <p className="text-[rgb(var(--color-text-secondary))] text-lg mb-2">
                    {t('home.greeting')}
                  </p>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                    {t('home.name')}
                  </h1>
                  <p className="text-xl text-[rgb(var(--color-text-secondary))] leading-relaxed max-w-2xl mb-4">
                    {t('home.role')}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] rounded-lg">
                    <span className="text-sm font-medium text-[rgb(var(--color-accent))]">🌐</span>
                    <span className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                      {t('home.englishLevel')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/projects">
                    <button className="group px-8 py-4 bg-[rgb(var(--color-accent))] text-white rounded-lg font-semibold inline-flex items-center space-x-2 hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-150">
                      <span>{t('home.cta')}</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform duration-150" size={20} />
                    </button>
                  </Link>
                  <Link to="/about">
                    <button className="px-8 py-4 border-2 border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg font-semibold hover:border-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent))] transition-all duration-150">
                      {t('nav.about')}
                    </button>
                  </Link>
                </div>

                <div className="pt-8">
                  <p className="text-sm font-semibold text-[rgb(var(--color-text-secondary))] mb-4 uppercase tracking-wider">
                    {t('home.technologies')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))] transition-colors duration-150 hover:border-[rgb(var(--color-accent))]"
                      >
                        <tech.icon size={18} className="text-[rgb(var(--color-accent))]" />
                        <span className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] shadow-md">
                    <img
                      src="/photo01.jpeg"
                      alt="Isaac Ramírez"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-xl px-6 py-4 shadow-lg">
                    <p className="text-sm font-semibold text-[rgb(var(--color-accent))]">
                      Available for Internships
                    </p>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-1">
                      Summer 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 overflow-hidden">
          <Marquee gradient={false} speed={50} className="py-8">
            {techStackIcons.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="mx-8 flex flex-col items-center space-y-2"
              >
                <div className="w-16 h-16 rounded-xl bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] flex items-center justify-center hover:border-[rgb(var(--color-accent))] transition-colors duration-150">
                  <tech.icon size={32} className={tech.color} />
                </div>
                <span className="text-xs font-medium text-[rgb(var(--color-text-secondary))]">
                  {tech.name}
                </span>
              </div>
            ))}
          </Marquee>
        </section>

        <section
          className="py-20 border-t border-[rgb(var(--color-border))]"
          style={{
            opacity: getScrollOpacity(300),
            transform: `translateY(${30 - getScrollTransform(300, 30)}px)`
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">3+</div>
                <p className="text-[rgb(var(--color-text-secondary))]">Years Coding</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">12+</div>
                <p className="text-[rgb(var(--color-text-secondary))]">Projects Completed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[rgb(var(--color-accent))] mb-2">6</div>
                <p className="text-[rgb(var(--color-text-secondary))]">Tech Stacks</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-20 bg-[rgb(var(--color-bg-secondary))] border-t border-[rgb(var(--color-border))]"
          style={{
            opacity: getScrollOpacity(500),
            transform: `translateY(${30 - getScrollTransform(500, 30)}px)`
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What I Bring to the Table
              </h2>
              <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
                A blend of technical expertise, creative problem-solving, and a passion for building impactful solutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-colors duration-150">
                <div className="w-12 h-12 rounded-lg bg-[rgb(var(--color-accent))] flex items-center justify-center mb-4">
                  <Code2 className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Full-Stack Development</h3>
                <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">
                  Building end-to-end solutions with modern frameworks and best practices, from responsive frontends to scalable backends.
                </p>
              </div>

              <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-colors duration-150">
                <div className="w-12 h-12 rounded-lg bg-[rgb(var(--color-accent))] flex items-center justify-center mb-4">
                  <Cpu className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">AI/ML Integration</h3>
                <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">
                  Implementing intelligent features with machine learning models, from computer vision to natural language processing.
                </p>
              </div>

              <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-colors duration-150">
                <div className="w-12 h-12 rounded-lg bg-[rgb(var(--color-accent))] flex items-center justify-center mb-4">
                  <Workflow className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Process Automation</h3>
                <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">
                  Streamlining workflows and eliminating repetitive tasks through smart automation and digital transformation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-20 border-t border-[rgb(var(--color-border))]"
          style={{
            opacity: getScrollOpacity(800),
            transform: `translateY(${30 - getScrollTransform(800, 30)}px)`
          }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-secondary))] mb-8 leading-relaxed">
              I'm always excited to collaborate on innovative projects and contribute to teams that value creativity, technical excellence, and continuous learning.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/projects">
                <button className="px-8 py-4 bg-[rgb(var(--color-accent))] text-white rounded-lg font-semibold hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-150">
                  View My Projects
                </button>
              </Link>
              <a href="mailto:your.email@example.com">
                <button className="px-8 py-4 border-2 border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))] rounded-lg font-semibold hover:border-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent))] transition-all duration-150">
                  Get in Touch
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
