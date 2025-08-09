import React from "react";
import { motion } from "framer-motion";

type Language = 'pt' | 'en' | 'fr';

type TranslationObject = {
  [key in Language]: string;
};

interface Vehicle {
  icon: React.ComponentType<{ className?: string }>;
  label: TranslationObject;
  desc: TranslationObject;
  image: string;
  features?: (string | TranslationObject)[];
}

interface VehicleFleetProps {
  vehicles: Vehicle[];
  currentLanguage: Language;
  title?: TranslationObject;
  description?: TranslationObject;
  className?: string;
}

const getTranslatedText = (obj: TranslationObject, lang: Language): string => {
  return obj[lang] || '';
};

export const VehicleFleet: React.FC<VehicleFleetProps> = ({
  currentLanguage,
  vehicles,
  title = {
    pt: "Nossa Frota de Veículos",
    en: "Our Vehicle Fleet",
    fr: "Notre Parc de Véhicules",
  },
  description = {
    pt: "Conheça nossa frota diversificada, pronta para atender todas as suas necessidades de entrega.",
    en: "Discover our diverse fleet, ready to meet all your delivery needs.",
    fr: "Découvrez notre flotte diversifiée, prête à répondre à tous vos besoins de livraison.",
  },
  className = "",
}) => {

  return (
    <section className={`relative py-20 sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {getTranslatedText(title, currentLanguage)}
        </h2>
        <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6"></div>
        <p className="text-gray-600 mb-8">
          {getTranslatedText(description, currentLanguage)}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.label[currentLanguage]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">
                <div className="text-green-500 mb-4">
                  <vehicle.icon className="w-8 h-8" />
                </div>

                <div className="h-40 mb-4 flex items-center justify-center">
                  <img
                    src={vehicle.image}
                    alt={vehicle.label[currentLanguage]}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {vehicle.label[currentLanguage]}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {vehicle.desc[currentLanguage]}
                </p>

                {vehicle.features && vehicle.features.length > 0 && (
                  <div className="pt-3 border-t border-gray-100">
                    <ul className="space-y-2">
                      {vehicle.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>
                            {typeof feature === "object"
                              ? feature[currentLanguage]
                              : feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleFleet;
