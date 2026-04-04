# Portfolio — Personal Website

Personal portfolio site for Subbiah Chandramouli. A professional multi-page website showcasing work experience, projects, and skills. Features responsive design, dark mode (system preference detection), smooth animations with Framer Motion, SEO optimization, and accessibility compliance (WCAG AA).

**Live**: https://subbiah2806.github.io/portfolio

## Structure

```
src/
├── components/
│   ├── features/   # Hero, Projects, Skills, CodeEditor
│   ├── layout/     # Header, Footer
│   └── ui/         # Reusable UI (SEO, ThemeToggle, etc.)
├── hooks/          # Custom hooks (useReducedMotion)
├── pages/          # Route pages (Home, Projects, Contact, NotFound)
├── types/          # TypeScript types
├── utils/          # Animation utilities
├── data/           # Static data (resume, projects)
└── styles/         # Global styles
```

## Working on This Module

- Uses the shared component library from `modules/component` — never use raw HTML elements
- Tailwind with custom design system (no default Tailwind colors)
- Framer Motion for animations; respects `prefers-reduced-motion`
- React Router v7 for routing
- Forms use React Hook Form + Zod validation
- Deployed to GitHub Pages
