import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';

type Language = 'pt' | 'en' | 'fr';

interface EnterpriseHeroProps {
  currentLanguage: Language;
}

export const EnterpriseHero: React.FC<EnterpriseHeroProps> = ({ currentLanguage }) => {
  return (
    <section className="relative bg-gradient-to-r from-green-700 to-green-800 text-white overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/pattern.svg')" }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 text-sm font-semibold bg-white/20 rounded-full mb-6">
                {getTranslatedText({
                  pt: 'Soluções Empresariais',
                  en: 'Business Solutions',
                  fr: 'Solutions Professionnelles'
                }, currentLanguage)}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {getTranslatedText({
                  pt: 'Soluções de Entrega para o Seu Negócio',
                  en: 'Delivery Solutions for Your Business',
                  fr: 'Solutions de Livraison pour Votre Entreprise'
                }, currentLanguage)}
              </h1>
              
              <div className="w-20 h-1.5 bg-yellow-400 rounded-full mb-6" />
              
              <p className="text-xl text-green-100 mb-8 max-w-2xl">
                {getTranslatedText({
                  pt: 'Otimize sua cadeia de suprimentos com nossa frota confiável e tecnologia de ponta para entregas rápidas e eficientes.',
                  en: 'Optimize your supply chain with our reliable fleet and cutting-edge technology for fast and efficient deliveries.',
                  fr: 'Optimisez votre chaîne d\'approvisionnement avec notre flotte fiable et notre technologie de pointe pour des livraisons rapides et efficaces.'
                }, currentLanguage)}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="#form"
                  className="inline-flex items-center px-6 py-3 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  {getTranslatedText({
                    pt: 'Solicitar Demonstração',
                    en: 'Request a Demo',
                    fr: 'Demander une Démo'
                  }, currentLanguage)}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                
                <a
                  href="#features"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                >
                  {getTranslatedText({
                    pt: 'Saiba Mais',
                    en: 'Learn More',
                    fr: 'En Savoir Plus'
                  }, currentLanguage)}
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/images/enterprise-hero.jpg"
                alt={getTranslatedText({
                  pt: 'Soluções de entrega para empresas',
                  en: 'Delivery solutions for businesses',
                  fr: 'Solutions de livraison pour les entreprises'
                }, currentLanguage)}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-green-900 px-6 py-3 rounded-lg shadow-lg font-semibold">
              {getTranslatedText({
                pt: 'Até 30% de economia',
                en: 'Save up to 30%',
                fr: 'Jusqu\'à 30% d\'économie'
              }, currentLanguage)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
