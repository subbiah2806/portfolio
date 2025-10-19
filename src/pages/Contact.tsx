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
} from '@subbiah/reusable/icons/index';
import { Button } from '@subbiah/reusable/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@subbiah/reusable/components/ui/form';
import { Input } from '@subbiah/reusable/components/ui/input';
import { Textarea } from '@subbiah/reusable/components/ui/textarea';

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

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
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
        form.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitStatus('error');
      }
    },
    [form]
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
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
          <IconArrowLeft style={{ fontSize: '16px' }} />
          Back to Home
        </Link>

        {/* Page Title */}
        <motion.div className="mb-16 text-center" {...animation} variants={fadeInUp}>
          <h1 className="mb-4 text-5xl font-bold text-foreground">Get In Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have a project in mind? Let&rsquo;s discuss how we can work together.
          </p>
        </motion.div>

        {/* Success Banner */}
        {showSuccessBanner && (
          <motion.div
            className="mb-8 rounded-lg border border-success/50 bg-success/20 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <IconCheckCircle
                  style={{ fontSize: '20px' }}
                  className="mt-0.5 flex-shrink-0 text-success"
                />
                <div>
                  <p className="font-medium text-success">Thank you! Your message has been sent.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I&rsquo;ll get back to you as soon as possible.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseBanner}
                className="clickable text-muted-foreground transition-colors hover:text-foreground"
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
            className="mb-8 rounded-lg border border-destructive/50 bg-destructive/20 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <IconAlertCircle
                style={{ fontSize: '20px' }}
                className="mt-0.5 flex-shrink-0 text-destructive"
              />
              <div>
                <p className="font-medium text-destructive">Oops! Something went wrong.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please try again or email me directly at{' '}
                  <a
                    href="mailto:subbiah2806@gmail.com"
                    className="text-destructive underline hover:text-destructive/80"
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
            <h2 className="mb-6 text-2xl font-bold text-foreground">Contact Information</h2>
            <p className="mb-8 text-muted-foreground">
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
                  className="clickable flex items-start gap-4 rounded-lg border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-medium"
                >
                  <div className="text-primary">{method.icon}</div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{method.label}</h3>
                    <p className="text-sm text-muted-foreground">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Connect with me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clickable flex h-12 w-12 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-medium"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Info */}
            <div className="mt-8 rounded-lg border border-primary/30 bg-primary/10 p-6">
              <h3 className="mb-2 font-semibold text-primary-foreground">Currently Available</h3>
              <p className="text-sm text-muted-foreground">
                I&rsquo;m actively seeking new opportunities as a Lead Frontend Developer. Available
                for full-time positions and consulting projects.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <IconBriefcase style={{ fontSize: '16px' }} />
                <span>Work Visa: H1B (I-140 Approved)</span>
              </div>
            </div>

            {/* Prefer Email */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                Prefer email?{' '}
                <a
                  href="mailto:subbiah2806@gmail.com"
                  className="text-primary underline hover:text-primary/80"
                >
                  Send a direct email
                </a>
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div {...animation} variants={fadeInUp}>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Send a Message</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject Field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Subject <span className="text-xs text-muted-foreground">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="What would you like to discuss?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Message <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project or opportunity..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Min 10 characters, max 1000 characters
                      </p>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="clickable w-full"
                  variant="outline"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <IconSpinner style={{ fontSize: '20px' }} className="animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
