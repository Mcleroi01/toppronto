// Types globaux pour l'application
export type Language = 'pt' | 'en' | 'fr';

type TranslatableString = Record<Language, string>;
type TranslatableStringArray = Record<Language, string[]>;

export interface Service {
  id: string;
  name: TranslatableString;
  description: TranslatableString;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: TranslatableString;
  image: string;
  bio: TranslatableString;
}

export interface JobPosition {
  id: string;
  title: TranslatableString;
  department: TranslatableString;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: TranslatableString;
  requirements: TranslatableStringArray;
  benefits: TranslatableStringArray;
  postedDate: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: TranslatableString;
  workingHours: TranslatableString;
}