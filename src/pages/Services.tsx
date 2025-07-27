import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const serviceFeatures = {
    pharmaceutical: [
      {
        pt: 'Controle de temperatura',
        en: 'Temperature control',
        fr: 'Contrôle de température'
      },
      {
        pt: 'Entrega em farmácias e hospitais',
        en: 'Delivery to pharmacies and hospitals',
        fr: 'Livraison aux pharmacies et hôpitaux'
      },
      {
        pt: 'Manuseio especializado',
        en: 'Specialized handling',
        fr: 'Manipulation spécialisée'
      }
    ],
    food: [
      {
        pt: 'Transporte refrigerado',
        en: 'Refrigerated transport',
        fr: 'Transport réfrigéré'
      },
      {
        pt: 'Entrega para restaurantes',
        en: 'Restaurant delivery',
        fr: 'Livraison aux restaurants'
      },
      {
        pt: 'Produtos frescos garantidos',
        en: 'Fresh products guaranteed',
        fr: 'Produits frais garantis'
      }
    ],
    real_estate: [
      {
        pt: 'Documentos importantes',
        en: 'Important documents',
        fr: 'Documents importants'
      },
      {
        pt: 'Materiais de construção',
        en: 'Construction materials',
        fr: 'Matériaux de construction'
      },
      {
        pt: 'Entrega segura e pontual',
        en: 'Safe and punctual delivery',
        fr: 'Livraison sûre et ponctuelle'
      }
    ],
    general: [
      {
        pt: 'Qualquer tipo de produto',
        en: 'Any type of product',
        fr: 'Tout type de produit'
      },
      {
        pt: 'Rastreamento em tempo real',
        en: 'Real-time tracking',
        fr: 'Suivi en temps réel'
      },
      {
        pt: 'Flexibilidade de horários',
        en: 'Flexible schedules',
        fr: 'Horaires flexibles'
      }
    ]
  };

  return <div className="space-y-0"></div>;
};