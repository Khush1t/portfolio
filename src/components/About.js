import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-animate').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax on the image container
      gsap.to('.about-image-wrapper', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bullets = [
    'Hands-on expertise in Angular, React & Spring Boot.',
    'Experience building scalable microservices and modern web apps.',
    'Strong problem-solving mindset with a love for clean code.',
    'Collaborative approach with a knack for learning and adapting quickly.',
  ];

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

  // const stats = [
  //   { icon: FiCode, value: '2+', label: 'Years Experience', bg: 'bg-pastel-blue/40' },
  //   { icon: FiAward, value: '10+', label: 'Projects Completed', bg: 'bg-pastel-lavender/40' },
  //   { icon: FiUsers, value: '10+', label: 'Happy Clients', bg: 'bg-pastel-mint/40' },
  //   { icon: FiTrendingUp, value: '95%', label: 'Success Rate', bg: 'bg-pastel-peach/40' },
  // ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="gsap-section py-28 md:py-36 bg-pastel-fog dark:bg-dark-900 relative overflow-hidden"
    >
      {/* Subtle accent blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pastel-blue/20 dark:bg-pastel-blue/[0.12] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="about-animate text-center mb-20">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase text-text-secondary dark:text-gray-300 border border-pastel-blue/30 dark:border-white/[0.12] rounded-full">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary dark:text-white mb-5 tracking-tight">
            Building Scalable Systems, One Clean Line of Code at a Time
          </h2>
          <p className="text-base sm:text-lg text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
            Software Engineer passionate about solving complex problems, doodling ideas, and occasionally beating the clock on a Rubik's cube.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="about-animate space-y-6">
            <div className="relative pl-6 border-l-2 border-pastel-blue/40 dark:border-pastel-powder/50">
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3 font-display">
                Software Engineer
              </h3>
              <p className="text-text-muted dark:text-gray-300 leading-relaxed">
                I began my journey at Delhi Technological University, where I built a strong foundation in software engineering.
                Now at Iffco Tokio, I work hands-on with Angular, React, and Spring Boot to craft scalable web applications.
                I thrive on solving complex problems with clean code and am always eager to explore new technologies and keep learning.
              </p>
            </div>

            <ul className="space-y-3 mt-4">
              {bullets.map((item, index) => (
                <li
                  key={index}
                  className="about-animate flex items-start gap-3 text-text-secondary dark:text-gray-300 pb-3 border-b border-pastel-blue/20 dark:border-white/[0.06] last:border-b-0"
                >
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-pastel-blue dark:bg-pastel-powder ring-2 ring-pastel-blue/30 dark:ring-pastel-powder/30" />
                  <span className="leading-relaxed text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <p className="about-animate text-sm text-text-muted dark:text-gray-300 mt-6 text-center lg:text-left">
              When I'm not coding, I'm sketching ideas, solving Rubik's cubes, or enjoying football, F1. Always curious, always learning.
            </p>
          </div>

          {/* Right Column - Image/Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Elements - Soft Pastels */}
              <div className="absolute inset-0 bg-pastel-blue/20 rounded-3xl rotate-6" />
              <div className="absolute inset-0 bg-pastel-lavender/20 rounded-3xl -rotate-6" />

              {/* Main Container */}
              <div className="relative bg-pastel-fog dark:bg-white/[0.04] rounded-3xl overflow-hidden aspect-square shadow-xl border border-pastel-powder/30 dark:border-white/[0.08] flex items-center justify-center">
                <motion.img
                  src={`${process.env.PUBLIC_URL}/khushwant.png`}
                  alt="Professional Photograph"
                  className="w-3/4 h-3/4 object-cover rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 px-6 py-4 bg-white dark:bg-white/[0.06] rounded-2xl shadow-xl border border-pastel-blue/30 dark:border-white/[0.1]"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-text-primary dark:text-white">
                    2+
                  </div>
                  <div className="text-sm text-text-muted dark:text-gray-300 font-medium">
                    Years Experience
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Grid - Flat Pastel Cards */}
            {/* <motion.div
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
                  <div className="text-sm text-text-secondary dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
