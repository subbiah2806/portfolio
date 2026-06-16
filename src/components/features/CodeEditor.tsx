import { useState, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Experience } from '../../types/resume.types';
import { useThemeContext } from '@allsetlabs/forge/statefulComponents/theme/context';

interface CodeEditorProps {
  experience: Experience[];
}

export function CodeEditor({ experience }: CodeEditorProps): JSX.Element {
  const [selectedJob, setSelectedJob] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const { resolvedTheme } = useThemeContext();
  const job = experience[selectedJob];

  const generatedCode = useMemo((): string => {
    return `// ${job.company} - ${job.title}
// ${job.period} | ${job.location}

class ${job.company.replace(/\s+/g, '')}Experience {
  constructor() {
    this.role = "${job.title}";
    this.company = "${job.company}";
    this.location = "${job.location}";
    this.period = "${job.period}";
    this.description = \`${job.description}\`;
  }

  getAchievements() {
    return [
      ${job.achievements.map((achievement, i) => `// ${i + 1}. ${achievement}`).join(',\n      ')}
    ];
  }
}

export default ${job.company.replace(/\s+/g, '')}Experience;`;
  }, [job]);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in mx-auto w-full max-w-6xl p-4">
      <div className="bg-card shadow-large overflow-hidden rounded-lg border">
        {/* Editor Header */}
        <div className="bg-muted/80 flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="bg-destructive h-3 w-3 rounded-full"></div>
              <div className="bg-warning h-3 w-3 rounded-full"></div>
              <div className="bg-success h-3 w-3 rounded-full"></div>
            </div>
            <div className="text-muted-foreground ml-4 font-mono text-sm">experience.js</div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="clickable text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded px-3 py-1 font-mono text-xs transition-all duration-200"
            aria-label="Copy code to clipboard"
          >
            {copied ? <span className="text-success">✓ Copied!</span> : <span>Copy</span>}
          </button>
        </div>

        {/* Tab Bar */}
        <div className="bg-muted/80 flex flex-wrap gap-1 border-b px-4 py-1">
          {experience.map((exp, index) => (
            <button
              key={index}
              onClick={() => setSelectedJob(index)}
              className={`clickable whitespace-nowrap rounded-t px-4 py-2 font-mono text-sm transition-colors duration-200 ${
                selectedJob === index
                  ? 'border-primary bg-card text-primary border-t-2'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
              aria-label={`View ${exp.company} experience`}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Code Content with Syntax Highlighting */}
        <div className="relative max-h-[600px] overflow-auto">
          <SyntaxHighlighter
            language="javascript"
            style={resolvedTheme === 'dark' ? vscDarkPlus : oneLight}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
            }}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              color: resolvedTheme === 'dark' ? '#6b7280' : '#9ca3af',
              userSelect: 'none',
            }}
            wrapLines={true}
            wrapLongLines={true}
          >
            {generatedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
