import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Frontend & UI
import { FaReact, FaAngular } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiMaterialdesign,
  SiVscodium,
} from 'react-icons/si';

// Backend & Languages
import { FaJava } from 'react-icons/fa';
import { SiSpringboot, SiCplusplus, SiPostgresql } from 'react-icons/si';

// Tools & Platforms
import { FaGitAlt } from 'react-icons/fa';
import {
  SiApachekafka,
  SiRedis,
  SiJsonwebtokens,
  SiPostman,
  SiIntellijidea,
} from 'react-icons/si';

// DevOps & Cloud
import { FaAws } from 'react-icons/fa';
import { SiSubversion } from 'react-icons/si';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'Angular', icon: FaAngular, color: '#C3002F', level: 90 },
        { name: 'React', icon: FaReact, color: '#61DAFB', level: 92 },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 95 },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 90 },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26', level: 95 },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6', level: 95 },
        { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', level: 85 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 90 },
        { name: 'Material-UI', icon: SiMaterialdesign, color: '#0081CB', level: 85 },
        { name: 'PrimeNG', icon: FaAngular, color: '#0C7C59', level: 80 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Java', icon: FaJava, color: '#007396', level: 90 },
        { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F', level: 88 },
        { name: 'REST APIs', icon: SiPostman, color: '#FF6C37', level: 92 },
        { name: 'Microservices', icon: SiSpringboot, color: '#FF5722', level: 85 },
        { name: 'SQL', icon: SiPostgresql, color: '#336791', level: 87 },
        { name: 'C/C++', icon: SiCplusplus, color: '#00599C', level: 80 },
      ],
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Apache Kafka', icon: SiApachekafka, color: '#231F20', level: 80 },
        { name: 'Redis', icon: SiRedis, color: '#DC382D', level: 82 },
        { name: 'JWT / OAuth 2.0', icon: SiJsonwebtokens, color: '#000000', level: 85 },
        { name: 'Log4j2', icon: FaJava, color: '#FF0000', level: 75 },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37', level: 90 },
        { name: 'IntelliJ IDEA', icon: SiIntellijidea, color: '#000000', level: 88 },
        { name: 'VS Code', icon: SiVscodium, color: '#007ACC', level: 92 },
      ],
    },
    {
      title: 'DevOps & Cloud',
      skills: [
        { name: 'AWS (EC2, RDS, S3)', icon: FaAws, color: '#FF9900', level: 80 },
        { name: 'Git/GitHub', icon: FaGitAlt, color: '#F05032', level: 95 },
        { name: 'SVN', icon: SiSubversion, color: '#809CC9', level: 75 },
        { name: 'CI/CD (basic)', icon: FaGitAlt, color: '#00C853', level: 70 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="skills"
      ref={ref}
      className="py-20 md:py-32 bg-gray-50 dark:bg-dark-800 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="space-y-8"
              >
                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white text-center md:text-left">
                  {category.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: categoryIndex * 0.2 + skillIndex * 0.1,
                        duration: 0.5,
                      }}
                      whileHover={{
                        y: -10,
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      className="relative group"
                    >
                      <div className="p-6 bg-white dark:bg-dark-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-dark-700">
                        {/* Icon and Name */}
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 rounded-xl bg-gray-100 dark:bg-dark-800"
                            style={{
                              color: skill.color,
                            }}
                          >
                            <skill.icon size={32} />
                          </motion.div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {skill.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {skill.level}% Proficiency
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                              duration: 1,
                              ease: 'easeOut',
                            }}
                            className="absolute top-0 left-0 h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}dd, ${skill.color})`,
                            }}
                          />
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Also familiar with
            </h4>
            <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
              {[
                'SOAP APIs',
                'WebSockets',
                'CI/CD',
                'Microservices',
                'Testing (Jest, JUnit, Mockito)',
                'Agile/Scrum',
                'Netlify',
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-white dark:bg-dark-900 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-dark-700"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

