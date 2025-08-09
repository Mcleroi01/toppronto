import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import { DriversMain } from "../components/drivers/DriversMain";
import { DriversBenefits } from "../components/drivers/DriversBenefits";

import "react-toastify/dist/ReactToastify.css";
import { FAQAccordion } from "../components/FAQAccordion";
import VehicleFleet from "../components/common/VehicleFleet";
import PricingSection from "../components/enterprise/PricingSection";
import { vehicles } from "../data/vehicles";
import { faqs } from "../data/faqs";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { t } from "i18next";

type Language = "pt" | "en" | "fr";

const Drivers: React.FC = () => {
  const { currentLanguage } = useLanguage() as { currentLanguage: Language };

  return (
    <div className="space-y-24">
      <DriversMain currentLanguage={currentLanguage} />
      <DriversBenefits currentLanguage={currentLanguage} />
      {/* Pricing Section */}
      <PricingSection currentLanguage={currentLanguage} />

      {/* Vehicle Fleet Section */}
      <VehicleFleet vehicles={vehicles} currentLanguage={currentLanguage} />
      {/* FAQ Section */}
      <FAQAccordion faqs={faqs} currentLanguage={currentLanguage} />

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
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
              {t("contact.title", "Contactez-nous")}
            </h2>
            <p className="text-lg mb-8 drop-shadow">
              {t(
                "contact.subtitle",
                "Une question, un devis ou un partenariat ? Notre équipe vous répond rapidement."
              )}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors shadow"
            >
              {t("contact.cta", "Envie uma mensagem")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Drivers;
