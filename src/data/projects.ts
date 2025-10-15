import type { Project } from '../types/project.types';

export const projects: Project[] = [
  {
    id: 'multi-agent-ai',
    title: 'Claude Code Multi-Agent Orchestration',
    company: 'Praetorian',
    year: '2023-2025',
    description:
      'Architected intelligent multi-agent AI system with specialized agents for React, Tailwind, Go, AWS, code review, code analysis, and security scanning. Created orchestration commands for intelligent agent routing.',
    techStack: ['Claude AI', 'TypeScript', 'React', 'Go', 'AWS'],
    impact: 'Automated complex development workflows across full stack',
    category: 'AI',
  },
  {
    id: 'ai-testing-framework',
    title: 'Natural Language Playwright Testing',
    company: 'Praetorian',
    year: '2023-2025',
    description:
      'Developed AI-powered Playwright automation framework allowing developers to write tests in plain English using GPT-4o-mini with auto-healing capabilities.',
    techStack: ['Playwright', 'GPT-4', 'TypeScript', 'Node.js'],
    impact: 'Reduced test writing time by 70%',
    category: 'Testing',
  },
  {
    id: 'attack-graph-viz',
    title: 'Interactive Security Attack Path Analyzer',
    company: 'Praetorian',
    year: '2023-2025',
    description:
      'Built interactive attack graph visualization for security attack path creation and threat analysis, helping security teams identify vulnerabilities.',
    techStack: ['React', 'D3.js', 'Neo4j', 'TypeScript'],
    impact: 'Visualized complex security threats for enterprise clients',
    category: 'Visualization',
  },
  {
    id: 'neo4j-optimization',
    title: 'High-Performance Graph Database Updates',
    company: 'Praetorian',
    year: '2023-2025',
    description:
      'Optimized Neo4j bulk operations to update 250k records in under a minute through batch async API calls.',
    techStack: ['Neo4j', 'Go', 'AWS Lambda', 'DynamoDB'],
    impact: '99.6% performance improvement (from hours to <1 min)',
    category: 'Performance',
  },
  {
    id: 'chrome-extension',
    title: 'Enterprise SSO Chrome Extension',
    company: 'Banyan Security',
    year: '2022-2023',
    description:
      'Architected zero-touch login Chrome extension for Google Admin-controlled users. Features OAuth login, Node-Forge certificates, and ITP policy-based page blocking.',
    techStack: ['Chrome Extension API', 'OAuth', 'Node-Forge', 'React'],
    impact: 'Enabled secure enterprise access for thousands of users',
    category: 'Security',
  },
  {
    id: 'performance-optimization',
    title: 'Frontend Performance Optimization',
    company: 'LogicHub',
    year: '2019-2022',
    description:
      'Reduced application load time from 6 seconds to 1-2 seconds through code splitting, lazy loading, and Redux optimization. Implemented Redux snapshot debugging.',
    techStack: ['React', 'Redux', 'Vite', 'Code Splitting'],
    impact: '83% load time reduction (6s → 1-2s)',
    category: 'Performance',
  },
  {
    id: 'devops-automation',
    title: 'Git & JIRA Automation System',
    company: 'LogicHub',
    year: '2019-2022',
    description:
      'Automated repeated Git and JIRA workflows, saving developers significant time on repetitive tasks.',
    techStack: ['Node.js', 'Git API', 'JIRA API', 'Automation'],
    impact: 'Saved 16 man hours weekly per developer',
    category: 'DevOps',
  },
];

export { projectCategories, type ProjectCategory } from '../types/project.types';
