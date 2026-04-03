/**
 * Resume Data Types
 *
 * Centralized TypeScript types for resume data structure
 */

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  date: string;
}

export interface Skills {
  frontend: string[];
  aiTools: string[];
  performance: string[];
  styling: string[];
  backend: string[];
  devOps: string[];
  security: string[];
}

export interface ResumeData {
  name: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  portfolio: string;
  linkedin?: string;
  workVisa: string;
  summary: string;
  skills: Skills;
  experience: Experience[];
  education: Education[];
}
