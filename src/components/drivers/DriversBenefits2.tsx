import React from 'react';
import { FaClock, FaMoneyBillWave, FaCar, FaMapMarkedAlt } from 'react-icons/fa';

interface DriversBenefitsProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const DriversBenefits: React.FC<DriversBenefitsProps> = ({ currentLanguage }) => {
  const translations = {
    title: {
      pt: 'Por que se tornar um motorista?',
      en: 'Why become a driver?',
      fr: 'Pourquoi devenir chauffeur?'
    },
    benefits: [
      {
        icon: <FaClock className="text-4xl mb-4 text-blue-600" />,
        title: {
          pt: 'Horários Flexíveis',
          en: 'Flexible Hours',
          fr: 'Horaires flexibles'
        },
        description: {
          pt: 'Trabalhe quando quiser, sem chefe nem horário fixo.',
          en: 'Work whenever you want, no boss, no fixed schedule.',
          fr: 'Travaillez quand vous voulez, sans patron ni horaire fixe.'
        }
      },
      {
        icon: <FaMoneyBillWave className="text-4xl mb-4 text-green-600" />,
        title: {
          pt: 'Ganhos Atraentes',
          en: 'Great Earnings',
          fr: 'Revenus attractifs'
        },
        description: {
          pt: 'Ganhe por entrega e receba seus ganhos semanalmente.',
          en: 'Earn per delivery and get paid weekly.',
          fr: 'Gagnez par livraison et soyez payé chaque semaine.'
        }
      },
      {
        icon: <FaCar className="text-4xl mb-4 text-yellow-600" />,
        title: {
          pt: 'Tipos de Veículos',
          en: 'Vehicle Types',
          fr: 'Types de véhicules'
        },
        description: {
          pt: 'Aceitamos motos, carros, utilitários e vans.',
          en: 'We accept motorcycles, cars, utility vehicles, and vans.',
          fr: 'Nous acceptons les motos, voitures, utilitaires et fourgonnettes.'
        }
      },
      {
        icon: <FaMapMarkedAlt className="text-4xl mb-4 text-red-600" />,
        title: {
          pt: 'Área de Atuação',
          en: 'Service Area',
          fr: 'Zone de couverture'
        },
        description: {
          pt: 'Atenda pedidos na sua região e ganhe mais com menos deslocamento.',
          en: 'Deliver in your area and earn more with less travel.',
          fr: 'Livrez dans votre quartier et gagnez plus avec moins de déplacements.'
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {translations.title[currentLanguage]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {translations.benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {benefit.title[currentLanguage]}
              </h3>
              <p className="text-gray-600">
                {benefit.description[currentLanguage]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
