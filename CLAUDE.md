# Portfolio Project - Development Guidelines

This is a personal portfolio website showcasing skills, projects, and experience as a Lead Front-End Developer.

## Component Library

**CRITICAL**: This project uses the `@subbiah/component` library for all shared UI components, contexts, and utilities.

### Using the Component Library

**CRITICAL**: Import directly from component files, NOT from a barrel index.

```tsx
// UI Components
import { Button } from '@subbiah/component/components/ui/button';
import { Card, CardHeader, CardContent } from '@subbiah/component/components/ui/card';
import { Input } from '@subbiah/component/components/ui/input';
import { Badge } from '@subbiah/component/components/ui/badge';

// Utility Components
import DataFetchWrapper from '@subbiah/component/components/DataFetchWrapper';
import BackgroundGradient from '@subbiah/component/components/BackgroundGradient';

// Icons (all in one file)
import { IconLoading, IconError, IconEmail } from '@subbiah/component/components/icons';

// Contexts
import { useThemeContext } from '@subbiah/component/contexts/ThemeContext';
import { useCursorContext } from '@subbiah/component/contexts/CursorContext';
import { useAudioContext } from '@subbiah/component/contexts/AudioContext';

// Utilities
import { cn } from '@subbiah/component/lib/utils';

// Providers
import { ComponentProvider } from '@subbiah/component/providers/ComponentProvider';
import ErrorBoundary from '@subbiah/component/components/ErrorBoundary';
```

### Adding New Components

**IMPORTANT**: If any component is required that could be reused, create it in `@subbiah/component` (located at `../component`), NOT in this project.

Only create components in this project if they are:

- Specific to the portfolio content (e.g., ProjectCard, SkillsSection)
- Not reusable across other projects

### Linking the Component Library

After installing dependencies or updating the component library:

```bash
npm run install-link
```

This will:

1. Install all dependencies
2. Link the component library globally
3. Link `@subbiah/component` to this project

See `../component/CLAUDE.md` for full component library documentation.

## Tech Stack

### Core Technologies

- **React 19.2.0** - Latest React with concurrent features
- **Vite 5.2.11** - Lightning-fast build tool and dev server
- **TypeScript 5.4.5** - Type-safe development
- **React Router DOM 7.9.4** - Client-side routing

### Styling & UI

- **TailwindCSS 3.4.3** - Utility-first CSS framework with shadcn Dark Matter theme
- **shadcn/ui** - Component library built on Radix UI primitives
- **Framer Motion 12.23.24** - Declarative animations
- **@tailwindcss/typography** - Beautiful typographic defaults

## shadcn Component Management

**CRITICAL**: This project uses shadcn/ui with the Dark Matter theme. Follow these guidelines strictly.

### Adding New Components

Use shadcn CLI or MCP tools to add components:

```bash
# List available components
npx shadcn@latest add

# Add specific component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card badge
```

### shadcn MCP Tools Available

```typescript
// Search for components
mcp__shadcn__search_items_in_registries({
  registries: ['@shadcn'],
  query: 'button',
});

// View component details
mcp__shadcn__view_items_in_registries({
  items: ['@shadcn/button'],
});

// Get usage examples
mcp__shadcn__get_item_examples_from_registries({
  registries: ['@shadcn'],
  query: 'button-demo',
});

// Get list of project registries
mcp__shadcn__get_project_registries();
```

### Installed shadcn Components

Currently installed in `src/components/ui/`:

- button, card, badge, alert
- sheet, separator, tabs, skeleton
- form, input, textarea, label

### Color Usage Rules

**CRITICAL**: NEVER use `bg-[hsl(var(--X))]` pattern

❌ **WRONG**:

```tsx
<div className="bg-[hsl(var(--success))]">
<div className="text-[hsl(var(--primary))]">
<div className="border-[hsl(var(--destructive))]">
```

✅ **CORRECT**:

```tsx
<div className="bg-success">
<div className="text-primary">
<div className="border-destructive">

// Available shadcn colors
<div className="bg-primary">        // Warm yellow/gold
<div className="bg-secondary">      // Teal/cyan blue
<div className="bg-destructive">    // Red for errors
<div className="bg-muted">          // Light gray
<div className="bg-accent">         // Light accent
<div className="bg-success">        // Green for success
<div className="bg-warning">        // Orange/amber for warnings

// With opacity
<div className="bg-primary/20">    // 20% opacity
<div className="text-success/50">  // 50% opacity
```

### Custom Colors in CSS Variables

**CRITICAL**: OKLCH values must be stored WITHOUT the `oklch()` wrapper for opacity support.

Current theme colors (Dark Matter):

```css
:root {
  /* Core shadcn colors - OKLCH values WITHOUT oklch() wrapper */
  --background: 1 0 0;
  --foreground: 0.2101 0.0318 264.6645;
  --primary: 0.6716 0.1368 48.513;
  --secondary: 0.536 0.0398 196.028;
  --muted: 0.967 0.0029 264.5419;
  --accent: 0.9491 0 0;
  --destructive: 0.6368 0.2078 25.3313;

  /* Custom additions */
  --success: 0.65 0.18 150;
  --warning: 0.75 0.15 85;
}
```

**Why no `oklch()` wrapper?**

- CSS variables store just the color values
- Tailwind wraps them with `oklch()` and adds `<alpha-value>` support
- This enables opacity classes like `bg-primary/20`, `text-success/50`

### When to Add New Colors

If you need a new color:

1. Add it to `src/index.css` as a CSS variable in OKLCH format **WITHOUT** `oklch()` wrapper
2. Add it to `tailwind.config.js` colors object **WITH** `oklch()` wrapper and `<alpha-value>`
3. Add it for both light and dark modes
4. Use the color class directly (e.g., `bg-newcolor`)

**Example**:

```css
/* src/index.css - WITHOUT oklch() wrapper */
:root {
  --info: 0.6 0.15 240;
}

.dark {
  --info: 0.7 0.15 240;
}
```

```js
// tailwind.config.js - WITH oklch() wrapper and <alpha-value>
colors: {
  info: 'oklch(var(--info) / <alpha-value>)',
}
```

**Result**: You can now use `bg-info`, `bg-info/20`, `text-info/50`, etc.

### Forms & Validation

- **React Hook Form 7.65.0** - Performant form management
- **Zod 4.1.12** - TypeScript-first schema validation

### SEO & Meta

- **React Helmet Async 2.0.5** - Manage document head for SEO

### Development Tools

- **ESLint 9.37.0** - Code linting with strict rules
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks
- **lint-staged 16.2.4** - Run linters on staged files

## Project Structure

```
src/
├── components/          # React components
│   ├── icons/          # Standardized icon components (LoadingIcon, ErrorIcon, etc.)
│   ├── ui/             # shadcn/ui components (buttons, inputs, cards, etc.)
│   ├── layout/         # Layout components (header, footer, navigation)
│   └── features/       # Feature-specific components (hero, projects, skills)
├── pages/              # Route page components (one per route)
├── contexts/           # React Context providers (theme, audio, cursor, etc.)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions and interfaces
├── data/               # Static data and content
├── styles/             # Global styles (if any beyond Tailwind)
├── App.tsx             # Main application component with routing
├── main.tsx            # Application entry point
└── index.css           # Global CSS with Tailwind imports
```

## Icon Standards

**CRITICAL**: All icons must follow these standardized patterns for consistency.

### Icon Component Structure

Every icon component should:

- **Name with "Icon" prefix** - Use `IconName` pattern (e.g., `IconLoading`, `IconError`)
- Use `width="1em"` and `height="1em"` for scalable sizing
- Accept and spread `SVGProps<SVGSVGElement>` for flexibility
- Use `currentColor` for strokes/fills to enable CSS color customization
- Include JSDoc comments describing the icon's purpose

**Why "Icon" prefix?** When you type "Icon" in your IDE, you get autocomplete for all available icons!

### Icon Template

```tsx
import { SVGProps } from 'react';

/**
 * IconName - Description of what this icon represents
 * Used in: [list common use cases]
 */
export function IconName(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="..."
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

### Color Handling

**Single Color Icons:**

```tsx
// Use currentColor for stroke or fill
<path stroke="currentColor" d="..." />
// or
<path fill="currentColor" d="..." />
```

**Multi-Color Icons (when necessary):**

```tsx
// Use currentColor for primary elements
// Use fill-currentColor utility or separate class for secondary colors
<path stroke="currentColor" className="text-primary" d="..." />
<path fill="currentColor" className="text-secondary" d="..." />
```

### Usage Examples

```tsx
import { IconError, IconLoading, IconEmpty, IconEmail } from '@/components/icons';

// Basic usage - inherits text color
<IconError className="text-destructive" />

// With custom size using style prop (since width/height are 1em)
<IconEmail style={{ fontSize: '24px' }} className="text-primary" />

// With custom color using shadcn classes
<IconLoading className="text-primary" style={{ fontSize: '32px' }} />

// With animation (IconLoading and IconSpinner work well with animate-spin)
<IconSpinner className="animate-spin text-primary" style={{ fontSize: '48px' }} />

// Inline with text (1em size adapts to parent font size automatically)
<span className="text-lg">
  <IconError className="inline-block" /> Error occurred
</span>

// In buttons
<button className="flex items-center gap-2">
  <IconArrowRight style={{ fontSize: '20px' }} />
  Continue
</button>
```

### Available Icons

**All icons are consolidated in a SINGLE file: `src/components/icons/index.tsx`**

**Navigation Icons:**

- `IconArrowRight` - Right arrow for navigation/CTAs
- `IconArrowLeft` - Left arrow for back navigation
- `IconHome` - Home icon for navigation

**Contact Icons:**

- `IconEmail` - Email envelope icon
- `IconPhone` - Phone icon
- `IconLocation` - Location pin icon

**Social Icons:**

- `IconLinkedIn` - LinkedIn logo (filled)
- `IconGitHub` - GitHub logo (filled)

**Status Icons:**

- `IconCheckCircle` - Success/check circle
- `IconAlertCircle` - Alert/info circle
- `IconAlertTriangle` - Warning/error triangle
- `IconClose` - Close/dismiss X icon

**Action Icons:**

- `IconFolder` - Folder icon
- `IconBriefcase` - Briefcase/work icon
- `IconInbox` - Inbox/empty state icon

**Loading Icons:**

- `IconLoading` - Circular loading spinner
- `IconSpinner` - Alternative spinner animation

**Legacy Aliases:**

- `IconError` (alias for `IconAlertTriangle`)
- `IconEmpty` (alias for `IconInbox`)

### Adding New Icons

**IMPORTANT**: All icons are in ONE file (`src/components/icons/index.tsx`). Do NOT create separate files.

When adding new icons:

1. **Open** `src/components/icons/index.tsx`
2. **Add the new icon function** following the template
3. **Export the function** at the bottom of the file
4. **Use consistent naming** - PascalCase with "Icon" **prefix** (e.g., `IconCheck`, not `CheckIcon`)
5. **Document usage** - Add JSDoc comments

Example of adding a new icon to `index.tsx`:

```tsx
// Add this function to src/components/icons/index.tsx

/**
 * IconCheck - Success checkmark
 * Used in: Success messages, completed tasks, confirmations
 */
export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

### Benefits

- ✅ **Consistent sizing** - 1em scales with parent font size
- ✅ **Color customization** - Use Tailwind color classes
- ✅ **Type safety** - Full TypeScript support
- ✅ **Reusability** - Import once, use anywhere
- ✅ **Tree-shaking** - Only bundle icons you use
- ✅ **Accessibility** - Easy to add aria-labels and roles

## Export Standards

**CRITICAL**: Follow consistent export patterns to avoid confusion and maintain clean imports.

### Rules

1. **Single Export Per Function/Component**
   - ❌ Never export the same function/component multiple times
   - ❌ Don't mix default and named exports of the same thing
   - ✅ Choose one export style per file and stick to it

2. **Named Exports (Preferred)**

   ```tsx
   // ✅ GOOD - Single named export
   export function Button({ children }: ButtonProps) {
     return <button>{children}</button>;
   }
   ```

3. **Barrel Exports (Index Files)**
   - Use index.ts files to re-export from a directory
   - Only re-export, don't add new exports in index files
   - **Note**: Icons are consolidated in a single `index.tsx` file, not separate files

   ```tsx
   // ✅ GOOD - Barrel export pattern (for other components, not icons)
   export { Button } from './Button';
   export { Input } from './Input';

   // Icons are different - all in one file: src/components/icons/index.tsx
   export function IconLoading(props: SVGProps<SVGSVGElement>) { ... }
   export function IconError(props: SVGProps<SVGSVGElement>) { ... }
   ```

4. **Default Exports (Use Sparingly)**
   - Only use default exports for page components or main components
   - Never combine default export with named export of the same thing

   ```tsx
   // ✅ GOOD - Page component
   export default function HomePage() {
     return <div>Home</div>;
   }

   // ❌ BAD - Don't do this
   export default function HomePage() { ... }
   export { HomePage }; // Duplicate!
   ```

5. **Type Exports**
   - Export types and interfaces separately
   - Use `export type` for type-only exports

   ```tsx
   // ✅ GOOD
   export interface ButtonProps {
     children: ReactNode;
   }

   export function Button({ children }: ButtonProps) {
     return <button>{children}</button>;
   }
   ```

### Import Patterns

```tsx
// ✅ GOOD - Named imports from icons file (autocomplete with "Icon")
import { IconLoading, IconError, IconEmail } from '@/components/icons';

// ✅ GOOD - Default import for pages
import HomePage from '@/pages/Home';

// ❌ BAD - Mixing named and default
import Button, { Button as ButtonNamed } from './Button'; // Confusing!

// ❌ BAD - Don't try to import from separate files (all icons are in index.tsx)
import { IconLoading } from '@/components/icons/IconLoading'; // This won't work!
```

### Why This Matters

- **Clarity** - Clear, unambiguous imports
- **Maintainability** - Easy to find and refactor code
- **Tree-shaking** - Bundlers can optimize better
- **Autocomplete** - IDE suggestions work correctly
- **No confusion** - Only one way to import each thing

## Routing System

Using **React Router DOM v7** with the following structure:

### Router Setup (main.tsx)

```tsx
import { BrowserRouter } from 'react-router-dom';

// Supports base path for GitHub Pages deployment
const basename = import.meta.env.VITE_BASE_PATH || '/';

<BrowserRouter basename={basename}>
  <App />
</BrowserRouter>;
```

### Routes (App.tsx)

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Navigation

- Use `<Link to="/path">` for internal navigation
- Use `useNavigate()` hook for programmatic navigation
- ScrollToTop component ensures page scrolls to top on route change

## Context System

### GlobalProviders Pattern

All contexts are wrapped in a single `GlobalProviders` component for clean composition:

```tsx
// contexts/index.tsx
export function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <ThemeProvider>
      <AudioProvider>
        <CursorProvider>{children}</CursorProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
```

**Order matters:**

1. **ThemeProvider** - Outermost, affects everything
2. **AudioProvider** - Audio system
3. **CursorProvider** - Custom cursor (uses theme)

### Available Contexts

- `useThemeContext()` - Dark/light theme toggle and state
- `useAudioContext()` - Background audio control
- `useCursorContext()` - Custom cursor state

## Animations

### Framer Motion Integration

The project uses Framer Motion for smooth, declarative animations.

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>;
```

### Custom Animation Variants

Reusable variants are defined in `src/utils/animations.ts`:

- Fade in/out
- Slide animations
- Stagger children

### Tailwind CSS Animations

Custom animations in `tailwind.config.js`:

- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up with fade
- `animate-slide-in` - Slide in from right

### Respecting User Preferences

Use `useReducedMotion` hook to respect `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

const shouldReduceMotion = useReducedMotion();
```

## Dark Mode

### Implementation

- Uses `class` strategy with Tailwind
- ThemeContext manages state with localStorage persistence
- Root element gets `dark` class applied/removed

### Usage

```tsx
// In components
<div className="bg-background">
  <p className="text-foreground">Content</p>
</div>;

// Toggle theme
const { theme, toggleTheme } = useThemeContext();
```

## SEO & Meta Tags

Using React Helmet Async for managing document head:

```tsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Page Title</title>
  <meta name="description" content="Description" />
  <meta property="og:title" content="Title" />
</Helmet>;
```

## Data Fetching & State Handling

### DataFetchWrapper Component

**RECOMMENDED**: Use the `DataFetchWrapper` component to handle all data fetching states consistently:

```tsx
import DataFetchWrapper from '@subbiah/component/components/DataFetchWrapper';

function MyComponent() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ... fetch data logic

  return (
    <DataFetchWrapper
      isLoading={isLoading}
      error={error}
      isEmpty={!data?.length}
      className="min-h-[400px]"
      loadingMessage="Loading users..."
      emptyMessage="No users found"
    >
      <UserList users={data} />
    </DataFetchWrapper>
  );
}
```

**Props:**

- `isLoading: boolean` - Shows loading spinner when true
- `error?: string | Error | null` - Shows error UI if truthy
- `isEmpty?: boolean` - Shows empty state when true (and not loading/error)
- `children: ReactNode` - Content to render on success
- `className?: string` - Optional wrapper classes
- `loadingMessage?: string` - Custom loading text
- `emptyMessage?: string` - Custom empty state text

**Benefits:**

- ✅ Consistent UI across all data fetching scenarios
- ✅ Handles all states (loading, error, empty, success)
- ✅ Fully styled with custom colors and dark mode
- ✅ Reduces code duplication

### Alternative: Manual State Handling

If you need custom UI for each state:

```tsx
if (isLoading) {
  return <div className="animate-pulse">Loading...</div>;
}

if (error) {
  return <div className="text-destructive">Error: {error.message}</div>;
}

if (!data?.length) {
  return <div className="text-muted-foreground">No data available</div>;
}

return <Content data={data} />;
```

### Error Boundary

Top-level error boundary catches React errors:

```tsx
// In main.tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Form Handling

### React Hook Form + Zod Pattern

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short'),
});

type FormData = z.infer<typeof schema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

## Environment Variables

Vite uses `import.meta.env` for environment variables:

```typescript
// All env vars must start with VITE_
const apiUrl = import.meta.env.VITE_API_URL;
const basePath = import.meta.env.VITE_BASE_PATH;
```

### Available Variables

- `VITE_BASE_PATH` - Base path for routing (used for GitHub Pages)

## Development Workflow

### Start Development Server

```bash
cd modules/portfolio
npm run dev
# or
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

### Formatting

```bash
npm run format          # Format all files
npm run format:check    # Check formatting
```

### Build

```bash
npm run build                # Standard build
npm run build:github         # Build for GitHub Pages
```

### Preview Production Build

```bash
npm run preview
```

## Code Quality Standards

### Clean Code Principles

**CRITICAL**: Follow TypeScript clean code principles from root documentation:

- `../../.claude/docs/clean-code-typescript.md` - Complete clean code guide
- `../../.claude/docs/clean-code-examples.md` - Practical examples

### Key Principles

1. **Variables**
   - Use meaningful, pronounceable, searchable names
   - Avoid magic numbers/strings (use named constants)
   - Use UPPER_SNAKE_CASE for constants
   - No mental mapping

2. **Functions**
   - Do ONE thing only
   - 2 or fewer parameters (use objects for more)
   - No flag parameters
   - Pure functions preferred (no side effects)
   - DRY - Don't Repeat Yourself

3. **Components** (React-Specific)
   - Single responsibility
   - < 200 lines per component
   - Extract logic into custom hooks
   - Handle all states (loading, error, success, empty) - **Use DataFetchWrapper component**
   - Composition over inheritance

4. **TypeScript**
   - Strict mode enabled
   - No `any` type (use `unknown` if needed)
   - Proper interfaces and types
   - Type guards for runtime checks
   - Readonly for immutable data

5. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

### React Best Practices

- Use functional components only
- Proper hooks usage (follow rules of hooks)
- Memoization when needed (React.memo, useMemo, useCallback)
- Error boundaries for error handling
- Extract reusable logic into custom hooks

### Styling Guidelines

- **Use shadcn color system** (primary, secondary, destructive, success, warning, muted, accent, background, foreground)
- Full dark mode support for all components (shadcn colors adapt automatically)
- Mobile-first responsive design
- Accessibility (ARIA labels, semantic HTML)
- Use Tailwind utility classes, avoid custom CSS

## Common Pitfalls to Avoid

### ❌ Don't Do This

- Using default Tailwind colors (bg-blue-500, text-gray-900)
- Using `any` type instead of proper types
- Magic numbers and strings without named constants
- Functions doing multiple things
- Duplicate code (DRY violation)
- Components > 200 lines
- Missing dark mode variants
- Not handling all component states
- Prop drilling (use context or composition)
- Side effects in render

### ✅ Do This Instead

- Use shadcn color system (bg-primary, bg-secondary, text-foreground, text-muted-foreground)
- Use proper TypeScript types or `unknown`
- Define named constants for all magic values
- Single-purpose functions
- Extract common code into utilities/hooks
- Break large components into smaller ones
- Always include `dark:` variants (or use shadcn colors which adapt automatically)
- **Use DataFetchWrapper for all data fetching** (loading, error, empty states)
- Use contexts or composition pattern
- Pure functions with useEffect for side effects

## Testing Locally

Before committing:

1. Run `npm run type-check` - Ensure no TypeScript errors
2. Run `npm run lint` - Ensure no linting errors
3. Run `npm run format:check` - Ensure code is formatted
4. Test in browser - Verify functionality works
5. Test dark mode - Ensure proper dark mode support
6. Test responsive - Check mobile/tablet/desktop views
7. Test accessibility - Check keyboard navigation and screen readers

## Git Hooks (Husky + lint-staged)

Pre-commit hooks automatically run:

- ESLint with auto-fix on `*.{ts,tsx}` files
- Prettier formatting on all staged files
- Type checking (if configured)

If hooks fail, fix the issues before committing.

## Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

1. Build with `npm run build:github`
2. Output in `dist/` directory
3. Base path configured via `VITE_BASE_PATH`

### Environment Setup

Create `.env` for local development:

```bash
VITE_BASE_PATH=/
```

Create `.env.github` for GitHub Pages:

```bash
VITE_BASE_PATH=/repository-name/
```

## Success Criteria

Your code is successful when:

### Clean Code Compliance

- ✅ Meaningful, searchable variable names
- ✅ Functions do ONE thing with descriptive names
- ✅ No magic numbers/strings (named constants)
- ✅ No duplicate code (DRY)
- ✅ Pure functions where possible
- ✅ Components < 200 lines
- ✅ SOLID principles followed

### TypeScript

- ✅ Complete types (no `any`)
- ✅ Proper interfaces/types
- ✅ Type guards for runtime checks
- ✅ Readonly for immutable data

### React

- ✅ Single responsibility per component
- ✅ All states handled (loading, error, success, empty)
- ✅ Custom hooks for reusable logic
- ✅ Proper memoization when needed

### Styling & Accessibility

- ✅ Use shadcn colors (never default Tailwind colors like blue-500, gray-900)
- ✅ Full dark mode support
- ✅ Responsive and accessible
- ✅ Semantic HTML and ARIA labels

### Quality

- ✅ No console errors/warnings
- ✅ Follows project patterns
- ✅ Properly tested locally
- ✅ All git hooks pass

## Resources

- Root clean code docs: `../../.claude/docs/clean-code-typescript.md`
- Clean code examples: `../../.claude/docs/clean-code-examples.md`
- Tailwind config: `./tailwind.config.js`
- TypeScript config: `./tsconfig.json`
- Vite config: `./vite.config.ts`

---

**Remember**: Quality over speed. Build it right the first time with clean code, proper TypeScript types, custom colors, and full dark mode support.
