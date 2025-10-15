import { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { projects, projectCategories, type ProjectCategory } from '../../data/projects';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type CategoryColorKey = 'AI' | 'Security' | 'Performance' | 'DevOps' | 'Testing' | 'Visualization';

// Memoized ProjectCard component
interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    company: string;
    description: string;
    impact: string;
    techStack: string[];
    category: CategoryColorKey;
    year: string;
  };
  categoryColors: Record<CategoryColorKey, string>;
  prefersReducedMotion: boolean;
}

const ProjectCard = memo(({ project, categoryColors, prefersReducedMotion }: ProjectCardProps) => {
  return (
    <motion.div
      className="group rounded-xl border border-neutral-200 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-400/50 hover:shadow-large dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-primary-600/50"
      variants={fadeInUp}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Category Badge */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[project.category]}`}
        >
          {project.category}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-500">{project.year}</span>
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
      <div className="mb-4 rounded-lg border border-accent-300/30 bg-accent-100/20 p-3 dark:border-accent-700/30 dark:bg-accent-900/20">
        <p className="text-sm font-medium text-accent-700 dark:text-accent-400">
          <span className="mr-1">📊</span>
          {project.impact}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-primary-300/50 bg-primary-100/30 px-2 py-1 text-xs font-medium text-primary-700 dark:border-primary-700/50 dark:bg-primary-900/30 dark:text-primary-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

function Projects(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const prefersReducedMotion = useReducedMotion();

  // Memoize category colors
  const categoryColors = useMemo<Record<CategoryColorKey, string>>(
    () => ({
      AI: 'bg-primary-900/50 text-primary-300 border-primary-700/50',
      Security: 'bg-error-500/20 text-error-300 border-error-700/50',
      Performance: 'bg-accent-900/50 text-accent-300 border-accent-700/50',
      DevOps: 'bg-neutral-800/60 text-neutral-300 border-neutral-600/50',
      Testing: 'bg-success-500/20 text-success-300 border-success-700/50',
      Visualization: 'bg-warning-500/20 text-warning-300 border-warning-700/50',
    }),
    []
  );

  // Memoize filtered projects
  const filteredProjects = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter]
  );

  // Memoize filter handler
  const handleFilterChange = useCallback((category: ProjectCategory) => {
    setActiveFilter(category);
  }, []);

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <h2 className="mb-4 text-center text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Featured Projects
        </h2>
        <p className="mb-12 text-center text-neutral-600 dark:text-neutral-400">
          Explore my key achievements and impactful projects across AI, security, and performance
          optimization
        </p>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`clickable rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'border-primary-400 bg-primary-100/50 text-primary-700 shadow-medium dark:border-primary-600 dark:bg-primary-900/50 dark:text-primary-300'
                  : 'border-neutral-300/50 bg-white/50 text-neutral-600 hover:border-neutral-400/50 hover:bg-neutral-50 hover:text-neutral-700 dark:border-neutral-700/50 dark:bg-neutral-800/30 dark:text-neutral-400 dark:hover:border-neutral-600/50 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-300'
              }`}
              aria-pressed={activeFilter === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activeFilter} // Re-animate when filter changes
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              categoryColors={categoryColors}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="rounded-xl border border-neutral-200 bg-white p-12 text-center dark:border-neutral-700/50 dark:bg-neutral-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-neutral-600 dark:text-neutral-400">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Project Count */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);
