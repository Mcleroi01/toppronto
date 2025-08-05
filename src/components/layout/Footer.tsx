import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { contactInfo } from "../../data/contact";
import { useLanguage } from "../../hooks/useLanguage";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const quickLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.careers"), href: "/careers" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1C8grqcLz8/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/topronto24h?igsh=MTU2ZGVwOHBvZjM0Nw==",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/topronto/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className=" relative bg-black text-white sm:px-4 lg:px-8 xl:px-16 2xl:px-32">
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-5"
        style={{
          backgroundImage: "url('/images/background.png')",
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
           
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/images/logo/logo.png" // Mettez le bon chemin de votre logo
                  alt="Topronto Logo"
                  className=" h-32 w-auto rounded-lg"
                />
              </Link>
           
            <p className="text-gray-300 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact.title")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 " />
                <span className="text-gray-300 text-sm">
                  {contactInfo.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 " />
                <span className="text-gray-300 text-sm">
                  {contactInfo.email}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4  mt-0.5" />
                <span className="text-gray-300 text-sm">
                  {contactInfo.address[currentLanguage]}
                </span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact.hours")}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {contactInfo.workingHours[currentLanguage]}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Topronto. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
