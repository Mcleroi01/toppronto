import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';

type Language = 'pt' | 'en' | 'fr';

interface SecurityFeature {
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
}

interface EnterpriseSecurityProps {
  currentLanguage: Language;
}

export const EnterpriseSecurity: React.FC<EnterpriseSecurityProps> = ({ currentLanguage }) => {
  const securityFeatures: SecurityFeature[] = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: {
        pt: 'Proteção de Dados',
        en: 'Data Protection',
        fr: 'Protection des Données'
      },
      description: {
        pt: 'Seus dados comerciais estão seguros com nossa criptografia de última geração e protocolos de segurança rigorosos.',
        en: 'Your business data is safe with our state-of-the-art encryption and strict security protocols.',
        fr: 'Vos données professionnelles sont sécurisées grâce à notre chiffrement de pointe et à des protocoles de sécurité stricts.'
      }
    },
    {
      icon: <Lock className="w-8 h-8 text-green-600" />,
      title: {
        pt: 'Acesso Seguro',
        en: 'Secure Access',
        fr: 'Accès Sécurisé'
      },
      description: {
        pt: 'Controle de acesso baseado em funções para garantir que apenas pessoas autorizadas tenham acesso a informações confidenciais.',
        en: 'Role-based access control to ensure only authorized personnel have access to sensitive information.',
        fr: 'Contrôle d\'accès basé sur les rôles pour garantir que seules les personnes autorisées aient accès aux informations sensibles.'
      }
    },
    {
      icon: <Eye className="w-8 h-8 text-green-600" />,
      title: {
        pt: 'Monitoramento em Tempo Real',
        en: 'Real-time Monitoring',
        fr: 'Surveillance en Temps Réel'
      },
      description: {
        pt: 'Sistema de monitoramento 24/7 para garantir a segurança de todas as operações de entrega em tempo real.',
        en: '24/7 monitoring system to ensure the security of all delivery operations in real-time.',
        fr: 'Système de surveillance 24/7 pour assurer la sécurité de toutes les opérations de livraison en temps réel.'
      }
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: {
        pt: 'Conformidade',
        en: 'Compliance',
        fr: 'Conformité'
      },
      description: {
        pt: 'Estamos em conformidade com os principais padrões de segurança e regulamentações de proteção de dados.',
        en: 'We comply with major security standards and data protection regulations.',
        fr: 'Nous nous conformons aux principales normes de sécurité et réglementations sur la protection des données.'
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getTranslatedText({
              pt: 'Nossa Garantia de Segurança',
              en: 'Our Security Guarantee',
              fr: 'Notre Garantie de Sécurité'
            }, currentLanguage)}
          </h2>
          <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslatedText({
              pt: 'Comprometidos em proteger seus dados e operações com os mais altos padrões de segurança do setor',
              en: 'Committed to protecting your data and operations with the highest industry security standards',
              fr: 'Engagés à protéger vos données et opérations avec les normes de sécurité les plus élevées du secteur'
            }, currentLanguage)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 p-3 rounded-lg mr-6">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {getTranslatedText(feature.title, currentLanguage)}
                  </h3>
                  <p className="text-gray-600">
                    {getTranslatedText(feature.description, currentLanguage)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-green-50 rounded-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {getTranslatedText({
                pt: 'Perguntas sobre segurança?',
                en: 'Questions about security?',
                fr: 'Des questions sur la sécurité ?'
              }, currentLanguage)}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {getTranslatedText({
                pt: 'Nossa equipe de especialistas em segurança está disponível para responder a todas as suas dúvidas e preocupações.',
                en: 'Our team of security experts is available to address all your questions and concerns.',
                fr: 'Notre équipe d\'experts en sécurité est disponible pour répondre à toutes vos questions et préoccupations.'
              }, currentLanguage)}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              {getTranslatedText({
                pt: 'Fale com nossa equipe',
                en: 'Talk to our team',
                fr: 'Parlez à notre équipe'
              }, currentLanguage)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
