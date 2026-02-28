import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCode, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageErrors, setImageErrors] = useState({});
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    {
      id: 1,
      title: 'portfolio',
      description: 'My personal portfolio website built to showcase projects, skills, and experience.',
      image: null,
      tech: ['JavaScript', 'React', 'Tailwind CSS'],
      github: 'https://github.com/Khush1t/portfolio',
      live: 'https://khush1t.github.io/portfolio/',
    },
    {
      id: 2,
      title: 'Feasto',
      description: 'A full-stack MERN food delivery application with user-facing ordering flows and backend data handling.',
      image: null,
      tech: ['JavaScript', 'MongoDB', 'Express', 'React', 'Node.js'],
      github: 'https://github.com/Khush1t/Feasto',
      live: null,
    },
    {
      id: 3,
      title: 'orderbook-depth-3d-visualizer',
      description: 'A Next.js app for visualizing real-time cryptocurrency orderbook data in 3D with live updates and venue filtering.',
      image: 'https://github.com/user-attachments/assets/3178fee4-255f-49f4-b377-b833de7959b0',
      tech: ['TypeScript', 'Next.js', 'Three.js', 'Binance API'],
      github: 'https://github.com/Khush1t/orderbook-depth-3d-visualizer',
      live: null,
    },
    {
      id: 4,
      title: 'Quizzler',
      description: 'A Flutter-based MCQ quiz application built for Bharat Parv 23 with a complete quiz and result flow.',
      image: 'https://github.com/user-attachments/assets/de061829-8218-45c3-8c03-b819230cf088',
      tech: ['Dart', 'Flutter'],
      github: 'https://github.com/Khush1t/Quizzler',
      live: null,
    },
    {
      id: 5,
      title: 'Netflix-Clone',
      description: 'A Netflix-inspired frontend clone project created while learning modern web development fundamentals.',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Khush1t/Netflix-Clone',
      live: null,
    },
    {
      id: 6,
      title: 'Project-FLIGHT',
      description: 'A web project from my early portfolio of work focused on practical frontend implementation.',
      image: null,
      tech: ['HTML', 'Python', 'JavaScript'],
      github: 'https://github.com/Khush1t/Project-FLIGHT',
      live: null,
    },
    {
      id: 7,
      title: 'ToDo-app',
      description: 'A task management application focused on core CRUD functionality and clean interaction flow.',
      image: 'https://github.com/Khush1t/ToDo-app/assets/76950403/5278ab56-2f7a-4da8-af2e-bffc9133bc80',
      tech: ['Dart', 'Flutter'],
      github: 'https://github.com/Khush1t/ToDo-app',
      live: null,
    },
    {
      id: 8,
      title: 'SpendWise',
      description: 'A Flutter expense tracker with income/expense flows and Google Sheets API integration for sheet-based data storage.',
      image: 'https://github.com/Khush1t/SpendWise/assets/76950403/956f02a3-94e0-4872-96a3-de76b22f701a',
      tech: ['Dart', 'Flutter', 'Google Sheets API'],
      github: 'https://github.com/Khush1t/SpendWise',
      live: null,
    },
    {
      id: 9,
      title: 'xylophone',
      description: 'A sound-based mobile app project built to practice UI interactions and audio integration basics.',
      image: null,
      tech: ['Dart', 'Flutter'],
      github: 'https://github.com/Khush1t/xylophone',
      live: null,
    },
  ];

  const scrollProjects = (direction) => {
    if (!sliderRef.current) return;

    const firstCard = sliderRef.current.querySelector('.project-card');
    const gap = 24;
    const scrollAmount = firstCard ? firstCard.clientWidth + gap : 380;

    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      const maxScrollLeft = scrollWidth - clientWidth;
      const tolerance = 2;
      setCanScrollLeft(scrollLeft > tolerance);
      setCanScrollRight(scrollLeft < maxScrollLeft - tolerance);
    };

    updateScrollState();
    slider.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      slider.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

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
      className="py-20 md:py-32 bg-pastel-fog dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pastel-lavender/20 dark:bg-pastel-lavender/[0.12] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pastel-blue/20 dark:bg-pastel-blue/[0.12] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
              Handpicked projects from my GitHub repositories
            </p>
            <div className="w-20 h-1 bg-pastel-blue dark:bg-pastel-powder mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Projects Slider */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden"
          >
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollProjects('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-white/[0.14] dark:hover:bg-pastel-lavender/30 text-text-primary dark:text-white shadow-lg hover:scale-105 transition"
                aria-label="Previous projects"
              >
                <FiChevronLeft size={20} />
              </button>
            )}

            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollProjects('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 dark:bg-white/[0.14] dark:hover:bg-pastel-lavender/30 text-text-primary dark:text-white shadow-lg hover:scale-105 transition"
                aria-label="Next projects"
              >
                <FiChevronRight size={20} />
              </button>
            )}

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth px-12 pb-3 no-scrollbar"
            >
              {projects.map((project, index) => (
                (() => {
                  const projectKey = `${project.id}-${index}`;
                  const showImage = project.image && !imageErrors[projectKey];
                  const isMobileApp = project.tech.includes('Flutter');

                  return (
                    <motion.div
                      key={projectKey}
                      whileHover={{ y: -8 }}
                      className="project-card group relative shrink-0 w-[320px] sm:w-[360px] bg-white dark:bg-white/[0.07] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 dark:border dark:border-white/[0.12]"
                    >
                      <div className="relative h-48 overflow-hidden bg-pastel-fog dark:bg-dark-700">
                        {showImage ? (
                          isMobileApp ? (
                            <div className="w-full h-full flex items-center justify-center p-3 bg-pastel-fog dark:bg-dark-700">
                              <div className="h-full aspect-[9/19] rounded-[0.8rem] border-2 border-gray-900 dark:border-black overflow-hidden shadow-xl bg-black">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  onError={() =>
                                    setImageErrors((prev) => ({
                                      ...prev,
                                      [projectKey]: true,
                                    }))
                                  }
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <img
                              src={project.image}
                              alt={project.title}
                              onError={() =>
                                setImageErrors((prev) => ({
                                  ...prev,
                                  [projectKey]: true,
                                }))
                              }
                              className="w-full h-full object-cover"
                            />
                          )
                        ) : (
                          <div className="w-full h-full bg-pastel-blue/20 dark:bg-pastel-blue/[0.15] flex flex-col items-center justify-center px-6 text-center">
                            <div className="w-14 h-14 rounded-xl bg-pastel-blue/30 dark:bg-pastel-blue/25 text-text-primary dark:text-white flex items-center justify-center mb-3">
                              <FiCode size={26} />
                            </div>
                            <p className="text-text-primary dark:text-white text-base font-semibold line-clamp-1">{project.title}</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <motion.a
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/90 dark:bg-white/[0.14] dark:hover:bg-pastel-lavender/30 rounded-full text-text-primary dark:text-white shadow-lg"
                            aria-label="View GitHub repository"
                          >
                            <FiGithub size={20} />
                          </motion.a>
                          {project.live && (
                            <motion.a
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/90 dark:bg-white/[0.14] dark:hover:bg-pastel-lavender/30 rounded-full text-text-primary dark:text-white shadow-lg"
                              aria-label="View live demo"
                            >
                              <FiExternalLink size={20} />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-display font-bold text-text-primary dark:text-white transition-colors">
                            {project.title}
                          </h3>
                          <div className="p-2">
                            <FiCode className="text-text-muted dark:text-gray-300" size={20} />
                          </div>
                        </div>

                        <p className="text-text-muted dark:text-gray-300 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-pastel-blue/15 dark:bg-white/[0.06] text-text-secondary dark:text-gray-300 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-1 bg-pastel-blue dark:bg-pastel-powder/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </motion.div>
                  );
                })()
              ))}
            </div>

          </motion.div>

          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Khush1t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pastel-lavender/70 dark:bg-pastel-lavender/90 text-text-primary dark:text-dark-900 border border-pastel-lavender/40 dark:border-pastel-lavender/60 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <FiGithub size={20} />
              View All Projects on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;

