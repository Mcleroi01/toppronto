import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Zap, Code, Check } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';

type Language = 'pt' | 'en' | 'fr';

interface DeliverySolution {
  icon: React.ReactNode;
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
  features: Array<{
    pt: string;
    en: string;
    fr: string;
  }>;
}

interface EnterpriseDeliverySolutionsProps {
  currentLanguage: Language;
}

export const EnterpriseDeliverySolutions: React.FC<EnterpriseDeliverySolutionsProps> = ({ currentLanguage }) => {
  const solutions: DeliverySolution[] = [
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: {
        pt: 'Entrega Sob Demanda',
        en: 'On-Demand Delivery',
        fr: 'Livraison à la Demande'
      },
      description: {
        pt: 'Entregas rápidas e eficientes quando você mais precisa, com rastreamento em tempo real.',
        en: 'Fast and efficient deliveries when you need them most, with real-time tracking.',
        fr: 'Livraisons rapides et efficaces quand vous en avez le plus besoin, avec suivi en temps réel.'
      },
      features: [
        { pt: 'Entrega em até 60 minutos', en: 'Delivery in up to 60 minutes', fr: 'Livraison en 60 minutes maximum' },
        { pt: 'Rastreamento em tempo real', en: 'Real-time tracking', fr: 'Suivi en temps réel' },
        { pt: 'Notificações por SMS/Email', en: 'SMS/Email notifications', fr: 'Notifications par SMS/Email' },
        { pt: 'Suporte 24/7', en: '24/7 support', fr: 'Support 24/7' }
      ]
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      title: {
        pt: 'Entregas Programadas',
        en: 'Scheduled Deliveries',
        fr: 'Livraisons Planifiées'
      },
      description: {
        pt: 'Planeje suas entregas com antecedência e otimize sua cadeia de suprimentos.',
        en: 'Plan your deliveries in advance and optimize your supply chain.',
        fr: 'Planifiez vos livraisons à l\'avance et optimisez votre chaîne d\'approvisionnement.'
      },
      features: [
        { pt: 'Agendamento flexível', en: 'Flexible scheduling', fr: 'Planification flexible' },
        { pt: 'Rotas otimizadas', en: 'Optimized routes', fr: 'Itinéraires optimisés' },
        { pt: 'Relatórios de desempenho', en: 'Performance reports', fr: 'Rapports de performance' },
        { pt: 'Integração com calendário', en: 'Calendar integration', fr: 'Intégration calendrier' }
      ]
    },
    {
      icon: <Code className="w-8 h-8 text-green-600" />,
      title: {
        pt: 'API e Integrações',
        en: 'API & Integrations',
        fr: 'API & Intégrations'
      },
      description: {
        pt: 'Conecte nossa solução diretamente ao seu sistema com nossa API robusta e documentação detalhada.',
        en: 'Connect our solution directly to your system with our robust API and detailed documentation.',
        fr: 'Connectez notre solution directement à votre système avec notre API robuste et une documentation détaillée.'
      },
      features: [
        { pt: 'Documentação detalhada', en: 'Detailed documentation', fr: 'Documentation détaillée' },
        { pt: 'Suporte para desenvolvedores', en: 'Developer support', fr: 'Support développeur' },
        { pt: 'Webhooks em tempo real', en: 'Real-time webhooks', fr: 'Webhooks en temps réel' },
        { pt: 'Exemplos de código', en: 'Code samples', fr: 'Exemples de code' }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getTranslatedText({
              pt: 'Soluções de Entrega Sob Medida',
              en: 'Custom Delivery Solutions',
              fr: 'Solutions de Livraison Sur Mesure'
            }, currentLanguage)}
          </h2>
          <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslatedText({
              pt: 'Oferecemos uma variedade de opções para atender às necessidades específicas do seu negócio',
              en: 'We offer a variety of options to meet your business-specific needs',
              fr: 'Nous proposons une variété d\'options pour répondre aux besoins spécifiques de votre entreprise'
            }, currentLanguage)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                {solution.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {getTranslatedText(solution.title, currentLanguage)}
              </h3>
              <p className="text-gray-600 mb-6">
                {getTranslatedText(solution.description, currentLanguage)}
              </p>
              <ul className="space-y-3">
                {solution.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">
                      {getTranslatedText(feature, currentLanguage)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {getTranslatedText({
                pt: 'Precisa de uma solução personalizada?',
                en: 'Need a custom solution?',
                fr: 'Besoin d\'une solution personnalisée ?'
              }, currentLanguage)}
            </h3>
            <p className="text-green-100 mb-6">
              {getTranslatedText({
                pt: 'Nossa equipe pode criar uma solução de entrega personalizada para atender às necessidades exclusivas do seu negócio.',
                en: 'Our team can create a custom delivery solution to meet your business\'s unique needs.',
                fr: 'Notre équipe peut créer une solution de livraison personnalisée pour répondre aux besoins uniques de votre entreprise.'
              }, currentLanguage)}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors"
            >
              {getTranslatedText({
                pt: 'Fale com um especialista',
                en: 'Talk to an expert',
                fr: 'Parler à un expert'
              }, currentLanguage)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
