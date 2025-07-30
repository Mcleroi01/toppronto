// Types globaux pour l'application
export interface Service {
  id: string;
  name: {
    pt: string;
    en: string;
    fr: string;
  };
  description: {
    pt: string;
    en: string;
    fr: string;
  };
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: {
    pt: string;
    en: string;
    fr: string;
  };
  image: string;
  bio: {
    pt: string;
    en: string;
    fr: string;
  };
}

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
  postedDate: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    pt: string;
    en: string;
    fr: string;
  };
  workingHours: {
    pt: string;
    en: string;
    fr: string;
  };
}

export type Language = 'pt' | 'en' | 'fr';