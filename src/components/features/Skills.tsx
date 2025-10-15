import { resumeData } from '../../data/resume';

type ColorKey = 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'teal' | 'red';

interface SkillCategory {
  name: string;
  skills: string[];
  color: ColorKey;
}

export default function Skills(): JSX.Element {
  const skillCategories: SkillCategory[] = [
    { name: 'Frontend', skills: resumeData.skills.frontend, color: 'blue' },
    { name: 'AI Tools', skills: resumeData.skills.aiTools, color: 'purple' },
    { name: 'Performance', skills: resumeData.skills.performance, color: 'green' },
    { name: 'Styling', skills: resumeData.skills.styling, color: 'pink' },
    { name: 'Backend', skills: resumeData.skills.backend, color: 'orange' },
    { name: 'DevOps & Cloud', skills: resumeData.skills.devOps, color: 'teal' },
    { name: 'Security', skills: resumeData.skills.security, color: 'red' },
  ];

  const colorClasses: Record<ColorKey, string> = {
    blue: 'bg-primary-100/50 text-primary-700 border-primary-300/50 dark:bg-primary-900/50 dark:text-primary-300 dark:border-primary-700/50',
    purple:
      'bg-primary-100/40 text-primary-800 border-primary-300/40 dark:bg-primary-900/40 dark:text-primary-400 dark:border-primary-700/40',
    green:
      'bg-accent-100/50 text-accent-700 border-accent-300/50 dark:bg-accent-900/50 dark:text-accent-300 dark:border-accent-700/50',
    pink: 'bg-neutral-100/60 text-neutral-700 border-neutral-300/50 dark:bg-neutral-800/60 dark:text-neutral-300 dark:border-neutral-600/50',
    orange:
      'bg-neutral-100/50 text-neutral-700 border-neutral-300/40 dark:bg-neutral-800/50 dark:text-neutral-300 dark:border-neutral-600/40',
    teal: 'bg-accent-100/40 text-accent-800 border-accent-300/40 dark:bg-accent-900/40 dark:text-accent-400 dark:border-accent-700/40',
    red: 'bg-neutral-100/70 text-neutral-700 border-neutral-300/60 dark:bg-neutral-800/70 dark:text-neutral-300 dark:border-neutral-600/60',
  };

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 animate-fade-in text-center text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Technology Skills
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <div
              key={category.name}
              className="animate-slide-up rounded-xl border border-neutral-200 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300/50 hover:shadow-large dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:hover:border-neutral-600/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-200 hover:bg-opacity-80 ${colorClasses[category.color]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
