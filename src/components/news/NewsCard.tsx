import React from 'react';
import { NewsItem } from '../../services/newsService';
import { motion } from 'framer-motion';

type NewsCardProps = {
  newsItem: NewsItem;
  currentLanguage: string;
  onClick: () => void;
};

export const NewsCard: React.FC<NewsCardProps> = ({ newsItem, currentLanguage, onClick }) => {
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
    <motion.div 
      className="h-full"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div 
        className="h-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={onClick}
      >
        <div className="h-48 overflow-hidden">
          <img 
            src={newsItem.imageUrl} 
            alt={newsItem.title[currentLanguage as 'pt' | 'en' | 'fr']}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(newsItem.category)}`}>
              {getCategoryLabel(newsItem.category)}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(newsItem.date).toLocaleDateString(currentLanguage, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {newsItem.title[currentLanguage as 'pt' | 'en' | 'fr']}
          </h3>
          
          <p className="text-gray-600 flex-grow line-clamp-3">
            {newsItem.excerpt[currentLanguage as 'pt' | 'en' | 'fr']}
          </p>
          
          <button 
            className="mt-4 text-green-600 font-medium hover:text-green-700 text-left"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {currentLanguage === 'pt' && 'Ler mais →'}
            {currentLanguage === 'en' && 'Read more →'}
            {currentLanguage === 'fr' && 'Lire la suite →'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
