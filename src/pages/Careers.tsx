import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, Calendar, ArrowRight } from 'lucide-react';
import { jobPositions } from '../data/jobs';
import { useLanguage } from '../hooks/useLanguage';

export const Careers: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const getJobTypeLabel = (type: string) => {
    const labels = {
      'full-time': { pt: 'Tempo Integral', en: 'Full Time', fr: 'Temps Plein' },
      'part-time': { pt: 'Meio Período', en: 'Part Time', fr: 'Temps Partiel' },
      'contract': { pt: 'Contrato', en: 'Contract', fr: 'Contrat' }
    };
    return labels[type as keyof typeof labels]?.[currentLanguage] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'pt' ? 'pt-AO' : currentLanguage === 'fr' ? 'fr-FR' : 'en-US');
  };

  return <div className="space-y-0"></div>;
};