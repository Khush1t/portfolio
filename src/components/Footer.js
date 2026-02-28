import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

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
    { icon: FiGithub, href: 'https://github.com/Khush1t', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/khush1t', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/Khush_1t', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:khushwant0328@gmail.com', label: 'Email' },
  ];

  const handleNavClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 text-gray-800 dark:text-gray-100">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111827' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-primary-300/20 dark:bg-primary-700/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-purple-300/20 dark:bg-purple-700/15 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Main Footer Content */}
        <div className="rounded-3xl border border-gray-200/80 dark:border-dark-600 bg-white/80 dark:bg-dark-900/70 backdrop-blur-xl shadow-xl p-5 sm:p-7 lg:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display font-bold gradient-text mb-4">
                Portfolio
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm sm:text-base max-w-xs">
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
                    className="p-2.5 border border-gray-200 dark:border-dark-600 bg-gray-100 dark:bg-dark-800 rounded-lg hover:bg-gradient-to-br hover:from-primary-600 hover:to-purple-600 hover:border-transparent hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
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
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 transition-colors inline-block"
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
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 transition-colors inline-block"
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
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                <li>
                  <a
                    href="mailto:khushwant0328@gmail.com"
                    className="hover:text-primary-700 dark:hover:text-primary-300 transition-colors break-all"
                  >
                    khushwant0328@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+91 8800170875"
                    className="hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    +91 880 0170 875
                  </a>
                </li>
                <li className="text-gray-600 dark:text-gray-300">
                  New Delhi, India
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-dark-700 my-6 sm:my-7" />

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center md:text-left">
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
              className="p-3 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all text-white"
              aria-label="Scroll to top"
            >
              <FiArrowUp size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
    </footer>
  );
};

export default Footer;

