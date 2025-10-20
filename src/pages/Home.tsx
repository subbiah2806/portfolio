import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { lazy, Suspense } from 'react';
import Hero from '../components/features/Hero';
import Skills from '../components/features/Skills';
import { resumeData } from '../data/resume';
import { projects } from '../data/projects';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Button } from '@subbiah/reusable/components/ui/button';
import { Badge } from '@subbiah/reusable/components/ui/badge';
import { Card, CardHeader, CardContent } from '@subbiah/reusable/components/ui/card';

// Lazy load CodeEditor to avoid bundling 8.7MB react-syntax-highlighter in main chunk
const CodeEditor = lazy(() => import('../components/features/CodeEditor'));

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
          <h2 className="mb-4 text-center text-4xl font-bold text-foreground">Featured Projects</h2>
          <p className="mb-12 text-center text-muted-foreground">
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
              return (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group h-full backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-lg">
                    <CardHeader>
                      {/* Category Badge */}
                      <div className="mb-4 flex items-center justify-between">
                        <Badge variant="primary">{project.category}</Badge>
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
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
                      <div className="mb-4 rounded-lg border border-border bg-background p-3">
                        <p className="text-sm font-medium text-accent-foreground">
                          <span className="mr-1">📊</span>
                          {project.impact}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge>+{project.techStack.length - 3}</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* View All Projects Button */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/projects" className="inline-flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section id="experience" className="px-4 py-20" {...animation} variants={fadeInUp}>
        <div className="mx-auto mb-12 max-w-6xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-foreground">
            Professional Experience
          </h2>
          <p className="text-center font-mono text-sm text-muted-foreground">
            {/* Click through the tabs to explore each role */}
          </p>
        </div>
        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }
        >
          <CodeEditor experience={resumeData.experience} />
        </Suspense>
      </motion.section>

      {/* Education Section */}
      <motion.section id="education" className="px-4 py-20" {...animation} variants={fadeInUp}>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-foreground">Education</h2>
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {resumeData.education.map((edu, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg">
                  <CardContent className="pt-6">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">{edu.degree}</h3>
                    <p className="mb-1 text-lg font-semibold text-primary">{edu.school}</p>
                    <p className="text-muted-foreground">
                      {edu.location} • {edu.date}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
