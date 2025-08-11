import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover } from "@headlessui/react";
import { X } from "lucide-react";

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
  limite: string;
  Tamanho?: string;
  Ideal?: string;
  volume?: string;
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
              <Popover className="relative h-full">
                {({ open }) => (
                  <>
                    <Popover.Button className="w-full h-full text-left">
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

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {vehicle.label[currentLanguage]}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {vehicle.desc[currentLanguage]}
                        </p>
                        <div className="text-sm text-green-600 font-medium">
                          {getTranslatedText(
                            { pt: "Ver detalhes", en: "View details", fr: "Voir les détails" },
                            currentLanguage
                          )}
                        </div>
                      </div>
                    </Popover.Button>

                    <AnimatePresence>
                      {open && (
                        <Popover.Panel static className="absolute z-10 w-72 mt-2">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-lg shadow-xl border border-gray-200 p-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-bold text-lg text-gray-900">
                                {vehicle.label[currentLanguage]}
                              </h4>
                              <Popover.Button className="text-gray-400 hover:text-gray-500">
                                <X className="w-5 h-5" />
                              </Popover.Button>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              {vehicle.desc[currentLanguage]}
                            </p>
                            <div className="space-y-4">
                              {/* Vehicle Specifications */}
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {vehicle.limite && (
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {getTranslatedText(
                                        { pt: "Limite", en: "Limit", fr: "Limite" },
                                        currentLanguage
                                      )}:
                                    </span>
                                    <p className="text-gray-600">{vehicle.limite}</p>
                                  </div>
                                )}
                                {vehicle.Tamanho && (
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {getTranslatedText(
                                        { pt: "Tamanho", en: "Size", fr: "Taille" },
                                        currentLanguage
                                      )}:
                                    </span>
                                    <p className="text-gray-600">{vehicle.Tamanho}</p>
                                  </div>
                                )}
                                {vehicle.volume && (
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {getTranslatedText(
                                        { pt: "Volume", en: "Volume", fr: "Volume" },
                                        currentLanguage
                                      )}:
                                    </span>
                                    <p className="text-gray-600">{vehicle.volume}</p>
                                  </div>
                                )}
                                {vehicle.Ideal && (
                                  <div className="col-span-2">
                                    <span className="font-medium text-gray-700">
                                      {getTranslatedText(
                                        { pt: "Ideal para", en: "Ideal for", fr: "Idéal pour" },
                                        currentLanguage
                                      )}:
                                    </span>
                                    <p className="text-gray-600">{vehicle.Ideal}</p>
                                  </div>
                                )}
                              </div>

                              {/* Features Section */}
                              {vehicle.features && vehicle.features.length > 0 && (
                                <div className="space-y-2">
                                  <h5 className="font-medium text-gray-900">
                                    {getTranslatedText(
                                      { pt: "Características", en: "Features", fr: "Caractéristiques" },
                                      currentLanguage
                                    )}
                                  </h5>
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
                                        {typeof feature === 'string' ? feature : getTranslatedText(feature, currentLanguage)}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </Popover.Panel>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Popover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleFleet;
