import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ArrowRight } from "lucide-react";
import { LanguageSelector } from "../common/LanguageSelector";
import { motion, AnimatePresence } from "framer-motion";

// Utilitaire pour gérer les images par route
const backgroundImages: Record<string, string> = {
  "/": "https://www.lalamove.com/hubfs/Banner%20Photo.jpg",
  "/services":
    "/images/headers/cargo.jpg",
  "/about":
    "/images/headers/archive.jpg",
  "/careers": "/images/headers/bot.jpg",
  "/contact":
    "/images/headers/ville.jpg",
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.careers"), href: "/careers" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const backgroundImage =
    backgroundImages[location.pathname] || backgroundImages["/"];

  return (
    <>
      <header
        className=" relative h-screen sm:px-4 lg:px-8 xl:px-16 2xl:px-32 text-white bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay foncé pour lisibilité */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/images/logo/logo.png" // Mettez le bon chemin de votre logo
                alt="Topronto Logo"
                className=" h-32 w-auto rounded-lg"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive(item.href)
                      ? "text-yellow-400 bg-white/20"
                      : "text-white hover:text-yellow-400 hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Lang + Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:text-yellow-400"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Hero Section dynamique */}
          <div className="mt-10 mb-16 max-w-2xl">
            {location.pathname === "/" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("hero.title", "Entrega Rápida e Confiável em Luanda")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "hero.subtitle",
                    "Seu parceiro de confiança para todas as entregas em Angola."
                  )}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("hero.cta", "Descubra nossos serviços")}
                </Link>
              </div>
            )}
            {location.pathname === "/services" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("services.title", "Nossos Serviços")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "services.subtitle",
                    "Descubra todas as nossas soluções de entrega adaptadas às suas necessidades."
                  )}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("services.cta", "Solicitar um orçamento")}
                </Link>
              </div>
            )}
            {location.pathname === "/about" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("about.title", "Sobre a Topronto")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "about.subtitle",
                    "Uma equipe apaixonada ao serviço da sua logística."
                  )}
                </p>
                <Link
                  to="/careers"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("about.cta", "Junte-se à nossa equipe")}
                </Link>
              </div>
            )}
            {location.pathname === "/careers" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("careers.title", "Junte-se à Topronto")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "careers.subtitle",
                    "Descubra nossas oportunidades e candidate-se hoje mesmo."
                  )}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("careers.cta", "Contate-nos")}
                </Link>
              </div>
            )}
            {location.pathname === "/contact" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("contact.title", "Contate-nos")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "contact.subtitle",
                    "Nossa equipe está à disposição para todas as suas solicitações."
                  )}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("contact.cta", "Voltar para o início")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-50"
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-3/4 bg-white shadow-xl rounded-l-2xl p-6 overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {t("nav.menu", "Menu")}
                    </h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  <nav className="space-y-2">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                            isActive(item.href)
                              ? "bg-yellow-50 text-yellow-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-lg font-medium">
                            {item.name}
                          </span>
                          {isActive(item.href) && (
                            <span className="ml-auto text-yellow-500">
                              <ArrowRight className="w-5 h-5" />
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <LanguageSelector />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};
