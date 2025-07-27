import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "../common/LanguageSelector";

// Utilitaire pour gérer les images par route
const backgroundImages: Record<string, string> = {
  "/": "https://www.lalamove.com/hubfs/Banner%20Photo.jpg",
  "/services":
    "https://www.lalamove.com/hubfs/HK_fb_ad_DriverHero_20240529_1920x650%20%282%29.jpg",
  "/about":
    "https://www.lalamove.com/hubfs/Lalamove%20Website%202020/Deliver_Care/img_delivercare_banner_v1.png",
  "/careers": "https://www.lalamove.com/hubfs/Banner%20Photo.jpg",
  "/contact": "/images/headers/contact-bg.jpg",
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
        className=" relative h-screen sm:px-32 px-2 text-white bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay foncé pour lisibilité */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/images/logo.png" // Mettez le bon chemin de votre logo
                alt="Top Pronto Logo"
                className="h-20 w-auto rounded-lg"
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
                  {t("hero.title", "Livraison rapide et fiable à Luanda")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "hero.subtitle",
                    "Votre partenaire de confiance pour toutes vos livraisons en Angola."
                  )}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("hero.cta", "Découvrir nos services")}
                </Link>
              </div>
            )}
            {location.pathname === "/services" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("services.title", "Nos Services")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "services.subtitle",
                    "Découvrez toutes nos solutions de livraison adaptées à vos besoins."
                  )}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("services.cta", "Demander un devis")}
                </Link>
              </div>
            )}
            {location.pathname === "/about" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("about.title", "À propos de Top Pronto")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "about.subtitle",
                    "Une équipe passionnée au service de votre logistique."
                  )}
                </p>
                <Link
                  to="/careers"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("about.cta", "Rejoindre notre équipe")}
                </Link>
              </div>
            )}
            {location.pathname === "/careers" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("careers.title", "Rejoignez Top Pronto")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "careers.subtitle",
                    "Découvrez nos opportunités et postulez dès aujourd'hui."
                  )}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("careers.cta", "Nous contacter")}
                </Link>
              </div>
            )}
            {location.pathname === "/contact" && (
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow">
                  {t("contact.title", "Contactez-nous")}
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                  {t(
                    "contact.subtitle",
                    "Notre équipe est à votre écoute pour toutes vos demandes."
                  )}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors group shadow"
                >
                  {t("contact.cta", "Retour à l'accueil")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/80 rounded-xl py-4 px-6 mt-2 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-yellow-400 bg-white/20"
                      : "text-white hover:text-yellow-400 hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
};
