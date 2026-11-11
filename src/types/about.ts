import type { LucideIcon } from 'lucide-react';

export type TimelineSide = 'left' | 'right';

export interface SkillArea {
  title: string;
  icon: LucideIcon;
  skills: string[];
  side: TimelineSide;
}

export interface Achievement {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface Interest {
  icon: LucideIcon;
  text: string;
}
