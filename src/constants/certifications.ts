import type { CertificationProvider } from '../types/certificates';

export const CERTIFICATION_PROVIDERS: CertificationProvider[] = [
  {
    provider: 'Snowflake',
    iconPath: '/icons/snowflake.svg',
    certs: [
      {
        name: 'Data Engineering Workshop',
        description: 'Fundamentos de ingeniería de datos en Snowflake',
        url: 'https://achieve.snowflake.com/dcb7c863-e8bd-47d2-afe8-bd215e630093#acc.46Txsynk',
      },
      {
        name: 'Data Science Workshop',
        description: 'Flujos de ciencia de datos aplicados',
        url: 'https://achieve.snowflake.com/d61b8a17-f42f-4f1e-9ea7-20562f091d74',
      },
      {
        name: 'Collaboration & Cost Estimation',
        description: 'Colaboración y optimización de costos',
        url: 'https://achieve.snowflake.com/34001ee3-894d-4c94-921d-c15ba9bebe4d',
      },
      {
        name: 'Data Application Builders',
        description: 'Creación de aplicaciones basadas en datos',
        url: 'https://achieve.snowflake.com/24c9d61e-be1e-4c79-a5ae-ba063ba5549a',
      },
      {
        name: 'Data Warehousing Workshop',
        description: 'Mejores prácticas de análisis y almacenamiento',
        url: 'https://achieve.snowflake.com/0da6ba1b-29f7-44e8-ac3d-c82a36cb966d',
      },
    ],
  },
  {
    provider: 'Databricks',
    iconPath: '/icons/databricks.svg',
    certs: [
      {
        name: 'Academy Accreditation – Fundamentals',
        description: 'Procesamiento de datos, Delta Lake y analítica colaborativa (vigente hasta Ago 2026)',
        url: 'https://credentials.databricks.com/9cef187f-5759-4502-99d3-0e9a2335ab80#acc.kgdtsU0P',
      },
    ],
  },
  {
    provider: 'Oracle',
    iconPath: '/icons/oracle.svg',
    certs: [
      {
        name: 'Primavera Cloud Schedule Management',
        description: 'Planificación de proyectos, gestión de riesgos y cronogramas',
        url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=22C04184ABC06312676E1B21703E2F7D7B79F26B22D1810B044E9BD86658B8FF',
      },
    ],
  },
  {
    provider: 'Amazon Web Services',
    iconPath: '/icons/aws.svg',
    certs: [
      {
        name: 'AWS Cloud Practitioner Essentials',
        description: 'Servicios principales de AWS, arquitectura y seguridad',
        url: 'https://www.linkedin.com/in/izack/details/certifications/1746223655845/single-media-viewer/?profileId=ACoAAEq_d94BWTv5pNiWSyPgOE9mkTrYf_F1QZw',
      },
      {
        name: 'Introduction to Generative AI',
        description: 'Fundamentos de IA generativa',
        url: 'https://www.credly.com/badges/d4f4e9cd-b845-49c4-a94e-fa71e116abd2/linked_in_profile',
      },
      {
        name: 'Job Roles in the Cloud',
        description: 'Perfiles profesionales en la nube y habilidades prácticas',
        url: 'https://www.linkedin.com/in/izack/details/certifications/1746223759762/single-media-viewer/?profileId=ACoAAEq_d94BWTv5pNiWSyPgOE9mkTrYf_F1QZw',
      },
      {
        name: 'Machine Learning Foundations',
        description: 'Principios introductorios de ML en AWS',
        url: 'https://www.credly.com/badges/0daf1603-c052-4471-a02b-51945bb4b660/linked_in_profile',
      },
    ],
  },
];
