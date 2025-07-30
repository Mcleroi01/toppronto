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

interface Section {
  title: {
    pt: string;
    en: string;
    fr: string;
  };
  content?: {
    pt: string;
    en: string;
    fr: string;
  };
  features?: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: {
      pt: string;
      en: string;
      fr: string;
    };
    description: {
      pt: string;
      en: string;
      fr: string;
    };
  }[];
  image?: {
    src: string;
    alt: string;
  };
}

export const About: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const sections: Section[] = [
    {
      title: {
        pt: "Nossa História",
        en: "Our Story",
        fr: "Notre Histoire",
      },
      content: {
        pt: "Fundada em 2019, a TOPRONTO nasceu com a missão de transformar o setor de entregas em Angola. Com uma equipe apaixonada e tecnologia de ponta, conquistamos rapidamente a confiança de nossos clientes.",
        en: "Founded in 2019, TOPRONTO was born with the mission of transforming the delivery sector in Angola. With a passionate team and cutting-edge technology, we quickly earned our customers' trust.",
        fr: "Fondée en 2019, TOPRONTO est née avec la mission de transformer le secteur des livraisons en Angola. Avec une équipe passionnée et une technologie de pointe, nous avons rapidement gagné la confiance de nos clients.",
      },
      image: {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        alt: "Delivery team",
      },
    },
    {
      title: {
        pt: "Nossos Serviços",
        en: "Our Services",
        fr: "Nos Services",
      },
      features: [
        {
          icon: Truck,
          title: {
            pt: "Entregas Rápidas",
            en: "Fast Deliveries",
            fr: "Livraisons Rapides",
          },
          description: {
            pt: "Entregas em até 2 horas em Luanda",
            en: "Deliveries within 2 hours in Luanda",
            fr: "Livraisons en 2 heures à Luanda",
          },
        },
        {
          icon: Heart,
          title: {
            pt: "Cuidado com Seus Produtos",
            en: "Care for Your Products",
            fr: "Soin de vos Produits",
          },
          description: {
            pt: "Segurança e cuidado em cada entrega",
            en: "Security and care in every delivery",
            fr: "Sécurité et soin dans chaque livraison",
          },
        },
        {
          icon: Users,
          title: {
            pt: "Equipe Profissional",
            en: "Professional Team",
            fr: "Équipe Professionnelle",
          },
          description: {
            pt: "Entregadores treinados e experientes",
            en: "Trained and experienced delivery personnel",
            fr: "Personnel de livraison formé et expérimenté",
          },
        },
      ],
    },
    {
      title: {
        pt: "Tecnologia e Inovação",
        en: "Technology and Innovation",
        fr: "Technologie et Innovation",
      },
      content: {
        pt: "Nossa plataforma de gestão de entregas é moderna e intuitiva, permitindo o rastreamento em tempo real e a gestão eficiente de todas as operações.",
        en: "Our delivery management platform is modern and intuitive, allowing real-time tracking and efficient management of all operations.",
        fr: "Notre plateforme de gestion des livraisons est moderne et intuitive, permettant le suivi en temps réel et une gestion efficace de toutes les opérations.",
      },
      image: {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        alt: "Technology platform",
      },
    },
    {
      title: {
        pt: "Nossa Missão",
        en: "Our Mission",
        fr: "Notre Mission",
      },
      features: [
        {
          icon: Shield,
          title: {
            pt: "Confiabilidade",
            en: "Reliability",
            fr: "Fiabilité",
          },
          description: {
            pt: "Uma empresa em que você pode confiar para suas entregas importantes.",
            en: "A company you can trust for your important deliveries.",
            fr: "Une entreprise sur laquelle vous pouvez compter pour vos livraisons importantes.",
          },
        },
        {
          icon: Building2,
          title: {
            pt: "Parcerias Estratégicas",
            en: "Strategic Partnerships",
            fr: "Partenariats Stratégiques",
          },
          description: {
            pt: "Colaboração com empresas líderes do mercado",
            en: "Collaboration with market-leading companies",
            fr: "Collaboration avec des entreprises de premier plan",
          },
        },
        {
          icon: Truck,
          title: {
            pt: "Distribuição Eficiente",
            en: "Efficient Distribution",
            fr: "Distribution Efficace",
          },
          description: {
            pt: "Sistema de distribuição otimizado para máxima eficiência",
            en: "Optimized distribution system for maximum efficiency",
            fr: "Système de distribution optimisé pour une efficacité maximale",
          },
        },
      ],
    },
  ];

  const stats = [
    { number: "500+", label: "Entregas por dia" },
    { number: "50+", label: "Funcionários" },
    { number: "5+", label: "Anos de experiência" },
    { number: "99%", label: "Satisfação do cliente" },
  ];

  interface Feature {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: {
      pt: string;
      en: string;
      fr: string;
    };
    description: {
      pt: string;
      en: string;
      fr: string;
    };
  }

  const features: Feature[] = [
    {
      icon: Shield,
      title: {
        pt: "Confiabilidade",
        en: "Reliability",
        fr: "Fiabilité",
      },
      description: {
        pt: "Uma empresa em que você pode confiar para suas entregas importantes.",
        en: "A company you can trust for your important deliveries.",
        fr: "Une entreprise sur laquelle vous pouvez compter pour vos livraisons importantes.",
      },
    },
    {
      icon: Heart,
      title: {
        pt: "Missão",
        en: "Mission",
        fr: "Mission",
      },
      description: {
        pt: "Transformar a forma como pessoas e empresas realizam entregas no país.",
        en: "Transforming the way people and businesses make deliveries in the country.",
        fr: "Transformer la façon dont les personnes et les entreprises effectuent les livraisons dans le pays.",
      },
    },
    {
      icon: Users,
      title: {
        pt: "Serviços Diversificados",
        en: "Diversified Services",
        fr: "Services Diversifiés",
      },
      description: {
        pt: "Entregas de produtos farmacêuticos, transporte de documentos e mais.",
        en: "Pharmaceutical product delivery, document transport and more.",
        fr: "Livraison de produits pharmaceutiques, transport de documents et plus encore.",
      },
    },
    {
      icon: Truck,
      title: {
        pt: "Eficiência e Tecnologia",
        en: "Efficiency and Technology",
        fr: "Efficacité et Technologie",
      },
      description: {
        pt: "Sistema de entregas modernas e personalizadas.",
        en: "Modern and personalized delivery system.",
        fr: "Système de livraison moderne et personnalisé.",
      },
    },
  ];

  return (
    <div className=" space-y-24">
      <div className="">
        <div className=" relative mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
            style={{
              backgroundImage: "url('/images/background.png')",
            }}
          ></div>
          <p className="mt-3 py-7 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t(
              "A TOPRONTO, Entregas rápidas e seguras é uma startup angolana inovadora, fundada em 2019 em Luanda-Angola, com a missão de transformar a forma como pessoas e empresas realizam entregas no país."
            )}
          </p>
        </div>

        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-24"
          >
            {/* Title and Content */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {section.title[currentLanguage]}
              </h2>
              {section.content && (
                <p className="text-gray-600 text-lg mb-8">
                  {section.content[currentLanguage]}
                </p>
              )}
            </div>

            {/* Features Grid */}
            {section.features && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
                  style={{
                    backgroundImage: "url('/images/background.png')",
                  }}
                ></div>
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {feature.title[currentLanguage]}
                    </h3>
                    <p className="text-gray-500">
                      {feature.description[currentLanguage]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Image Section */}
            {section.image && (
              <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {section.title[currentLanguage]}
                  </h3>
                </div>
              </div>
            )}
          </motion.div>
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

export default About;
