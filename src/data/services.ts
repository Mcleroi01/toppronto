import { Shield, Users, Bike, Car, Truck } from "lucide-react";
export const services = [
  {
    id: "1",
    image: "https://cdn.prod.website-files.com/6193d546dfb64eec20323f4a/66fee6767ff2debfc1a93c45_Mouvement-de-stocks.png",
    name: {
      pt: "Gestão de Stock",
      en: "Stock Management",
      fr: "Gestion de Stock",
    },
    description: {
      pt: "A gestão de stock da TOPRONTO é essencial para empresas que desejam manter o controle eficiente das mercadorias, evitando perdas ou excessos.",
      en: "TOPRONTO's stock management is essential for companies that need efficient inventory control, avoiding losses or excess.",
      fr: "La gestion de stock de TOPRONTO est essentielle pour les entreprises qui souhaitent contrôler efficacement leurs marchandises, en évitant pertes et excès.",
    },
    icon: Shield,
    importance: {
      pt: [
        "Reduz custos operacionais com armazenagem",
        "Garante que os produtos certos estejam disponíveis no momento certo",
        "Facilita o processo de reposição e previsão de demanda",
        "Ajuda empresas a focarem no seu negócio principal enquanto nós cuidamos da logística"
      ],
      en: [
        "Reduces storage operational costs",
        "Ensures the right products are available at the right time",
        "Facilitates the restocking and demand forecasting process",
        "Helps companies focus on their core business while we handle logistics"
      ],
      fr: [
        "Réduit les coûts opérationnels de stockage",
        "Garantit que les bons produits soient disponibles au bon moment",
        "Facilite le processus de réapprovisionnement et de prévision de la demande",
        "Aide les entreprises à se concentrer sur leur activité principale pendant que nous gérons la logistique"
      ]
    },
  },
  {
    id: "2",
    image: "https://portalviana.sieg.co.ao/sites/default/files/2023-07/news-500x280-delivery_0.png",
    name: {
      pt: "Relações Públicas",
      en: "Public Relations",
      fr: "Relations Publiques",
    },
    description: {
      pt: "Distribuição rápida de documentos oficiais, convites, materiais de eventos e comunicação corporativa para empresas e instituições.",
      en: "Rapid distribution of official documents, invitations, event materials and corporate communication for companies and institutions.",
      fr: "Distribution rapide de documents officiels, invitations, matériels d'événements et communication d'entreprise.",
    },
    icon: Shield,
    importance: {
      pt: [
        "Fortalece a comunicação entre empresas e clientes",
        "Garante que mensagens e documentos sejam entregues com agilidade e segurança",
        "Apoia campanhas e eventos, assegurando que toda a logística de distribuição ocorra sem falhas"
      ],
      en: [
        "Strengthens communication between companies and clients",
        "Ensures that messages and documents are delivered quickly and securely",
        "Supports campaigns and events, ensuring that all distribution logistics occur without failures"
      ],
      fr: [
        "Renforce la communication entre les entreprises et les clients",
        "Garantit que les messages et documents soient livrés rapidement et en sécurité",
        "Soutient les campagnes et événements, en assurant que toute la logistique de distribution se déroule sans failles"
      ]
    },
  },
  {
    id: "3",
    image: "https://mercadoeconsumo.com.br/wp-content/smush-webp/2020/10/Delivery-Center-1024x678.jpeg.webp",
    name: {
      pt: "Entregas Diversas",
      en: "General Deliveries",
      fr: "Livraisons Diverses",
    },
    description: {
      pt: "Entregas rápidas e seguras de objetos pessoais e corporativos, com foco na agilidade e conveniência.",
      en: "Fast and secure deliveries of personal and corporate items, focusing on speed and convenience.",
      fr: "Livraisons rapides et sécurisées d'objets personnels et professionnels, avec un accent sur la rapidité et la commodité.",
    },
    icon: Shield,
    importance: {
      pt: [
        "Proporciona conveniência para clientes individuais e empresas",
        "Ajuda empresas a manterem prazos de entrega competitivos",
        "Melhora a experiência do cliente final com agilidade e confiança"
      ],
      en: [
        "Provides convenience for individual customers and businesses",
        "Helps businesses maintain competitive delivery deadlines",
        "Improves the final customer experience with agility and confidence"
      ],
      fr: [
        "Offre une commodité aux clients individuels et aux entreprises",
        "Aide les entreprises à maintenir des délais de livraison compétitifs",
        "Améliore l'expérience du client final avec agilité et confiance"
      ]
    },
  },
  {
    id: "4",
    image: "https://www.melissas.com/cdn/shop/products/image-of-organic-mixed-fruit-only-box-southern-california-delivery-fruit-28569055363116.jpg?v=1626304328",
    name: {
      pt: "Transporte de Material Biológico",
      en: "Biological Material Transport",
      fr: "Transport de Matériel Biologique",
    },
    description: {
      pt: "Protocolos rigorosos para transporte seguro de amostras biológicas, essenciais para clínicas, hospitais e laboratórios.",
      en: "Strict protocols for safe transport of biological samples, essential for clinics, hospitals, and laboratories.",
      fr: "Protocoles stricts pour le transport sécurisé de matériel biologique, essentiel pour les cliniques, hôpitaux et laboratoires.",
    },
    icon: Shield,
    importance: {
      pt: [
        "Atende a laboratórios, hospitais e clínicas que dependem de transporte seguro e rápido",
        "Evita contaminações e mantém a integridade do material, essencial para diagnósticos corretos",
        "Contribui para salvar vidas, oferecendo um serviço confiável para o setor de saúde"
      ],
      en: [
        "Serves laboratories, hospitals, and clinics that depend on fast and secure transport",
        "Prevents contamination and maintains material integrity, essential for accurate diagnoses",
        "Contributes to saving lives by providing reliable service to the healthcare sector"
      ],
      fr: [
        "Sert les laboratoires, hôpitaux et cliniques qui dépendent d'un transport rapide et sécurisé",
        "Évite les contaminations et maintient l'intégrité du matériel, essentiel pour des diagnostics précis",
        "Contribue à sauver des vies en offrant un service fiable au secteur de la santé"
      ]
    },
  },
  {
    id: "5",
    image: "https://static.wixstatic.com/media/0204e8_8392b5e7c77d4c06afdc75090c05f035~mv2.jpg/v1/fill/w_560,h_290,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0204e8_8392b5e7c77d4c06afdc75090c05f035~mv2.jpg",
    name: {
      pt: "Distribuição de Fármacos",
      en: "Pharmaceutical Distribution",
      fr: "Distribution de Médicaments",
    },
    description: {
      pt: "Entrega de medicamentos e produtos de saúde com agilidade, atendendo farmácias, hospitais e clientes finais.",
      en: "Fast delivery of medicines and health products to pharmacies, hospitals, and end customers.",
      fr: "Livraison rapide de médicaments et de produits de santé aux pharmacies, hôpitaux et clients finaux.",
    },
    icon: Shield,
    importance: {
      pt: [
        "Garante que medicamentos cheguem rapidamente aos locais onde são necessários",
        "Facilita a vida de clientes que precisam de medicamentos com urgência",
        "Contribui para a eficiência da cadeia de abastecimento farmacêutico"
      ],
      en: [
        "Ensures that medications reach the places where they are needed quickly",
        "Makes life easier for customers who need medications urgently",
        "Contributes to the efficiency of the pharmaceutical supply chain"
      ],
      fr: [
        "Garantit que les médicaments arrivent rapidement là où ils sont nécessaires",
        "Facilite la vie des clients qui ont besoin de médicaments d'urgence",
        "Contribute à l'efficacité de la chaîne d'approvisionnement pharmaceutique"
      ]
    },
  },
  {
    id: "6",
    image: "https://media.istockphoto.com/id/1474043686/photo/business-manager-talking-to-a-group-of-employees-at-a-distribution-warehouse.jpg?s=612x612&w=0&k=20&c=i-sXngKASrpPfoOA0-NdebfCHbFlLZ_OsDyyQspvNWw=",
    name: {
      pt: "Cargas e Transporte Logístico",
      en: "Cargo & Logistics Transport",
      fr: "Transport Logistique et de Charges",
    },
    description: {
      pt: "Transporte de cargas para empresas com soluções logísticas personalizadas e escaláveis.",
      en: "Cargo transport for companies with personalized and scalable logistics solutions.",
      fr: "Transport de marchandises pour les entreprises avec des solutions logistiques personnalisées et évolutives.",
    },
    icon: Shield,
    importance: {
      pt: [
        "Apoia empresas que necessitam enviar produtos em grande escala",
        "Melhora a eficiência logística, reduzindo custos e prazos",
        "Oferece soluções personalizadas de transporte, atendendo diferentes segmentos do mercado"
      ],
      en: [
        "Supports companies that need to send products on a large scale",
        "Improves logistics efficiency, reducing costs and deadlines",
        "Offers customized transport solutions, serving different market segments"
      ],
      fr: [
        "Soutient les entreprises qui doivent envoyer des produits à grande échelle",
        "Améliore l'efficacité logistique, en réduisant les coûts et les délais",
        "Offre des solutions de transport personnalisées, en servant différents segments de marché"
      ]
    },
  },
];
