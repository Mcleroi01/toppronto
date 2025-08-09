import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaClock, FaMoneyBillWave, FaCar, FaMapMarkedAlt, FaUserTie, FaHeadset } from 'react-icons/fa';

const getTranslatedText = (obj: Record<string, string>, lang: string): string => {
  return obj[lang] || '';
};

interface DriversBenefitsProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const DriversBenefits: React.FC<DriversBenefitsProps> = ({ currentLanguage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const translations = {
    title: {
      pt: 'Vantagens de ser um motorista parceiro',
      en: 'Benefits of being a partner driver',
      fr: 'Avantages d\'être un chauffeur partenaire',
      defaultValue: 'Benefits of being a partner driver'
    },
    subtitle: {
      pt: 'Descubra como podemos impulsionar sua carreira',
      en: 'Discover how we can boost your career',
      fr: 'Découvrez comment nous pouvons booster votre carrière',
      defaultValue: 'Discover how we can boost your career'
    },
    benefits: [
      {
        icon: <FaClock className="w-12 h-12 text-primary-600 mb-4" />,
        title: {
          pt: 'Horários Flexíveis',
          en: 'Flexible Schedule',
          fr: 'Horaires flexibles'
        },
        description: {
          pt: 'Escolha quando e quanto quer trabalhar, adaptando à sua rotina.',
          en: 'Choose when and how much you want to work, adapting to your routine.',
          fr: 'Choisissez quand et combien vous voulez travailler, en adaptant à votre routine.'
        }
      },
      {
        icon: <FaMoneyBillWave className="w-12 h-12 text-green-600 mb-4" />,
        title: {
          pt: 'Ganhos Atraentes',
          en: 'Attractive Earnings',
          fr: 'Gains attractifs'
        },
        description: {
          pt: 'Receba pagamentos semanais com taxas competitivas e bônus por desempenho.',
          en: 'Receive weekly payments with competitive rates and performance bonuses.',
          fr: 'Recevez des paiements hebdomadaires avec des tarifs compétitifs et des primes de performance.'
        }
      },
      {
        icon: <FaCar className="w-12 h-12 text-blue-600 mb-4" />,
        title: {
          pt: 'Veículo Próprio',
          en: 'Your Own Vehicle',
          fr: 'Votre propre véhicule'
        },
        description: {
          pt: 'Use seu próprio veículo e tenha mais liberdade no trabalho.',
          en: 'Use your own vehicle and have more work freedom.',
          fr: 'Utilisez votre propre véhicule et ayez plus de liberté au travail.'
        }
      },
      {
        icon: <FaMapMarkedAlt className="w-12 h-12 text-purple-600 mb-4" />,
        title: {
          pt: 'Área de Cobertura',
          en: 'Coverage Area',
          fr: 'Zone de couverture'
        },
        description: {
          pt: 'Atendimento em toda a região metropolitana com rotas otimizadas.',
          en: 'Service throughout the metropolitan area with optimized routes.',
          fr: 'Service dans toute la région métropolitaine avec des itinéraires optimisés.'
        }
      },
      {
        icon: <FaUserTie className="w-12 h-12 text-yellow-600 mb-4" />,
        title: {
          pt: 'Crescimento Profissional',
          en: 'Professional Growth',
          fr: 'Croissance professionnelle'
        },
        description: {
          pt: 'Oportunidades de crescimento e desenvolvimento na plataforma.',
          en: 'Growth and development opportunities on the platform.',
          fr: 'Opportunités de croissance et de développement sur la plateforme.'
        }
      },
      {
        icon: <FaHeadset className="w-12 h-12 text-red-500 mb-4" />,
        title: {
          pt: 'Suporte Dedicado',
          en: 'Dedicated Support',
          fr: 'Support dédié'
        },
        description: {
          pt: 'Equipe de suporte disponível para ajudar quando precisar.',
          en: 'Support team available to help whenever you need it.',
          fr: 'Équipe de support disponible pour vous aider quand vous en avez besoin.'
        }
      }
    ]
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {getTranslatedText(translations.title, currentLanguage)}
          </h2>
          <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getTranslatedText(translations.subtitle, currentLanguage)}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {translations.benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100 hover:bg-green-50/30"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
                  {React.cloneElement(benefit.icon, {
                    className: 'w-8 h-8 text-green-600 group-hover:text-green-700 transition-colors duration-300'
                  })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 group-hover:text-green-800 transition-colors duration-300">
                {getTranslatedText(benefit.title, currentLanguage)}
              </h3>
              <p className="text-gray-600 text-center">
                {getTranslatedText(benefit.description, currentLanguage)}
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-8 h-1 bg-green-100 group-hover:bg-green-200 rounded-full transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
