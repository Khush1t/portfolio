import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiHome, FiUser, FiCode, FiGrid, FiBriefcase, FiMail } from 'react-icons/fi';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [isPanning, setIsPanning] = useState(false);
  const [panIndex, setPanIndex] = useState(0);
  const panIndexRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const autoScrollTimerRef = useRef(null);
  const mobileTrackRef = useRef(null);
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
      if (isAutoScrollingRef.current) return;

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

  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: FiHome },
    { name: 'About', href: '#about', icon: FiUser },
    { name: 'Skills', href: '#skills', icon: FiCode },
    { name: 'Projects', href: '#projects', icon: FiGrid },
    { name: 'Experience', href: '#experience', icon: FiBriefcase },
    { name: 'Contact', href: '#contact', icon: FiMail },
  ];

  const handleNavClick = (href) => {
    const nextIndex = navItems.findIndex((item) => item.href === href);
    if (nextIndex >= 0) {
      panIndexRef.current = nextIndex;
      setPanIndex(nextIndex);
    }

    isAutoScrollingRef.current = true;
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }

    setActiveSection(href);
    const target = document.querySelector(href);
    if (target) {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(target, true, 'top top');
      } else {
        requestAnimationFrame(() => {
          const nextSmoother = ScrollSmoother.get();
          if (nextSmoother) {
            nextSmoother.scrollTo(target, true, 'top top');
          } else {
            const targetTop = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
          }
        });
      }
    }

    autoScrollTimerRef.current = setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 1400);
  };

  const activeIndex = Math.max(0, navItems.findIndex((item) => item.href === activeSection));
  const highlightIndex = isPanning ? panIndex : panIndex;

  useEffect(() => {
    if (!isPanning) {
      panIndexRef.current = activeIndex;
      setPanIndex(activeIndex);
    }
  }, [activeIndex, isPanning]);

  const getIndexFromPointX = (pointX) => {
    const track = mobileTrackRef.current;
    if (!track) return activeIndex;

    const rect = track.getBoundingClientRect();
    const rawRatio = (pointX - rect.left) / rect.width;
    const clampedRatio = Math.min(0.999, Math.max(0, rawRatio));
    return Math.floor(clampedRatio * navItems.length);
  };

  const handlePointerDown = (event) => {
    isPointerDownRef.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const index = getIndexFromPointX(event.clientX);
    panIndexRef.current = index;
    setIsPanning(true);
    setPanIndex(index);
  };

  const handlePointerMove = (event) => {
    if (!isPointerDownRef.current) return;
    const index = getIndexFromPointX(event.clientX);
    if (index !== panIndexRef.current) {
      panIndexRef.current = index;
      setPanIndex(index);
    }
  };

  const handlePointerEnd = (event) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const target = navItems[panIndexRef.current];
    setIsPanning(false);
    if (target) {
      handleNavClick(target.href);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`transition-all duration-500 ease-in-out ${scrolled ? 'mt-4' : 'mt-6'}`}
        >
          <div
            className={`max-w-6xl mx-auto transition-all duration-500 ${scrolled
              ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-lg border border-pastel-blue/30 dark:border-white/[0.1]'
              : 'bg-white/70 dark:bg-dark-900/70 backdrop-blur-lg shadow-md border border-pastel-blue/20 dark:border-white/[0.06]'
              } rounded-4xl`}
            style={{
              backdropFilter: 'blur(4px) saturate(160%)',
              WebkitBackdropFilter: 'blur(4px) saturate(160%)',
            }}
          >
            <div className={`flex justify-between items-center transition-all duration-300 px-4 sm:px-6 ${scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="font-display font-bold text-xl md:text-2xl cursor-pointer"
                onClick={() => handleNavClick('#home')}
              >
                <span className="text-text-primary dark:text-white">Khushwant</span>
              </motion.div>

              <div className="flex items-center space-x-2">
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
                      : 'text-text-secondary dark:text-gray-200 hover:text-text-primary dark:hover:text-white'
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

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9, rotate: 180 }}
                  onClick={toggleTheme}
                  className="ml-2 p-2.5 rounded-3xl bg-pastel-lavender/50 hover:bg-pastel-lavender/70 dark:bg-pastel-lavender/70 dark:hover:bg-pastel-lavender/100 text-text-primary dark:text-dark-900 transition-all"
                  aria-label="Toggle theme"
                >
                  {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Top Bar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-pastel-blue/25 dark:border-white/[0.08] bg-white/92 dark:bg-dark-900/85 shadow-[0_1px_8px_rgba(15,23,42,0.08)] dark:shadow-none"
        style={{
          backdropFilter: 'blur(8px) saturate(180%)',
          WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        }}
      >
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            className="font-display font-semibold text-lg text-text-primary dark:text-white"
            onClick={() => handleNavClick('#home')}
          >
            Khushwant
          </button>

          <motion.button
            whileTap={{ scale: 0.92, rotate: 180 }}
            onClick={toggleTheme}
            className="h-9 w-9 inline-flex items-center justify-center rounded-2xl border border-pastel-blue/25 dark:border-white/[0.14] bg-pastel-lavender/25 dark:bg-pastel-lavender/55 text-text-primary dark:text-dark-900"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Floating Bottom Nav */}
      <motion.div
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="md:hidden fixed left-0 right-0 mx-auto z-50 w-[min(92vw,22rem)]"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 10px)' }}
      >
        <motion.div
          ref={mobileTrackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className="relative rounded-[24px] border border-white/20 dark:border-white/10 bg-white/5 dark:bg-dark-900/12 shadow-md"
          style={{
            backdropFilter: 'blur(8px) saturate(150%)',
            WebkitBackdropFilter: 'blur(8px) saturate(150%)',
            touchAction: 'none',
          }}
        >
          <motion.div
            className="absolute top-1 bottom-1 rounded-[20px] border border-pastel-blue/35 dark:border-white/20 bg-white/10 dark:bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_1px_6px_rgba(15,23,42,0.1)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_6px_rgba(0,0,0,0.2)]"
            animate={{
              left: `calc(0.25rem + ${highlightIndex} * ((100% - 0.5rem) / ${navItems.length}))`,
              width: `calc((100% - 0.5rem) / ${navItems.length})`,
            }}
            transition={{ type: 'tween', duration: 0.2, ease: 'linear' }}
            style={{
              backgroundImage: darkMode
                ? 'linear-gradient(180deg, rgba(255,255,255,0.53) 0%, rgba(255,255,255,0) 48%, rgba(255,255,255,0) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.08) 100%)',
            }}
          />

          <div className="relative grid grid-cols-6 gap-0 p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === activeSection;

              return (
                <motion.button
                  key={item.name}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`h-11 rounded-2xl inline-flex items-center justify-center transition-colors ${isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-700/70 dark:text-gray-200/90'
                    }`}
                  aria-label={item.name}
                >
                  <Icon size={18} />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navigation;

