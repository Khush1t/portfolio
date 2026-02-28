import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    let ticking = false;

    const updateActiveSection = () => {
      const sections = sectionIds
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((item) => item.element);

      if (!sections.length) return;

      const navProbeLine = 140;
      let currentSection = '#home';

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        if (rect.top <= navProbeLine) {
          currentSection = `#${section.id}`;
        }
      }

      const firstSectionRect = sections[0].element.getBoundingClientRect();
      if (firstSectionRect.top > navProbeLine) {
        currentSection = `#${sections[0].id}`;
      }

      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (nearBottom) {
        currentSection = '#contact';
      }

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection));
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    setActiveSection(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-500 ease-in-out ${scrolled ? 'mt-4' : 'mt-6'
          }`}
      >
        <div className={`max-w-6xl mx-auto transition-all duration-500 ${scrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg border border-pastel-blue/30 dark:border-pastel-powder/20'
          : 'bg-white/70 dark:bg-dark-900/70 backdrop-blur-lg shadow-md border border-pastel-blue/20 dark:border-pastel-powder/10'
          } rounded-4xl`}
          style={{
            backdropFilter: 'blur(4px) saturate(160%)',
            WebkitBackdropFilter: 'blur(4px) saturate(160%)',
          }}
        >
          <div className={`flex justify-between items-center transition-all duration-300 px-4 sm:px-6 ${scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
            }`}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="font-display font-bold text-xl md:text-2xl cursor-pointer"
              onClick={() => handleNavClick('#home')}
            >
              <span className="text-text-primary dark:text-white">
                Khushwant
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeSection === item.href
                    ? 'text-text-primary dark:text-white'
                    : 'text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white'
                    }`}
                >
                  {item.name}
                  {activeSection === item.href && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-pastel-blue dark:bg-pastel-powder"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.a>
              ))}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: 180 }}
                onClick={toggleTheme}
                className="ml-2 p-2.5 rounded-3xl bg-pastel-lavender/30 hover:bg-pastel-lavender/50 text-text-primary dark:text-gray-300 transition-all"
                aria-label="Toggle theme"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: 180 }}
                onClick={toggleTheme}
                className="h-10 w-10 inline-flex items-center justify-center rounded-3xl border border-pastel-blue/25 dark:border-pastel-powder/20 bg-pastel-lavender/25 hover:bg-pastel-lavender/40 text-text-primary dark:text-gray-300 transition-all"
                aria-label="Toggle theme"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-10 inline-flex items-center justify-center rounded-3xl border border-pastel-blue/25 dark:border-pastel-powder/20 bg-pastel-lavender/25 hover:bg-pastel-lavender/40 text-text-primary dark:text-gray-300 transition-all"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`md:hidden mt-2 mx-1 rounded-3xl overflow-hidden ${scrolled
                ? 'bg-white/45 dark:bg-dark-900/45 backdrop-blur-md border border-pastel-blue/25 dark:border-pastel-powder/20'
                : 'bg-white/35 dark:bg-dark-900/35 backdrop-blur-sm border border-pastel-blue/20 dark:border-pastel-powder/15'
                } shadow-lg`}
              style={{
                backdropFilter: 'blur(10px) saturate(160%)',
                WebkitBackdropFilter: 'blur(10px) saturate(160%)',
              }}
            >
              <div className="px-3 py-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    href={item.href}
                    className={`relative block transition-colors text-base font-semibold py-3.5 px-4 rounded-xl ${activeSection === item.href
                      ? 'text-text-primary dark:text-white'
                      : 'text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white'
                      }`}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <span className="absolute left-4 right-4 bottom-1.5 h-0.5 rounded-full bg-pastel-blue dark:bg-pastel-powder" />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navigation;

