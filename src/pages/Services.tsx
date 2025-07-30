import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Users,
  Truck,
  Building2,
  Link,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

import ServiceSection from "../components/ServiceSection";

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
}

const services: Service[] = [
  {
    title: {
      pt: "Gestão de Stock",
      en: "Stock Management",
      fr: "Gestion de Stock"
    },
    description: {
      pt: "A gestão de stock da TOPRONTO é fundamental para empresas que necessitam manter o controle eficiente de mercadorias, evitando perdas, faltas ou excessos de produtos.",
      en: "Stock management is essential for companies that need to maintain efficient control of goods, avoiding losses, shortages, or excess products.",
      fr: "La gestion de stock est essentielle pour les entreprises qui doivent maintenir un contrôle efficace des marchandises, en évitant les pertes, les manques ou les excès de produits."
    },
    importance: {
      pt: [
        "Reduz custos operacionais com armazenagem",
        "Garante que os produtos certos estejam disponíveis no momento certo",
        "Facilita o processo de reposição e previsão de demanda",
        "Ajuda empresas a focarem no seu negócio principal enquanto nós cuidamos da logística"
      ],
      en: [
        "Reduces storage operational costs",
        "Ensures the right products are available at the right time",
        "Facilitates the restocking and demand forecasting process",
        "Helps companies focus on their core business while we handle logistics"
      ],
      fr: [
        "Réduit les coûts opérationnels de stockage",
        "Garantit que les bons produits soient disponibles au bon moment",
        "Facilite le processus de réapprovisionnement et de prévision de la demande",
        "Aide les entreprises à se concentrer sur leur activité principale pendant que nous gérons la logistique"
      ]
    },
    icon: Shield,
    image: "stock-management"
  },
  {
    title: {
      pt: "Relações Públicas (RP)",
      en: "Public Relations (PR)",
      fr: "Relations Publiques (RP)"
    },
    description: {
      pt: "Os serviços de relações públicas da TOPRONTO são voltados para empresas e instituições que necessitam de distribuição rápida de documentos oficiais, convites, material de eventos e comunicação corporativa.",
      en: "Public relations services are aimed at companies and institutions that need fast distribution of official documents, invitations, event materials, and corporate communication.",
      fr: "Les services de relations publiques sont destinés aux entreprises et institutions qui nécessitent une distribution rapide de documents officiels, invitations, matériel événementiel et communication d'entreprise."
    },
    importance: {
      pt: [
        "Fortalece a comunicação entre empresas e clientes",
        "Garante que mensagens e documentos sejam entregues com agilidade e segurança",
        "Apoia campanhas e eventos, assegurando que toda a logística de distribuição ocorra sem falhas"
      ],
      en: [
        "Strengthens communication between companies and clients",
        "Ensures that messages and documents are delivered quickly and securely",
        "Supports campaigns and events, ensuring that all distribution logistics occur without failures"
      ],
      fr: [
        "Renforce la communication entre les entreprises et les clients",
        "Garantit que les messages et documents soient livrés rapidement et en sécurité",
        "Soutient les campagnes et événements, en assurant que toute la logistique de distribution se déroule sans failles"
      ]
    },
    icon: Heart,
    image: "public-relations"
  },
  {
    title: {
      pt: "Entregas Diversas",
      en: "Various Deliveries",
      fr: "Livraisons Diverses"
    },
    description: {
      pt: "A TOPRONTO realiza entregas rápidas e seguras de encomendas variadas, desde objetos pessoais até produtos corporativos.",
      en: "TOPRONTO performs fast and secure deliveries of various items, from personal objects to corporate products.",
      fr: "La TOPRONTO effectue des livraisons rapides et sécurisées de divers colis, des objets personnels aux produits d'entreprise."
    },
    importance: {
      pt: [
        "Proporciona conveniência para clientes individuais e empresas",
        "Ajuda empresas a manterem prazos de entrega competitivos",
        "Melhora a experiência do cliente final com agilidade e confiança"
      ],
      en: [
        "Provides convenience for individual customers and businesses",
        "Helps businesses maintain competitive delivery deadlines",
        "Improves the final customer experience with agility and confidence"
      ],
      fr: [
        "Offre une commodité aux clients individuels et aux entreprises",
        "Aide les entreprises à maintenir des délais de livraison compétitifs",
        "Améliore l'expérience du client final avec agilité et confiance"
      ]
    },
    icon: Truck,
    image: "various-deliveries"
  },
  {
    title: {
      pt: "Transporte de Material Biológico",
      en: "Biological Material Transport",
      fr: "Transport de Matériel Biologique"
    },
    description: {
      pt: "O transporte de material biológico exige cuidados especiais e atendimento a normas de segurança. A TOPRONTO possui protocolos rigorosos para garantir a integridade e qualidade desses materiais.",
      en: "The transport of biological material requires special care and compliance with safety standards. TOPRONTO has strict protocols to ensure the integrity and quality of these materials.",
      fr: "Le transport de matériel biologique nécessite des soins particuliers et le respect des normes de sécurité. La TOPRONTO dispose de protocoles stricts pour garantir l'intégrité et la qualité de ces matériaux."
    },
    importance: {
      pt: [
        "Atende a laboratórios, hospitais e clínicas que dependem de transporte seguro e rápido",
        "Evita contaminações e mantém a integridade do material, essencial para diagnósticos corretos",
        "Contribui para salvar vidas, oferecendo um serviço confiável para o setor de saúde"
      ],
      en: [
        "Serves laboratories, hospitals, and clinics that depend on fast and secure transport",
        "Prevents contamination and maintains material integrity, essential for accurate diagnoses",
        "Contributes to saving lives by providing reliable service to the healthcare sector"
      ],
      fr: [
        "Sert les laboratoires, hôpitaux et cliniques qui dépendent d'un transport rapide et sécurisé",
        "Évite les contaminations et maintient l'intégrité du matériel, essentiel pour des diagnostics précis",
        "Contribue à sauver des vies en offrant un service fiable au secteur de la santé"
      ]
    },
    icon: Shield,
    image: "biological-material-transport"
  },
  {
    title: {
      pt: "Distribuição de Fármacos",
      en: "Pharmaceutical Distribution",
      fr: "Distribution de Médicaments"
    },
    description: {
      pt: "A TOPRONTO atua na entrega e distribuição de medicamentos e produtos de saúde, seja para farmácias, hospitais ou clientes finais.",
      en: "TOPRONTO operates in the delivery and distribution of medications and health products, whether for pharmacies, hospitals, or end customers.",
      fr: "La TOPRONTO opère dans la livraison et la distribution de médicaments et de produits de santé, que ce soit pour les pharmacies, les hôpitaux ou les clients finaux."
    },
    importance: {
      pt: [
        "Garante que medicamentos cheguem rapidamente aos locais onde são necessários",
        "Facilita a vida de clientes que precisam de medicamentos com urgência",
        "Contribui para a eficiência da cadeia de abastecimento farmacêutico"
      ],
      en: [
        "Ensures that medications reach the places where they are needed quickly",
        "Makes life easier for customers who need medications urgently",
        "Contributes to the efficiency of the pharmaceutical supply chain"
      ],
      fr: [
        "Garantit que les médicaments arrivent rapidement là où ils sont nécessaires",
        "Facilite la vie des clients qui ont besoin de médicaments d'urgence",
        "Contribute à l'efficacité de la chaîne d'approvisionnement pharmaceutique"
      ]
    },
    icon: Building2,
    image: "pharmaceutical-distribution"
  },
  {
    title: {
      pt: "Cargas e Transporte Logístico",
      en: "Cargo and Logistics Transport",
      fr: "Cargaisons et Transport Logistique"
    },
    description: {
      pt: "Além das pequenas entregas, a TOPRONTO oferece transporte de cargas e logística para empresas, conectando fornecedores e clientes finais.",
      en: "In addition to small deliveries, TOPRONTO offers cargo transport and logistics for companies, connecting suppliers and end customers.",
      fr: "En plus des petites livraisons, la TOPRONTO offre le transport de marchandises et la logistique pour les entreprises, en connectant les fournisseurs et les clients finaux."
    },
    importance: {
      pt: [
        "Apoia empresas que necessitam enviar produtos em grande escala",
        "Melhora a eficiência logística, reduzindo custos e prazos",
        "Oferece soluções personalizadas de transporte, atendendo diferentes segmentos do mercado"
      ],
      en: [
        "Supports companies that need to send products on a large scale",
        "Improves logistics efficiency, reducing costs and deadlines",
        "Offers customized transport solutions, serving different market segments"
      ],
      fr: [
        "Soutient les entreprises qui doivent envoyer des produits à grande échelle",
        "Améliore l'efficacité logistique, en réduisant les coûts et les délais",
        "Offre des solutions de transport personnalisées, en servant différents segments de marché"
      ]
    },
    icon: Users,
    image: "cargo-and-logistics"
  }
];

export default function Services() {
  const { t } = useTranslation();
  const { currentLanguage: language } = useLanguage();

  return (
    <div className="space-y-24">
      <div className="">
        <div className=" mb-16">
          
          <p className="mt-3 py-8 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t(
              "Descubra nossos serviços especializados que podem transformar a forma como você gerencia suas entregas e logística"
            )}
          </p>
        </div>

        {services.map((service, index) => (
          <ServiceSection
            key={index}
            title={service.title[language]}
            description={service.description[language]}
            importance={service.importance[language]}
            icon={service.icon}
            image={service.title["en"].toLowerCase().replace(/\s+/g, "-")}
            index={index}
          />
        ))}
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
};
