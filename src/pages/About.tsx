import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { SEO } from '../components/SEO';
import { AboutHeader } from '../components/about/AboutHeader';
import { AboutIntro } from '../components/about/AboutIntro';
import { ProfileSidebar } from '../components/about/ProfileSidebar';
import { InterestsMarquee } from '../components/about/InterestsMarquee';
import { SkillsTimeline } from '../components/about/SkillsTimeline';
import { ABOUT_SEO } from '../constants/seo';

const PARALLAX_MAX_OFFSET_PX = -50;

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, PARALLAX_MAX_OFFSET_PX]);

  return (
    <>
      <SEO {...ABOUT_SEO} />
      <div className="min-h-screen pt-16" ref={containerRef}>
        <section className="py-20" style={{ overflow: 'visible' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ overflow: 'visible' }}>
            <AboutHeader />
            <div className="grid lg:grid-cols-3 gap-12 mb-20">
              <AboutIntro />
              <ProfileSidebar parallaxY={parallaxY} />
            </div>
            <InterestsMarquee />
          </div>
        </section>
        <SkillsTimeline />
      </div>
    </>
  );
};
