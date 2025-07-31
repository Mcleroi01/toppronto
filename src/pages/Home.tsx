import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Bike, Car, Truck } from "lucide-react";
import { services } from "../data/services";
import { useLanguage } from "../hooks/useLanguage";

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [tab, setTab] = useState(0);

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

  const vehicles = [
    {
      icon: Bike,
      label: {
        fr: "Moto",
        en: "Motorbike",
        pt: "Moto",
      },
      desc: {
        fr: "Idéal pour les petits colis et livraisons urgentes.",
        en: "Ideal for small parcels and urgent deliveries.",
        pt: "Ideal para pequenas encomendas e entregas urgentes.",
      },
      image: "/images/walker.png",
    },
    {
      icon: Car,
      label: {
        fr: "Voiture",
        en: "Car",
        pt: "Carro",
      },
      desc: {
        fr: "Pour les livraisons rapides et flexibles en ville.",
        en: "For fast and flexible city deliveries.",
        pt: "Para entregas rápidas e flexíveis na cidade.",
      },
      image: "/images/Motorcycle .png",
    },
    {
      icon: Truck,
      label: {
        fr: "Camion",
        en: "Truck",
        pt: "Camião",
      },
      desc: {
        fr: "Pour les gros volumes et la logistique professionnelle.",
        en: "For large volumes and professional logistics.",
        pt: "Para grandes volumes e logística profissional.",
      },
      image: "/images/van.png",
    },
  ];

  // Liste des logos clients (ajoute/remplace les chemins selon tes besoins)
  const clientLogos = [
    "https://pngimg.com/d/walt_disney_PNG45.png",
    "https://www.logoai.com/oss/icons/2021/12/02/EoLJeYhT6YPfd26.png",
    "https://www.logoai.com/oss/icons/2021/12/02/SU8HhT2n6tL-p-_.png",
    "https://images.vexels.com/media/users/3/142789/isolated/lists/2bfb04ad814c4995f0c537c68db5cd0b-multicolor-swirls-circle-logo.png",
    "https://static.vecteezy.com/system/resources/thumbnails/038/516/357/small/ai-generated-eagle-logo-design-in-black-style-on-transparant-background-png.png",
    "https://cdn.freebiesupply.com/images/large/2x/burger-king-logo-png-transparent.png",
    "https://www.freeiconspng.com/uploads/blank-logo-design-for-brand-13.png",
    "https://cdn.pixabay.com/photo/2022/08/22/02/05/logo-7402513_1280.png",
  ];

  // Animation slide horizontale auto (marquee)
  function useAutoScroll(
    ref: React.RefObject<HTMLDivElement>,
    reverse = false
  ) {
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let frame: number;
      let pos = 0;
      const speed = 0.5; // px par frame

      function animate() {
        pos += reverse ? -speed : speed;
        // Pour le sens inverse, il faut aussi ajuster scrollLeft
        if (reverse) {
          if (pos <= 0 && el && el.scrollWidth) pos = el.scrollWidth / 2;
          if (el) el.scrollLeft = pos;
        } else {
          if (pos >= (el?.scrollWidth || 0) / 2 && el) pos = 0;
          if (el) el.scrollLeft = pos;
        }
        frame = requestAnimationFrame(animate);
      }
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }, [ref, reverse]);
  }

  // Section Nos Clients avec animation slide
  const ClientsSection = () => {
    const row1 = useRef<HTMLDivElement>(null);
    const row2 = useRef<HTMLDivElement>(null);

    useAutoScroll(row1, false);
    useAutoScroll(row2, true);

    // Duplique les logos pour effet infini
    const logos = [...clientLogos, ...clientLogos];

    return (
      <section className="pb-16 ">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold  mb-10">
            {t("clients.title", "Eles confiam em nós")}
          </h2>
          <div className="space-y-8">
            {/* Première ligne */}
            <div
              ref={row1}
              className="overflow-hidden w-full"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex gap-12 w-max animate-none">
                {logos.map((src, i) => (
                  <div
                    key={"row1-" + i}
                    className="flex-shrink-0 flex items-center justify-center h-24 w-48"
                  >
                    <img
                      src={src}
                      alt={`Client ${i + 1}`}
                      className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Deuxième ligne, sens inverse */}
            <div
              ref={row2}
              className="overflow-hidden w-full"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex gap-12 w-max animate-none">
                {logos.map((src, i) => (
                  <div
                    key={"row2-" + i}
                    className="flex-shrink-0 flex items-center justify-center h-24 w-48"
                  >
                    <img
                      src={src}
                      alt={`Client ${i + 1}`}
                      className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-24">
      {/* Features Section */}
      <section className="py-16 relative">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        ></div>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className=" flex flex-col p-8"
              >
                <img
                  src={feature.image}
                  alt={feature.title[currentLanguage]}
                  className=" object-cover rounded-xl mb-6 shadow transition-transform duration-300 hover:scale-105"
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
      {/* Banier Section */}
      <section className="pb-16">
        <div className="relative bg-green-900 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-0 ">
          {/* Image illustrative à gauche sur desktop, en haut sur mobile */}

          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
            style={{
              backgroundImage: "url('/images/background.png')",
            }}
          ></div>

          <div className="p-8 flex-1 flex flex-col items-start justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("home.banner.title", "Entrega rápida e fiável")}
            </h2>
            <p className="text-sm mb-6">
              {t(
                "home.banner.description",
                "Oferecemos serviços de entrega rápidos e seguros em Luanda, com uma equipa profissional e soluções personalizadas."
              )}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-yellow-500 text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-colors"
            >
              {t("home.banner.cta", "Contate-nos")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <img
            src="/images/banier.png"
            alt={t("home.banner.imageAlt", "Livraison rapide")}
            className="w-full md:w-1/2 h-56 md:h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>

      <section className="pb-16 relative">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5 w-full"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold  mb-10 ">
            {t("vehicles.title", "A nossa frota de veículos")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 place-items-center">
            {vehicles.map((veh, idx) => (
              <motion.div
                key={veh.label[currentLanguage]}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-3xl shadow-lg pt-24 pb-8 px-6 flex flex-col items-center text-center overflow-visible"
              >
                {/* Image dans un cercle flottant */}
                <div className="absolute -top-16 overflow-hidden ">
                  <img
                    src={veh.image}
                    alt={veh.label[currentLanguage]}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
                  />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2 mt-10">
                  {veh.label[currentLanguage]}
                </h3>
                <p className="text-blue-900 text-sm">
                  {veh.desc[currentLanguage]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">
              {t("services.title", "Os nossos serviços")}
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
                {cat.name && cat.name[currentLanguage]
                  ? cat.name[currentLanguage].length > 15
                    ? cat.name[currentLanguage].slice(0, 14) + "…"
                    : cat.name[currentLanguage]
                  : ""}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 gap-8 mb-4">
            {[services[tab]].map(
              (service, idx) =>
                service && (
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
                        {t("services.cta", "Solicite um orçamento")}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>

                    <img
                      src={service.image}
                      alt={service.name[currentLanguage]}
                      className="w-full md:w-1/2 h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                )
            )}
          </div>
        </div>
      </section>

      {/* Section Nos Clients */}
      <ClientsSection />

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
};
