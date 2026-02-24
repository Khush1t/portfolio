import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiAward, FiCode, FiUsers, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stats = [
    { icon: FiCode, value: '5+', label: 'Years Experience', bg: 'bg-pastel-blue/40' },
    { icon: FiAward, value: '50+', label: 'Projects Completed', bg: 'bg-pastel-lavender/40' },
    { icon: FiUsers, value: '100+', label: 'Happy Clients', bg: 'bg-pastel-mint/40' },
    { icon: FiTrendingUp, value: '95%', label: 'Success Rate', bg: 'bg-pastel-peach/40' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 bg-white dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Soft Background Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pastel-powder/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-pastel-mint/30 text-text-primary dark:text-white text-sm font-semibold border border-pastel-mint/30">
                About Me
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary dark:text-white mb-6">
              Turning Ideas Into{' '}
              <span className="text-text-primary dark:text-white">
                Reality
              </span>
            </h2>
            <p className="text-xl text-text-muted dark:text-gray-400 max-w-3xl mx-auto">
              Passionate about creating elegant solutions to complex problems
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-pastel-lavender rounded-full" />
                <div className="pl-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-3">
                      Professional Developer & Designer
                    </h3>
                    <p className="text-lg text-text-muted dark:text-gray-400 leading-relaxed">
                      With over 5 years of experience in web development, I specialize in creating
                      scalable applications with modern technologies. My approach combines technical
                      expertise with creative problem-solving to deliver exceptional results.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-text-primary dark:text-white mb-3">
                      What I Bring
                    </h4>
                    <ul className="space-y-3">
                      {[
                        'Full-stack development expertise',
                        'Modern UI/UX design principles',
                        'Agile methodology & team collaboration',
                        'Performance optimization & scalability',
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-3 text-text-secondary dark:text-gray-300"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pastel-mint flex items-center justify-center">
                            <svg className="w-3 h-3 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-pastel-lavender hover:bg-pastel-lavender/80 text-text-primary rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <FiDownload size={20} />
                    Download Resume
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image/Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Decorative Elements - Soft Pastels */}
                <div className="absolute inset-0 bg-pastel-blue/20 rounded-3xl rotate-6" />
                <div className="absolute inset-0 bg-pastel-lavender/20 rounded-3xl -rotate-6" />

                {/* Main Container */}
                <div className="relative bg-pastel-fog dark:bg-dark-800 rounded-3xl overflow-hidden aspect-square shadow-xl border border-pastel-powder/30">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-pastel-lavender flex items-center justify-center text-text-primary text-6xl font-bold shadow-lg">
                        YN
                      </div>
                      <p className="text-sm text-text-muted dark:text-gray-400">
                        Replace with your professional photo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -right-6 px-6 py-4 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-pastel-blue/30"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-text-primary dark:text-white">
                      5+
                    </div>
                    <div className="text-sm text-text-muted dark:text-gray-400 font-medium">
                      Years Experience
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid - Flat Pastel Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.08, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group"
              >
                <div className={`p-6 rounded-2xl ${stat.bg} border border-gray-200/30 dark:border-white/10 shadow-md hover:shadow-lg transition-all`}>
                  <div className={`inline-flex p-3 rounded-xl bg-white/60 dark:bg-dark-700/60 mb-4 shadow-sm`}>
                    <stat.icon className="text-text-primary dark:text-white" size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-text-primary dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
