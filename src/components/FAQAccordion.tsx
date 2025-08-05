import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: {
    [key: string]: {
      question: string;
      answer: string;
    }[];
  };
  currentLanguage: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, currentLanguage }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const currentFAQs = faqs[currentLanguage as keyof typeof faqs] || [];

  return (
    <div className="mb-16 sm:mx-4 lg:mx-8 xl:mx-16 2xl:mx-32 mt-16 px-4">
      <h2 className="text-3xl font-bold  mb-6">
        {currentLanguage === "pt" && "Perguntas Frequentes"}
        {currentLanguage === "en" && "Frequently Asked Questions"}
        {currentLanguage === "fr" && "Questions Fréquemment Posées"}
      </h2>
      <div className="w-20 h-1.5 bg-green-600 rounded-full mb-6 "></div>

      <div className="space-y-4">
        {currentFAQs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
