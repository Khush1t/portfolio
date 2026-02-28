import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiSend,
  FiCheck,
} from 'react-icons/fi';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'khushwant0328@gmail.com',
      href: 'mailto:khushwant0328@gmail.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+91 880 0170 875',
      href: 'tel:+918800170875',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'New Delhi, India',
      href: 'https://www.google.com/maps/place/New+Delhi,+Delhi,+India',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/khush1t',
      color: '#0077B5',
    },
    {
      icon: FiGithub,
      name: 'GitHub',
      href: 'https://github.com/Khush1t',
      color: '#333',
    },
    {
      icon: FiTwitter,
      name: 'Twitter',
      href: 'https://x.com/Khush_1t',
      color: '#1DA1F2',
    },
  ];

  const validateForm = (values = formData) => {
    const newErrors = {};

    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    if (!trimmedValues.name) {
      newErrors.name = 'Name is required';
    } else if (trimmedValues.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedValues.name)) {
      newErrors.name = 'Name can only contain letters, spaces, apostrophes, and hyphens';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedValues.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(trimmedValues.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!trimmedValues.subject) {
      newErrors.subject = 'Subject is required';
    } else if (trimmedValues.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (trimmedValues.subject.length > 120) {
      newErrors.subject = 'Subject must be less than 120 characters';
    }

    if (!trimmedValues.message) {
      newErrors.message = 'Message is required';
    } else if (trimmedValues.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (trimmedValues.message.length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const trimmedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!validateForm(trimmedFormData)) {
      return;
    }

    setIsSubmitting(true);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setIsSubmitting(false);
      setSubmitError('Email service is not configured yet. Please try again later.');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: trimmedFormData.name,
          from_email: trimmedFormData.email,
          subject: trimmedFormData.subject,
          message: trimmedFormData.message,
          reply_to: trimmedFormData.email,
          to_name: 'Khushwant',
        },
        {
          publicKey,
        }
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitError('Failed to send message. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-primary-300/20 dark:bg-primary-700/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-purple-300/20 dark:bg-purple-700/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.12),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.14),transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Have a project in mind? Let's discuss how we can work together
            </p>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary-600 to-purple-600" />
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-5 lg:col-span-2 lg:space-y-6">
              {/* Contact Cards */}
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 6 }}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 dark:border-dark-600 bg-white/80 dark:bg-dark-900/70 p-4 sm:p-5 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-primary-300/70 dark:hover:border-primary-600/60 transition-all"
                  >
                    <div
                      className={`rounded-xl bg-gradient-to-br ${info.color} p-3.5 shadow-lg shadow-black/10`}
                    >
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="mb-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        {info.title}
                      </h4>
                      <p className="truncate text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-gray-200/80 dark:border-dark-600 bg-white/80 dark:bg-dark-900/70 p-5 sm:p-6 backdrop-blur-xl shadow-sm"
              >
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Connect with me
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-xl border border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-800/80 p-3.5 hover:bg-gradient-to-br hover:from-primary-500 hover:to-purple-600 hover:border-transparent shadow-sm transition-all"
                      aria-label={social.name}
                    >
                      <social.icon
                        size={22}
                        className="text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Availability Badge */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-emerald-300/60 dark:border-emerald-700/50 bg-gradient-to-br from-emerald-500 to-green-600 p-5 sm:p-6 text-white shadow-lg shadow-emerald-900/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                  <h4 className="font-semibold">Available for Work</h4>
                </div>
                <p className="text-sm text-emerald-50/90">
                  Currently accepting new projects and opportunities
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-gray-200/80 dark:border-dark-600 bg-white/85 dark:bg-dark-900/75 p-5 sm:p-7 lg:p-8 backdrop-blur-xl shadow-xl"
              >
                <div className="space-y-5 sm:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={80}
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 dark:border-dark-600 focus:border-primary-500 dark:focus:border-primary-400'
                        } bg-white dark:bg-dark-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none shadow-sm focus:shadow-md`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={120}
                      aria-invalid={Boolean(errors.email)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 dark:border-dark-600 focus:border-primary-500 dark:focus:border-primary-400'
                        } bg-white dark:bg-dark-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none shadow-sm focus:shadow-md`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      maxLength={120}
                      aria-invalid={Boolean(errors.subject)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.subject
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 dark:border-dark-600 focus:border-primary-500 dark:focus:border-primary-400'
                        } bg-white dark:bg-dark-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none shadow-sm focus:shadow-md`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      maxLength={2000}
                      aria-invalid={Boolean(errors.message)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 dark:border-dark-600 focus:border-primary-500 dark:focus:border-primary-400'
                        } bg-white dark:bg-dark-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none shadow-sm focus:shadow-md transition-colors resize-none`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {submitError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                    >
                      {submitError}
                    </motion.p>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-3.5 sm:py-4 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isSubmitted
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:shadow-xl hover:brightness-110'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <FiCheck size={20} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <FiSend size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

