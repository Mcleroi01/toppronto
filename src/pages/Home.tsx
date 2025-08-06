import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Users,
  Bike,
  Car,
  Truck,
} from "lucide-react";
import { services } from "../data/services";
import { useLanguage } from "../hooks/useLanguage";

type Language = 'pt' | 'en' | 'fr';

type TranslationObject = {
  [key in Language]: string;
} & { defaultValue?: string };

const getTranslatedText = (obj: TranslationObject, lang: Language): string => {
  return obj[lang] || obj.defaultValue || '';
};

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage() as { currentLanguage: Language };
  const [tab, setTab] = useState(0);
  // const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const features = [
    {
      icon: Bike,
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
      backgroundImage: "https://cdn.prod.website-files.com/637d6390b70424b49c14ff1e/66066981f2d884346df02cbc_deliver-packages-faster-HERO.webp",
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
      backgroundImage: "https://images.squarespace-cdn.com/content/v1/6047adb1f3383c71b64f494b/22f1c571-9121-4d6c-9c0b-406e2824742b/Untitled+%283+x+2+in%29+%2811%29.png",
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
      backgroundImage: "https://media.istockphoto.com/id/1474043686/photo/business-manager-talking-to-a-group-of-employees-at-a-distribution-warehouse.jpg?s=612x612&w=0&k=20&c=i-sXngKASrpPfoOA0-NdebfCHbFlLZ_OsDyyQspvNWw=",
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
    "/images/clientLogos/appysaude.jpg",
    "/images/clientLogos/gouverno.jpg",
    "/images/clientLogos/lua.jpg",
    "/images/clientLogos/masfamu.jpg",
    "/images/clientLogos/plus.jpg",
    "/images/clientLogos/princefarma.jpg",
    "/images/clientLogos/sagrada.jpg",
    "/images/clientLogos/shalina.jpg",
    "/images/clientLogos/truecare.jpg",
    "/images/clientLogos/zip.jpg",
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

  // Section Clientes com animação de deslize
  const ClientsSection = () => {
    const row1 = useRef<HTMLDivElement>(null);
    const row2 = useRef<HTMLDivElement>(null);

    useAutoScroll(row1, false);
    useAutoScroll(row2, true);

    // Duplica os logos para efeito infinito
    const logos = [...clientLogos, ...clientLogos];

    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto ">
          <div className="sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 mb-12 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t(
                "clients.title",
                {
                  pt: "Clientes que confiam em nós",
                  en: "Trusted by Leading Companies",
                  fr: "Ils nous font confiance",
                  defaultValue: "Clientes que confiam em nós",
                }[currentLanguage] || "Clientes que confiam em nós"
              )}
            </h2>
            <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6 "></div>
            <p className="text-lg text-gray-600 max-w-2xl ">
              {t(
                "clients.subtitle",
                {
                  pt: "Empresas líderes que escolheram nossos serviços de entrega",
                  en: "Leading companies that chose our delivery services",
                  fr: "Des entreprises leaders qui ont choisi nos services de livraison",
                  defaultValue:
                    "Empresas líderes que escolheram nossos serviços de entrega",
                }[currentLanguage] ||
                  "Empresas líderes que escolheram nossos serviços de entrega"
              )}
            </p>
          </div>

          <div className="space-y-8">
            {/* Primeira linha */}
            <div
              ref={row1}
              className="overflow-hidden w-full py-4"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              }}
            >
              <div className="flex gap-8 md:gap-12 w-max animate-none">
                {logos.map((src, i) => (
                  <motion.div
                    key={"row1-" + i}
                    className="flex-shrink-0 flex items-center justify-center h-20 md:h-24 w-32 md:w-48"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <img
                      src={src}
                      alt={t("clients.alt", {
                        defaultValue: `Logo do cliente ${i + 1}`,
                        count: i + 1,
                      })}
                      className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </motion.div>
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
      {/* Features Section - Améliorée */}
      <section className="py-20 relative overflow-hidden sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32">
        {/* Fond décoratif */}
        <div className="absolute inset-0  -z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 -z-10"
          style={{ backgroundImage: "url('/images/pattern.svg')" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 "
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
              {getTranslatedText(
                {
                  pt: "Nossos Serviços",
                  en: "Our Services",
                  fr: "Nos Services",
                },
                currentLanguage
              )}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {getTranslatedText(
                {
                  pt: "Soluções Completas para o Seu Negócio",
                  en: "Complete Solutions for Your Business",
                  fr: "Solutions Complètes pour Votre Entreprise",
                },
                currentLanguage
              )}
            </h2>
            <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6 "></div>
            <p className="text-lg text-gray-600 max-w-3xl ">
              {getTranslatedText(
                {
                  pt: "Oferecemos as melhores soluções para impulsionar o crescimento do seu negócio com tecnologia de ponta e suporte especializado.",
                  en: "We offer the best solutions to boost your business growth with cutting-edge technology and expert support.",
                  fr: "Nous proposons les meilleures solutions pour stimuler la croissance de votre entreprise avec une technologie de pointe et un support expert.",
                },
                currentLanguage
              )}
            </p>
          </motion.div>

          {/* Grille des fonctionnalités */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
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
                {/* Image de fond */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={
                      feature.backgroundImage || "/images/placeholder-bg.jpg"
                    }
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
                </div>

                {/* Contenu */}
                <div className="relative z-10 flex flex-col h-full p-8 text-white">
                  <div className="flex-grow">
                    {/* Icône ou image */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                      <img
                        src={feature.image}
                        alt={feature.title[currentLanguage]}
                        className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      />
                    </div>

                    {/* Titre et description */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                      {feature.title[currentLanguage]}
                    </h3>
                    <p className="text-gray-200 leading-relaxed mb-6">
                      {feature.description[currentLanguage]}
                    </p>
                  </div>

                  {/* Bouton en savoir plus */}
                  <div className="mt-auto">
                    <div className="inline-flex items-center text-green-300 font-medium group-hover:text-white transition-colors border-b border-transparent group-hover:border-green-300 pb-1">
                      <span className="mr-2">
                        {getTranslatedText(
                          {
                            pt: "Saiba mais",
                            en: "Learn more",
                            fr: "En savoir plus",
                          },
                          currentLanguage
                        )}
                      </span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Effet de survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-700 text-white overflow-hidden">
        {/* Effet de fond décoratif */}
        <div
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        />

        <div className="max-w-7xl sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32  py-16 px-4 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contenu texte */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  {getTranslatedText(
                    {
                      pt: "Entrega Rápida e Confiável em Luanda",
                      en: "Fast and Reliable Delivery in Luanda",
                      fr: "Livraison Rapide et Fiable à Luanda",
                    },
                    currentLanguage
                  )}
                </h1>
                <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6 "></div>
                <p className="text-lg md:text-xl text-green-100 mb-8 max-w-lg">
                  {getTranslatedText(
                    {
                      pt: "Soluções logísticas eficientes para o seu negócio, com rastreamento em tempo real e equipe profissional.",
                      en: "Efficient logistics solutions for your business, with real-time tracking and professional team.",
                      fr: "Solutions logistiques efficaces pour votre entreprise, avec suivi en temps réel et équipe professionnelle.",
                    },
                    currentLanguage
                  )}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span>
                      {getTranslatedText(
                        {
                          pt: "Solicitar Orçamento",
                          en: "Get a Quote",
                          fr: "Demander un Devis",
                        },
                        currentLanguage
                      )}
                    </span>
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>

                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-lg transition-all duration-300"
                  >
                    <span>
                      {getTranslatedText(
                        {
                          pt: "Nossos Serviços",
                          en: "Our Services",
                          fr: "Nos Services",
                        },
                        currentLanguage
                      )}
                    </span>
                  </Link>
                </div>

                <div className="mt-8 flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center"
                        >
                          <Truck className="w-4 h-4 text-white" />
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 text-sm text-green-100">
                      {getTranslatedText(
                        {
                          pt: "+1000 entregas realizadas",
                          en: "+1000 deliveries completed",
                          fr: "+1000 livraisons effectuées",
                        },
                        currentLanguage
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/banier.png"
                  alt={getTranslatedText(
                    {
                      pt: "Serviços de entrega Topronto",
                      en: "Topronto delivery services",
                      fr: "Services de livraison Topronto",
                    },
                    currentLanguage
                  )}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Badge flottant */}
              <div className="absolute -bottom-4 -left-4 bg-white text-green-900 px-4 py-2 rounded-lg shadow-lg font-semibold flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-500" />
                {getTranslatedText(
                  {
                    pt: "100% Seguro",
                    en: "100% Secure",
                    fr: "100% Sécurisé",
                  },
                  currentLanguage
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {getTranslatedText(
              {
                pt: "Nossa Frota de Veículos",
                en: "Our Vehicle Fleet",
                fr: "Notre Parc de Véhicules",
              },
              currentLanguage
            )}
          </h2>
          <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6 "></div>
          <p className="text-gray-600 mb-8">
            {getTranslatedText(
              {
                pt: "Conheça nossa frota diversificada, pronta para atender todas as suas necessidades de entrega.",
                en: "Discover our diverse fleet, ready to meet all your delivery needs.",
                fr: "Découvrez notre flotte diversifiée, prête à répondre à tous vos besoins de livraison.",
              },
              currentLanguage
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {vehicles.map((veh, idx) => (
              <motion.div
                key={veh.label[currentLanguage]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">
                  {/* Icône du véhicule */}
                  <div className="text-green-500 mb-4">
                    {React.createElement(veh.icon, { className: "w-8 h-8" })}
                  </div>

                  {/* Image du véhicule */}
                  <div className="h-40 mb-4 flex items-center justify-center">
                    <img
                      src={veh.image}
                      alt={veh.label[currentLanguage]}
                      className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {veh.label[currentLanguage]}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {veh.desc[currentLanguage]}
                  </p>

                  <div className="pt-3 border-t border-gray-100">
                    <ul className="space-y-2">
                      {veh.features?.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start text-sm text-gray-700"
                        >
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        ></div>
        {/* Fond décoratif */}
        <div className="absolute inset-0 bg-gradient-to-br rounded-xl from-green-50 to-blue-50 -z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 -z-10"
          style={{ backgroundImage: "url('/images/pattern.svg')" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className=" mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {getTranslatedText(
                {
                  pt: "Nossos Serviços",
                  en: "Our Services",
                  fr: "Nos Services",
                },
                currentLanguage
              )}
            </h2>
            <div className="w-20 h-1.5 bg-green-600 rounded-full  mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl ">
              {getTranslatedText(
                {
                  pt: "Descubra como nossos serviços podem transformar a logística do seu negócio.",
                  en: "Discover how our services can transform your business logistics.",
                  fr: "Découvrez comment nos services peuvent transformer la logistique de votre entreprise.",
                },
                currentLanguage
              )}
            </p>
          </motion.div>

          {/* Menu des onglets */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            {services.map((cat, idx) => (
              <motion.button
                key={cat.id}
                onClick={() => setTab(idx)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap mx-1 ${
                  tab === idx
                    ? "bg-white text-green-700 shadow-md"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                {cat.name && cat.name[currentLanguage]}
              </motion.button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div className="grid grid-cols-1 gap-8 mt-12">
            {[services[tab]].map(
              (service, idx) =>
                service && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[400px] md:min-h-[450px] flex flex-col"
                  >
                    {/* Image de fond */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={service.image}
                        alt={service.name[currentLanguage]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 flex flex-col h-full p-8 text-white">
                      <div className="flex-grow">
                        {/* Badge de catégorie */}
                        <span className="inline-block px-4 py-1.5 text-xs font-semibold text-green-700 bg-white/90 rounded-full mb-6">
                          {getTranslatedText(
                            {
                              pt: "Serviço Premium",
                              en: "Premium Service",
                              fr: "Service Premium",
                            },
                            currentLanguage
                          )}
                        </span>

                        {/* Titre et description */}
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                          {service.name[currentLanguage]}
                        </h3>
                        <p className="text-gray-200 text-lg leading-relaxed max-w-2xl">
                          {service.description[currentLanguage]}
                        </p>
                      </div>

                      {/* Bouton d'action */}
                      <div className="mt-8">
                        <Link
                          to="/contact"
                          className="inline-flex items-center px-6 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg group/button"
                        >
                          <span className="mr-2">
                            {getTranslatedText(
                              {
                                pt: "Solicitar Orçamento",
                                en: "Get a Quote",
                                fr: "Demander un Devis",
                              },
                              currentLanguage
                            )}
                          </span>
                          <ArrowRight className="w-5 h-5 transform group-hover/button:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Effet de survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                )
            )}
          </div>
        </div>
      </section>

      {/* Section Nos Clients */}
      <ClientsSection />

      {/* Pricing Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-700 text-white overflow-hidden py-16">
        {/* Decorative background effect */}
        <div
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background.png')",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {currentLanguage === "pt" && "Nossos Preços e Tarifas"}
              {currentLanguage === "en" && "Our Prices and Rates"}
              {currentLanguage === "fr" && "Nos Tarifs et Prix"}
            </h2>
            <div className="w-20 h-1.5 bg-yellow-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-green-100 max-w-3xl mx-auto">
              {currentLanguage === "pt" &&
                "Consulte nossa tabela de preços completa para todos os nossos serviços de entrega e logística."}
              {currentLanguage === "en" &&
                "Check out our complete price list for all our delivery and logistics services."}
              {currentLanguage === "fr" &&
                "Consultez notre liste de prix complète pour tous nos services de livraison et logistique."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {currentLanguage === "pt" && "Tabela de Preços"}
                  {currentLanguage === "en" && "Price List"}
                  {currentLanguage === "fr" && "Liste des Prix"}
                </h3>
                <p className="mb-6 text-green-100">
                  {currentLanguage === "pt" &&
                    "Faça o download da nossa tabela de preços completa em formato PDF para visualizar todas as nossas tarifas e opções de serviço."}
                  {currentLanguage === "en" &&
                    "Download our complete price list in PDF format to view all our rates and service options."}
                  {currentLanguage === "fr" &&
                    "Téléchargez notre liste de prix complète au format PDF pour voir tous nos tarifs et options de service."}
                </p>
                <a
                  href="/pdf/tarifas-topronto.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-900 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {currentLanguage === "pt" && "Baixar Tabela de Preços"}
                  {currentLanguage === "en" && "Download Price List"}
                  {currentLanguage === "fr" && "Télécharger la Liste des Prix"}
                </a>
                <p className="mt-3 text-sm text-green-200">
                  {currentLanguage === "pt" &&
                    "Formato PDF - Atualizado em Agosto 2025"}
                  {currentLanguage === "en" &&
                    "PDF Format - Updated August 2025"}
                  {currentLanguage === "fr" &&
                    "Format PDF - Mis à jour en Août 2025"}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div className="absolute bottom-4 text-center px-2">
                    <p className="text-sm font-medium">
                      {currentLanguage === "pt" && "Tabela de Preços"}
                      {currentLanguage === "en" && "Price List"}
                      {currentLanguage === "fr" && "Liste des Prix"}
                    </p>
                    <p className="text-xs opacity-75">PDF • 346 Ko</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Téléchargez notre application - Améliorée */}
      <section className="py-20 relative overflow-hidden ">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Illustration téléphone/app avec animation flottante */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <img
                  src="/images/app-mobile.png"
                  alt={t(
                    "downloadApp.imageAlt",
                    "Aperçu de l'application mobile Topronto"
                  )}
                  className=" drop-shadow-2xl"
                  loading="lazy"
                />
                {/* Effet de reflet sur le téléphone */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent rounded-3xl"></div>
              </div>
              {/* Éléments flottants décoratifs */}
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </motion.div>

            {/* Contenu texte et boutons */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {getTranslatedText(
                  {
                    pt: "Baixe o aplicativo Topronto",
                    en: "Download the Topronto App",
                    fr: "Téléchargez l'application Topronto",
                    defaultValue: "Baixe o aplicativo Topronto",
                  },
                  currentLanguage
                )}
              </h2>

              <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
                {getTranslatedText(
                  {
                    pt: "A maneira mais fácil de encomendar, rastrear e receber suas entregas diretamente do seu smartphone.",
                    en: "The easiest way to order, track, and receive your deliveries right from your smartphone.",
                    fr: "Le moyen le plus simple de commander, suivre et recevoir vos livraisons directement depuis votre smartphone.",
                    defaultValue:
                      "A maneira mais fácil de encomendar, rastrear e receber suas entregas diretamente do seu smartphone.",
                  },
                  currentLanguage
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.topronto.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.75 1.75 0 0 1-.61-1.32V3.134a1.75 1.75 0 0 1 .609-1.32zm2.353.9a.75.75 0 0 0-.462.28l-1.5 1.8a.75.75 0 0 0-.25.55v16.112a.75.75 0 0 0 .25.55l1.5 1.8a.75.75 0 0 0 .462.28h9.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-1.5 0v2.75H7.5V4.25h7.25v2.75a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-9.5z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Disponível no</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://apps.apple.com/app/topronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.85 1.62-3.29 1.5-1.43 0-1.83-.5-3.42-.5-1.59 0-2.07.5-3.42.5-1.44.12-2.49-.26-3.32-1.5-1.4-2.08-3.07-5.8-1.29-10.5 1.02-2.77 2.8-4.5 4.62-4.5 1.19 0 2.3.5 3.41.5 1.1 0 2.12-.5 3.4-.5 1.38 0 2.9 1.5 3.4 3.5-3.2 1.4-2.7 8.4.92 8.5zM13 3.5c.73-.82 1.94-1.5 2.5-1.5.07 1.17-.34 2.3-1.08 3.12-.73.82-1.94 1.5-2.5 1.5-.07-1.17.34-2.3 1.08-3.12z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Depoimentos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 px-4">
          <div className=" mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslatedText(
                {
                  pt: "O que nossos clientes dizem",
                  en: "What Our Customers Say",
                  fr: "Ce que disent nos clients",
                  defaultValue: "O que nossos clientes dizem",
                },
                currentLanguage
              )}
            </h2>
            <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6 "></div>
            <p className="text-lg text-gray-600 max-w-2xl">
              {getTranslatedText(
                {
                  pt: "Avaliações reais de clientes satisfeitos com nossos serviços",
                  en: "Real reviews from satisfied customers about our services",
                  fr: "Avis réels de clients satisfaits de nos services",
                  defaultValue:
                    "Avaliações reais de clientes satisfeitos com nossos serviços",
                },
                currentLanguage
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Carlos Mendes",
                role: {
                  pt: "Cliente Premium",
                  en: "Premium Customer",
                  fr: "Client Premium",
                },
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                rating: 5,
                content: {
                  pt: "Serviço excepcional! As entregas são sempre pontuais e os entregadores extremamente profissionais. Recomendo muito a Topronto para quem busca eficiência.",
                  en: "Exceptional service! Deliveries are always on time and the delivery people are extremely professional. I highly recommend Topronto for those looking for efficiency.",
                  fr: "Service exceptionnel ! Les livraisons sont toujours à l'heure et les livreurs extrêmement professionnels. Je recommande vivement Topronto à ceux qui recherchent de l'efficacité.",
                },
              },
              {
                name: "Ana Silva",
                role: {
                  pt: "Cliente Corporativo",
                  en: "Business Customer",
                  fr: "Client d'affaires",
                },
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                rating: 5,
                content: {
                  pt: "Uso a Topronto para o meu restaurante há mais de um ano. A confiabilidade e rapidez do serviço impressionam meus clientes diariamente.",
                  en: "I've been using Topronto for my restaurant for over a year. The reliability and speed of the service impress my customers daily.",
                  fr: "J'utilise Topronto pour mon restaurant depuis plus d'un an. La fiabilité et la rapidité du service impressionnent quotidiennement mes clients.",
                },
              },
              {
                name: "Miguel Tavares",
                role: {
                  pt: "Cliente Frequente",
                  en: "Frequent Customer",
                  fr: "Client fréquent",
                },
                avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                rating: 4,
                content: {
                  pt: "Ótimo atendimento e preços justos. Já utilizei vários serviços de entrega e a Topronto se destaca pela qualidade e comprometimento.",
                  en: "Great service and fair prices. I've used several delivery services and Topronto stands out for its quality and commitment.",
                  fr: "Excellent service et prix équitables. J'ai utilisé plusieurs services de livraison et Topronto se distingue par sa qualité et son engagement.",
                },
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-start mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-green-100"
                      loading="lazy"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {getTranslatedText(testimonial.role, currentLanguage) ||
                          testimonial.role.pt}
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic relative pl-6 before:content-['\201C'] before:absolute before:left-0 before:top-0 before:text-4xl before:text-gray-200 before:font-serif before:leading-none">
                    {getTranslatedText(testimonial.content, currentLanguage) ||
                      testimonial.content.pt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
            >
              {getTranslatedText(
                {
                  pt: "Ver todos os depoimentos",
                  en: "View all testimonials",
                  fr: "Voir tous les témoignages",
                  defaultValue: "Ver todos os depoimentos",
                },
                currentLanguage
              )}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

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
