export type LanguageKey = 'pt' | 'en' | 'fr';

export interface JobPosition {
  id: string;
  title: {
    pt: string;
    en: string;
    fr: string;
  };
  department: {
    pt: string;
    en: string;
    fr: string;
  };
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  experienceLevel: 'entry' | 'mid' | 'senior';
  salaryRange: {
    pt: string;
    en: string;
    fr: string;
  };
  postedDate: string;
  deadline: string;
  description: {
    pt: string;
    en: string;
    fr: string;
  };
  requirements: {
    pt: string[];
    en: string[];
    fr: string[];
  };
  benefits: {
    pt: string[];
    en: string[];
    fr: string[];
  };
}
