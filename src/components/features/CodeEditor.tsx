import { useState, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Experience } from '../../types/resume.types';
import { useThemeContext } from '@subbiah/component/contexts/ThemeContext';

interface CodeEditorProps {
  experience: Experience[];
}

export default function CodeEditor({ experience }: CodeEditorProps): JSX.Element {
  const [selectedJob, setSelectedJob] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const { theme } = useThemeContext();
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
    <div className="mx-auto w-full max-w-6xl animate-fade-in p-4">
      <div className="overflow-hidden rounded-lg border bg-card shadow-large">
        {/* Editor Header */}
        <div className="flex items-center justify-between border-b bg-muted/80 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <div className="h-3 w-3 rounded-full bg-warning"></div>
              <div className="h-3 w-3 rounded-full bg-success"></div>
            </div>
            <div className="ml-4 font-mono text-sm text-muted-foreground">experience.js</div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="clickable rounded px-3 py-1 font-mono text-xs text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:text-foreground"
            aria-label="Copy code to clipboard"
          >
            {copied ? <span className="text-success">✓ Copied!</span> : <span>Copy</span>}
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-1 border-b bg-muted/80 px-4 py-1">
          {experience.map((exp, index) => (
            <button
              key={index}
              onClick={() => setSelectedJob(index)}
              className={`clickable whitespace-nowrap rounded-t px-4 py-2 font-mono text-sm transition-colors duration-200 ${
                selectedJob === index
                  ? 'border-t-2 border-primary bg-card text-primary'
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
            style={theme === 'dark' ? vscDarkPlus : oneLight}
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
              color: theme === 'dark' ? '#6b7280' : '#9ca3af',
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
