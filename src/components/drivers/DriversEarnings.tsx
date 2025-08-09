import React from 'react';
import { FaMoneyBillWave, FaChartLine, FaWallet } from 'react-icons/fa';

interface DriversEarningsProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const DriversEarnings: React.FC<DriversEarningsProps> = ({ currentLanguage }) => {
  const translations = {
    title: {
      pt: 'Quanto você pode ganhar?',
      en: 'How much can you earn?',
      fr: 'Combien pouvez-vous gagner?'
    },
    description: {
      pt: 'Seu ganho varia de acordo com o tipo de veículo, distância percorrida e demanda local.',
      en: 'Your earnings vary based on vehicle type, distance traveled, and local demand.',
      fr: 'Vos gains varient en fonction du type de véhicule, de la distance parcourue et de la demande locale.'
    },
    averageEarnings: {
      title: {
        pt: 'Ganhos Médios por Entrega',
        en: 'Average Earnings per Delivery',
        fr: 'Gains moyens par livraison'
      },
      vehicles: [
        {
          type: {
            pt: 'Motos',
            en: 'Motorcycles',
            fr: 'Motos'
          },
          range: {
            pt: 'R$ 8 - R$ 15',
            en: '$2 - $4',
            fr: '2€ - 4€'
          }
        },
        {
          type: {
            pt: 'Carros',
            en: 'Cars',
            fr: 'Voitures'
          },
          range: {
            pt: 'R$ 10 - R$ 20',
            en: '$3 - $5',
            fr: '3€ - 5€'
          }
        },
        {
          type: {
            pt: 'Utilitários/Vans',
            en: 'Utility Vehicles/Vans',
            fr: 'Utilitaires/Fourgonnettes'
          },
          range: {
            pt: 'R$ 15 - R$ 30',
            en: '$4 - $7',
            fr: '4€ - 7€'
          }
        }
      ]
    },
    features: [
      {
        icon: <FaMoneyBillWave className="text-4xl text-green-500 mb-4" />,
        title: {
          pt: 'Pagamentos Semanais',
          en: 'Weekly Payments',
          fr: 'Paiements Hebdomadaires'
        },
        description: {
          pt: 'Receba seu dinheiro toda semana diretamente na sua conta bancária.',
          en: 'Get paid weekly directly to your bank account.',
          fr: 'Soyez payé chaque semaine directement sur votre compte bancaire.'
        }
      },
      {
        icon: <FaChartLine className="text-4xl text-blue-500 mb-4" />,
        title: {
          pt: 'Ganhos Extras',
          en: 'Extra Earnings',
          fr: 'Gains Supplémentaires'
        },
        description: {
          pt: 'Ganhe mais com bônus por desempenho e corridas em horários de pico.',
          en: 'Earn more with performance bonuses and peak-time deliveries.',
          fr: 'Gagnez plus avec des bonus de performance et des livraisons aux heures de pointe.'
        }
      },
      {
        icon: <FaWallet className="text-4xl text-purple-500 mb-4" />,
        title: {
          pt: 'Sem Taxas Ocultas',
          en: 'No Hidden Fees',
          fr: 'Pas de Frais Cachés'
        },
        description: {
          pt: 'Fique com 100% das suas gorjetas. Sem taxas de plataforma.',
          en: 'Keep 100% of your tips. No platform fees.',
          fr: 'Gardez 100% de vos pourboires. Pas de frais de plateforme.'
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {translations.title[currentLanguage]}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translations.description[currentLanguage]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">
              {translations.averageEarnings.title[currentLanguage]}
            </h3>
            <div className="space-y-4">
              {translations.averageEarnings.vehicles.map((vehicle, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <span className="font-medium">{vehicle.type[currentLanguage]}</span>
                  <span className="text-blue-600 font-semibold">{vehicle.range[currentLanguage]}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              *{currentLanguage === 'pt' ? 'Valores podem variar por região e demanda' : 
                currentLanguage === 'en' ? 'Rates may vary by region and demand' :
                'Les tarifs peuvent varier selon la région et la demande'}
            </p>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              {currentLanguage === 'pt' ? 'Calculadora de Ganhos' : 
               currentLanguage === 'en' ? 'Earnings Calculator' :
               'Calculateur de Gains'}
            </h3>
            <p className="mb-6">
              {currentLanguage === 'pt' ? 'Descubra quanto você pode ganhar por semana:' :
               currentLanguage === 'en' ? 'Find out how much you could earn per week:' :
               'Découvrez combien vous pourriez gagner par semaine :'}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {currentLanguage === 'pt' ? 'Tipo de Veículo' :
                   currentLanguage === 'en' ? 'Vehicle Type' :
                   'Type de Véhicule'}
                </label>
                <select className="w-full p-2 rounded text-gray-800">
                  <option>{currentLanguage === 'pt' ? 'Selecione' : currentLanguage === 'en' ? 'Select' : 'Sélectionnez'}</option>
                  <option>{currentLanguage === 'pt' ? 'Moto' : currentLanguage === 'en' ? 'Motorcycle' : 'Moto'}</option>
                  <option>{currentLanguage === 'pt' ? 'Carro' : currentLanguage === 'en' ? 'Car' : 'Voiture'}</option>
                  <option>{currentLanguage === 'pt' ? 'Utilitário/Van' : currentLanguage === 'en' ? 'Utility Vehicle/Van' : 'Utilitaire/Fourgonnette'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {currentLanguage === 'pt' ? 'Horas por semana' :
                   currentLanguage === 'en' ? 'Hours per week' :
                   'Heures par semaine'}
                </label>
                <input 
                  type="number" 
                  className="w-full p-2 rounded text-gray-800"
                  placeholder={currentLanguage === 'pt' ? 'Ex: 30' : currentLanguage === 'en' ? 'E.g. 30' : 'Ex: 30'}
                />
              </div>
              
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded font-medium hover:bg-gray-100 transition-colors">
                {currentLanguage === 'pt' ? 'Calcular Ganhos' :
                 currentLanguage === 'en' ? 'Calculate Earnings' :
                 'Calculer les Gains'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {translations.features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title[currentLanguage]}
              </h3>
              <p className="text-gray-600">
                {feature.description[currentLanguage]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
