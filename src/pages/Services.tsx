import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Users,
  Truck,
  Building2,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { FAQAccordion } from "../components/FAQAccordion";
import { ServiceModal } from "../components/ServiceModal";
import { Link } from "react-router-dom";
import PricingSection from "../components/enterprise/PricingSection";
interface Language {
  pt: string;
  en: string;
  fr: string;
}

interface Service {
  title: Language;
  description: Language;
  importance: {
    pt: string[];
    en: string[];
    fr: string[];
  };
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image: string;
  backgroundImage?: string;
}

const services: Service[] = [
  {
    title: {
      pt: "Gestão de Stock",
      en: "Stock Management",
      fr: "Gestion de Stock",
    },
    description: {
      pt: "A gestão de stock da TOPRONTO é fundamental para empresas que necessitam manter o controle eficiente de mercadorias, evitando perdas, faltas ou excessos de produtos.",
      en: "Stock management is essential for companies that need to maintain efficient control of goods, avoiding losses, shortages, or excess products.",
      fr: "La gestion de stock est essentielle pour les entreprises qui doivent maintenir un contrôle efficace des marchandises, en évitant les pertes, les manques ou les excès de produits.",
    },
    importance: {
      pt: [
        "Reduz custos operacionais com armazenagem",
        "Garante que os produtos certos estejam disponíveis no momento certo",
        "Facilita o processo de reposição e previsão de demanda",
        "Ajuda empresas a focarem no seu negócio principal enquanto nós cuidamos da logística",
      ],
      en: [
        "Reduces storage operational costs",
        "Ensures the right products are available at the right time",
        "Facilitates the restocking and demand forecasting process",
        "Helps companies focus on their core business while we handle logistics",
      ],
      fr: [
        "Réduit les coûts opérationnels de stockage",
        "Garantit que les bons produits soient disponibles au bon moment",
        "Facilite le processus de réapprovisionnement et de prévision de la demande",
        "Aide les entreprises à se concentrer sur leur activité principale pendant que nous gérons la logistique",
      ],
    },
    icon: Shield,
    image: "stock-management",
    backgroundImage: "/images/services/stock.jpg",
  },
  {
    title: {
      pt: "Relações Públicas",
      en: "Public Relations",
      fr: "Relations Publiques",
    },
    description: {
      pt: "Os serviços de relações públicas da TOPRONTO são voltados para empresas e instituições que necessitam de distribuição rápida de documentos oficiais, convites, material de eventos e comunicação corporativa.",
      en: "Public relations services are aimed at companies and institutions that need fast distribution of official documents, invitations, event materials, and corporate communication.",
      fr: "Les services de relations publiques sont destinés aux entreprises et institutions qui nécessitent une distribution rapide de documents officiels, invitations, matériel événementiel et communication d'entreprise.",
    },
    importance: {
      pt: [
        "Fortalece a comunicação entre empresas e clientes",
        "Garante que mensagens e documentos sejam entregues com agilidade e segurança",
        "Apoia campanhas e eventos, assegurando que toda a logística de distribuição ocorra sem falhas",
      ],
      en: [
        "Strengthens communication between companies and clients",
        "Ensures that messages and documents are delivered quickly and securely",
        "Supports campaigns and events, ensuring that all distribution logistics occur without failures",
      ],
      fr: [
        "Renforce la communication entre les entreprises et les clients",
        "Garantit que les messages et documents soient livrés rapidement et en sécurité",
        "Soutient les campagnes et événements, en assurant que toute la logistique de distribution se déroule sans failles",
      ],
    },
    icon: Heart,
    image: "public-relations",
    backgroundImage: "/images/services/public-relations.jpg",
  },
  {
    title: {
      pt: "Entregas Diversas",
      en: "Various Deliveries",
      fr: "Livraisons Diverses",
    },
    description: {
      pt: "A TOPRONTO realiza entregas rápidas e seguras de encomendas variadas, desde objetos pessoais até produtos corporativos.",
      en: "TOPRONTO performs fast and secure deliveries of various items, from personal objects to corporate products.",
      fr: "La TOPRONTO effectue des livraisons rapides et sécurisées de divers colis, des objets personnels aux produits d'entreprise.",
    },
    importance: {
      pt: [
        "Proporciona conveniência para clientes individuais e empresas",
        "Ajuda empresas a manterem prazos de entrega competitivos",
        "Melhora a experiência do cliente final com agilidade e confiança",
      ],
      en: [
        "Provides convenience for individual customers and businesses",
        "Helps businesses maintain competitive delivery deadlines",
        "Improves the final customer experience with agility and confidence",
      ],
      fr: [
        "Offre une commodité aux clients individuels et aux entreprises",
        "Aide les entreprises à maintenir des délais de livraison compétitifs",
        "Améliore l'expérience du client final avec agilité et confiance",
      ],
    },
    icon: Truck,
    image: "various-deliveries",
    backgroundImage: "/images/services/various-deliveries.jpg",
  },
  {
    title: {
      pt: "Transporte de Material Biológico",
      en: "Biological Material Transport",
      fr: "Transport de Matériel Biologique",
    },
    description: {
      pt: "O transporte de material biológico exige cuidados especiais e atendimento a normas de segurança. A TOPRONTO possui protocolos rigorosos para garantir a integridade e qualidade desses materiais.",
      en: "The transport of biological material requires special care and compliance with safety standards. TOPRONTO has strict protocols to ensure the integrity and quality of these materials.",
      fr: "Le transport de matériel biologique nécessite des soins particuliers et le respect des normes de sécurité. La TOPRONTO dispose de protocoles stricts pour garantir l'intégrité et la qualité de ces matériaux.",
    },
    importance: {
      pt: [
        "Atende a laboratórios, hospitais e clínicas que dependem de transporte seguro e rápido",
        "Evita contaminações e mantém a integridade do material, essencial para diagnósticos corretos",
        "Contribui para salvar vidas, oferecendo um serviço confiável para o setor de saúde",
      ],
      en: [
        "Serves laboratories, hospitals, and clinics that depend on fast and secure transport",
        "Prevents contamination and maintains material integrity, essential for accurate diagnoses",
        "Contributes to saving lives by providing reliable service to the healthcare sector",
      ],
      fr: [
        "Sert les laboratoires, hôpitaux et cliniques qui dépendent d'un transport rapide et sécurisé",
        "Évite les contaminations et maintient l'intégrité du matériel, essentiel pour des diagnostics précis",
        "Contribue à sauver des vies en offrant un service fiable au secteur de la santé",
      ],
    },
    icon: Shield,
    image: "biological-material-transport",
    backgroundImage: "/images/services/biological-transport.jpg",
  },
  {
    title: {
      pt: "Distribuição de Fármacos",
      en: "Pharmaceutical Distribution",
      fr: "Distribution de Médicaments",
    },
    description: {
      pt: "A TOPRONTO atua na entrega e distribuição de medicamentos e produtos de saúde, seja para farmácias, hospitais ou clientes finais.",
      en: "TOPRONTO operates in the delivery and distribution of medications and health products, whether for pharmacies, hospitals, or end customers.",
      fr: "La TOPRONTO opère dans la livraison et la distribution de médicaments et de produits de santé, que ce soit pour les pharmacies, les hôpitaux ou les clients finaux.",
    },
    importance: {
      pt: [
        "Garante que medicamentos cheguem rapidamente aos locais onde são necessários",
        "Facilita a vida de clientes que precisam de medicamentos com urgência",
        "Contribui para a eficiência da cadeia de abastecimento farmacêutico",
      ],
      en: [
        "Ensures that medications reach the places where they are needed quickly",
        "Makes life easier for customers who need medications urgently",
        "Contributes to the efficiency of the pharmaceutical supply chain",
      ],
      fr: [
        "Garantit que les médicaments arrivent rapidement là où ils sont nécessaires",
        "Facilite la vie des clients qui ont besoin de médicaments d'urgence",
        "Contribute à l'efficacité de la chaîne d'approvisionnement pharmaceutique",
      ],
    },
    icon: Building2,
    image: "pharmaceutical-distribution",
    backgroundImage: " /images/services/pharmaceutical-distribution.jpg",
  },
  {
    title: {
      pt: "Cargas e Transporte Logístico",
      en: "Cargo and Logistics Transport",
      fr: "Cargaisons et Transport Logistique",
    },
    description: {
      pt: "Além das pequenas entregas, a TOPRONTO oferece transporte de cargas e logística para empresas, conectando fornecedores e clientes finais.",
      en: "In addition to small deliveries, TOPRONTO offers cargo transport and logistics for companies, connecting suppliers and end customers.",
      fr: "En plus des petites livraisons, la TOPRONTO offre le transport de marchandises et la logistique pour les entreprises, en connectant les fournisseurs et les clients finaux.",
    },
    importance: {
      pt: [
        "Apoia empresas que necessitam enviar produtos em grande escala",
        "Melhora a eficiência logística, reduzindo custos e prazos",
        "Oferece soluções personalizadas de transporte, atendendo diferentes segmentos do mercado",
      ],
      en: [
        "Supports companies that need to send products on a large scale",
        "Improves logistics efficiency, reducing costs and deadlines",
        "Offers customized transport solutions, serving different market segments",
      ],
      fr: [
        "Soutient les entreprises qui doivent envoyer des produits à grande échelle",
        "Améliore l'efficacité logistique, en réduisant les coûts et les délais",
        "Offre des solutions de transport personnalisées, en servant différents segments de marché",
      ],
    },
    icon: Users,
    image: "cargo-and-logistics",
    backgroundImage: "/images/services/cargo-and-logistics.jpg",
  },
];

const faqs = {
  pt: [
    {
      question: "Como posso solicitar um serviço de entrega?",
      answer:
        "Você pode solicitar um serviço de entrega entrando em contato conosco através do nosso site, aplicativo ou por telefone. Nossa equipe irá guiá-lo pelo processo.",
    },
    {
      question: "Quais são as áreas de cobertura?",
      answer:
        "Atendemos em toda a região metropolitana, com cobertura em todas as principais cidades. Entre em contato para verificar a disponibilidade na sua região.",
    },
    {
      question: "Quais são os métodos de pagamento aceitos?",
      answer:
        "Aceitamos cartões de crédito/débito, transferência bancária e pagamento na entrega em algumas localizações.",
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

export default function Services() {
  const { t } = useTranslation();
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
                src={service.backgroundImage || "/images/placeholder-bg.jpg"}
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
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                  {service.title[currentLanguage as keyof typeof service.title]}
                </h3>
                <p className="text-gray-200 leading-relaxed mb-6">
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
            title:
              selectedService.title[
                currentLanguage as keyof typeof selectedService.title
              ],
            description:
              selectedService.description[
                currentLanguage as keyof typeof selectedService.description
              ],
            importance:
              selectedService.importance[
                currentLanguage as keyof typeof selectedService.importance
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
}
