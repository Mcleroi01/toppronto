import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';

type Language = 'pt' | 'en' | 'fr';

interface Testimonial {
  company: string;
  quote: {
    pt: string;
    en: string;
    fr: string;
  };
  role: {
    pt: string;
    en: string;
    fr: string;
  };
  name: string;
  rating: number;
}

interface EnterpriseTestimonialsProps {
  currentLanguage: Language;
}

const testimonials: Testimonial[] = [
  {
    company: 'Bela Tintas',
    quote: {
      pt: 'A Topronto revolucionou nossa logística de entrega, reduzindo custos em 40%.',
      en: 'Topronto revolutionized our delivery logistics, reducing costs by 40%.',
      fr: 'Topronto a révolutionné notre logistique de livraison, réduisant les coûts de 40%.'
    },
    role: {
      pt: 'Diretor de Operações',
      en: 'Operations Director',
      fr: 'Directeur des Opérations'
    },
    name: 'Carlos M.',
    rating: 5
  },
  {
    company: 'John Richard',
    quote: {
      pt: 'O atendimento personalizado e a tecnologia nos ajudaram a escalar nossas entregas.',
      en: 'The personalized service and technology helped us scale our deliveries.',
      fr: 'Le service personnalisé et la technologie nous ont aidés à développer nos livraisons.'
    },
    role: {
      pt: 'Gerente de Logística',
      en: 'Logistics Manager',
      fr: 'Responsable Logistique'
    },
    name: 'Ana S.',
    rating: 5
  },
  {
    company: 'Supermercado Bom Preço',
    quote: {
      pt: 'Entregas rápidas e confiáveis para nossos clientes. Recomendamos!',
      en: 'Fast and reliable deliveries for our customers. Highly recommended!',
      fr: 'Livraisons rapides et fiables pour nos clients. Nous recommandons vivement !'
    },
    role: {
      pt: 'Gerente Comercial',
      en: 'Commercial Manager',
      fr: 'Responsable Commercial'
    },
    name: 'Miguel T.',
    rating: 4
  }
];

export const EnterpriseTestimonials: React.FC<EnterpriseTestimonialsProps> = ({ currentLanguage }) => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getTranslatedText({
              pt: 'O que nossos clientes dizem',
              en: 'What our clients say',
              fr: 'Ce que disent nos clients'
            }, currentLanguage)}
          </h2>
          <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslatedText({
              pt: 'Empresas que confiam em nossos serviços de entrega',
              en: 'Businesses that trust our delivery services',
              fr: 'Entreprises qui font confiance à nos services de livraison'
            }, currentLanguage)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-gray-700 italic mb-6">
                "{getTranslatedText(testimonial.quote, currentLanguage)}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {getTranslatedText(testimonial.role, currentLanguage)} • {testimonial.company}
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
