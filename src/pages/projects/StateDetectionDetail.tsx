import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Brain, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const StateDetectionDetail = () => {
  const navigate = useNavigate();

  const features = [
    'High accuracy with minimal training data',
    'Efficient use of limited datasets',
    'Fast inference times',
    'Model optimization techniques',
    'Transfer learning implementation',
    'Continuous performance monitoring'
  ];

  const technologies = [
    { name: 'Machine Learning', category: 'AI/ML' },
    { name: 'Python', category: 'Language' },
    { name: 'Scikit-learn', category: 'Framework' },
    { name: 'Data Preprocessing', category: 'Pipeline' },
    { name: 'Feature Engineering', category: 'Optimization' },
    { name: 'Model Compression', category: 'Deployment' }
  ];

  const challenges = [
    {
      icon: Target,
      title: 'Limited Data Challenge',
      description: 'Developed strategies to maximize model performance with limited training samples through data augmentation and smart feature selection.'
    },
    {
      icon: TrendingUp,
      title: 'Model Optimization',
      description: 'Implemented advanced optimization techniques to achieve high accuracy while maintaining minimal computational requirements.'
    },
    {
      icon: Brain,
      title: 'Feature Engineering',
      description: 'Created effective features that capture essential patterns in the data, improving model generalization.'
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
              Optimized State Detection Model
            </h1>
            <p className="text-xl text-[rgb(var(--color-text-secondary))] leading-relaxed max-w-4xl">
              A machine learning model optimized to achieve high accuracy with minimal training data, demonstrating efficient use of limited datasets and advanced optimization techniques.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--color-bg-secondary))]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="aspect-video bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl flex items-center justify-center">
            <Brain size={120} className="text-[rgb(var(--color-accent))]" />
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
                  This project demonstrates advanced machine learning techniques for achieving high model accuracy when working with limited training data. The challenge was to build a robust classification system despite data constraints.
                </p>
                <p>
                  Through careful feature engineering, smart data augmentation, and advanced optimization techniques, the model achieves performance comparable to systems trained on much larger datasets.
                </p>
                <p>
                  The resulting model is both accurate and efficient, making it suitable for deployment in resource-constrained environments.
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
