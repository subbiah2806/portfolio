# Subbiah Chandramouli - Portfolio

Lead Frontend Developer with 7+ years of experience in React, TypeScript, and modern web technologies.

🌐 **Live Site**: [https://subbiah2806.github.io/portfolio](https://subbiah2806.github.io/portfolio)

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Code Highlighting**: React Syntax Highlighter
- **SEO**: React Helmet Async
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Features

- Professional multi-page routing with React Router
- Fully responsive design (mobile-first approach)
- Dark mode support (system preference detection)
- SEO optimized with meta tags and structured data
- Accessibility compliant (WCAG AA)
- Contact form with validation
- Interactive project showcase with filtering
- Professional code editor component with syntax highlighting
- Smooth animations with Framer Motion
- Custom cursor (desktop only)
- Performance optimized with React.memo, useMemo, useCallback
- Respects prefers-reduced-motion for accessibility

## Project Structure

```
src/
├── components/
│   ├── features/      # Feature components (Hero, Projects, Skills, CodeEditor)
│   ├── layout/        # Layout components (Header, Footer)
│   └── ui/            # Reusable UI components (SEO, ThemeToggle, etc.)
├── hooks/             # Custom React hooks (useReducedMotion)
├── pages/             # Route pages (Home, ProjectsPage, Contact, NotFound)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions (animations)
├── data/              # Static data (resume, projects)
└── styles/            # Global styles and Tailwind config
```

## Development

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Alternative start command
npm run start

# Build for production (local)
npm run build

# Build for GitHub Pages deployment
npm run build:github

# Preview production build
npm run preview

# Run linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Run TypeScript type checking
npm run type-check
```

### Development Workflow

1. **Start the dev server**: `npm run dev`
2. **Make changes**: Edit files in `src/` directory
3. **Check types**: `npm run type-check` (runs automatically on commit)
4. **Lint code**: `npm run lint` (auto-fixes on commit via Husky)
5. **Build**: `npm run build` before deploying

## Custom Design System

The portfolio uses a custom Tailwind CSS design system with:

### Color Palette

**Primary Colors (Blue Shades)**:

- `primary-50` to `primary-900` - Used for buttons, links, and highlights

**Neutral Colors (Grey Shades)**:

- `neutral-50` to `neutral-900` - Used for backgrounds, borders, and text

**Semantic Colors**:

- `success-*` - Green shades for success states
- `error-*` - Red shades for errors and validation
- `warning-*` - Yellow/orange shades for warnings
- `accent-*` - Purple shades for accents

### Typography

- Font Family: System font stack for optimal performance
- Responsive font sizes
- Custom font weights and line heights

### Spacing & Layout

- Custom spacing scale
- Responsive breakpoints (sm, md, lg, xl, 2xl)
- Max-width containers for content

## Performance Optimizations

### Bundle Optimization

- Code splitting with lazy loading
- Tree-shaking enabled
- Minification and compression
- Current bundle size: ~372KB gzipped

### React Optimizations

- `React.memo` for expensive components (Projects, Contact, CodeEditor)
- `useMemo` for expensive calculations (filtered projects, category colors)
- `useCallback` for event handlers
- Lazy loading for route components

### Animation Optimizations

- Respects `prefers-reduced-motion` user preference
- CSS-based transitions where possible
- Framer Motion for complex animations
- Subtle, performant animations (300-500ms duration)

## Accessibility Features

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Screen reader friendly
- Reduced motion support
- High contrast support
- Alt text for images

## SEO Implementation

- React Helmet Async for meta tags
- Structured data (JSON-LD)
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Descriptive page titles

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2015+ JavaScript
- CSS Grid and Flexbox
- Media queries

## Deployment

### Current Deployment: GitHub Pages

🚀 **Live Site**: [https://subbiah2806.github.io/portfolio](https://subbiah2806.github.io/portfolio)

This portfolio is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

**Deployment Workflow**:

- Automatic deployment on push to `main`
- Build command: `npm run build:github`
- Uses environment-based configuration (`.env.github`)
- Deploys to `gh-pages` branch automatically

### Build for Production

```bash
# Local build
npm run build

# GitHub Pages build (with /portfolio base path)
npm run build:github
```

This creates an optimized production build in the `dist/` directory.

### Alternative Deployment Options

1. **Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Netlify**
   - Connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Cloudflare Pages**
   - Connect repository
   - Build command: `npm run build`
   - Output directory: `dist`

## Contact Information

- **Name**: Subbiah Chandramouli
- **Email**: subbiah2806@gmail.com
- **Phone**: 669-236-9786
- **Location**: Dallas, TX
- **LinkedIn**: [linkedin.com/in/subbiah-chandramouli](https://linkedin.com/in/subbiah-chandramouli)
- **GitHub**: [github.com/subbiah](https://github.com/subbiah)

## Work Authorization

- Work Visa: H1B (I-140 Approved)
- Available for: Full-time positions and consulting projects

## License

This portfolio is for personal use. All rights reserved.

---

Built with ❤️ using React + TypeScript + Vite + Tailwind CSS

**Last Updated**: January 2025
