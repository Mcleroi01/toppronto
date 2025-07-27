import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users } from "lucide-react";
import { services } from "../data/services";
import { useLanguage } from "../hooks/useLanguage";

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [tab, setTab] = useState(0);

  console.log(services);

  const features = [
    {
      title: {
        pt: "Entrega Rápida",
        en: "Fast Delivery",
        fr: "Livraison Rapide",
      },
      description: {
        pt: "Entregas em até 2 horas em Luanda",
        en: "Deliveries within 2 hours in Luanda",
        fr: "Livraisons en 2 heures à Luanda",
      },
      image:
        "https://cdn.prod.website-files.com/637d6390b70424b49c14ff1e/66066981f2d884346df02cbc_deliver-packages-faster-HERO.webp",
    },
    {
      icon: Shield,
      title: {
        pt: "Segurança Garantida",
        en: "Guaranteed Security",
        fr: "Sécurité Garantie",
      },
      description: {
        pt: "Produtos seguros e rastreamento em tempo real",
        en: "Secure products and real-time tracking",
        fr: "Produits sécurisés et suivi en temps réel",
      },
      image:
        "https://images.squarespace-cdn.com/content/v1/6047adb1f3383c71b64f494b/22f1c571-9121-4d6c-9c0b-406e2824742b/Untitled+%283+x+2+in%29+%2811%29.png",
    },
    {
      icon: Users,
      title: {
        pt: "Equipe Profissional",
        en: "Professional Team",
        fr: "Équipe Professionnelle",
      },
      description: {
        pt: "Motoristas treinados e experientes",
        en: "Trained and experienced drivers",
        fr: "Chauffeurs formés et expérimentés",
      },
      image:
        "https://media.istockphoto.com/id/1474043686/photo/business-manager-talking-to-a-group-of-employees-at-a-distribution-warehouse.jpg?s=612x612&w=0&k=20&c=i-sXngKASrpPfoOA0-NdebfCHbFlLZ_OsDyyQspvNWw=",
    },
  ];

  // Regroupement des services par catégorie fictive pour le TabMenu

  return (
    <div className="space-y-24">
      {/* Features Section */}
      <section className="">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className=" flex flex-col  p-8"
              >
                <img
                  src={feature.image}
                  alt={feature.title[currentLanguage]}
                  className=" object-cover rounded-xl mb-6 shadow"
                />

                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {feature.title[currentLanguage]}
                </h3>
                <p className="text-blue-900  text-sm">
                  {feature.description[currentLanguage]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <div className="">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">
              {t("services.title", "Nos Services")}
            </h2>
          </div>

          {/* TabMenu */}
          <div className="overflow-x-auto whitespace-nowrap flex items-center gap-2 bg-gray-100 rounded-full p-2 mb-8">
            {services.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setTab(idx)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 shrink-0 ${
                  tab === idx
                    ? "bg-green-600 text-white shadow"
                    : "text-green-900 hover:bg-yellow-200"
                }`}
              >
                {cat.name[currentLanguage].length > 15
                  ? cat.name[currentLanguage].slice(0, 14) + "…"
                  : cat.name[currentLanguage]}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 gap-8 mb-4">
            {[services[tab]].map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row w-full overflow-hidden "
              >
                <div className="flex flex-col justify-between w-full md:w-1/2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold  mb-5">
                      {service.name[currentLanguage]}
                    </h3>
                    <p className="text-gray-800 text-sm mb-4">
                      {service.description[currentLanguage]}
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-clip w-fit"
                  >
                    {t("services.cta", "Demander un devis")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                <img
                  src={service.image}
                  alt={service.name[currentLanguage]}
                  className="w-full md:w-1/2 h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
};
