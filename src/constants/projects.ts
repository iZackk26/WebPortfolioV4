/**
 * Group a project is listed under on the Projects page.
 * Moving a project between groups only requires changing this value.
 */
export type ProjectCategory = 'professional' | 'ai' | 'university';

export interface Project {
  /** Clave en i18n: projects.items.<id> */
  id: string;
  route: string;
  image: string;
  /** Nombre de archivo que se muestra en la barra de la ventana */
  fileName: string;
  technologies: string[];
  category: ProjectCategory;
}

export const PROJECTS: Project[] = [
  {
    id: 'appraisal',
    route: '/projects/appraisal',
    image: '/app-design.webp',
    fileName: 'appraisal-app.webp',
    technologies: ['React Native', 'Formly', 'TypeScript', 'Offline-First'],
    category: 'professional',
  },
  {
    id: 'faceAntiSpoofing',
    route: '/projects/faceAntiSpoofing',
    image: '/spoofing.webp',
    fileName: 'anti-spoofing.webp',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    category: 'ai',
  },
  {
    id: 'iFixIt',
    route: '/projects/iFixIt',
    image: '/ifix-it.webp',
    fileName: 'ifix-it.webp',
    technologies: ['PostgreSQL', 'Node.js', 'React', 'Tailwind CSS', 'Google Maps'],
    category: 'university',
  },
  {
    id: 'stateDetection',
    route: '/projects/stateDetection',
    image: '/cart.webp',
    fileName: 'state-detection.webp',
    technologies: ['Machine Learning', 'Python', 'Optimization'],
    category: 'ai',
  },
  {
    id: 'puraCompra',
    route: '/projects/puraCompra',
    image: '/puracompra.webp',
    fileName: 'pura-compra.webp',
    technologies: ['SQL', 'Node.js', 'Sequelize', 'React', 'Tailwind CSS'],
    category: 'university',
  },
  {
    id: 'vectorDB',
    route: '/projects/vectorDB',
    image: '/face-detection.webp',
    fileName: 'vector-db.webp',
    technologies: ['Vector DB', 'Embeddings', 'Cloud', 'Semantic Search'],
    category: 'ai',
  },
];

export const getProjectsByCategory = (category: ProjectCategory) =>
  PROJECTS.filter((project) => project.category === category);
