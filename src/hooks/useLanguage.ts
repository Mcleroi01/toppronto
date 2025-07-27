import { useTranslation } from 'react-i18next';
import { Language } from '../types';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language as Language;

  return {
    currentLanguage,
    changeLanguage,
    isRTL: false // Angola uses LTR languages
  };
};