export interface NewsItem {
  id: number;
  title: {
    pt: string;
    en: string;
    fr: string;
  };
  excerpt: {
    pt: string;
    en: string;
    fr: string;
  };
  content: {
    pt: string;
    en: string;
    fr: string;
  };
  imageUrl: string;
  date: string;
  category: {
    pt: string;
    en: string;
    fr: string;
  };
}
