type Language = 'pt' | 'en' | 'fr';
type TranslationObject = {
  [key in Language]: string;
} & { defaultValue?: string };

export const getTranslatedText = (obj: TranslationObject, lang: Language): string => {
  return obj[lang] || obj.defaultValue || '';
};

export type { Language, TranslationObject };
