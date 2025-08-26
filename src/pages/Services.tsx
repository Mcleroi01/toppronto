import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { FAQAccordion } from "../components/FAQAccordion";
import { ServiceModal } from "../components/ServiceModal";
import { Link } from "react-router-dom";
import PricingSection from "../components/enterprise/PricingSection";
import { services } from "../data/services";

interface Language {
  pt: string;
  en: string;
  fr: string;
}

interface Service {
  id: string;
  image: string;
  name: Language;
  description: Language;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  backgroundImage?: string;
}







const faqs = {
  pt: [
    {
      question: "Como posso solicitar um serviço de entrega?",
      answer:
        "Você pode solicitar um serviço de entrega entrando em contato connosco através do nosso site, WhatsApp, aplicativo ou por telefone. Nossa equipe irá guiá-lo pelo processo.",
    },
    {
      question: "Quais São as áreas de cobertura que nós atendemos?",
      answer:
        "Atendemos em toda a região metropolitana, com cobertura em todas as principais cidades. Entre em contato para verificar a disponibilidade na sua região.Atendemos em toda região da provincial de Luanda, e algumas regiões nas provincias de BENGUELA, LOBITO, LUBANGO, HUAMBO, MALANJE e BIÉ.",
    },
    {
      question: "Quais são os métodos de pagamento aceitos?",
      answer:
        "Aceitamos cartões de crédito/débito, transferência bancária e pagamento na entrega em algumas localizações.Aceitamos todos os métodos de pagamentos usados em Angola, desde cartões, transferência, Multicaixa expresso e pagamentos na entrega.",
    },
  ],
  en: [
    {
      question: "How can I request a delivery service?",
      answer:
        "You can request a delivery service by contacting us through our website, WhatsApp, app, or by phone. Our team will guide you through the process.",
    },
    {
      question: "What are the coverage areas?",
      answer:
        "We serve the entire metropolitan area, with coverage in all major cities. Contact us to check availability in your area.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, bank transfers, and cash on delivery in some locations.",
    },
  ],
  fr: [
    {
      question: "Comment puis-je demander un service de livraison ?",
      answer:
        "Vous pouvez demander un service de livraison en nous contactant via notre site Web, WhatsApp, application ou par téléphone. Notre équipe vous guidera tout au long du processus.",
    },
    {
      question: "Quelles sont les zones de couverture ?",
      answer:
        "Nous desservons toute la région métropolitaine, avec une couverture dans toutes les grandes villes. Contactez-nous pour vérifier la disponibilité dans votre région.",
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les cartes de crédit/débit, les virements bancaires et le paiement à la livraison dans certains endroits.",
    },
  ],
};

export default function Services() {
  useTranslation();
  const { currentLanguage } = useLanguage();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div className="sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 mb-6 px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
          {currentLanguage === "pt" && "Nossos Serviços"}
          {currentLanguage === "en" && "Our Services"}
          {currentLanguage === "fr" && "Nos Services"}
        </h1>
        <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6 "></div>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl ">
          {currentLanguage === "pt" &&
            "Soluções de logística e entrega sob medida para o seu negócio"}
          {currentLanguage === "en" &&
            "Custom logistics and delivery solutions for your business"}
          {currentLanguage === "fr" &&
            "Solutions de logistique et de livraison sur mesure pour votre entreprise"}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 px-4">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: idx * 0.1,
              },
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -5 }}
            className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[300px] flex flex-col"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={service.image || "/images/placeholder-bg.jpg"}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-8 text-white">
              <div className="flex-grow">
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                  <service.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-yellow-400 mb-3 group-hover:text-green-300 transition-colors">
                  {service.name[currentLanguage as keyof typeof service.name]}
                </h3>
                <p className="text-gray-100 font-bold leading-relaxed mb-6">
                  {
                    service.description[
                      currentLanguage as keyof typeof service.description
                    ]
                  }
                </p>
              </div>

              {/* Learn More Button */}
              <div className="mt-auto">
                <button
                  onClick={() => openModal(service)}
                  className="inline-flex items-center text-green-300 font-medium group-hover:text-white transition-colors border-b border-transparent group-hover:border-green-300 pb-1"
                >
                  <span className="mr-2">
                    {currentLanguage === "pt" && "Saiba mais"}
                    {currentLanguage === "en" && "Learn more"}
                    {currentLanguage === "fr" && "En savoir plus"}
                  </span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>

      {/* Pricing Section */}
      <PricingSection currentLanguage={currentLanguage} />

      {/* FAQ Section */}
      <FAQAccordion faqs={faqs} currentLanguage={currentLanguage} />

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          service={{
            id: selectedService.id,
            name:
              selectedService.name[
                currentLanguage as keyof typeof selectedService.name
              ],
            description:
              selectedService.description[
                currentLanguage as keyof typeof selectedService.description
              ],
            image: selectedService.image,
          }}
        />
      )}

      {/* Section Contactez-nous */}
      <section className="">
        <div className="relative px-4 text-center bg-gradient-to-r from-green-800 to-green-700 text-white  shadow-2xl overflow-hidden py-16">
          {/* Image de fond avec effet blend et blur */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
            style={{
              backgroundImage: "url('/images/background.png')",
            }}
          ></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl text-yellow-400 font-bold mb-4">
              {currentLanguage === "pt" &&
                "Pronto para otimizar sua logística?"}
              {currentLanguage === "en" && "Ready to optimize your logistics?"}
              {currentLanguage === "fr" &&
                "Prêt à optimiser votre logistique ?"}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              {currentLanguage === "pt" &&
                "Entre em contato conosco hoje mesmo para uma consulta gratuita."}
              {currentLanguage === "en" &&
                "Contact us today for a free consultation."}
              {currentLanguage === "fr" &&
                "Contactez-nous dès aujourd'hui pour une consultation gratuite."}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {currentLanguage === "pt" && "Fale Conosco"}
              {currentLanguage === "en" && "Contact Us"}
              {currentLanguage === "fr" && "Contactez-nous"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
