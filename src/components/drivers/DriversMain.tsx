import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaClock, FaHeadset, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import { Link } from 'react-router-dom';

const getTranslatedText = (obj: Record<string, string>, lang: string): string => {
  return obj[lang] || obj['en'] || '';
};

interface DriversMainProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const DriversMain: React.FC<DriversMainProps> = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { currentLanguage } = useLanguage() as { currentLanguage: 'pt' | 'en' | 'fr' };

  const features = [
    {
      title: {
        pt: 'Ganhe Mais',
        en: 'Earn More',
        fr: 'Gagnez Plus'
      },
      description: {
        pt: 'Ganhe dinheiro extra com flexibilidade de horários e bônus semanais.',
        en: 'Earn extra money with flexible hours and weekly bonuses.',
        fr: 'Gagnez de l\'argent supplémentaire avec des horaires flexibles et des bonus hebdomadaires.'
      },
      icon: <FaMoneyBillWave />,
      backgroundImage: '/images/drivers/earn-more.jpg'
    },
    {
      title: {
        pt: 'Horários Flexíveis',
        en: 'Flexible Hours',
        fr: 'Horaires Flexibles'
      },
      description: {
        pt: 'Escolha quando e onde trabalhar, de acordo com sua disponibilidade.',
        en: 'Choose when and where to work according to your availability.',
        fr: 'Choisissez quand et où travailler selon votre disponibilité.'
      },
      icon: <FaClock />,
      backgroundImage: '/images/drivers/flexible-hours.jpg'
    },
    {
      title: {
        pt: 'Suporte Dedicado',
        en: 'Dedicated Support',
        fr: 'Support Dédié'
      },
      description: {
        pt: 'Equipe de suporte disponível 24/7 para ajudar com qualquer necessidade.',
        en: 'Support team available 24/7 to help with any needs.',
        fr: 'Équipe de support disponible 24/7 pour vous aider.'
      },
      icon: <FaHeadset />,
      backgroundImage: '/images/drivers/support.jpg'
    },
    {
      title: {
        pt: 'Segurança Garantida',
        en: 'Guaranteed Safety',
        fr: 'Sécurité Garantie'
      },
      description: {
        pt: 'Sistema de avaliação e verificação para garantir a segurança de todos.',
        en: 'Rating and verification system to ensure everyone\'s safety.',
        fr: 'Système d\'évaluation et de vérification pour assurer la sécurité de tous.'
      },
      icon: <FaShieldAlt />,
      backgroundImage: '/images/drivers/safety.jpg'
    }
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
            {getTranslatedText(
              {
                pt: "Oportunidade Única",
                en: "Unique Opportunity",
                fr: "Opportunité Unique"
              },
              currentLanguage
            )}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {getTranslatedText(
              {
                pt: "Torne-se um Motorista Parceiro",
                en: "Become a Partner Driver",
                fr: "Devenez Chauffeur Partenaire"
              },
              currentLanguage
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getTranslatedText(
              {
                pt: "Junte-se à nossa rede de motoristas e comece a ganhar dinheiro com flexibilidade e segurança.",
                en: "Join our network of drivers and start earning money with flexibility and security.",
                fr: "Rejoignez notre réseau de chauffeurs et commencez à gagner de l'argent avec flexibilité et sécurité."
              },
              currentLanguage
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ 
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url('${feature.backgroundImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-white rounded-xl mb-4">
                    {React.cloneElement(feature.icon, { className: 'w-6 h-6' })}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {getTranslatedText(feature.title, currentLanguage)}
                  </h3>
                  <p className="text-gray-200 mb-6">
                    {getTranslatedText(feature.description, currentLanguage)}
                  </p>
                  <div className="flex items-center text-green-300 font-medium">
                    <span className="mr-2">
                      {getTranslatedText(
                        { pt: 'Saiba mais', en: 'Learn more', fr: 'En savoir plus' },
                        currentLanguage
                      )}
                    </span>
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {getTranslatedText(
              {
                pt: 'Comece a dirigir agora',
                en: 'Start driving now',
                fr: 'Commencez à conduire maintenant'
              },
              currentLanguage
            )}
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DriversMain;
