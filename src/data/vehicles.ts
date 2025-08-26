import { Bike, Car, Truck } from "lucide-react";

type Language = 'pt' | 'en' | 'fr';
type TranslationObject = {
  [key in Language]: string;
};

export interface Vehicle {
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  label: TranslationObject;
  desc: TranslationObject;
  image: string;
  features?: (string | TranslationObject)[];
  limite: string;
  Tamanho?: string;
  Ideal?: string;
  volume?: string;
}

export const vehicles: Vehicle[] = [
  {
    type: 'moto',
    icon: Bike,
    label: {
      fr: "Moto",
      en: "Motorbike",
      pt: "Moto",
    },
    desc: {
      fr: "Idéal pour les petits colis et livraisons urgentes.",
      en: "Ideal for small parcels and urgent deliveries.",
      pt: "Ideal para pequenas encomendas e entregas urgentes.",
    },
    image: "/images/vehicules/bike.png",
    limite: "20 kg",
    Tamanho: "35 × 40 × 35 cm ",
    Ideal: "documentos, flores, pequenos pacotes e entrega de comida",
  },
  {
    type: 'city-car',
    icon: Car,
    label: {
      fr: "Voiture citadine",
      en: "City car",
      pt: "Carro urbano",
    },
    desc: {
      fr: "Parfait pour les livraisons rapides en milieu urbain.",
      en: "Perfect for fast urban deliveries.",
      pt: "Perfeito para entregas rápidas em áreas urbanas.",
    },
    image: "/images/vehicules/city-car.jpg",
    limite: "50 kg",
    Ideal: "documentos, pacotes leves e mobiliário pequeno",
    volume: "200 litros ",
  },
  {
    type: 'utility-car',
    icon: Car,
    label: {
      fr: "Voiture utilitaire",
      en: "Utility car",
      pt: "Carro utilitário",
    },
    desc: {
      fr: "Polyvalente pour les colis de taille moyenne.",
      en: "Versatile for medium-sized parcels.",
      pt: "Versátil para encomendas de tamanho médio.",
    },
    image: "/images/vehicules/utility-car.png",
    limite: "100 kg",
    Ideal: "documentos, móveis, eletrodomésticos e pacotes volumosos",
    volume: "400 litros ",
  },
  {
    type: 'hiace',
    icon: Car,
    label: {
      fr: "Hiace",
      en: "Hiace",
      pt: "Hiace",
    },
    desc: {
      fr: "Idéal pour les charges lourdes et les terrains accidentés.",
      en: "Ideal for heavy loads and rough terrain.",
      pt: "Ideal para cargas pesadas e terrenos acidentados.",
    },
    image: "/images/vehicules/van.png",
    limite: "200 kg",
    Ideal: "documentos, móveis, eletrodomésticos e pacotes volumosos",
    volume: "800 litros ",
  },
  {
    type: 'van',
    icon: Truck,
    label: {
      fr: "Fourgonnette",
      en: "Van",
      pt: "Carrinha",
    },
    desc: {
      fr: "Parfait pour les charges lourdes ou les zones rurales.",
      en: "Perfect for heavy loads or rural areas.",
      pt: "Perfeito para cargas pesadas ou zonas rurais.",
    },
    image: "/images/vehicules/pickup.jpg",
    limite: "300 kg",
    Ideal: "móveis, eletrodomésticos e pacotes volumososdocumentos, móveis, eletrodomésticos e pacotes volumosos",
    volume: "1000 litros ",
  },
  {
    type: 'truck',
    icon: Truck,
    label: {
      fr: "Camion",
      en: "Truck",
      pt: "Camião",
    },
    desc: {
      fr: "Pour les gros volumes et la logistique professionnelle.",
      en: "For large volumes and professional logistics.",
      pt: "Para grandes volumes e logística profissional.",
    },
    image: "/images/vehicules/truck.png",
    limite: "500 kg",
    Ideal:  "grandes quantidades, equipamentos pesados e mudanças.documentos, grandes quantidades, equipamentos pesados e mudanças.",
    volume: "2000 litros ",
  },
];
