import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      href: 'https://github.com/Khush1t',
      label: 'GitHub',
      hoverBg: 'dark:hover:bg-pastel-powder/[0.26]',
      hoverBorder: 'dark:hover:border-pastel-powder/70',
      hoverIcon: 'dark:group-hover:text-pastel-powder',
    },
    {
      icon: FiLinkedin,
      href: 'https://linkedin.com/in/khush1t',
      label: 'LinkedIn',
      hoverBg: 'dark:hover:bg-pastel-blue/[0.28]',
      hoverBorder: 'dark:hover:border-pastel-blue/70',
      hoverIcon: 'dark:group-hover:text-pastel-blue',
    },
    {
      icon: FiTwitter,
      href: 'https://twitter.com/Khush_1t',
      label: 'Twitter',
      hoverBg: 'dark:hover:bg-pastel-coral/[0.28]',
      hoverBorder: 'dark:hover:border-pastel-coral/70',
      hoverIcon: 'dark:group-hover:text-pastel-coral',
    },
    {
      icon: FiMail,
      href: 'mailto:khushwant0328@gmail.com',
      label: 'Email',
      hoverBg: 'dark:hover:bg-pastel-lavender/[0.28]',
      hoverBorder: 'dark:hover:border-pastel-lavender/70',
      hoverIcon: 'dark:group-hover:text-pastel-lavender',
    },
  ];

  const handleNavClick = (href) => {
    const target = document.querySelector(href);
    if (!target) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, 'top top');
      return;
    }

    target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-pastel-fog dark:bg-dark-900 text-text-primary dark:text-white">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111827' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-pastel-blue/20 dark:bg-pastel-blue/[0.12] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-pastel-lavender/20 dark:bg-pastel-lavender/[0.12] blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Main Footer Content */}
        <div className="rounded-3xl border border-pastel-blue/30 dark:border-white/[0.12] bg-white/80 dark:bg-white/[0.08] backdrop-blur-xl shadow-xl p-5 sm:p-7 lg:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display font-bold mb-4">
                Khushwant
              </h3>
              <p className="text-text-muted dark:text-gray-300 mb-4 leading-relaxed text-sm sm:text-base max-w-xs">
                Creating beautiful, functional, and user-friendly digital experiences.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-2.5 border border-pastel-blue/30 dark:border-white/[0.16] bg-pastel-fog dark:bg-dark-700/80 text-text-muted dark:text-gray-100 rounded-lg hover:bg-pastel-blue/20 ${social.hoverBg} hover:border-pastel-blue/50 ${social.hoverBorder} hover:text-text-primary transition-all`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} className={`transition-colors ${social.hoverIcon}`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      href={link.href}
                      className="text-text-muted dark:text-gray-300 hover:text-text-primary dark:hover:text-pastel-powder transition-colors inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* More Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                {quickLinks.slice(3).map((link) => (
                  <li key={link.name}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      href={link.href}
                      className="text-text-muted dark:text-gray-300 hover:text-text-primary dark:hover:text-pastel-powder transition-colors inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-text-muted dark:text-gray-300 text-sm sm:text-base">
                <li>
                  <a
                    href="mailto:khushwant0328@gmail.com"
                    className="hover:text-text-primary dark:hover:text-pastel-powder transition-colors break-all"
                  >
                    khushwant0328@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+91 8800170875"
                    className="hover:text-text-primary dark:hover:text-pastel-powder transition-colors"
                  >
                    +91 880 0170 875
                  </a>
                </li>
                <li className="text-text-muted dark:text-gray-300">
                  New Delhi, India
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-pastel-blue/20 dark:border-white/[0.06] my-6 sm:my-7" />

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-text-muted dark:text-gray-300 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Khushwant. All rights reserved.{' '}
              <span className="inline-flex items-center gap-1">
                Made with <FiHeart className="text-red-500 animate-pulse" size={14} /> and lots of coffee
              </span>
            </p>

            {/* Scroll to Top Button */}
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              className="p-3 bg-pastel-lavender/50 dark:bg-pastel-lavender/65 rounded-full shadow-lg hover:shadow-xl transition-all text-text-primary dark:text-dark-900"
              aria-label="Scroll to top"
            >
              <FiArrowUp size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

