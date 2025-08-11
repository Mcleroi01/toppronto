import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, ArrowRight, XCircle } from "lucide-react";
import { LanguageSelector } from "../common/LanguageSelector";
import { motion, AnimatePresence } from "framer-motion";
import { DriversForm } from "../drivers/DriversForm";
import EnterpriseForm from "../enterprise/EnterpriseForm";

// Utilitaire pour gérer les images par route
const backgroundImages: Record<string, string> = {
  "/": "/images/headers/inicio.jpg",
  "/services": "/images/headers/cargo.jpg",
  "/about": "/images/headers/archive.jpg",
  "/careers": "/images/headers/bot.jpg",
  "/drivers": "/images/headers/entregador.jpg",
  "/enterprise": "/images/headers/parceiro.jpg",
  "/contact": "/images/headers/ville.jpg",
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  // La logique de soumission est maintenant gérée directement dans le composant EnterpriseForm
  // qui appelle onSuccess en cas de réussite



  const navigation = [
    {
      name: t("nav.home"),
      href: "/",
      exact: true,
    },
    {
      name: t("nav.services"),
      href: "/services",
    },
    {
      name: t("nav.drivers", "Motoristas"),
      href: "/drivers",
    },
    {
      name: t("nav.enterprise", "Empresas"),
      href: "/enterprise",
    },
    {
      name: t("nav.about"),
      href: "/about",
      submenu: [
        { name: t("nav.about_company", "A nossa empresa"), href: "/about" },
        { name: t("nav.careers", "Venha fazer parte do nosso time profissional"), href: "/careers" },
        { name: t("nav.contact", "Contato"), href: "/contact" },
      ],
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path) && (path !== '/' || location.pathname === '/');
  };
  
  const hasActiveSubmenu = (submenu?: Array<{href: string}>) => {
    if (!submenu) return false;
    return submenu.some(item => location.pathname.startsWith(item.href));
  };
  
  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
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
                className=" h-36 w-auto rounded-lg"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <div
                      onClick={() => toggleMenu(item.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                        isActive(item.href) || hasActiveSubmenu(item.submenu)
                          ? "text-yellow-400 bg-white/20"
                          : "text-white hover:text-yellow-400 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center">
                        {item.name}
                        <svg
                          className={`ml-1 w-4 h-4 transition-transform ${
                            openMenu === item.name ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        isActive(item.href, item.exact)
                          ? "text-yellow-400 bg-white/20"
                          : "text-white hover:text-yellow-400 hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.submenu && (
                    <div
                      className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-200 ${
                        openMenu === item.name
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="py-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => setOpenMenu(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:hidden absolute top-20 left-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden z-50 max-h-[80vh] overflow-y-auto`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-gray-100 last:border-0"
                  >
                    {item.submenu ? (
                      <div
                        onClick={() => toggleMenu(item.name)}
                        className={`flex justify-between items-center px-3 py-3 rounded-md text-base font-medium ${
                          isActive(item.href) || hasActiveSubmenu(item.submenu)
                            ? "bg-yellow-50 text-yellow-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {item.name}
                        <svg
                          className={`ml-2 w-4 h-4 transition-transform ${
                            openMenu === item.name ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-3 py-3 rounded-md text-base font-medium ${
                          isActive(item.href, item.exact)
                            ? "bg-yellow-50 text-yellow-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}

                    {item.submenu && (
                      <div
                        className={`pl-4 overflow-hidden transition-all duration-200 ${
                          openMenu === item.name ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md my-1"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setOpenMenu(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <LanguageSelector />
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/10 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Lang + Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
            </div>
          </div>

          {/* Hero Section dynamique */}
          <div className="mt-10 mb-16 max-w-2xl">
            {location.pathname === "/" && (
              <div>
                <h1 className="text-3xl sm:text-6xl font-bold text-yellow-400 mb-4 drop-shadow">
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
                <h1 className="text-3xl sm:text-6xl font-bold text-yellow-400 mb-4 drop-shadow">
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
                <h1 className="text-3xl sm:text-6xl font-bold text-yellow-400 mb-4 drop-shadow">
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
                <h1 className="text-3xl sm:text-6xl font-bold text-yellow-400 mb-4 drop-shadow">
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
                <h1 className="text-3xl sm:text-6xl font-bold text-yellow-400 mb-4 drop-shadow">
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
            {location.pathname === "/drivers" && (
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-6xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t(
                    "drivers.hero.title",
                    "Cadastre-se e seja um motorista parceiro"
                  )}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                  {t(
                    "drivers.hero.subtitle",
                    "Ganhe dinheiro extra com seu próprio horário e seja dono do seu negócio."
                  )}
                </p>
                <button
                  onClick={() => setIsDriverModalOpen(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("drivers.cta", "Cadastre-se agora")}
                </button>
              </div>
            )}
            {location.pathname === "/enterprise" && (
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-6xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t(
                    "enterprise.hero.title",
                    "Otimize a logística do seu negócio"
                  )}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                  {t(
                    "enterprise.hero.subtitle",
                    "Entregas rápidas e confiáveis para impulsionar o seu negócio."
                  )}
                </p>
                <button
                  onClick={() => setIsEnterpriseModalOpen(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("enterprise.cta", "Solicitar proposta")}
                </button>
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
      {/* Driver Registration Modal */}
      <AnimatePresence>
        {isDriverModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className=" bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-xl flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {t("drivers.form.title", "Cadastre-se como motorista")}
                </h3>
                <button
                  onClick={() => {
                    setIsDriverModalOpen(false);
                    setSubmitSuccess(false);
                  }}
                  className="text-white hover:text-yellow-200 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-2">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-900">
                      {t("drivers.form.success.title", "Inscrição enviada!")}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {t(
                        "drivers.form.success.message",
                        "Obrigado pelo seu interesse. Entraremos em contato em breve!"
                      )}
                    </p>
                    <button
                      type="button"
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => {
                        setIsDriverModalOpen(false);
                        setSubmitSuccess(false);
                      }}
                    >
                      {t("common.close", "Fechar")}
                    </button>
                  </div>
                ) : (
                  <DriversForm
                    currentLanguage={i18n.language as "pt" | "en" | "fr"}
                    onSubmitSuccess={() => {
                      setSubmitSuccess(true);
                      // Fermer le modal après un délai
                      setTimeout(() => {
                        setIsDriverModalOpen(false);
                        setSubmitSuccess(false);
                      }, 3000);
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enterprise Registration Modal */}
      <AnimatePresence>
        {isEnterpriseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className=" bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-xl flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {t("enterprise.form.title", "Solicite uma proposta")}
                </h3>
                <button
                  onClick={() => {
                    setIsEnterpriseModalOpen(false);
                    setSubmitSuccess(false);
                  }}
                  className="text-white hover:text-yellow-200 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-900">
                      {t(
                        "enterprise.form.success.title",
                        "Solicitação enviada!"
                      )}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {t(
                        "enterprise.form.success.message",
                        "Obrigado pelo seu interesse. Nossa equipe entrará em contato em breve!"
                      )}
                    </p>
                    <button
                      type="button"
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        setIsEnterpriseModalOpen(false);
                        setSubmitSuccess(false);
                      }}
                    >
                      {t("common.close", "Fechar")}
                    </button>
                  </div>
                ) : (
                  <EnterpriseForm
                    currentLanguage={i18n.language as "pt" | "en" | "fr"}
                    onSuccess={() => {
                      setSubmitSuccess(true);
                      // Fermer automatiquement après 2 secondes
                      setTimeout(() => {
                        setSubmitSuccess(false);
                        setIsEnterpriseModalOpen(false);
                      }, 2000);
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
