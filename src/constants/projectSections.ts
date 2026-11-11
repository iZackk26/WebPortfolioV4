import { Brain, GraduationCap, type LucideIcon } from 'lucide-react';
import type { ProjectCategory } from './projects';

export type ProjectCardSize = 'compact' | 'large';

export interface ProjectGridSection {
  category: Exclude<ProjectCategory, 'professional'>;
  titleKey: string;
  icon: LucideIcon;
  cardSize: ProjectCardSize;
  gridClassName: string;
  className?: string;
}

/** Secondary project groups rendered as card grids below the featured projects. */
export const PROJECT_GRID_SECTIONS: ProjectGridSection[] = [
  {
    category: 'ai',
    titleKey: 'projects.ai',
    icon: Brain,
    cardSize: 'compact',
    gridClassName: 'md:grid-cols-3',
    className: 'mb-20',
  },
  {
    category: 'university',
    titleKey: 'projects.university',
    icon: GraduationCap,
    cardSize: 'large',
    gridClassName: 'md:grid-cols-2',
  },
];

/** Separator used by `projects.items.<id>.highlights` to list several highlights in one string. */
export const HIGHLIGHTS_SEPARATOR = ', ';
