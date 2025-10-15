import { useState, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Experience } from '../../types/resume.types';

interface CodeEditorProps {
  experience: Experience[];
}

export default function CodeEditor({ experience }: CodeEditorProps): JSX.Element {
  const [selectedJob, setSelectedJob] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
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
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-large dark:border-neutral-700/50 dark:bg-neutral-900">
        {/* Editor Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100/80 px-4 py-2 dark:border-neutral-700/50 dark:bg-neutral-800/80">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-error-500"></div>
              <div className="h-3 w-3 rounded-full bg-warning-500"></div>
              <div className="h-3 w-3 rounded-full bg-success-500"></div>
            </div>
            <div className="ml-4 font-mono text-sm text-neutral-600 dark:text-neutral-400">
              experience.js
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="clickable rounded px-3 py-1 font-mono text-xs text-neutral-600 transition-all duration-200 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200"
            aria-label="Copy code to clipboard"
          >
            {copied ? <span className="text-success-500">✓ Copied!</span> : <span>Copy</span>}
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-1 border-b border-neutral-200 bg-neutral-100/80 px-4 py-1 dark:border-neutral-700/50 dark:bg-neutral-800/80">
          {experience.map((exp, index) => (
            <button
              key={index}
              onClick={() => setSelectedJob(index)}
              className={`clickable whitespace-nowrap rounded-t px-4 py-2 font-mono text-sm transition-colors duration-200 ${
                selectedJob === index
                  ? 'border-t-2 border-primary-500 bg-white text-primary-600 dark:bg-neutral-900 dark:text-primary-400'
                  : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200'
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
            style={vscDarkPlus}
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
              color: '#6b7280',
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
