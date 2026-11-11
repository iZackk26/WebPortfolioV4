import { SEO } from '../components/SEO';
import { HomeIntro } from '../components/home/intro/HomeIntro';
import { ProjectCarousel } from '../components/home/carousel/ProjectCarousel';
import { SecondaryDock } from '../components/home/SecondaryDock';
import { ActivitySection } from '../components/home/activity/ActivitySection';
import { MethodSection } from '../components/home/method/MethodSection';
import { ContactSection } from '../components/home/contact/ContactSection';

export const Home = () => (
  <>
    <SEO
      title="Isaac Ramírez | Computer Engineering Student & Full-Stack Developer"
      description="Isaac Ramírez - Computer Engineering student specializing in automation, digital transformation, and innovative software solutions. Expert in Full-Stack Development, AI/ML, Cloud Computing, React, TypeScript, and Python. Advanced English (B2/C1)."
      keywords="Isaac Ramírez, software developer, computer engineering, full-stack developer, react developer, typescript, python, ai ml, machine learning, cloud computing, aws, automation, digital transformation, web development, portfolio"
    />
    <HomeIntro />
    <ProjectCarousel />
    <SecondaryDock />
    <ActivitySection />
    <MethodSection />
    <ContactSection />
  </>
);
