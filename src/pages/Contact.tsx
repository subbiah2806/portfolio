import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fadeInUp } from '../utils/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  IconEmail,
  IconPhone,
  IconLocation,
  IconLinkedIn,
  IconGitHub,
  IconArrowLeft,
  IconCheckCircle,
  IconAlertCircle,
  IconClose,
  IconBriefcase,
  IconSpinner,
} from '../components/icons';

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = (): JSX.Element => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  // Auto-hide success banner after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const showTimer = setTimeout(() => {
        setShowSuccessBanner(true);
      }, 0);

      const hideTimer = setTimeout(() => {
        setShowSuccessBanner(false);
        setSubmitStatus('idle');
      }, 5000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [submitStatus]);

  // Memoize submit handler
  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      try {
        console.log('Form submitted:', data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        reset();
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitStatus('error');
      }
    },
    [reset]
  );

  // Memoize close banner handler
  const handleCloseBanner = useCallback(() => {
    setShowSuccessBanner(false);
    setSubmitStatus('idle');
  }, []);

  const animation = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        animate: 'visible',
      };

  const contactMethods = [
    {
      icon: <IconEmail style={{ fontSize: '24px' }} />,
      label: 'Email',
      value: 'subbiah2806@gmail.com',
      href: 'mailto:subbiah2806@gmail.com',
    },
    {
      icon: <IconPhone style={{ fontSize: '24px' }} />,
      label: 'Phone',
      value: 'xxx-xxx-xxxx',
      href: 'tel:+16692369786',
    },
    {
      icon: <IconLocation style={{ fontSize: '24px' }} />,
      label: 'Location',
      value: 'Dallas, TX',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <IconLinkedIn style={{ fontSize: '24px' }} />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/subbiah-c-31b339184/',
    },
    {
      icon: <IconGitHub style={{ fontSize: '24px' }} />,
      label: 'GitHub',
      href: 'https://github.com/subbiah2806',
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors duration-300 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
        >
          <IconArrowLeft style={{ fontSize: '16px' }} />
          Back to Home
        </Link>

        {/* Page Title */}
        <motion.div className="mb-16 text-center" {...animation} variants={fadeInUp}>
          <h1 className="mb-4 text-5xl font-bold text-neutral-900 dark:text-neutral-100">
            Get In Touch
          </h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-400">
            Have a project in mind? Let&rsquo;s discuss how we can work together.
          </p>
        </motion.div>

        {/* Success Banner */}
        {showSuccessBanner && (
          <motion.div
            className="mb-8 rounded-lg border border-success-600/50 bg-success-500/20 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <IconCheckCircle
                  style={{ fontSize: '20px' }}
                  className="mt-0.5 flex-shrink-0 text-success-500"
                />
                <div>
                  <p className="font-medium text-success-500">
                    Thank you! Your message has been sent.
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    I&rsquo;ll get back to you as soon as possible.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseBanner}
                className="clickable text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                aria-label="Close success message"
              >
                <IconClose style={{ fontSize: '20px' }} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Error Banner */}
        {submitStatus === 'error' && (
          <motion.div
            className="mb-8 rounded-lg border border-error-600/50 bg-error-500/20 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <IconAlertCircle
                style={{ fontSize: '20px' }}
                className="mt-0.5 flex-shrink-0 text-error-500"
              />
              <div>
                <p className="font-medium text-error-500">Oops! Something went wrong.</p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Please try again or email me directly at{' '}
                  <a
                    href="mailto:subbiah2806@gmail.com"
                    className="text-error-400 hover:text-error-300 underline"
                  >
                    subbiah2806@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div {...animation} variants={fadeInUp}>
            <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Contact Information
            </h2>
            <p className="mb-8 text-neutral-700 dark:text-neutral-400">
              Feel free to reach out through any of these channels. I&rsquo;m always open to
              discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="clickable flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-4 transition-all duration-300 hover:border-primary-500 hover:shadow-medium dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-primary-600/50"
                >
                  <div className="text-primary-500 dark:text-primary-400">{method.icon}</div>
                  <div>
                    <h3 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                      {method.label}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Connect with me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clickable flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-all duration-300 hover:border-primary-500 hover:text-primary-500 hover:shadow-medium dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:border-primary-600/50 dark:hover:text-primary-400"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Info */}
            <div className="mt-8 rounded-lg border border-primary-300 bg-primary-50 p-6 dark:border-primary-700/30 dark:bg-primary-900/20">
              <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">
                Currently Available
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-400">
                I&rsquo;m actively seeking new opportunities as a Lead Frontend Developer. Available
                for full-time positions and consulting projects.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-500">
                <IconBriefcase style={{ fontSize: '16px' }} />
                <span>Work Visa: H1B (I-140 Approved)</span>
              </div>
            </div>

            {/* Prefer Email */}
            <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-500">
              <p>
                Prefer email?{' '}
                <a
                  href="mailto:subbiah2806@gmail.com"
                  className="text-primary-600 underline hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Send a direct email
                </a>
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div {...animation} variants={fadeInUp}>
            <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Name <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full rounded-lg border px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-all duration-300 dark:text-neutral-100 ${
                    errors.name
                      ? 'border-error-500 bg-error-500/10'
                      : 'border-neutral-300 bg-neutral-50 dark:border-neutral-700/50 dark:bg-neutral-800/50'
                  }`}
                  placeholder="Your name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="dark:text-error-400 mt-1 text-sm text-error-500"
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email <span className="text-error-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full rounded-lg border px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-all duration-300 dark:text-neutral-100 ${
                    errors.email
                      ? 'border-error-500 bg-error-500/10'
                      : 'border-neutral-300 bg-neutral-50 dark:border-neutral-700/50 dark:bg-neutral-800/50'
                  }`}
                  placeholder="your.email@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="dark:text-error-400 mt-1 text-sm text-error-500"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Subject{' '}
                  <span className="text-xs text-neutral-600 dark:text-neutral-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-all duration-300 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:text-neutral-100"
                  placeholder="What would you like to discuss?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Message <span className="text-error-500">*</span>
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className={`w-full rounded-lg border px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-all duration-300 dark:text-neutral-100 ${
                    errors.message
                      ? 'border-error-500 bg-error-500/10'
                      : 'border-neutral-300 bg-neutral-50 dark:border-neutral-700/50 dark:bg-neutral-800/50'
                  }`}
                  placeholder="Tell me about your project or opportunity..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="dark:text-error-400 mt-1 text-sm text-error-500"
                    role="alert"
                  >
                    {errors.message.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-500">
                  Min 10 characters, max 1000 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="clickable w-full rounded-lg border border-primary-400 bg-primary-100 px-6 py-3 font-medium text-primary-700 transition-all duration-300 hover:border-primary-500 hover:bg-primary-200 hover:shadow-medium disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-600/50 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-800/40"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <IconSpinner style={{ fontSize: '20px' }} className="animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
