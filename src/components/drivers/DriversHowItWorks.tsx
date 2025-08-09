import React from 'react';
import { FaMobileAlt, FaClipboardCheck, FaBell, FaMotorcycle } from 'react-icons/fa';

interface DriversHowItWorksProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const DriversHowItWorks: React.FC<DriversHowItWorksProps> = ({ currentLanguage }) => {
  const translations = {
    title: {
      pt: 'Como Funciona',
      en: 'How It Works',
      fr: 'Comment ça marche'
    },
    steps: [
      {
        icon: <FaMobileAlt className="text-3xl text-blue-600 mb-4" />,
        title: {
          pt: '1. Baixe o Aplicativo',
          en: '1. Download the App',
          fr: '1. Téléchargez l\'application'
        },
        description: {
          pt: 'Baixe o aplicativo TopPronto na App Store ou Google Play e crie sua conta.',
          en: 'Download the TopPronto app from the App Store or Google Play and create your account.',
          fr: 'Téléchargez l\'application TopPronto sur l\'App Store ou Google Play et créez votre compte.'
        }
      },
      {
        icon: <FaClipboardCheck className="text-3xl text-green-600 mb-4" />,
        title: {
          pt: '2. Envie seus Documentos',
          en: '2. Submit Your Documents',
          fr: '2. Soumettez vos documents'
        },
        description: {
          pt: 'Envie os documentos necessários para verificação. Aprovação em até 48h úteis.',
          en: 'Submit the required documents for verification. Approval within 48 business hours.',
          fr: 'Soumettez les documents nécessaires pour vérification. Approbation sous 48 heures ouvrables.'
        }
      },
      {
        icon: <FaBell className="text-3xl text-yellow-600 mb-4" />,
        title: {
          pt: '3. Receba Pedidos',
          en: '3. Receive Orders',
          fr: '3. Recevez des commandes'
        },
        description: {
          pt: 'Ative sua disponibilidade e comece a receber pedidos na sua região.',
          en: 'Turn on your availability and start receiving orders in your area.',
          fr: 'Activez votre disponibilité et commencez à recevoir des commandes dans votre région.'
        }
      },
      {
        icon: <FaMotorcycle className="text-3xl text-red-600 mb-4" />,
        title: {
          pt: '4. Aceite e Entregue',
          en: '4. Accept and Deliver',
          fr: '4. Acceptez et livrez'
        },
        description: {
          pt: 'Aceite as entregas que desejar e ganhe dinheiro por cada uma delas.',
          en: 'Accept the deliveries you want and earn money for each one.',
          fr: 'Acceptez les livraisons que vous souhaitez et gagnez de l\'argent pour chacune d\'elles.'
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
          {translations.steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {step.title[currentLanguage]}
              </h3>
              <p className="text-gray-600">
                {step.description[currentLanguage]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
