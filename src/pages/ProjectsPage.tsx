import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Projects from '../components/features/Projects';
import { fadeInUp } from '../utils/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { IconArrowLeft } from '../components/icons';

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
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            <IconArrowLeft style={{ fontSize: '16px' }} />
            Back to Home
          </Link>

          {/* Page Title */}
          <motion.div className="mb-12" {...animation} variants={fadeInUp}>
            <h1 className="mb-4 text-5xl font-bold text-foreground">All Projects</h1>
            <p className="text-lg text-muted-foreground">
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
