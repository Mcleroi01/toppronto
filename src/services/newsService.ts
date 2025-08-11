export interface NewsItem {
  id: number;
  title: {
    pt: string;
    en: string;
    fr: string;
  };
  excerpt: {
    pt: string;
    en: string;
    fr: string;
  };
  content: {
    pt: string;
    en: string;
    fr: string;
  };
  imageUrl: string;
  date: string;
  category: 'company' | 'logistics' | 'announcement';
}

export const getNews = (): NewsItem[] => {
  // Données statiques pour les nouvelles
  return [
    {
      id: 1,
      title: {
        pt: "Nova Sede Administrativa",
        en: "New Administrative Headquarters",
        fr: "Nouveau Siège Administratif"
      },
      excerpt: {
        pt: "Inauguramos nossa nova sede administrativa com instalações modernas.",
        en: "We've inaugurated our new administrative headquarters with modern facilities.",
        fr: "Nous avons inauguré notre nouveau siège administratif avec des installations modernes."
      },
      content: {
        pt: "A Topronto está orgulhosa de anunciar a inauguração de nossa nova sede administrativa, localizada no coração de Luanda. As novas instalações contam com tecnologia de ponta e espaços colaborativos para melhor atender nossos clientes e parceiros.",
        en: "Topronto is proud to announce the inauguration of our new administrative headquarters, located in the heart of Luanda. The new facilities feature cutting-edge technology and collaborative spaces to better serve our clients and partners.",
        fr: "Topronto est fier d'annoncer l'inauguration de son nouveau siège administratif, situé au cœur de Luanda. Les nouvelles installations disposent d'une technologie de pointe et d'espaces collaboratifs pour mieux servir nos clients et partenaires."
      },
      imageUrl: "/images/headers/business-meeting.jpg",
      date: "2025-08-10",
      category: 'company'
    },
    {
      id: 2,
      title: {
        pt: "Expansão da Frota",
        en: "Fleet Expansion",
        fr: "Expansion de la Flotte"
      },
      excerpt: {
        pt: "Ampliamos nossa frota com 20 novos veículos para melhor atendê-lo.",
        en: "We've expanded our fleet with 20 new vehicles to better serve you.",
        fr: "Nous avons élargi notre flotte avec 20 nouveaux véhicules pour mieux vous servir."
      },
      content: {
        pt: "Para atender à crescente demanda por nossos serviços de entrega, investimos em 20 novos veículos, incluindo motos, carros utilitários e vans. Essa expansão nos permite oferecer entregas mais rápidas e eficientes em toda Luanda.",
        en: "To meet the growing demand for our delivery services, we've invested in 20 new vehicles, including motorcycles, utility cars, and vans. This expansion allows us to offer faster and more efficient deliveries throughout Luanda.",
        fr: "Pour répondre à la demande croissante de nos services de livraison, nous avons investi dans 20 nouveaux véhicules, dont des motos, des voitures utilitaires et des fourgonnettes. Cette expansion nous permet d'offrir des livraisons plus rapides et plus efficaces dans tout Luanda."
      },
      imageUrl: "/images/vehicules/van.png",
      date: "2025-07-28",
      category: 'logistics'
    },
    {
      id: 3,
      title: {
        pt: "Parceria com Shalina",
        en: "Partnership with Shalina",
        fr: "Partenariat avec Shalina"
      },
      excerpt: {
        pt: "Fechamos uma parceria estratégica com a Shalina Healthcare.",
        en: "We've established a strategic partnership with Shalina Healthcare.",
        fr: "Nous avons établi un partenariat stratégique avec Shalina Healthcare."
      },
      content: {
        pt: "Estamos orgulhosos de anunciar nossa nova parceria com a Shalina Healthcare, líder em produtos farmacêuticos na África. Através desta colaboração, seremos responsáveis pela distribuição eficiente de seus produtos em todo o território angolano.",
        en: "We are proud to announce our new partnership with Shalina Healthcare, a leader in pharmaceutical products in Africa. Through this collaboration, we will be responsible for the efficient distribution of their products throughout Angolan territory.",
        fr: "Nous sommes fiers d'annoncer notre nouveau partenariat avec Shalina Healthcare, leader des produits pharmaceutiques en Afrique. Grâce à cette collaboration, nous serons responsables de la distribution efficace de leurs produits sur tout le territoire angolais."
      },
      imageUrl: "/images/clientLogos/shalina.jpg",
      date: "2025-07-15",
      category: 'announcement'
    },
    {
      id: 4,
      title: {
        pt: "Sistema de Rastreamento em Tempo Real",
        en: "Real-Time Tracking System",
        fr: "Système de Suivi en Temps Réel"
      },
      excerpt: {
        pt: "Lançamos nosso novo sistema de rastreamento em tempo real para clientes.",
        en: "We've launched our new real-time tracking system for customers.",
        fr: "Nous avons lancé notre nouveau système de suivi en temps réel pour les clients."
      },
      content: {
        pt: "Agora você pode acompanhar suas encomendas em tempo real através do nosso aplicativo ou site. Com atualizações em tempo real, você saberá exatamente onde está sua entrega e quando ela chegará ao destino.",
        en: "You can now track your orders in real-time through our app or website. With live updates, you'll know exactly where your delivery is and when it will arrive at its destination.",
        fr: "Vous pouvez désormais suivre vos commandes en temps réel via notre application ou notre site Web. Avec des mises à jour en direct, vous saurez exactement où se trouve votre livraison et quand elle arrivera à destination."
      },
      imageUrl: "/images/services/tracking.jpg",
      date: "2025-06-30",
      category: 'announcement'
    }
  ];
};
