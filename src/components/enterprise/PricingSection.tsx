import React, { useState } from 'react';

type Language = 'pt' | 'en' | 'fr';

interface PricingSectionProps {
  currentLanguage: Language;
}

const PricingSection: React.FC<PricingSectionProps> = ({ currentLanguage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This will trigger the browser's download behavior
    window.open('/pdf/tarifas-topronto.pdf', '_blank');
  };
  return (
    <>
      <section className="relative bg-gradient-to-r from-green-800 to-green-700 text-white overflow-hidden py-16">
      {/* Decorative background effect */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background.png')",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentLanguage === "pt" && "Nossos Preços e Tarifas"}
            {currentLanguage === "en" && "Our Prices and Rates"}
            {currentLanguage === "fr" && "Nos Tarifs et Prix"}
          </h2>
          <div className="w-20 h-1.5 bg-yellow-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            {currentLanguage === "pt" &&
              "Consulte nossa tabela de preços completa para todos os nossos serviços de entrega e logística."}
            {currentLanguage === "en" &&
              "Check out our complete price list for all our delivery and logistics services."}
            {currentLanguage === "fr" &&
              "Consultez notre liste de prix complète pour tous nos services de livraison et logistique."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {currentLanguage === "pt" && "Tabela de Preços"}
                {currentLanguage === "en" && "Price List"}
                {currentLanguage === "fr" && "Liste des Prix"}
              </h3>
              <p className="mb-6 text-green-100">
                {currentLanguage === "pt" &&
                  "Faça o download da nossa tabela de preços completa em formato PDF para visualizar todas as nossas tarifas e opções de serviço."}
                {currentLanguage === "en" &&
                  "Download our complete price list in PDF format to view all our rates and service options."}
                {currentLanguage === "fr" &&
                  "Téléchargez notre liste de prix complète au format PDF pour voir tous nos tarifs et options de service."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-900 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {currentLanguage === "pt" && "Visualizar PDF"}
                  {currentLanguage === "en" && "View PDF"}
                  {currentLanguage === "fr" && "Voir le PDF"}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {currentLanguage === "pt" && "Baixar PDF"}
                  {currentLanguage === "en" && "Download PDF"}
                  {currentLanguage === "fr" && "Télécharger le PDF"}
                </button>
              </div>
              <p className="mt-3 text-sm text-green-200">
                {currentLanguage === "pt" &&
                  "Formato PDF - Atualizado em Agosto 2025"}
                {currentLanguage === "en" &&
                  "PDF Format - Updated August 2025"}
                {currentLanguage === "fr" &&
                  "Format PDF - Mis à jour en Août 2025"}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className="absolute bottom-4 text-center px-2">
                  <p className="text-sm font-medium">
                    {currentLanguage === "pt" && "Tabela de Preços"}
                    {currentLanguage === "en" && "Price List"}
                    {currentLanguage === "fr" && "Liste des Prix"}
                  </p>
                  <p className="text-xs opacity-75">PDF • 346Ko</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* PDF Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="fixed inset-0 bg-black/50"
              onClick={closeModal}
            />
            <div className="relative bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col z-10">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentLanguage === "pt" && "Tabela de Preços"}
                  {currentLanguage === "en" && "Price List"}
                  {currentLanguage === "fr" && "Liste des Prix"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-500"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <iframe
                  src="/pdf/tarifas-topronto.pdf#toolbar=0&view=FitH"
                  className="w-full h-[70vh] border rounded-lg"
                  title="PDF Preview"
                />
              </div>
              <div className="p-4 border-t flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {currentLanguage === "pt" && "Fechar"}
                  {currentLanguage === "en" && "Close"}
                  {currentLanguage === "fr" && "Fermer"}
                </button>
                <button
                  onClick={(e) => {
                    closeModal();
                    handleDownload(e);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  {currentLanguage === "pt" && "Baixar PDF"}
                  {currentLanguage === "en" && "Download PDF"}
                  {currentLanguage === "fr" && "Télécharger le PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingSection;
