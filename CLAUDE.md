# Portfolio — Personal Website

## Goal

Personal portfolio site for Subbiah Chandramouli showcasing work experience, projects, and skills.

## Description

A professional multi-page website with responsive design, dark mode (system preference detection), smooth Framer Motion animations, SEO optimization, and WCAG AA accessibility compliance. Built with React + Vite + TypeScript. Deployed to GitHub Pages at https://subbiah2806.github.io/portfolio.

## Architecture

```
src/
├── components/
│   ├── features/   # Hero, Projects, Skills, CodeEditor sections
│   ├── layout/     # Header, Footer
│   └── ui/         # Reusable UI (SEO, ThemeToggle, etc.)
├── hooks/          # Custom hooks (useReducedMotion)
├── pages/          # Route pages (Home, Projects, Contact, NotFound)
├── types/          # TypeScript types
├── utils/          # Animation utilities
├── data/           # Static data (resume, projects)
└── styles/         # Global styles
```

Stack: React + Vite + TypeScript + Tailwind CSS + Framer Motion + React Router v7. Uses `@allsetlabs/reusable` from `../forge`.

## Progress

Live and deployed. Core pages (Home, Projects, Contact) are complete. Resume and project data live in `src/data/`.

## Module-Specific Patterns

- **Component library**: Import all UI from `@allsetlabs/reusable` — never use raw HTML elements
- **Animations**: Framer Motion only; always respect `prefers-reduced-motion` via `useReducedMotion`
- **Forms**: React Hook Form + Zod validation
- **Deployment**: GitHub Pages — `npm run build` then push to `gh-pages` branch
