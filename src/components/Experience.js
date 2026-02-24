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
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      period: '2021 - Present',
      description: 'Leading development of scalable web applications and mentoring junior developers. Architected microservices infrastructure that improved system performance by 40%.',
      achievements: [
        'Led team of 5 developers in migrating legacy systems to modern tech stack',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Developed real-time collaboration features used by 100K+ users',
      ],
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      location: 'New York, NY',
      period: '2019 - 2021',
      description: 'Developed and maintained multiple client-facing applications using React, Node.js, and AWS. Collaborated with cross-functional teams to deliver high-quality products.',
      achievements: [
        'Built e-commerce platform handling 50K+ daily transactions',
        'Optimized database queries improving response time by 70%',
        'Implemented OAuth2 authentication system',
      ],
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Creative Web Agency',
      location: 'Austin, TX',
      period: '2018 - 2019',
      description: 'Specialized in creating responsive, pixel-perfect user interfaces. Worked closely with designers to translate mockups into interactive web experiences.',
      achievements: [
        'Developed 20+ landing pages with 95+ PageSpeed scores',
        'Created reusable component library adopted company-wide',
        'Improved mobile performance by 50% through optimization',
      ],
      color: 'from-pink-500 to-red-500',
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'Startup Labs',
      location: 'Remote',
      period: '2017 - 2018',
      description: 'Started career building MVPs for various startups. Gained experience in rapid prototyping and working with diverse tech stacks.',
      achievements: [
        'Contributed to 5+ successful product launches',
        'Learned full-stack development from ground up',
        'Collaborated with distributed team across 3 time zones',
      ],
      color: 'from-yellow-500 to-orange-500',
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
      className="py-20 md:py-32 bg-gray-50 dark:bg-dark-800 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional journey and career milestones
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-purple-500 rounded-full" />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`flex-1 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-dark-700">
                      {/* Company & Title */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-lg mb-2 justify-start md:justify-end">
                          <FiBriefcase size={20} />
                          <span>{exp.company}</span>
                        </div>
                        <div className={`flex flex-wrap gap-3 text-gray-600 dark:text-gray-400 text-sm ${
                          index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
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
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className={`space-y-2 ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                            >
                              <span className="text-primary-500 mt-1">•</span>
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
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                      >
                        <FiBriefcase size={28} className="text-white" />
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
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${exp.color}`}
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

