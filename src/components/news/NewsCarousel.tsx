import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsItem } from '../../services/newsService';
import { NewsCard } from './NewsCard';
import { NewsModal } from './NewsModal';

type NewsCarouselProps = {
  newsItems: NewsItem[];
  currentLanguage: string;
};

export const NewsCarousel: React.FC<NewsCarouselProps> = ({ newsItems, currentLanguage }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Nombre d'éléments à afficher en fonction de la largeur de l'écran
  const itemsPerPage = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width < 640) return 1;    // Mobile
    if (width < 1024) return 2;    // Tablette
    return 3;                     // Desktop
  };

  const [itemsCount, setItemsCount] = useState(itemsPerPage());

  // Mise à jour du nombre d'éléments lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setItemsCount(itemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du défilement automatique
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [page, isAutoPlay, itemsCount]);

  const paginate = (newDirection: number) => {
    const maxPage = Math.ceil(newsItems.length / itemsCount) - 1;
    const newPage = (page + newDirection + (maxPage + 1)) % (maxPage + 1);
    setPage([newPage, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Gestion de l'ouverture de la modal
  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
    setIsAutoPlay(false);
  };

  // Gestion de la fermeture de la modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    setIsAutoPlay(true);
  };

  // Calcul des éléments à afficher
  const startIndex = page * itemsCount % newsItems.length;
  const endIndex = Math.min(startIndex + itemsCount, newsItems.length);
  const visibleNews = [
    ...newsItems.slice(startIndex, endIndex),
    ...(endIndex >= newsItems.length ? newsItems.slice(0, itemsCount - (newsItems.length - startIndex)) : [])
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={() => setIsAutoPlay(false)}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${itemsCount}, minmax(0, 1fr))`,
              display: 'grid'
            }}
          >
            {visibleNews.map((item) => (
              <div key={item.id} className="px-2">
                <NewsCard 
                  newsItem={item} 
                  currentLanguage={currentLanguage}
                  onClick={() => handleNewsClick(item)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Contrôles de navigation */}
        {itemsCount < newsItems.length && (
          <>
            <button 
              onClick={() => {
                setIsAutoPlay(false);
                paginate(-1);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg text-green-700 hover:bg-green-50 flex items-center justify-center transition-all"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={() => {
                setIsAutoPlay(false);
                paginate(1);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg text-green-700 hover:bg-green-50 flex items-center justify-center transition-all"
              aria-label="Suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Indicateurs de pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(newsItems.length / itemsCount) }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlay(false);
              setPage([index, index > page ? 1 : -1]);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              Math.floor(page) % Math.ceil(newsItems.length / itemsCount) === index 
                ? 'bg-green-600 w-8' 
                : 'bg-gray-300'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Modal de détail des nouvelles */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newsItem={selectedNews}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};
