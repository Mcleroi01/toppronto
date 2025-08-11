import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import JobList from "../components/JobList";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowRight, Link, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Composant Carrousel pour les avantages
const BenefitsCarousel = ({ currentLanguage }: { currentLanguage: string }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const benefits = [
    {
      title: {
        pt: "Flexibilidade de Horários",
        en: "Flexible Schedules",
        fr: "Horaires Flexibles"
      },
      description: {
        pt: "Possibilidade de ajustar o turno conforme a sua disponibilidade.",
        en: "Ability to adjust shifts according to your availability.",
        fr: "Possibilité d'ajuster les horaires selon votre disponibilité."
      },
      icon: "⏰",
      backgroundImage: "/images/vehicules/bike.png"
    },
    {
      title: {
        pt: "Renda Competitiva",
        en: "Competitive Income",
        fr: "Revenu Compétitif"
      },
      description: {
        pt: "Pagamento pontual e seguro.",
        en: "Timely and secure payments.",
        fr: "Paiements ponctuels et sécurisés."
      },
      icon: "💵",
      backgroundImage: "/images/vehicules/utility-car.png"
    },
    {
      title: {
        pt: "Oportunidades de Crescimento",
        en: "Growth Opportunities",
        fr: "Opportunités de Croissance"
      },
      description: {
        pt: "Possibilidade de se tornar entregador líder ou supervisor de equipe. Treinamentos periódicos para melhorar o desempenho.",
        en: "Opportunity to become a lead delivery person or team supervisor. Regular training to improve performance.",
        fr: "Possibilité de devenir livreur principal ou superviseur d'équipe. Formations régulières pour améliorer les performances."
      },
      icon: "📊",
      backgroundImage: "/images/vehicules/van.png"
    },
    {
      title: {
        pt: "Segurança no Trabalho",
        en: "Workplace Safety",
        fr: "Sécurité au Travail"
      },
      description: {
        pt: "Parcerias com seguradoras para proteção contra acidentes. Assistência em caso de imprevistos.",
        en: "Partnerships with insurance companies for accident protection. Assistance in case of unforeseen events.",
        fr: "Partenariats avec des compagnies d'assurance pour une protection contre les accidents. Assistance en cas d'imprévus."
      },
      icon: "🛡️",
      backgroundImage: "/images/vehicules/pickup.jpg"
    },
    {
      title: {
        pt: "Apoio da Equipe Topronto",
        en: "Topronto Team Support",
        fr: "Soutien de l'Équipe Topronto"
      },
      description: {
        pt: "Suporte diário para dúvidas e orientações. Ambiente profissional e colaborativo.",
        en: "Daily support for questions and guidance. Professional and collaborative environment.",
        fr: "Support quotidien pour les questions et l'orientation. Environnement professionnel et collaboratif."
      },
      icon: "👥",
      backgroundImage: "/images/vehicules/truck.jpg"
    }
  ];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Configuration du défilement automatique
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [page, isAutoPlay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentBenefit = benefits[Math.abs(page) % benefits.length];

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl text-white shadow-xl">
      {/* Image de fond dynamique avec superposition */}
      <div className="absolute inset-0 z-0">
        <img 
          src={currentBenefit.backgroundImage} 
          alt="Background" 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-700/80"></div>
      </div>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="text-center">
            <div className="text-6xl mb-6">
              {currentBenefit.icon}
            </div>
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentBenefit.title[currentLanguage as 'pt' | 'en' | 'fr']}
            </motion.h3>
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentBenefit.description[currentLanguage as 'pt' | 'en' | 'fr']}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contrôles de navigation */}
      <button 
        onClick={() => {
          setIsAutoPlay(false);
          paginate(-1);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => {
          setIsAutoPlay(false);
          paginate(1);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs de pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {benefits.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlay(false);
              setPage([index, index > page ? 1 : -1]);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${Math.abs(page) % benefits.length === index ? 'bg-yellow-300 w-6' : 'bg-white/50'}`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Careers: React.FC = () => {
  useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6">
          {currentLanguage === "pt" && "Vantagens de Trabalhar para a Topronto"}
          {currentLanguage === "en" && "Benefits of Working at Topronto"}
          {currentLanguage === "fr" && "Avantages de Travailler chez Topronto"}
        </h2>
        <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mb-12"></div>
        <BenefitsCarousel currentLanguage={currentLanguage} />
      </div>

      <div className="mb-16">
        <JobList currentLanguage={currentLanguage} />
      </div>

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
};
