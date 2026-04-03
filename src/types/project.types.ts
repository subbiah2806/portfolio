/**
 * Project Data Types
 *
 * Centralized TypeScript types for project data structure
 */

export interface Project {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  techStack: string[];
  impact: string;
  category: 'AI' | 'Security' | 'Performance' | 'DevOps' | 'Testing' | 'Visualization';
}

export const projectCategories = [
  'All',
  'AI',
  'Security',
  'Performance',
  'DevOps',
  'Testing',
  'Visualization',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
