/**
 * Resume Utilities
 * Handles fetching and processing resume data
 */

import type { ResumeData } from '@subbiah/reusable/lib/generateResume';

/**
 * Fetch resume data from public folder and clean metadata
 */
export async function fetchResumeData(): Promise<ResumeData> {
  const response = await fetch('/resume.json');
  if (!response.ok) {
    throw new Error('Failed to load resume.json');
  }

  return (await response.json()) as ResumeData;
}
