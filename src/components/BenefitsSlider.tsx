import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Benefit {
  title: {
    pt: string;
    en: string;
    fr: string;
  };
  description: {
    pt: string;
    en: string;
    fr: string;
  };
  icon: string;
}

interface BenefitsSliderProps {
  currentLanguage: 'pt' | 'en' | 'fr';
  benefits: Benefit[];
}

export const BenefitsSlider: React.FC<BenefitsSliderProps> = ({ currentLanguage, benefits }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  // Update number of visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= benefits.length - visibleCards ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? benefits.length - visibleCards : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  // Calculate which cards to show
  const visibleBenefits = benefits.slice(currentIndex, currentIndex + visibleCards);
  
  // If we're at the end and don't have enough cards to fill the view, take from the beginning
  if (visibleBenefits.length < visibleCards) {
    const remaining = visibleCards - visibleBenefits.length;
    visibleBenefits.push(...benefits.slice(0, remaining));
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out">
          {visibleBenefits.map((benefit, index) => (
            <motion.div
              key={`${currentIndex + index}-${benefit.title.en}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
              style={{
                width: `${100 / Math.min(visibleCards, benefits.length)}%`,
                minWidth: '300px'
              }}
            >
              <div 
                className="h-full bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100 hover:bg-green-50/30"
                onMouseEnter={() => setIsAutoPlay(false)}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors duration-300">
                    <div className="text-2xl">{benefit.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 group-hover:text-green-800 transition-colors duration-300">
                  {benefit.title[currentLanguage]}
                </h3>
                <p className="text-gray-600 text-center">
                  {benefit.description[currentLanguage]}
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="w-8 h-1 bg-green-100 group-hover:bg-green-200 rounded-full transition-colors duration-300"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => {
          setIsAutoPlay(false);
          prevSlide();
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-green-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all -ml-4"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => {
          setIsAutoPlay(false);
          nextSlide();
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-green-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all -mr-4"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.max(1, benefits.length - visibleCards + 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-green-600 w-8' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
