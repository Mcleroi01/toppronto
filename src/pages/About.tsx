import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, Truck } from "lucide-react";

export const About: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { number: "500+", label: "Entregas por dia" },
    { number: "50+", label: "Funcionários" },
    { number: "5+", label: "Anos de experiência" },
    { number: "99%", label: "Satisfação do cliente" },
  ];

  const values = [
    {
      icon: Target,
      title: "Compromisso",
      description:
        "Comprometemo-nos a entregar sempre no prazo e com qualidade.",
    },
    {
      icon: Truck,
      title: "Rapidez",
      description: "Entregas rápidas e eficientes em toda a cidade de Luanda.",
    },
    {
      icon: Award,
      title: "Segurança",
      description:
        "Seus produtos são tratados com o máximo cuidado e segurança.",
    },
    {
      icon: Heart,
      title: "Confiabilidade",
      description:
        "Uma empresa em que você pode confiar para suas entregas importantes.",
    },
  ];

  return <div className="space-y-0"></div>;
};
