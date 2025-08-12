import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import JobList from "../components/JobList";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowRight, Link } from "lucide-react";
import { motion } from "framer-motion";
import { BenefitsSlider } from "../components/BenefitsSlider";

// Composant Carrousel pour les avantages
const benefits = [
  {
    title: {
      pt: "Flexibilidade de Horários",
      en: "Flexible Schedules",
      fr: "Horaires Flexibles"
    },
    description: {
      pt: "Possibilidade de ajustar o turno conforme a sua disponibilidade.",
      en: "Ability to adjust shifts according to your availability.",
      fr: "Possibilité d'ajuster les horaires selon votre disponibilité."
    },
    icon: "⏰"
  },
  {
    title: {
      pt: "Renda Competitiva",
      en: "Competitive Income",
      fr: "Revenu Compétitif"
    },
    description: {
      pt: "Pagamento pontual e seguro.",
      en: "Timely and secure payments.",
      fr: "Paiements ponctuels et sécurisés."
    },
    icon: "💵"
  },
  {
    title: {
      pt: "Oportunidades de Crescimento",
      en: "Growth Opportunities",
      fr: "Opportunités de Croissance"
    },
    description: {
      pt: "Possibilidade de se tornar entregador líder ou supervisor de equipe. Treinamentos periódicos para melhorar o desempenho.",
      en: "Opportunity to become a lead delivery person or team supervisor. Regular training to improve performance.",
      fr: "Possibilité de devenir livreur principal ou superviseur d'équipe. Formations régulières pour améliorer les performances."
    },
    icon: "📊"
  },
  {
    title: {
      pt: "Segurança no Trabalho",
      en: "Workplace Safety",
      fr: "Sécurité au Travail"
    },
    description: {
      pt: "Parcerias com seguradoras para proteção contra acidentes. Assistência em caso de imprevistos.",
      en: "Partnerships with insurance companies for accident protection. Assistance in case of unforeseen events.",
      fr: "Partenariats avec des compagnies d'assurance pour une protection contre les accidents. Assistance en cas d'imprévus."
    },
    icon: "🛡️"
  },
  {
    title: {
      pt: "Apoio da Equipe Topronto",
      en: "Topronto Team Support",
      fr: "Soutien de l'Équipe Topronto"
    },
    description: {
      pt: "Suporte diário para dúvidas e orientações. Ambiente profissional e colaborativo.",
      en: "Daily support for questions and guidance. Professional and collaborative environment.",
      fr: "Support quotidien pour les questions et l'orientation. Environnement professionnel et collaboratif."
    },
    icon: "👥"
  }
];

export const Careers: React.FC = () => {
  useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6">
          {currentLanguage === "pt" && "Vantagens de Trabalhar para a Topronto"}
          {currentLanguage === "en" && "Benefits of Working at Topronto"}
          {currentLanguage === "fr" && "Avantages de Travailler chez Topronto"}
        </h2>
        <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mb-12"></div>
        <BenefitsSlider currentLanguage={currentLanguage} benefits={benefits} />
      </div>

      <div className="mb-24">
        <JobList currentLanguage={currentLanguage} />
      </div>

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
            <h2 className="text-3xl font-bold mb-4">
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
};
