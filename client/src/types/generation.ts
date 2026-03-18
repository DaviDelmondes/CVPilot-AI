export type GenerationType =
  | 'PROFESSIONAL_SUMMARY'
  | 'LINKEDIN_HEADLINE'
  | 'COVER_LETTER'
  | 'TEXT_IMPROVEMENT'
  | 'SHORT_BIO';

export interface Generation {
  id: string;
  type: GenerationType;
  tone: string;
  area: string;
  experienceLevel: string;
  goal: string;
  skills: string[];
  baseText?: string | null;
  output: string;
  createdAt: string;
}

export interface DashboardMetrics {
  plan: {
    name: string;
    generationLimit: number | null;
  };
  generationCount: number;
  remainingGenerations: number | null;
  recentHistory: Generation[];
}
