import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fadeInUp } from '../utils/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: 'Email',
      value: 'subbiah2806@gmail.com',
      href: 'mailto:subbiah2806@gmail.com',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: 'Phone',
      value: 'xxx-xxx-xxxx',
      href: 'tel:+16692369786',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: 'Location',
      value: 'Dallas, TX',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/subbiah-chandramouli',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: 'GitHub',
      href: 'https://github.com/subbiah',
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
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
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
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
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
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-error-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
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
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
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
