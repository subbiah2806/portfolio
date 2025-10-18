import { resumeData } from '../../data/resume';
import { Card, CardHeader, CardContent } from '@subbiah/component/components/ui/card';
import { Badge } from '@subbiah/component/components/ui/badge';

interface SkillCategory {
  name: string;
  skills: string[];
}

export default function Skills(): JSX.Element {
  const skillCategories: SkillCategory[] = [
    { name: 'Frontend', skills: resumeData.skills.frontend },
    { name: 'AI Tools', skills: resumeData.skills.aiTools },
    { name: 'Performance', skills: resumeData.skills.performance },
    { name: 'Styling', skills: resumeData.skills.styling },
    { name: 'Backend', skills: resumeData.skills.backend },
    { name: 'DevOps & Cloud', skills: resumeData.skills.devOps },
    { name: 'Security', skills: resumeData.skills.security },
  ];

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 animate-fade-in text-center text-4xl font-bold text-foreground">
          Technology Skills
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Card
              key={category.name}
              className="animate-slide-up transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
