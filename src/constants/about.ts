import {
  Award,
  BookOpen,
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Lightbulb,
  Server,
  Smartphone,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { Language } from './navigation';
import type { Achievement, Interest, SkillArea } from '../types/about';

export const ABOUT_PHOTO = { src: '/photo02.webp', alt: 'Isaac Ramírez' } as const;

export const CV_DOWNLOAD_FILE_NAMES: Record<Language, string> = {
  es: 'isaac-ramirez-rojas-CV-es.pdf',
  en: 'isaac-ramirez-rojas-CV-en.pdf',
};

export const SKILLS_TIMELINE: SkillArea[] = [
  {
    title: 'Frontend Development',
    icon: Smartphone,
    skills: ['React & TypeScript', 'React Native', 'Tailwind CSS', 'Responsive Design'],
    side: 'left',
  },
  { title: 'Backend Development', icon: Server, skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'GraphQL'], side: 'right' },
  { title: 'Cloud & DevOps', icon: Cloud, skills: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Linux'], side: 'left' },
  {
    title: 'AI/ML & Data',
    icon: Cpu,
    skills: ['Face Recognition', 'Model Optimization', 'Vector Databases', 'Embeddings'],
    side: 'right',
  },
  {
    title: 'Database Design',
    icon: Database,
    skills: ['PostgreSQL', 'SQL Optimization', 'Vector Search', 'Database Architecture'],
    side: 'left',
  },
  {
    title: 'Version Control & Collaboration',
    icon: GitBranch,
    skills: ['Git', 'GitHub', 'CI/CD Pipelines', 'Code Review'],
    side: 'right',
  },
  {
    title: 'Architecture & Design',
    icon: Layers,
    skills: ['System Design', 'Microservices', 'API Design', 'Scalable Solutions'],
    side: 'left',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { icon: Code, label: 'Projects Built', value: '15+' },
  { icon: Award, label: 'Technologies', value: '20+' },
  { icon: Users, label: 'Team Projects', value: '3+' },
  { icon: TrendingUp, label: 'Years Experience', value: '1+' },
];

export const INTERESTS: Interest[] = [
  { icon: Lightbulb, text: 'AI & Machine Learning' },
  { icon: Code, text: 'Full-Stack Development' },
  { icon: Target, text: 'Process Automation' },
  { icon: BookOpen, text: 'Continuous Learning' },
];

export const CURRENTLY_LEARNING = ['Cybersecurity', 'Cloud Architecture'] as const;
