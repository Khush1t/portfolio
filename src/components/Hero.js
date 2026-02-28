import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const Hero = () => {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pastel-fog dark:bg-dark-900"
    >
      {/* 3D Background - Subtle */}
      {/* <Suspense fallback={null}>
        <div className="opacity-30">
          <Hero3DBackground />
        </div>
      </Suspense> */}

      {/* Soft Pastel Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pastel-blue/20 dark:bg-pastel-blue/[0.12] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-pastel-lavender/20 dark:bg-pastel-lavender/[0.12] rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >

          {/* Main Heading - Large & Bold */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight text-text-primary dark:text-white"
          >
            Hi, I'm{' '}
            <span className="text-text-primary dark:text-white">
              Khushwant
            </span>
          </motion.h1>

          {/* Dynamic Subtitle */}
          <motion.div
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-secondary dark:text-gray-300 mb-8 h-14 flex items-center justify-center"
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2500,
                'UI/UX Designer',
                2500,
                'Problem Solver',
                2500,
                'Tech Enthusiast',
                2500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text-muted dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Crafting exceptional digital experiences through clean code,
            modern design, and innovative solutions.
          </motion.p>

          {/* CTA Buttons - Flat Pastel */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleScroll('#projects')}
              className="group px-8 py-4 bg-pastel-lavender hover:bg-pastel-lavender/80 dark:bg-pastel-lavender/70 dark:hover:bg-pastel-lavender/85 text-text-primary dark:text-dark-900 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              View My Work
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="My_Resume.pdf"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/90 dark:bg-white/[0.12] dark:hover:bg-white/[0.18] backdrop-blur-sm text-text-primary dark:text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all border border-pastel-blue/30 dark:border-white/[0.16] flex items-center gap-2"
            >
              <FiDownload size={20} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links - Clean Pastel Cards */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            {[
              {
                icon: FiGithub,
                href: 'https://github.com/Khush1t',
                label: 'GitHub',
                bg: 'bg-pastel-powder/70 hover:bg-pastel-powder/100',
                hoverBg: 'dark:hover:bg-pastel-powder/[0.26]',
                hoverBorder: 'dark:hover:border-pastel-powder/70',
                hoverIcon: 'dark:group-hover:text-pastel-powder',
              },
              {
                icon: FiLinkedin,
                href: 'https://linkedin.com/in/khush1t',
                label: 'LinkedIn',
                bg: 'bg-pastel-blue/70 hover:bg-pastel-blue/100',
                hoverBg: 'dark:hover:bg-pastel-blue/[0.28]',
                hoverBorder: 'dark:hover:border-pastel-blue/70',
                hoverIcon: 'dark:group-hover:text-pastel-blue',
              },
              {
                icon: FiMail,
                href: 'mailto:khushwant0328@gmail.com',
                label: 'Email',
                bg: 'bg-pastel-peach/70 hover:bg-pastel-peach/100',
                hoverBg: 'dark:hover:bg-pastel-coral/[0.28]',
                hoverBorder: 'dark:hover:border-pastel-coral/70',
                hoverIcon: 'dark:group-hover:text-pastel-coral',
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-4 rounded-2xl ${social.bg} dark:bg-dark-700/80 ${social.hoverBg} text-text-primary dark:text-gray-100 transition-all shadow-sm hover:shadow-md border border-gray-200/30 dark:border-white/[0.16] ${social.hoverBorder}`}
                aria-label={social.label}
              >
                <social.icon size={22} className={`transition-colors ${social.hoverIcon}`} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="cursor-pointer"
          onClick={() => handleScroll('#about')}
        >
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/40 dark:border-gray-600 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-text-muted dark:bg-gray-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
