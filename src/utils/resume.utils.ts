/**
 * Resume Utilities
 * Handles fetching and processing resume data
 */

import type { ResumeData } from '@subbiah/reusable/lib/generateResume';

/**
 * Fetch resume data from public folder and clean metadata
 */
export async function fetchResumeData(): Promise<ResumeData> {
  // Use import.meta.env.BASE_URL to handle different deployment paths (e.g., /portfolio/ for GitHub Pages)
  const basePath = import.meta.env.BASE_URL || '/';
  const resumePath = `${basePath}resume.json`.replace(/\/+/g, '/'); // Remove duplicate slashes

  const response = await fetch(resumePath);
  if (!response.ok) {
    throw new Error('Failed to load resume.json');
  }

  return (await response.json()) as ResumeData;
}
