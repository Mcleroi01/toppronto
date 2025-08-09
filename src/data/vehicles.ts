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
  },
  {
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
  },
  {
    icon: Truck,
    label: {
      fr: "Fourgonnette",
      en: "Van",
      pt: "Carrinha",
    },
    desc: {
      fr: "Idéale pour les livraisons volumineuses en zone urbaine.",
      en: "Ideal for bulky deliveries in urban areas.",
      pt: "Ideal para entregas volumosas em áreas urbanas.",
    },
    image: "/images/vehicules/van.png",
  },
  {
    type: 'pickup',
    icon: Truck,
    label: {
      fr: "Pickup",
      en: "Pickup",
      pt: "Pickup",
    },
    desc: {
      fr: "Parfait pour les charges lourdes ou les zones rurales.",
      en: "Perfect for heavy loads or rural areas.",
      pt: "Perfeito para cargas pesadas ou zonas rurais.",
    },
    image: "/images/vehicules/pickup.jpg",
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
  },
];
