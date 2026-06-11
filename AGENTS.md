# Portfolio — Personal Website

## Purpose

Personal portfolio site for Subbiah Chandramouli showcasing work experience, projects, and skills.

## Mental Model

A professional multi-page website with responsive design, dark mode (system preference detection), smooth Framer Motion animations, SEO optimization, and WCAG AA accessibility compliance. Built with React + Vite + TypeScript. Deployed to GitHub Pages at https://subbiah2806.github.io/portfolio.

## Where Things Go

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

Stack: React + Vite + TypeScript + Tailwind CSS + Framer Motion + React Router v7. Uses `@allsetlabs/forge` from `../forge`.

## Development Commands

- `make setup` — check system dependencies
- `make install` — install dependencies
- `make start` — start Vite
- `npm run build` — build for GitHub Pages
- `npm run type-check` — verify TypeScript

## Current Capabilities

Live and deployed. Core pages (Home, Projects, Contact) are complete. Resume and project data live in `src/data/`.

## Testing Expectations

Run `npm run type-check` and `npm run build` after code changes. For visual changes, open the affected route, test responsive behavior, and check the browser console.

## Module-Specific Patterns

- **Component library**: Import all UI from `@allsetlabs/forge` — never use raw HTML elements
- **Animations**: Framer Motion only; always respect `prefers-reduced-motion` via `useReducedMotion`
- **Forms**: React Hook Form + Zod validation
- **Deployment**: GitHub Pages — `npm run build` then push to `gh-pages` branch
