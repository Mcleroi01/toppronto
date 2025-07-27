import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "../common/LanguageSelector";

// Utilitaire pour gérer les images par route
const backgroundImages: Record<string, string> = {
  "/": "/images/headers/home-bg.jpg",
  "/services": "/images/headers/services-bg.jpg",
  "/about": "/images/headers/about-bg.jpg",
  "/careers": "/images/headers/careers-bg.jpg",
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
    <header
      className="relative text-white min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay foncé pour lisibilité */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/logo/logo.jpg"
              alt="Top Pronto Logo"
              className="h-12 w-auto rounded-lg"
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
  );
};
