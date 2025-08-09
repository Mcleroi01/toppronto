import React from 'react';
import { FaIdCard, FaCarAlt, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';

interface DriversRequirementsProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const DriversRequirements: React.FC<DriversRequirementsProps> = ({ currentLanguage }) => {
  const translations = {
    title: {
      pt: 'Requisitos para se tornar um motorista',
      en: 'Requirements to become a driver',
      fr: 'Exigences pour devenir chauffeur'
    },
    documents: {
      title: {
        pt: 'Documentos Necessários',
        en: 'Required Documents',
        fr: 'Documents requis'
      },
      items: [
        {
          icon: <FaIdCard className="text-blue-500 mr-2" />,
          text: {
            pt: 'CNH (Carteira Nacional de Habilitação) válida',
            en: 'Valid driver\'s license',
            fr: 'Permis de conduire valide'
          }
        },
        {
          icon: <FaIdCard className="text-blue-500 mr-2" />,
          text: {
            pt: 'Documento de identidade (RG) ou CNH',
            en: 'ID document or driver\'s license',
            fr: 'Pièce d\'identité ou permis de conduire'
          }
        },
        {
          icon: <FaIdCard className="text-blue-500 mr-2" />,
          text: {
            pt: 'Comprovante de residência recente',
            en: 'Proof of residence',
            fr: 'Justificatif de domicile récent'
          }
        },
        {
          icon: <FaIdCard className="text-blue-500 mr-2" />,
          text: {
            pt: 'Antecedentes criminais',
            en: 'Criminal background check',
            fr: 'Casier judiciaire'
          }
        }
      ]
    },
    vehicles: {
      title: {
        pt: 'Requisitos do Veículo',
        en: 'Vehicle Requirements',
        fr: 'Exigences du véhicule'
      },
      types: [
        {
          icon: <FaCarAlt className="text-green-500 mr-2" />,
          type: {
            pt: 'Motos',
            en: 'Motorcycles',
            fr: 'Motos'
          },
          requirements: {
            pt: 'Documentação em dia e seguro obrigatório',
            en: 'Up-to-date documentation and mandatory insurance',
            fr: 'Documents à jour et assurance obligatoire'
          }
        },
        {
          icon: <FaCarAlt className="text-green-500 mr-2" />,
          type: {
            pt: 'Carros',
            en: 'Cars',
            fr: 'Voitures'
          },
          requirements: {
            pt: 'Documentação em dia e seguro obrigatório',
            en: 'Up-to-date documentation and mandatory insurance',
            fr: 'Documents à jour et assurance obligatoire'
          }
        },
        {
          icon: <FaCarAlt className="text-green-500 mr-2" />,
          type: {
            pt: 'Utilitários',
            en: 'Utility Vehicles',
            fr: 'Véhicules utilitaires'
          },
          requirements: {
            pt: 'Documentação em dia e seguro obrigatório',
            en: 'Up-to-date documentation and mandatory insurance',
            fr: 'Documents à jour et assurance obligatoire'
          }
        },
        {
          icon: <FaCarAlt className="text-green-500 mr-2" />,
          type: {
            pt: 'Vans',
            en: 'Vans',
            fr: 'Fourgonnettes'
          },
          requirements: {
            pt: 'Documentação em dia e seguro obrigatório',
            en: 'Up-to-date documentation and mandatory insurance',
            fr: 'Documents à jour et assurance obligatoire'
          }
        }
      ]
    },
    additional: {
      title: {
        pt: 'Outros Requisitos',
        en: 'Additional Requirements',
        fr: 'Autres exigences'
      },
      items: [
        {
          icon: <FaMobileAlt className="text-purple-500 mr-2" />,
          text: {
            pt: 'Smartphone com acesso à internet',
            en: 'Smartphone with internet access',
            fr: 'Smartphone avec accès à Internet'
          }
        },
        {
          icon: <FaCheckCircle className="text-purple-500 mr-2" />,
          text: {
            pt: 'Maioridade legal',
            en: 'Legal age',
            fr: 'Âge légal'
          }
        },
        {
          icon: <FaCheckCircle className="text-purple-500 mr-2" />,
          text: {
            pt: 'Conta bancária em seu nome',
            en: 'Bank account in your name',
            fr: 'Compte bancaire à votre nom'
          }
        }
      ]
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {translations.title[currentLanguage]}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Documentos Necessários */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaIdCard className="text-blue-500 mr-2" />
              {translations.documents.title[currentLanguage]}
            </h3>
            <ul className="space-y-3">
              {translations.documents.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1">{item.icon}</span>
                  <span>{item.text[currentLanguage]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requisitos do Veículo */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              {translations.vehicles.title[currentLanguage]}
            </h3>
            <div className="space-y-4">
              {translations.vehicles.types.map((vehicle, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <div className="font-medium flex items-center">
                    {vehicle.icon}
                    {vehicle.type[currentLanguage]}
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {vehicle.requirements[currentLanguage]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Outros Requisitos */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              {translations.additional.title[currentLanguage]}
            </h3>
            <ul className="space-y-3">
              {translations.additional.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1">{item.icon}</span>
                  <span>{item.text[currentLanguage]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
