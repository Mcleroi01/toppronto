import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { FAQAccordion } from "../components/FAQAccordion";
import { Shield, Bike, Users, ArrowRight } from "lucide-react";
import PricingSection from "@/components/enterprise/PricingSection";
import { getTranslatedText, Language } from "@/utils/translations";
import FeaturesCarousel from "@/components/common/FeaturesCarousel";

// Using shared Language and getTranslatedText from utils/translations

export const About: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const faqs = {
    pt: [
      {
        question: "Como posso solicitar um serviço de entrega?",
        answer:
          "Você pode solicitar um serviço de entrega entrando em contato connosco através do nosso site, WhatsApp, aplicativo ou por telefone. Nossa equipe irá guiá-lo pelo processo.",
      },
      {
        question: "Quais são as áreas de cobertura?",
        answer:
          "Atendemos em toda região da provincial de Luanda, e algumas regiões nas provincias de BENGUELA, LOBITO, LUBANGO, HUAMBO, MALANJE e BIÉ.",
      },
      {
        question: "Quais são os métodos de pagamento aceitos?",
        answer:
          "Aceitamos todos os métodos de pagamentos usados em Angola, desde cartões, transferência, Multicaixa expresso e pagamentos na entrega.",
      },
    ],
    en: [
      {
        question: "How can I request a delivery service?",
        answer:
          "You can request a delivery service by contacting us through our website, app, or by phone. Our team will guide you through the process.",
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
          "Vous pouvez demander un service de livraison en nous contactant via notre site Web, notre application ou par téléphone. Notre équipe vous guidera tout au long du processus.",
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
  const features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: Record<Language, string>;
    description: Record<Language, string>;
    backgroundImage: string;
    image: string;
  }> = [
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
      backgroundImage:
        "/images/services/rapida.jpg",
      image:
        "/images/services/rapida.jpg",
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
      backgroundImage:
        "/images/services/securite.jpg",
      image:
        "/images/services/securite.jpg",
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
      backgroundImage:
        "/images/services/equipe.jpg",
      image:
        "/images/services/equipe.jpg",
    },
  ];
  return (
    <div className="space-y-24">
      {/* About the Company Section */}
      <section className="sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 mb-6 pt-16 px-4">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className=" mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {getTranslatedText(
                {
                  pt: "Sobre a TOPRONTO",
                  en: "About TOPRONTO",
                  fr: "À propos de TOPRONTO",
                },
                currentLanguage
              )}
            </h1>
            <div className="w-20 h-1.5 bg-green-600 rounded-full  mb-6"></div>
          </div>

          <div className=" text-lg text-gray-700 space-y-6">
            <p>
              {getTranslatedText(
                {
                  pt: "A TOPRONTO, Entregas rápidas e seguras é uma startup angolana inovadora, fundada em 2019 em Luanda-Angola, com a missão de transformar a forma como pessoas e empresas realizam entregas no país.",
                  en: "TOPRONTO, Fast and Secure Deliveries is an innovative Angolan startup, founded in 2019 in Luanda-Angola, with the mission to transform how people and companies handle deliveries in the country.",
                  fr: "TOPRONTO, Livraisons Rapides et Sûres est une startup angolaise innovante, fondée en 2019 à Luanda-Angola, avec pour mission de transformer la façon dont les particuliers et les entreprises effectuent leurs livraisons dans le pays.",
                },
                currentLanguage
              )}
            </p>

            <p>
              {getTranslatedText(
                {
                  pt: "Com o lema 'Nós encurtamos a distância que um fornecedor tem com o seu cliente', a TOPRONTO posicionou-se como uma solução multifuncional, oferecendo serviços diversificados, tais como:",
                  en: "With the motto 'We shorten the distance between a supplier and their customer', TOPRONTO has positioned itself as a multifunctional solution, offering diverse services such as:",
                  fr: "Avec la devise 'Nous raccourcissons la distance entre un fournisseur et son client', TOPRONTO s'est positionnée comme une solution multifonctionnelle, offrant des services diversifiés tels que :",
                },
                currentLanguage
              )}
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                {getTranslatedText(
                  {
                    pt: "Entregas de produtos farmacêuticos e material biológico (medicamentos e produtos de saúde);",
                    en: "Delivery of pharmaceutical products and biological materials (medicines and health products);",
                    fr: "Livraison de produits pharmaceutiques et de matériel biologique (médicaments et produits de santé) ;",
                  },
                  currentLanguage
                )}
              </li>
              <li>
                {getTranslatedText(
                  {
                    pt: "Transporte de objetos diversos, documentos e encomendas;",
                    en: "Transport of various items, documents, and packages;",
                    fr: "Transport de divers objets, documents et colis ;",
                  },
                  currentLanguage
                )}
              </li>
              <li>
                {getTranslatedText(
                  {
                    pt: "Serviços de relações públicas para escritórios e ministérios;",
                    en: "Public relations services for offices and ministries;",
                    fr: "Services de relations publiques pour les bureaux et ministères ;",
                  },
                  currentLanguage
                )}
              </li>
              <li>
                {getTranslatedText(
                  {
                    pt: "Gestão de stock e distribuição ao cliente final.",
                    en: "Stock management and distribution to end customers.",
                    fr: "Gestion des stocks et distribution aux clients finaux.",
                  },
                  currentLanguage
                )}
              </li>
            </ul>

            <p>
              {getTranslatedText(
                {
                  pt: "A empresa nasceu com foco em eficiência, tecnologia e confiança, integrando um sistema de entregas modernas e personalizadas, adaptadas à realidade angolana.",
                  en: "The company was founded with a focus on efficiency, technology, and trust, integrating a modern and personalized delivery system, adapted to the Angolan reality.",
                  fr: "L'entreprise est née avec un accent sur l'efficacité, la technologie et la confiance, intégrant un système de livraison moderne et personnalisé, adapté à la réalité angolaise.",
                },
                currentLanguage
              )}
            </p>

            <p>
              {getTranslatedText(
                {
                  pt: "Desde a sua fundação, a TOPRONTO tem como objetivo ser referência no setor logístico, combinando atendimento ágil, parcerias estratégicas e uma rede de entregadores treinados, prontos para oferecer a melhor experiência ao cliente.",
                  en: "Since its foundation, TOPRONTO has aimed to be a reference in the logistics sector, combining agile service, strategic partnerships, and a network of trained delivery personnel, ready to provide the best customer experience.",
                  fr: "Depuis sa fondation, TOPRONTO vise à être une référence dans le secteur de la logistique, combinant un service agile, des partenariats stratégiques et un réseau de livreurs formés, prêts à offrir la meilleure expérience client.",
                },
                currentLanguage
              )}
            </p>
          </div>
        </div>
      </section>

      <PricingSection currentLanguage={currentLanguage} />

      {/* Features Section - Améliorée */}
      <section className="py-20 relative overflow-hidden sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 px-4">
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

          {/* Features Carousel */}
          <FeaturesCarousel features={features} currentLanguage={currentLanguage} />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion faqs={faqs} currentLanguage={currentLanguage} />

      {/* Section Téléchargez notre application - Améliorée */}
      <section className="py-20 relative overflow-hidden ">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 px-4 sm:px-6 px-4 lg:px-8 relative">
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
                  src="/images/app.png"
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

              
            </motion.div>
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
              {getTranslatedText(
                {
                  pt: "Entre em Contato Conosco",
                  en: "Get in Touch with Us",
                  fr: "Contactez-Nous",
                },
                currentLanguage
              )}
            </h2>
            <p className="text-lg mb-8 drop-shadow">
              {getTranslatedText(
                {
                  pt: "Estamos aqui para ajudar! Entre em contato conosco para mais informações sobre nossos serviços.",
                  en: "We are here to help! Contact us for more information about our services.",
                  fr: "Nous sommes là pour vous aider ! Contactez-nous pour plus d'informations sur nos services.",
                },
                currentLanguage
              )}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors shadow"
            >
              {getTranslatedText(
                {
                  pt: "Fale Conosco",
                  en: "Contact Us",
                  fr: "Contactez-Nous",
                },
                currentLanguage
              )}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
