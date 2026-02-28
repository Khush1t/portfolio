import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Iffco Tokio General Insurance',
      location: 'Gurugram, India',
      period: 'July 2024 – Present',
      description:
        'Designing and developing scalable internal tools and microservices to streamline product approvals, enhance collaboration, and improve system performance across insurance platforms.',
      achievements: [
        'Built Product Management Dashboard reducing product approval cycle time by 50%',
        'Engineered real-time chat channels with WebSockets, cutting approval delays by 65%',
        'Implemented RBAC, JWT authentication, and AES encryption to reduce unauthorized access risks by 38%',
        'Enhanced email notification service with Apache Kafka, reducing manual follow-ups by 70%',
        'Developed Bulk Upload Microservice reducing data upload time from 20 minutes to 40 seconds (96.6% faster)',
        'Achieved 6,000 records/sec throughput with async I/O in Python, ensuring 99.95% uptime',
        'Designed Keyword Search Microservice using Elastic Stack, reducing query response time by 75%',
        'Integrated Redis caching layer, improving high-demand search performance by 62%',
      ],
      nodeClass: 'bg-pastel-blue/20 dark:bg-pastel-blue/25 border-pastel-blue/50 dark:border-pastel-powder/40 text-text-primary dark:text-white',
      pulseClass: 'bg-pastel-blue/30 dark:bg-pastel-blue/20',
    },
    {
      id: 2,
      title: 'Research Intern',
      company: 'University of Surrey, UK',
      location: 'Delhi, India (Remote)',
      period: 'June 2023 – August 2023',
      description:
        'Conducted research on IoT-enabled approaches combined with machine learning models to optimize agricultural production, focusing on coffee yield prediction in India.',
      achievements: [
        'Developed ML models predicting coffee yield with 95% accuracy',
        'Created dataset of 50,000+ data points from 50+ farms across three major coffee-producing regions',
        'Enabled farmers to optimize production and minimize losses through predictive analytics',
      ],
      nodeClass: 'bg-pastel-mint/30 dark:bg-pastel-mint/25 border-pastel-mint/50 dark:border-pastel-mint/40 text-text-primary dark:text-white',
      pulseClass: 'bg-pastel-mint/30 dark:bg-pastel-mint/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 md:py-32 bg-pastel-fog dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-pastel-blue/20 dark:bg-pastel-blue/[0.12] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pastel-lavender/20 dark:bg-pastel-lavender/[0.12] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary dark:text-white mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
              My professional journey and career milestones
            </p>
            <div className="w-20 h-1 bg-pastel-blue dark:bg-pastel-powder mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pastel-blue/40 dark:bg-pastel-powder/40 rounded-full" />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}
                  >
                    <div className="bg-white dark:bg-white/[0.04] rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-pastel-blue/20 dark:border-white/[0.08]">
                      {/* Company & Title */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-display font-bold text-text-primary dark:text-white mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-text-secondary dark:text-gray-300 font-semibold text-lg mb-2 justify-start md:justify-end">
                          <FiBriefcase size={20} />
                          <span>{exp.company}</span>
                        </div>
                        <div className={`flex flex-wrap gap-3 text-text-muted dark:text-gray-300 text-sm ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                          }`}>
                          <span className="flex items-center gap-1">
                            <FiCalendar size={16} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiMapPin size={16} />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                        }`}>
                        <h4 className="font-semibold text-text-primary dark:text-white mb-3">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="flex items-start gap-2 text-text-muted dark:text-gray-300"
                            >
                              <span className="text-pastel-blue dark:text-pastel-powder mt-1">•</span>
                              <span className="flex-1">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Timeline Node */}
                  <div className="hidden md:flex items-center justify-center flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      className="relative"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={`w-16 h-16 rounded-full border-2 ${exp.nodeClass} flex items-center justify-center shadow-lg`}
                      >
                        <FiBriefcase size={28} />
                      </motion.div>
                      {/* Pulse effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className={`absolute inset-0 rounded-full ${exp.pulseClass}`}
                      />
                    </motion.div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

