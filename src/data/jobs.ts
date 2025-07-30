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
    experienceLevel: 'mid',
    salaryRange: {
      pt: '150.000 - 250.000 AOA mensais',
      en: '150,000 - 250,000 AOA monthly',
      fr: '150 000 - 250 000 AOA mensuels'
    },
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
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
        'Opportunities for growth'
      ],
      fr: [
        'Salaire compétitif',
        'Assurance santé',
        'Carburant fourni',
        'Opportunités de croissance'
      ]
    }
  },
  {
    id: 'warehouse-manager',
    title: {
      pt: 'Gerente de Armazém',
      en: 'Warehouse Manager',
      fr: 'Gestionnaire de Stock'
    },
    department: {
      pt: 'Logística',
      en: 'Logistics',
      fr: 'Logistique'
    },
    location: 'Luanda, Angola',
    type: 'full-time',
    experienceLevel: 'senior',
    salaryRange: {
      pt: '200.000 - 400.000 AOA mensais',
      en: '200,000 - 400,000 AOA monthly',
      fr: '200 000 - 400 000 AOA mensuels'
    },
    postedDate: '2024-01-01',
    deadline: '2024-03-01',
    description: {
      pt: 'Responsável pela gestão eficiente do armazém e supervisão da equipe.',
      en: 'Responsible for efficient warehouse management and team supervision.',
      fr: 'Responsable de la gestion efficace du stock et de la supervision de l\'équipe.'
    },
    requirements: {
      pt: [
        'Experiência mínima de 5 anos',
        'Formação em Logística ou Gestão',
        'Excelentes habilidades de liderança',
        'Conhecimento de sistemas de gestão de estoque'
      ],
      en: [
        'Minimum 5 years experience',
        'Logistics or Management degree',
        'Excellent leadership skills',
        'Knowledge of inventory management systems'
      ],
      fr: [
        'Expérience minimum de 5 ans',
        'Formation en Logistique ou Gestion',
        'Excellentes compétences de leadership',
        'Connaissance des systèmes de gestion de stock'
      ]
    },
    benefits: {
      pt: [
        'Salário competitivo',
        'Seguro de saúde',
        'Bônus de produtividade',
        'Vale alimentação'
      ],
      en: [
        'Competitive salary',
        'Health insurance',
        'Productivity bonus',
        'Meal allowance'
      ],
      fr: [
        'Salaire compétitif',
        'Assurance santé',
        'Bonus de productivité',
        'Ticket restaurant'
      ]
    }
  },
  {
    id: 'customer-service',
    title: {
      pt: 'Atendente de Clientes',
      en: 'Customer Service Representative',
      fr: 'Agent de Service Client'
    },
    department: {
      pt: 'Atendimento ao Cliente',
      en: 'Customer Service',
      fr: 'Service Client'
    },
    location: 'Luanda, Angola',
    type: 'part-time',
    experienceLevel: 'entry',
    salaryRange: {
      pt: '100.000 - 150.000 AOA mensais',
      en: '100,000 - 150,000 AOA monthly',
      fr: '100 000 - 150 000 AOA mensuels'
    },
    postedDate: '2024-01-20',
    deadline: '2024-02-28',
    description: {
      pt: 'Responsável por atender e auxiliar clientes por telefone e chat.',
      en: 'Responsible for assisting customers via phone and chat.',
      fr: 'Responsable d\'assister les clients par téléphone et chat.'
    },
    requirements: {
      pt: [
        'Experiência com atendimento ao cliente',
        'Excelente comunicação',
        'Disponibilidade para trabalhar em turnos',
        'Fluência em português'
      ],
      en: [
        'Customer service experience',
        'Excellent communication',
        'Availability for shift work',
        'Fluency in Portuguese'
      ],
      fr: [
        'Expérience en service client',
        'Excellent communication',
        'Disponibilité pour travailler en équipes',
        'Fluence en portugais'
      ]
    },
    benefits: {
      pt: [
        'Salário competitivo',
        'Seguro de saúde',
        'Horários flexíveis',
        'Treinamento profissional'
      ],
      en: [
        'Competitive salary',
        'Health insurance',
        'Flexible hours',
        'Professional training'
      ],
      fr: [
        'Salaire compétitif',
        'Assurance santé',
        'Horaires flexibles',
        'Formation professionnelle'
      ]
    }
  }
];
