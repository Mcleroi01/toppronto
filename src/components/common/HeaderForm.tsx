import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, User, MapPin, Package, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

type Language = 'pt' | 'en' | 'fr';

interface HeaderFormProps {
  type: 'enterprise' | 'driver';
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  submitSuccess?: boolean;
}

const HeaderForm: React.FC<HeaderFormProps> = ({
  type,
  onSubmit,
  isSubmitting = false,
  submitSuccess = false
}) => {
  const { currentLanguage } = useLanguage() as { currentLanguage: Language };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
    company: type === 'enterprise' ? '' : undefined
  });

  const cities = [
    { value: 'luanda', label: { pt: 'Luanda', en: 'Luanda', fr: 'Luanda' } },
    { value: 'benguela', label: { pt: 'Benguela', en: 'Benguela', fr: 'Benguela' } },
    { value: 'lubango', label: { pt: 'Lubango', en: 'Lubango', fr: 'Lubango' } },
    { value: 'outra', label: { pt: 'Outra cidade', en: 'Other city', fr: 'Autre ville' } },
  ];

  const vehicleTypes = [
    { value: 'moto', label: { pt: 'Moto', en: 'Motorbike', fr: 'Moto' } },
    { value: 'carro', label: { pt: 'Carro', en: 'Car', fr: 'Voiture' } },
    { value: 'van', label: { pt: 'Van', en: 'Van', fr: 'Fourgonnette' } },
    { value: 'caminhao', label: { pt: 'Caminhão', en: 'Truck', fr: 'Camion' } },
  ];

  const getTranslatedText = (obj: Record<Language, string> | undefined) => {
    return obj ? obj[currentLanguage] : '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (submitSuccess) {
    return (
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-auto mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {type === 'enterprise' 
              ? getTranslatedText({
                  pt: 'Solicitação enviada com sucesso!',
                  en: 'Request sent successfully!',
                  fr: 'Demande envoyée avec succès !'
                })
              : getTranslatedText({
                  pt: 'Cadastro realizado com sucesso!',
                  en: 'Registration successful!',
                  fr: 'Inscription réussie !'
                })}
          </h3>
          <p className="text-gray-600">
            {type === 'enterprise'
              ? getTranslatedText({
                  pt: 'Nossa equipe entrará em contato em breve para discutir suas necessidades de entrega.',
                  en: 'Our team will contact you soon to discuss your delivery needs.',
                  fr: 'Notre équipe vous contactera bientôt pour discuter de vos besoins de livraison.'
                })
              : getTranslatedText({
                  pt: 'Nossa equipe entrará em contato em breve com os próximos passos.',
                  en: 'Our team will contact you soon with the next steps.',
                  fr: 'Notre équipe vous contactera bientôt avec les prochaines étapes.'
                })}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder={
                type === 'enterprise' 
                  ? getTranslatedText({ pt: 'Seu nome', en: 'Your name', fr: 'Votre nom' })
                  : getTranslatedText({ pt: 'Nome completo', en: 'Full name', fr: 'Nom complet' })
              }
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder={
                type === 'enterprise'
                  ? getTranslatedText({ pt: 'E-mail da empresa', en: 'Company email', fr: 'E-mail de l\'entreprise' })
                  : getTranslatedText({ pt: 'Seu melhor e-mail', en: 'Your best email', fr: 'Votre meilleur e-mail' })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder={
                type === 'enterprise'
                  ? getTranslatedText({ pt: 'Telefone comercial', en: 'Business phone', fr: 'Téléphone professionnel' })
                  : getTranslatedText({ pt: 'Seu telefone', en: 'Your phone', fr: 'Votre téléphone' })
              }
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
              required
            >
              <option value="">
                {getTranslatedText({ 
                  pt: 'Selecione sua cidade', 
                  en: 'Select your city', 
                  fr: 'Sélectionnez votre ville' 
                })}
              </option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {getTranslatedText(city.label as Record<Language, string>)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {type === 'enterprise' && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder={getTranslatedText({ 
                pt: 'Nome da empresa', 
                en: 'Company name', 
                fr: 'Nom de l\'entreprise' 
              })}
              required
            />
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Truck className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
            required
          >
            <option value="">
              {type === 'enterprise'
                ? getTranslatedText({ 
                    pt: 'Tipo de veículo necessário', 
                    en: 'Required vehicle type', 
                    fr: 'Type de véhicule requis' 
                  })
                : getTranslatedText({ 
                    pt: 'Seu tipo de veículo', 
                    en: 'Your vehicle type', 
                    fr: 'Votre type de véhicule' 
                  })}
            </option>
            {vehicleTypes.map((vehicle) => (
              <option key={vehicle.value} value={vehicle.value}>
                {getTranslatedText(vehicle.label as Record<Language, string>)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{
                type === 'enterprise'
                  ? getTranslatedText({ pt: 'Enviando...', en: 'Sending...', fr: 'Envoi en cours...' })
                  : getTranslatedText({ pt: 'Enviando...', en: 'Sending...', fr: 'Envoi en cours...' })
              }</span>
            </>
          ) : (
            <>
              <span>{
                type === 'enterprise'
                  ? getTranslatedText({ pt: 'Solicitar orçamento', en: 'Request a quote', fr: 'Demander un devis' })
                  : getTranslatedText({ pt: 'Quero ser motorista', en: 'Become a driver', fr: 'Devenir chauffeur' })
              }</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default HeaderForm;
