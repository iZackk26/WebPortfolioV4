import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Database, Cloud, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const VectorDBDetail = () => {
  const navigate = useNavigate();

  const features = [
    'Semantic search capabilities',
    'Efficient vector similarity computation',
    'Cloud-optimized storage',
    'Scalable architecture',
    'High-dimensional embedding support',
    'Fast query response times'
  ];

  const technologies = [
    { name: 'Vector Database', category: 'Database' },
    { name: 'Embeddings', category: 'AI/ML' },
    { name: 'Cloud Storage', category: 'Infrastructure' },
    { name: 'Python', category: 'Language' },
    { name: 'Similarity Search', category: 'Algorithm' },
    { name: 'API Design', category: 'Architecture' }
  ];

  const challenges = [
    {
      icon: Database,
      title: 'Vector Storage Optimization',
      description: 'Designed efficient storage mechanisms for high-dimensional vectors while maintaining fast retrieval times.'
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Implemented advanced semantic search algorithms that understand context and meaning beyond keyword matching.'
    },
    {
      icon: Cloud,
      title: 'Cloud Scalability',
      description: 'Architected a solution that scales seamlessly with data growth while optimizing cloud resource costs.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="py-12 bg-gradient-to-b from-transparent to-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate('/projects')}
            className="inline-flex items-center space-x-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-accent))] transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-block px-3 py-1 bg-[rgb(var(--color-accent))] text-white text-sm font-semibold rounded-full mb-4">
              AI/ML PROJECT
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Vector Database Implementation
            </h1>
            <p className="text-xl text-[rgb(var(--color-text-secondary))] leading-relaxed max-w-4xl">
              Implemented embeddings and vector databases for efficient cloud storage and semantic search capabilities, enabling intelligent content retrieval based on meaning rather than keywords.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--color-bg-secondary))]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="aspect-video bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl flex items-center justify-center">
            <Database size={120} className="text-[rgb(var(--color-accent))]" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <div className="space-y-4 text-[rgb(var(--color-text-secondary))] leading-relaxed">
                <p>
                  This project implements a modern vector database solution optimized for semantic search and similarity matching. By leveraging embeddings, the system can understand and retrieve content based on meaning rather than exact keyword matches.
                </p>
                <p>
                  The solution is designed for cloud deployment with efficient storage mechanisms and fast query processing, making it suitable for applications requiring intelligent content retrieval at scale.
                </p>
                <p>
                  Integration capabilities enable easy adoption into existing systems while maintaining high performance.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle size={20} className="text-[rgb(var(--color-accent))] flex-shrink-0 mt-0.5" />
                    <span className="text-[rgb(var(--color-text-secondary))]">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Technical Challenges</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl p-6 hover:border-[rgb(var(--color-accent))] transition-all duration-300"
                >
                  <challenge.icon size={40} className="text-[rgb(var(--color-accent))] mb-4" />
                  <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
                  <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Technologies Used</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg p-4 hover:border-[rgb(var(--color-accent))] transition-all duration-200"
                >
                  <div className="text-sm text-[rgb(var(--color-accent))] font-semibold mb-1">
                    {tech.category}
                  </div>
                  <div className="font-bold">{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
