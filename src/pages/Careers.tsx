import React from "react";
import { useTranslation } from "react-i18next";
import JobList from "../components/JobList";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowRight, Link } from "lucide-react";

export const Careers: React.FC = () => {
  useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mb-10">
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
