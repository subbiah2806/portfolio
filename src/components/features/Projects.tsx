import { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { projects, projectCategories, type ProjectCategory } from '../../data/projects';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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
  prefersReducedMotion: boolean;
}

const ProjectCard = memo(({ project, prefersReducedMotion }: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
        <CardHeader>
          {/* Category Badge */}
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="primary">{project.category}</Badge>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>

          {/* Project Title */}
          <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary dark:group-hover:text-primary">
            {project.title}
          </h3>

          {/* Company */}
          <p className="mb-3 text-sm font-medium text-primary">{project.company}</p>
        </CardHeader>

        <CardContent>
          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Impact */}
          <div className="mb-4 rounded-lg border border-accent/30 bg-accent/20 p-3">
            <p className="text-sm font-medium text-accent-foreground">
              <span className="mr-1">📊</span>
              {project.impact}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

function Projects(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const prefersReducedMotion = useReducedMotion();

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
        <h2 className="mb-4 text-center text-4xl font-bold text-foreground">Featured Projects</h2>
        <p className="mb-12 text-center text-muted-foreground">
          Explore my key achievements and impactful projects across AI, security, and performance
          optimization
        </p>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {projectCategories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange(category)}
              className="clickable rounded-full"
              aria-pressed={activeFilter === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </Button>
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
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="rounded-xl border bg-card p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-muted-foreground">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Project Count */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);
