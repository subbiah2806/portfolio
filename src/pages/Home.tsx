import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/features/Hero';
import Skills from '../components/features/Skills';
import CodeEditor from '../components/features/CodeEditor';
import { resumeData } from '../data/resume';
import { projects } from '../data/projects';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { IconArrowRight } from '../components/icons';

const Home = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const previewProjects = projects.slice(0, 3);

  // Disable animations if user prefers reduced motion
  const animation = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
      };

  return (
    <div>
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Skills Section */}
      <motion.section id="skills" className="py-20" {...animation} variants={fadeInUp}>
        <Skills />
      </motion.section>

      {/* Projects Preview Section */}
      <motion.section
        id="projects-preview"
        className="px-4 py-20"
        {...animation}
        variants={fadeInUp}
      >
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <h2 className="mb-4 text-center text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Featured Projects
          </h2>
          <p className="mb-12 text-center text-neutral-700 dark:text-neutral-400">
            Explore some of my key achievements and impactful projects
          </p>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {previewProjects.map((project) => {
              const categoryColors: Record<string, string> = {
                AI: 'bg-primary-900/50 text-primary-300 border-primary-700/50',
                Security: 'bg-error-500/20 text-error-300 border-error-700/50',
                Performance: 'bg-accent-900/50 text-accent-300 border-accent-700/50',
                DevOps: 'bg-neutral-800/60 text-neutral-300 border-neutral-600/50',
                Testing: 'bg-success-500/20 text-success-300 border-success-700/50',
                Visualization: 'bg-warning-500/20 text-warning-300 border-warning-700/50',
              };

              return (
                <motion.div
                  key={project.id}
                  className="group rounded-xl border border-neutral-200 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500 hover:shadow-large dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-primary-600/50"
                  variants={fadeInUp}
                  whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[project.category] || categoryColors.DevOps}`}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-500">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="mb-2 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-600 dark:text-neutral-100 dark:group-hover:text-primary-400">
                    {project.title}
                  </h3>

                  {/* Company */}
                  <p className="mb-3 text-sm font-medium text-primary-600 dark:text-primary-400">
                    {project.company}
                  </p>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {project.description}
                  </p>

                  {/* Impact */}
                  <div className="mb-4 rounded-lg border border-accent-300 bg-accent-100 p-3 dark:border-accent-700/30 dark:bg-accent-900/20">
                    <p className="text-sm font-medium text-accent-700 dark:text-accent-400">
                      <span className="mr-1">📊</span>
                      {project.impact}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-primary-300 bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 dark:border-primary-700/50 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700/50 dark:bg-neutral-800/30 dark:text-neutral-400">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* View All Projects Button */}
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-400 bg-primary-100 px-6 py-3 font-medium text-primary-700 transition-all duration-300 hover:border-primary-500 hover:bg-primary-200 hover:shadow-medium dark:border-primary-600/50 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-800/40"
            >
              View All Projects
              <IconArrowRight style={{ fontSize: '20px' }} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section id="experience" className="px-4 py-20" {...animation} variants={fadeInUp}>
        <div className="mx-auto mb-12 max-w-6xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Professional Experience
          </h2>
          <p className="text-center font-mono text-sm text-neutral-700 dark:text-neutral-400">
            {/* Click through the tabs to explore each role */}
          </p>
        </div>
        <CodeEditor experience={resumeData.experience} />
      </motion.section>

      {/* Education Section */}
      <motion.section id="education" className="px-4 py-20" {...animation} variants={fadeInUp}>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Education
          </h2>
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-neutral-200 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-large dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-neutral-600/50"
                variants={fadeInUp}
              >
                <h3 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {edu.degree}
                </h3>
                <p className="mb-1 text-lg font-semibold text-primary-600 dark:text-primary-400">
                  {edu.school}
                </p>
                <p className="text-neutral-700 dark:text-neutral-400">
                  {edu.location} • {edu.date}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
