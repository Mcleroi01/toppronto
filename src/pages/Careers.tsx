import React from 'react';
import { useTranslation } from 'react-i18next';
import JobList from '../components/JobList';
import { useLanguage } from '../hooks/useLanguage';
import { ArrowRight, Link } from 'lucide-react';

export const Careers: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mb-10">
        <JobList currentLanguage={currentLanguage} />
      </div>

      {/* Section Contactez-nous */}
      <section className="pb-16">
        <div className="relative px-4 text-center bg-green-900 text-white rounded-3xl shadow-2xl overflow-hidden py-16">
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
}