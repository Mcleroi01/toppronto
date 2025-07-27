import { JobPosition } from '../types';

export const jobPositions: JobPosition[] = [
  {
    id: 'delivery-driver',
    title: {
      pt: 'Motorista de Entrega',
      en: 'Delivery Driver',
      fr: 'Chauffeur-Livreur'
    },
    department: {
      pt: 'Operações',
      en: 'Operations',
      fr: 'Opérations'
    },
    location: 'Luanda, Angola',
    type: 'full-time',
    description: {
      pt: 'Procuramos motoristas experientes para integrar nossa equipe de entrega. Responsável por transportar produtos de forma segura e pontual.',
      en: 'We are looking for experienced drivers to join our delivery team. Responsible for transporting products safely and on time.',
      fr: 'Nous recherchons des chauffeurs expérimentés pour rejoindre notre équipe de livraison. Responsable du transport sécurisé et ponctuel des produits.'
    },
    requirements: {
      pt: [
        'Carta de condução válida categoria B',
        'Experiência mínima de 2 anos',
        'Conhecimento das ruas de Luanda',
        'Disponibilidade para trabalhar em horários flexíveis'
      ],
      en: [
        'Valid driving license category B',
        'Minimum 2 years experience',
        'Knowledge of Luanda streets',
        'Availability to work flexible hours'
      ],
      fr: [
        'Permis de conduire valide catégorie B',
        'Expérience minimum de 2 ans',
        'Connaissance des rues de Luanda',
        'Disponibilité pour travailler en horaires flexibles'
      ]
    },
    benefits: {
      pt: [
        'Salário competitivo',
        'Seguro de saúde',
        'Combustível fornecido',
        'Oportunidades de crescimento'
      ],
      en: [
        'Competitive salary',
        'Health insurance',
        'Fuel provided',
        'Growth opportunities'
      ],
      fr: [
        'Salaire compétitif',
        'Assurance santé',
        'Carburant fourni',
        'Opportunités de croissance'
      ]
    },
    postedDate: '2024-01-15'
  },
  {
    id: 'customer-service',
    title: {
      pt: 'Atendimento ao Cliente',
      en: 'Customer Service Representative',
      fr: 'Représentant Service Client'
    },
    department: {
      pt: 'Atendimento',
      en: 'Customer Service',
      fr: 'Service Client'
    },
    location: 'Luanda, Angola',
    type: 'full-time',
    description: {
      pt: 'Buscamos profissional para atendimento ao cliente, responsável por receber pedidos e fornecer suporte aos clientes.',
      en: 'We are looking for a customer service professional, responsible for receiving orders and providing customer support.',
      fr: 'Nous recherchons un professionnel du service client, responsable de recevoir les commandes et de fournir un support client.'
    },
    requirements: {
      pt: [
        'Ensino médio completo',
        'Experiência em atendimento ao cliente',
        'Fluência em português e inglês',
        'Habilidades de comunicação'
      ],
      en: [
        'High school diploma',
        'Customer service experience',
        'Fluency in Portuguese and English',
        'Communication skills'
      ],
      fr: [
        'Diplôme d\'études secondaires',
        'Expérience en service client',
        'Maîtrise du portugais et de l\'anglais',
        'Compétences en communication'
      ]
    },
    benefits: {
      pt: [
        'Salário base + comissões',
        'Plano de saúde',
        'Vale alimentação',
        'Formação contínua'
      ],
      en: [
        'Base salary + commissions',
        'Health plan',
        'Meal vouchers',
        'Continuous training'
      ],
      fr: [
        'Salaire de base + commissions',
        'Plan de santé',
        'Tickets restaurant',
        'Formation continue'
      ]
    },
    postedDate: '2024-01-10'
  }
];