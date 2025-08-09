import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: {
    pt: string;
    en: string;
    fr: string;
  };
  answer: {
    pt: string;
    en: string;
    fr: string;
  };
}

interface DriversFAQProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export const DriversFAQ: React.FC<DriversFAQProps> = ({ currentLanguage }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: {
        pt: 'Quanto tempo leva para ser aprovado como motorista?',
        en: 'How long does it take to get approved as a driver?',
        fr: 'Combien de temps faut-il pour être approuvé en tant que chauffeur?'
      },
      answer: {
        pt: 'Normalmente, a aprovação leva até 48 horas úteis após o envio de todos os documentos necessários. Você receberá uma notificação por e-mail assim que sua conta for aprovada.',
        en: 'Approval typically takes up to 48 business hours after submitting all required documents. You will receive an email notification once your account is approved.',
        fr: 'L\'approbation prend généralement jusqu\'à 48 heures ouvrables après la soumission de tous les documents requis. Vous recevrez une notification par e-mail une fois votre compte approuvé.'
      }
    },
    {
      question: {
        pt: 'Posso usar um veículo de terceiros?',
        en: 'Can I use a third-party vehicle?',
        fr: 'Puis-je utiliser un véhicule tiers?'
      },
      answer: {
        pt: 'Sim, desde que você tenha permissão para usar o veículo para fins comerciais e todos os documentos do veículo estejam em dia. O proprietário do veículo precisará fornecer uma autorização por escrito.',
        en: 'Yes, as long as you have permission to use the vehicle for commercial purposes and all vehicle documents are up to date. The vehicle owner will need to provide written authorization.',
        fr: 'Oui, à condition que vous ayez l\'autorisation d\'utiliser le véhicule à des fins commerciales et que tous les documents du véhicule soient à jour. Le propriétaire du véhicule devra fournir une autorisation écrite.'
      }
    },
    {
      question: {
        pt: 'Como e quando recebo meus pagamentos?',
        en: 'How and when do I get paid?',
        fr: 'Comment et quand suis-je payé?'
      },
      answer: {
        pt: 'Os pagamentos são realizados semanalmente, diretamente na conta bancária cadastrada. O período de pagamento é de segunda a domingo, com o crédito realizado na quarta-feira da semana seguinte.',
        en: 'Payments are made weekly, directly to your registered bank account. The payment period runs from Monday to Sunday, with the credit processed on the following Wednesday.',
        fr: 'Les paiements sont effectués chaque semaine, directement sur votre compte bancaire enregistré. La période de paiement va du lundi au dimanche, avec le crédit effectué le mercredi suivant.'
      }
    },
    {
      question: {
        pt: 'Posso escolher quais entregas fazer?',
        en: 'Can I choose which deliveries to make?',
        fr: 'Puis-je choisir les livraisons à effectuer?'
      },
      answer: {
        pt: 'Sim, você tem total liberdade para aceitar ou recusar as corridas que aparecerem no seu aplicativo. Você pode escolher as que melhor se adequam à sua localização e disponibilidade.',
        en: 'Yes, you have complete freedom to accept or decline the rides that appear in your app. You can choose the ones that best suit your location and availability.',
        fr: 'Oui, vous avez toute liberté d\'accepter ou de refuser les courses qui apparaissent dans votre application. Vous pouvez choisir celles qui correspondent le mieux à votre localisation et à votre disponibilité.'
      }
    },
    {
      question: {
        pt: 'Há algum custo para se tornar um motorista?',
        en: 'Is there any cost to become a driver?',
        fr: 'Y a-t-il des frais pour devenir chauffeur?'
      },
      answer: {
        pt: 'Não há custo para se cadastrar e se tornar um motorista parceiro. A TopPronto não cobra taxas de inscrição ou mensalidades. Você fica com 100% do valor das suas corridas, sem taxas escondidas.',
        en: 'There is no cost to register and become a partner driver. TopPronto does not charge sign-up fees or monthly fees. You keep 100% of your ride earnings, with no hidden fees.',
        fr: 'Il n\'y a aucun frais pour s\'inscrire et devenir chauffeur partenaire. TopPronto ne facture pas de frais d\'inscription ni de frais mensuels. Vous gardez 100% de vos gains de course, sans frais cachés.'
      }
    },
    {
      question: {
        pt: 'Preciso pagar pelo combustível?',
        en: 'Do I need to pay for fuel?',
        fr: 'Dois-je payer le carburant?'
      },
      answer: {
        pt: 'Sim, como motorista independente, você é responsável pelos custos operacionais do seu veículo, incluindo combustível, manutenção e seguro. No entanto, você pode deduzir esses custos nos seus impostos como despesas relacionadas ao trabalho.',
        en: 'Yes, as an independent driver, you are responsible for your vehicle\'s operating costs, including fuel, maintenance, and insurance. However, you can deduct these costs on your taxes as work-related expenses.',
        fr: 'Oui, en tant que chauffeur indépendant, vous êtes responsable des coûts d\'exploitation de votre véhicule, y compris le carburant, l\'entretien et l\'assurance. Cependant, vous pouvez déduire ces coûts de vos impôts en tant que dépenses professionnelles.'
      }
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {currentLanguage === 'pt' ? 'Perguntas Frequentes' : 
           currentLanguage === 'en' ? 'Frequently Asked Questions' :
           'Questions Fréquemment Posées'}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="font-medium text-lg">
                  {item.question[currentLanguage]}
                </span>
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              
              <div 
                id={`faq-${index}`}
                className={`px-6 pb-4 bg-white ${openIndex === index ? 'block' : 'hidden'}`}
                aria-hidden={openIndex !== index}
              >
                <p className="text-gray-600">
                  {item.answer[currentLanguage]}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">
            {currentLanguage === 'pt' ? 'Ainda tem dúvidas?' :
             currentLanguage === 'en' ? 'Still have questions?' :
             'Vous avez encore des questions?'}
          </h3>
          <p className="mb-6 text-gray-600">
            {currentLanguage === 'pt' ? 'Nossa equipe de suporte está pronta para ajudar.' :
             currentLanguage === 'en' ? 'Our support team is ready to help.' :
             'Notre équipe de support est prête à vous aider.'}
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            {currentLanguage === 'pt' ? 'Fale Conosco' :
             currentLanguage === 'en' ? 'Contact Us' :
             'Contactez-nous'}
          </button>
        </div>
      </div>
    </section>
  );
};
