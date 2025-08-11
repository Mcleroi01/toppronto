import React from 'react';
import { NewsItem } from '../../services/newsService';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type NewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  newsItem: NewsItem | null;
  currentLanguage: string;
};

export const NewsModal: React.FC<NewsModalProps> = ({ 
  isOpen, 
  onClose, 
  newsItem,
  currentLanguage 
}) => {
  if (!isOpen || !newsItem) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'company':
        return 'bg-blue-100 text-blue-800';
      case 'logistics':
        return 'bg-green-100 text-green-800';
      case 'announcement':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      company: { pt: 'Empresa', en: 'Company', fr: 'Entreprise' },
      logistics: { pt: 'Logística', en: 'Logistics', fr: 'Logistique' },
      announcement: { pt: 'Anúncio', en: 'Announcement', fr: 'Annonce' },
    };
    return labels[category as keyof typeof labels][currentLanguage as 'pt' | 'en' | 'fr'] || category;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête de la modal */}
              <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(newsItem.category)}`}>
                    {getCategoryLabel(newsItem.category)}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {newsItem.title[currentLanguage as 'pt' | 'en' | 'fr']}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 p-2 -mr-2"
                  aria-label="Fermer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contenu de la modal */}
              <div className="p-6">
                <div className="mb-6 rounded-xl overflow-hidden h-64 bg-gray-100">
                  <img 
                    src={newsItem.imageUrl} 
                    alt={newsItem.title[currentLanguage as 'pt' | 'en' | 'fr']}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="prose max-w-none">
                  <div className="text-sm text-gray-500 mb-4">
                    {new Date(newsItem.date).toLocaleDateString(currentLanguage, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {newsItem.content[currentLanguage as 'pt' | 'en' | 'fr']
                      .split('\n')
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              </div>

              {/* Pied de page de la modal */}
              <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {currentLanguage === 'pt' && 'Fechar'}
                  {currentLanguage === 'en' && 'Close'}
                  {currentLanguage === 'fr' && 'Fermer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
