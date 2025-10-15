import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Projects from '../components/features/Projects';
import { fadeInUp } from '../utils/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ProjectsPage = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  const animation = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        animate: 'visible',
      };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors duration-300 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
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
          <motion.div className="mb-12" {...animation} variants={fadeInUp}>
            <h1 className="mb-4 text-5xl font-bold text-neutral-900 dark:text-neutral-100">
              All Projects
            </h1>
            <p className="text-lg text-neutral-700 dark:text-neutral-400">
              A comprehensive showcase of my work across AI, security, performance optimization, and
              more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Component */}
      <Projects />
    </div>
  );
};

export default ProjectsPage;
