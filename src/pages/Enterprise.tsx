import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { VehicleFleet } from "../components/common/VehicleFleet";
import { EnterpriseTestimonials } from '../components/enterprise/EnterpriseTestimonials';
import { faqs } from '../data/faqs';
import 'react-toastify/dist/ReactToastify.css';
import { vehicles } from "../data/vehicles";
import ClientLogos from '../components/common/ClientLogos';
import PricingSection from '../components/enterprise/PricingSection';

import { FAQAccordion } from '../components/FAQAccordion';

type Language = 'pt' | 'en' | 'fr';

const Enterprise: React.FC = () => {
  const { currentLanguage } = useLanguage() as { currentLanguage: Language };

  return (
    <div className="bg-white">
      

      {/* Client Logos Section */}
      <ClientLogos />
      
      {/* Pricing Section */}
      <PricingSection currentLanguage={currentLanguage} />

      {/* Vehicle Fleet Section */}
      <VehicleFleet vehicles={vehicles} currentLanguage={currentLanguage} />

      {/* FAQ Section */}
      <FAQAccordion faqs={faqs} currentLanguage={currentLanguage} />

      {/* Testimonials */}
      <EnterpriseTestimonials currentLanguage={currentLanguage} />
      
    </div>
  );
};

export default Enterprise;
