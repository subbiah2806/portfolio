/**
 * Portfolio Resume Data
 *
 * SOURCE: /assets/subbiah_resume.txt
 * LAST SYNCED: 2025-10-16
 *
 * To update: Ensure this file matches the content in assets/subbiah_resume.txt
 */

import type { ResumeData } from '../types/resume.types';

export const resumeData: ResumeData = {
  name: 'Subbiah Chandramouli',
  location: 'Dallas, TX',
  phone: 'xxx-xxx-xxxx',
  email: 'subbiah2806@gmail.com',
  github: 'https://github.com/subbiah2806',
  portfolio: 'https://subbiah2806.github.io/portfolio',
  linkedin: 'https://www.linkedin.com/in/subbiah-c-31b339184/',
  workVisa: 'H1b (I140 Approved)',

  summary:
    'Lead Software Developer with 8+ years of experience building web applications for enterprise platforms. Specialize in React, Vue, and TypeScript, with deep expertise in Redux state management, AI tooling integration, and internal developer platform engineering. Most recently built RAG-powered MCP knowledge infrastructure and Backstage service catalogs at Fidelity Investments. Consistently delivered scalable, performant solutions serving enterprise teams.',

  skills: {
    frontend: ['React 18', 'Vue 3', 'TypeScript', 'Next.js', 'Redux', 'React Query', 'TanStack'],
    aiTools: [
      'OpenAI Codex',
      'Anthropic Claude Code',
      'Devin AI',
      'Cursor AI',
      'Prompt Engineering',
      'RAG',
      'MCP (Model Context Protocol)',
      'AI-Powered UX',
    ],
    performance: [
      'Code Splitting',
      'Lazy Loading',
      'Vite',
      'Custom Component Libraries',
      'Storybook',
    ],
    styling: ['Tailwind CSS', 'CSS-in-JS', 'Responsive Design', 'Design Systems', 'Material UI'],
    backend: ['Go', 'Node.js', 'Python', 'SQL', 'AWS Lambda', 'Amazon SQS', 'Neo4j', 'DynamoDB', 'REST APIs'],
    devOps: ['Git', 'GitHub Actions', 'Jenkins', 'Kubernetes', 'Helm', 'HashiCorp Vault', 'AWS CloudFormation', 'Amazon EC2', 'LogRocket'],
    security: ['AWS Cognito', 'CORS', 'XSS/CSRF Prevention'],
  },

  experience: [
    {
      title: 'Software Developer',
      company: 'Kforce (Fidelity Investments)',
      location: 'Westlake, TX',
      period: 'Nov 2025 – Present',
      description:
        'Placed at Fidelity Investments via Kforce staffing, developing internal developer tooling and enterprise AI infrastructure. Built service catalog integrations and a RAG-powered knowledge platform connecting internal Fidelity documentation to AI tools across the organization.',
      achievements: [
        'Developed and maintained Hugo-based static websites for internal developer documentation portals, enabling teams across Fidelity to publish and consume standardized tooling guides.',
        'Built and enhanced Backstage, Fidelity\'s internal developer portal, integrating SonarQube, Jenkins, and dependency scanning to create a unified service catalog — giving engineers a single pane of glass for ticket tracking, API inventory, on-call ownership, and application health across all enterprise systems.',
        'Engineered the Knowledge Platform, a RAG vector database ingesting all internal Fidelity documentation (AWS, Docker, Kubernetes, Jenkins, and Fidelity-specific workflows), and exposed it as an MCP server connected to every AI developer tool across user systems — ensuring AI-generated guidance adheres to Fidelity\'s enterprise standards instead of generic web knowledge.',
        'Implemented Kubernetes deployments via Helm charts and managed secrets using HashiCorp Vault for Knowledge Platform services.',
        'Built backend services in Python with SQL and DynamoDB for data ingestion, storage, and retrieval across the Knowledge Platform pipeline.',
      ],
    },
    {
      title: 'Lead Software Developer',
      company: 'Praetorian',
      location: 'Remote',
      period: 'Sep 2023 – Oct 2025',
      description:
        "Praetorian Security is a leading offensive cybersecurity company that helps organizations identify and mitigate security risks. I am responsible for developing and maintaining the company's web applications and tools.",
      achievements: [
        'Architected multi-agent AI system with specialized agents for React, Tailwind, Go, AWS, code review, code analysis, and security scanning; created Claude Code orchestration commands for intelligent agent routing.',
        'Developed AI-powered Playwright automation framework allowing developers to write tests in plain English with GPT-4o-mini and auto-healing capabilities.',
        'Optimized Neo4j bulk operations to update 250k records in under a minute through a batch async API call.',
        'Developed interactive attack graph visualization for security attack path creation and threat analysis.',
        'Created real-time vulnerability detection system with AI-powered recommendations.',
        'Designed a custom component library with Storybook, reducing development time by 30%.',
        'Contributed to backend services in Go, working with AWS Lambda, Neo4j graph database, DynamoDB, and Amazon SQS.',
      ],
    },
    {
      title: 'Senior Software Developer',
      company: 'Banyan Security',
      location: 'Remote',
      period: 'Jun 2022 – Aug 2023',
      description:
        'Interpret product specifications and design a responsive web-based user interface. Devise tools that enhance user experiences. Ensure website accessibility across multiple platforms.',
      achievements: [
        'Architected zero-touch login Chrome extension for Google Admin-controlled users to access Banyan services quickly and securely, while also blocking pages based on admin ITP policy selection.',
        'Innovative devised a free trial onboarding platform which allowed prospective customers the opportunity to test its onboarding system prior to purchase.',
        "Developed a web view to configure the public domain routed through Banyan's service tunnel.",
        'Developed a Chrome extension that leveraged OAuth login and Node-Forge certificates to securely list hosted websites and services in Banyan, while also blocking pages based on admin ITP policy selection.',
        "Designed Internet Threat Protection (ITP) policy that incorporated DNS filter, granting administrators full control over employees' access to various websites and services.",
      ],
    },
    {
      title: 'Senior Software Developer',
      company: 'Logichub',
      location: 'CA',
      period: 'Dec 2019 – May 2022',
      description:
        'Served as Lead Frontend Engineering and directed UI team members. Advised, mentored, and conducted 1-1 sessions with developers for continued advancement and training.',
      achievements: [
        'Recognized expertise and knowledgeability by leadership and promoted from Lead Front-End Web Developer to Front-End Engineering Manager.',
        "Ideated performance solutions and reduced application load time from 6 seconds to 1-2 seconds. Allowed developers to quickly reconstruct bugs by sending Redux snapshots to the server when the user's interface crashes.",
        'Integral contributor in creating and integrating user interfaces, upgrading applications, and employing coding styles which included useSelector, useDispatch, lazy load-store, and route which led to applications remaining current on the node and react versions.',
        'Automated repeated Git and JIRA workflow which saved developers 16 man hours weekly.',
        'Shifted class-based components to functional components with React hooks which enabled developers to adapt to the latest coding standards.',
        'Minimized subscription costs through building in-house chatbots, single-click onboarding, self-trail, and step-by-step onboarding instead of using subscription services like Bento.',
      ],
    },
    {
      title: 'Software Developer',
      company: 'Apple',
      location: 'CA',
      period: 'July 2018 – Nov 2019',
      description:
        'Performed UI team 1 to 1 sessions to resolve challenges. Coordinated with stakeholders, and technical teams, and improved client satisfaction.',
      achievements: [
        'Within 18 months employed AngularJS, Vue.js, and Protractor Automation applications and completed 3 projects.',
        'Implemented $state.go and improved Applications navigation speed by 50%.',
        'Piloted and guided 2 junior developers on a significant and successful Web End to End (E2E) testing methodology automation project and reduced the QA load time by half.',
      ],
    },
    {
      title: 'Graduate Teaching Assistant',
      company: 'Texas A&M University',
      location: 'TX',
      period: 'July 2017 – Dec 2017',
      description:
        'Assisted under Dr. Zhaohui Wang; used artificial neural networks and researched Fingerprint recognition. Created numerous desktop applications.',
      achievements: [
        'Constructed an animated progress bar with GSAP to show while the image was being processed.',
        'Deployed custom file upload button with drag-and-drop feature to copy given file to .tmp folder using the extra-fs library.',
      ],
    },
  ],

  education: [
    {
      degree: 'Master of Science',
      school: 'TEXAS A&M UNIVERSITY',
      location: 'Kingsville, TX',
      date: 'May 2018',
    },
    {
      degree: 'Bachelor of Science',
      school: 'SAVEETHA ENGINEERING COLLEGE',
      location: 'Chennai, India',
      date: 'August 2015',
    },
  ],
};
