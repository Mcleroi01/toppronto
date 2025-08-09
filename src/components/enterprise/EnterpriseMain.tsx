import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { FaTruck, FaWarehouse, FaChartLine, FaHeadset } from 'react-icons/fa';

const getTranslatedText = (obj: Record<string, string>, lang: string): string => {
  return obj[lang] || obj['en'] || '';
};

interface EnterpriseMainProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const EnterpriseMain: React.FC<EnterpriseMainProps> = ({ currentLanguage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      title: {
        pt: 'Logística Completa',
        en: 'Complete Logistics',
        fr: 'Logistique Complète'
      },
      description: {
        pt: 'Soluções de logística sob medida para atender às necessidades específicas do seu negócio.',
        en: 'Custom logistics solutions to meet your business needs.',
        fr: 'Solutions logistiques sur mesure pour répondre aux besoins de votre entreprise.'
      },
      icon: <FaTruck className="w-8 h-8" />,
      backgroundImage: '/images/enterprise/logistics.jpg'
    },
    {
      title: {
        pt: 'Gestão de Estoque',
        en: 'Inventory Management',
        fr: 'Gestion des Stocks'
      },
      description: {
        pt: 'Controle total do seu estoque com nossa plataforma avançada de gestão.',
        en: 'Total control of your inventory with our advanced management platform.',
        fr: 'Contrôle total de votre stock avec notre plateforme de gestion avancée.'
      },
      icon: <FaWarehouse className="w-8 h-8" />,
      backgroundImage: '/images/enterprise/inventory.jpg'
    },
    {
      title: {
        pt: 'Análise de Dados',
        en: 'Data Analysis',
        fr: 'Analyse des Données'
      },
      description: {
        pt: 'Relatórios detalhados e análises para otimizar suas operações.',
        en: 'Detailed reports and analysis to optimize your operations.',
        fr: 'Rapports détaillés et analyses pour optimiser vos opérations.'
      },
      icon: <FaChartLine className="w-8 h-8" />,
      backgroundImage: '/images/enterprise/analytics.jpg'
    },
    {
      title: {
        pt: 'Suporte Dedicado',
        en: 'Dedicated Support',
        fr: 'Support Dédié'
      },
      description: {
        pt: 'Equipe de suporte especializada para atender sua empresa 24/7.',
        en: 'Specialized support team for your business 24/7.',
        fr: 'Équipe de support spécialisée pour votre entreprise 24/7.'
      },
      icon: <FaHeadset className="w-8 h-8" />,
      backgroundImage: '/images/enterprise/support.jpg'
    }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32">
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5 -z-10"
        style={{ backgroundImage: "url('/images/pattern.svg')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
            {getTranslatedText(
              {
                pt: "Soluções Empresariais",
                en: "Business Solutions",
                fr: "Solutions d'Entreprise"
              },
              currentLanguage
            )}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {getTranslatedText(
              {
                pt: "Soluções Logísticas para o Seu Negócio",
                en: "Logistics Solutions for Your Business",
                fr: "Solutions Logistiques pour Votre Entreprise"
              },
              currentLanguage
            )}
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl">
            {getTranslatedText(
              {
                pt: "Otimize sua cadeia de suprimentos com nossas soluções logísticas completas e personalizadas para empresas de todos os portes.",
                en: "Optimize your supply chain with our complete and customized logistics solutions for businesses of all sizes.",
                fr: "Optimisez votre chaîne d'approvisionnement avec nos solutions logistiques complètes et personnalisées pour les entreprises de toutes tailles."
              },
              currentLanguage
            )}
          </p>
        </motion.div>

        {/* Grille des fonctionnalités */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={`feature-${feature.title.pt}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: idx * 0.1,
                },
              } : { opacity: 0, y: 30 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[300px] flex flex-col"
            >
              {/* Image de fond */}
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700"></div>
              </div>

              {/* Contenu */}
              <div className="relative z-10 flex flex-col h-full p-8 text-white">
                <div className="flex-grow">
                  {/* Icône */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                    {React.cloneElement(feature.icon, { className: 'w-8 h-8 text-white' })}
                  </div>

                  {/* Titre et description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {getTranslatedText(feature.title, currentLanguage)}
                  </h3>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    {getTranslatedText(feature.description, currentLanguage)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseMain;
