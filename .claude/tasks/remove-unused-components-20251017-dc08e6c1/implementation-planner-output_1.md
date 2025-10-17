# Implementation Plan

## Overview

Remove unused shadcn components, fix color variable usage, and update documentation.

## Phase 1: Remove Unused Components

**Agent**: File operations (Bash)
**Tasks**:

1. Delete completely unused components:
   - `src/components/ui/DataFetchWrapper.tsx`
   - `src/components/ui/separator.tsx`
   - `src/components/ui/skeleton.tsx`
   - `src/components/ui/alert.tsx`
   - `src/components/ui/tabs.tsx`
   - `src/components/ui/AudioPlayer.tsx`
   - `src/components/ui/CursorToggle.tsx`

**Estimated Time**: 2 minutes
**Parallel**: Can run independently

## Phase 2: Fix Color Variable Usage

**Agent**: frontend (or MultiEdit)
**Tasks**:

1. Replace `bg-[hsl(var(--success))]` with `bg-success` or appropriate shadcn variable in:
   - `src/pages/Contact.tsx`
2. Replace any other `bg-[hsl(var(...))]` patterns with proper shadcn color classes in:
   - `src/pages/Home.tsx`
   - `src/components/features/Projects.tsx`
   - `src/components/features/CodeEditor.tsx`
   - `src/pages/Contact.tsx`

**Pattern to fix**: `bg-[hsl(var(--X))]` → Use `bg-X` if supported, or define custom color in tailwind.config.js

**Estimated Time**: 10 minutes
**Parallel**: Can run after Phase 1 or concurrently

## Phase 3: Update CLAUDE.md Documentation

**Agent**: File operations (Edit)
**Tasks**:

1. Add section to `modules/portfolio/CLAUDE.md`:

   ````markdown
   ## shadcn Component Management

   ### Adding New Components

   Use shadcn MCP tools to discover and add components:

   ```bash
   # List available components
   npx shadcn@latest add

   # Add specific component
   npx shadcn@latest add button
   ```
   ````

   **MCP Tools Available**:
   - `mcp__shadcn__search_items_in_registries` - Search for components
   - `mcp__shadcn__view_items_in_registries` - View component details
   - `mcp__shadcn__get_item_examples_from_registries` - Get usage examples

   ### Color Usage Rules

   **CRITICAL**: Never use `bg-[hsl(var(--X))]` pattern

   ❌ WRONG:

   ```tsx
   <div className="bg-[hsl(var(--success))]">
   ```

   ✅ CORRECT:

   ```tsx
   <div className="bg-primary">
   <div className="bg-secondary">
   <div className="bg-destructive">
   <div className="bg-muted">
   ```

   For custom colors, define them in tailwind.config.js colors object.

   ```

   ```

**Estimated Time**: 5 minutes
**Parallel**: Can run concurrently with Phase 2

## Phase 4: Verify Build

**Agent**: Bash
**Tasks**:

1. Run `npm run build` to ensure no errors
2. Check for any remaining `bg-[hsl(` patterns

**Estimated Time**: 3 minutes
**Sequential**: Must run after all other phases

## Execution Order

1. **Concurrent**: Phase 1 (delete files)
2. **Concurrent**: Phase 2 (fix colors) + Phase 3 (update docs)
3. **Sequential**: Phase 4 (verify build)

## Total Estimated Time

20 minutes

## Files to Modify

- Delete: 7 component files
- Update: 4 page/component files (color fixes)
- Update: 1 documentation file (CLAUDE.md)

## User Confirmation Required

⚠️ Please review this plan and type **"yes"** to proceed with execution.

**Status**: Success
