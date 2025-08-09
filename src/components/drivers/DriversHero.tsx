import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '../ui/Button';

interface DriversHeroProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

const getTranslatedText = (obj: Record<string, string>, lang: string): string => {
  return obj[lang] || '';
};

export const DriversHero: React.FC<DriversHeroProps> = ({ currentLanguage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const translations = {
    badge: {
      pt: 'OPORTUNIDADE',
      en: 'OPPORTUNITY',
      fr: 'OPPORTUNITÉ',
      defaultValue: 'OPPORTUNITY'
    },
    title: {
      pt: 'Torne-se um Motorista Parceiro',
      en: 'Become a Partner Driver',
      fr: 'Devenez un Chauffeur Partenaire',
      defaultValue: 'Become a Partner Driver'
    },
    subtitle: {
      pt: 'Ganhe dinheiro extra com seu próprio horário',
      en: 'Earn extra money on your own schedule',
      fr: 'Gagnez un revenu supplémentaire selon vos horaires',
      defaultValue: 'Earn extra money on your own schedule'
    },
    cta: {
      pt: 'Cadastre-se Agora',
      en: 'Sign Up Now',
      fr: 'Inscrivez-vous maintenant',
      defaultValue: 'Sign Up Now'
    },
    download: {
      pt: 'Baixe o Aplicativo',
      en: 'Download the App',
      fr: 'Téléchargez l\'application',
      defaultValue: 'Download the App'
    }
  };

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-green-800 to-green-700 text-yellow-400">
      <div className="sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
            {getTranslatedText(translations.badge, currentLanguage)}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {getTranslatedText(translations.title, currentLanguage)}
          </h1>
          
          <div className="w-20 h-1.5 bg-yellow-400 rounded-full mb-6 mx-auto"></div>
          
          <p className="text-lg text-yellow-100 max-w-3xl mx-auto">
            {getTranslatedText(translations.subtitle, currentLanguage)}
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-yellow-400 text-green-800 hover:bg-yellow-300 font-semibold"
            >
              {getTranslatedText(translations.cta, currentLanguage)}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-semibold"
            >
              {getTranslatedText(translations.download, currentLanguage)}
            </Button>
          </div>
        </motion.div>
        
        {/* Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <div className="relative w-full max-w-2xl">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/10">
              <img 
                src="/images/driver-hero.png" 
                alt="Driver"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
