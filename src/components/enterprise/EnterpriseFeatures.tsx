import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Truck, BarChart2 } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';

type Language = 'pt' | 'en' | 'fr';

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: {
    pt: string;
    en: string;
    fr: string;
  };
  description: {
    pt: string;
    en: string;
    fr: string;
  };
}

interface EnterpriseFeaturesProps {
  currentLanguage: Language;
}

const features: FeatureItem[] = [
  {
    icon: Clock,
    title: {
      pt: 'Entregas Rápidas',
      en: 'Fast Deliveries',
      fr: 'Livraisons Rapides'
    },
    description: {
      pt: 'Entregas em até 2 horas na sua cidade',
      en: 'Deliveries within 2 hours in your city',
      fr: 'Livraisons en 2 heures dans votre ville'
    }
  },
  {
    icon: Shield,
    title: {
      pt: 'Segurança Garantida',
      en: 'Guaranteed Safety',
      fr: 'Sécurité Garantie'
    },
    description: {
      pt: 'Rastreamento em tempo real e motoristas verificados',
      en: 'Real-time tracking and verified drivers',
      fr: 'Suivi en temps réel et chauffeurs vérifiés'
    }
  },
  {
    icon: Truck,
    title: {
      pt: 'Frota Diversificada',
      en: 'Diverse Fleet',
      fr: 'Flotte Diversifiée'
    },
    description: {
      pt: 'Motos, carros, vans e caminhões para qualquer necessidade',
      en: 'Motorcycles, cars, vans and trucks for any need',
      fr: 'Motos, voitures, fourgonnettes et camions pour tous les besoins'
    }
  },
  {
    icon: BarChart2,
    title: {
      pt: 'Relatórios Detalhados',
      en: 'Detailed Reports',
      fr: 'Rapports Détaillés'
    },
    description: {
      pt: 'Acompanhe métricas e otimize sua operação',
      en: 'Track metrics and optimize your operation',
      fr: 'Suivez les métriques et optimisez votre opération'
    }
  }
];

export const EnterpriseFeatures: React.FC<EnterpriseFeaturesProps> = ({ currentLanguage }) => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getTranslatedText({
              pt: 'Por que escolher a Topronto para sua empresa?',
              en: 'Why choose Topronto for your business?',
              fr: 'Pourquoi choisir Topronto pour votre entreprise ?'
            }, currentLanguage)}
          </h2>
          <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslatedText({
              pt: 'Soluções personalizadas para atender às necessidades específicas do seu negócio.',
              en: 'Customized solutions to meet your business specific needs.',
              fr: 'Des solutions personnalisées pour répondre aux besoins spécifiques de votre entreprise.'
            }, currentLanguage)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {getTranslatedText(feature.title, currentLanguage)}
                </h3>
                <p className="text-gray-600">
                  {getTranslatedText(feature.description, currentLanguage)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
