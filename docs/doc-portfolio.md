# Portfolio Web App Documentation

**Location**: `modules/portfolio/`

**Purpose**: Personal portfolio website showcasing projects, skills, and experience

**Tech Stack**: React 19, TypeScript, Tailwind CSS, Vite, TanStack Query

## Required Reading

**Before working on this module:**

- **[Component Library Guide](../modules/component/how_to_use_this_library.md)** - Essential: Tech stack, shadcn/ui integration, component catalog

## Overview

A modern, responsive portfolio web application built with React and TypeScript. Uses shared components from `modules/component` for consistency.

## Project Structure

```
modules/portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── SEO.tsx          # SEO meta tags component
│   │   ├── chat/            # Chat components
│   │   ├── features/        # Feature section components
│   │   └── layout/          # Layout components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks
│   ├── contexts/           # React context providers
│   ├── services/           # API and external services
│   ├── data/               # Static data and content
│   ├── utils/              # Utilities
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind config
└── package.json           # Dependencies
```

## Key Features

- Personal information and bio
- Project showcase with details
- Skills and technologies
- Work experience timeline
- Contact form
- Resume download (from `resume-builder/actual/resume.json`)
- Dark mode support
- Responsive design

## Development Guidelines

### Use Shared Components First

```tsx
// ✅ Good - using shared components
import { Button, Card, Input } from '@allsetlabs/reusable';

function ContactForm() {
  return (
    <Card title="Contact Me">
      <Input label="Email" type="email" />
      <Button variant="primary">Send</Button>
    </Card>
  );
}
```

### Custom Color System

```tsx
// ✅ Good - custom colors with dark mode
<section className="bg-neutral-50 dark:bg-neutral-900">
  <h1 className="text-neutral-900 dark:text-neutral-100">Portfolio</h1>
  <p className="text-neutral-600 dark:text-neutral-400">Welcome to my portfolio</p>
</section>
```

### Responsive Design

```tsx
// Use Tailwind responsive utilities
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

## Running Locally

```bash
cd modules/portfolio
npm install
npm run dev  # http://localhost:5173
```

## Building for Production

```bash
npm run build  # Outputs to dist/
npm run preview  # Preview production build
```

## Key Components to Implement

1. **Hero Section**: Introduction, name, title
2. **About Section**: Bio, profile image
3. **Projects Section**: Project cards with images, descriptions, links
4. **Skills Section**: Technology badges/icons
5. **Experience Section**: Timeline of work experience
6. **Contact Section**: Contact form or email link
7. **Footer**: Social links, copyright

## Resume Integration

```tsx
// Load resume data
import resumeData from '../../resume-builder/actual/resume.json';

function Experience() {
  return (
    <div>
      {resumeData.experience.map((job) => (
        <JobCard key={job.company} job={job} />
      ))}
    </div>
  );
}
```

## Resources

- [Clean Code React](./clean-code/react.md)
- [Component Library](./doc-component.md)
- [Root CLAUDE.md](../CLAUDE.md)
