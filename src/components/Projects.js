import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, secure payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 2,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time data visualization dashboard with machine learning predictions and customizable widgets for business intelligence.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      tech: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'A modern social networking platform with real-time messaging, post sharing, and personalized feed algorithms.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
      tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'Redis'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 4,
      title: 'Task Management System',
      description: 'Collaborative project management tool with kanban boards, time tracking, and team communication features.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 5,
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with hourly and weekly forecasts, interactive maps, and location-based alerts.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop',
      tech: ['React', 'OpenWeather API', 'Chart.js'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 6,
      title: 'REST API & Microservices',
      description: 'Scalable microservices architecture with containerized services, load balancing, and comprehensive API documentation.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      tech: ['Node.js', 'Docker', 'Kubernetes', 'MongoDB'],
      category: 'backend',
      github: 'https://github.com',
      live: null,
    },
  ];

  const categories = ['all', 'fullstack', 'frontend', 'backend'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 md:py-32 bg-white dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium capitalize transition-all ${filter === category
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-700'
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-dark-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Action Buttons on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white dark:bg-dark-900 rounded-full text-gray-900 dark:text-white shadow-lg"
                        aria-label="View GitHub repository"
                      >
                        <FiGithub size={20} />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white dark:bg-dark-900 rounded-full text-gray-900 dark:text-white shadow-lg"
                        aria-label="View live demo"
                      >
                        <FiExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <FiCode className="text-primary-600 dark:text-primary-400" size={20} />
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative gradient border */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Khush1t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <FiGithub size={20} />
              View All Projects on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

