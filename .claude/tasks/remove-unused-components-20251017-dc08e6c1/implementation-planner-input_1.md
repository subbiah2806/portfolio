# Task Input

**Task**: remove-unused-components-20251017-dc08e6c1
**Agent**: implementation-planner
**Execution**: 1

## Request

1. Remove all unused shadcn components from src/components/ui/
2. Fix all instances of `bg-[hsl(var(--...))]` to use proper shadcn color variables
3. Update CLAUDE.md with guidelines for using shadcn MCP to add components
4. Document component usage patterns

## Previous Agent Outputs

- .claude/tasks/remove-unused-components-20251017-dc08e6c1/code-analyzer-output_1.md

## Additional Context

User requirement: "Do not use bg-[hsl( only shadcn color variables should be used across the app"

Files with bg-[hsl( pattern found:

- src/pages/Home.tsx
- src/components/features/Projects.tsx
- src/components/features/CodeEditor.tsx
- src/pages/Contact.tsx

## Requirements

1. Task breakdown with clear phases
2. Agent assignments (frontend for fixes, file operations for cleanup)
3. Execution order (can be parallel where appropriate)
4. Specific file changes needed
5. CLAUDE.md documentation updates
6. Time estimates
7. End with "User Confirmation Required"
