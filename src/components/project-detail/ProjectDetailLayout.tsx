import { ReactNode } from 'react';
import type { DetailLogo, DetailNamespace } from '../../types/projectDetail';
import { DetailHeader } from './DetailHeader';

interface ProjectDetailLayoutProps {
  namespace: DetailNamespace;
  logo?: DetailLogo;
  /** Content of the highlighted media band shown right below the header. */
  media: ReactNode;
  /** Main content sections (overview, challenges, technologies, extras). */
  children: ReactNode;
}

/** Page skeleton shared by every project case study. */
export const ProjectDetailLayout = ({ namespace, logo, media, children }: ProjectDetailLayoutProps) => (
  <div className="min-h-screen pt-16">
    <DetailHeader namespace={namespace} logo={logo} />

    <section className="py-16 bg-[rgb(var(--color-bg-secondary))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{media}</div>
    </section>

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  </div>
);
