import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Language } from '@/utils/translations';
import { getTranslatedText } from '@/utils/translations';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  backgroundImage: string;
  image: string;
}

interface FeaturesCarouselProps {
  features: Feature[];
  currentLanguage: Language;
}

const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({ features, currentLanguage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout>();
  const slideDuration = 5000; // 5 seconds per slide

  // Créer des paires de cartes avec chevauchement
  const slides = useMemo(() => {
    if (features.length === 0) return [];
    if (features.length <= 2) return [features];
    
    const slides = [];
    for (let i = 0; i < features.length; i++) {
      const current = features[i];
      const next = features[(i + 1) % features.length];
      slides.push([current, next]);
    }
    return slides;
  }, [features]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset the auto-slide timer when manually changing slides
    startAutoSlide();
  };

  const startAutoSlide = useRef(() => {
    // Clear existing interval
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    // Start new interval
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, slideDuration);
  }).current;

  // Start auto-slide on component mount
  useEffect(() => {
    startAutoSlide();
    // Clear interval on component unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [startAutoSlide]);

  return (
    <div className="relative">
      {/* Slides Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            display: 'flex',
            width: '100%',
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {slides.map((group, slideIdx) => (
            <div key={slideIdx} className="w-full flex-shrink-0 px-4" style={{ minWidth: '100%' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {group.map((feature, idx) => (
                  <motion.div
                    key={`${slideIdx}-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: idx * 0.1 },
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ y: -5 }}
                    className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full min-h-[300px] flex flex-col"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={feature.backgroundImage || "/images/placeholder-bg.jpg"}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-8 text-white">
                      <div className="flex-grow">
                        {/* Icon or Image */}
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                          <img
                            src={feature.image}
                            alt={feature.title[currentLanguage]}
                            className="w-8 h-8 md:w-10 md:h-10 object-contain"
                          />
                        </div>

                        {/* Title and Description */}
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                          {feature.title[currentLanguage]}
                        </h3>
                        <p className="text-gray-200 leading-relaxed mb-6">
                          {feature.description[currentLanguage]}
                        </p>
                      </div>

                      {/* Learn More Button */}
                      <div className="mt-auto">
                        <div className="inline-flex items-center text-green-300 font-medium group-hover:text-white transition-colors border-b border-transparent group-hover:border-green-300 pb-1">
                          <span className="mr-2">
                            {getTranslatedText(
                              { pt: "Saiba mais", en: "Learn more", fr: "En savoir plus" },
                              currentLanguage
                            )}
                          </span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      {slides.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-green-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturesCarousel;
