import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, BarChart2, Shield, Zap, Users, Award, TrendingUp } from 'lucide-react';
import { getTranslatedText } from '../../utils/translations';

type Language = 'pt' | 'en' | 'fr';

interface Benefit {
  icon: React.ReactNode;
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
}

interface EnterpriseBenefitsProps {
  currentLanguage: Language;
}

export const EnterpriseBenefits: React.FC<EnterpriseBenefitsProps> = ({ currentLanguage }) => {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: {
        pt: 'Entregas Rápidas',
        en: 'Fast Deliveries',
        fr: 'Livraisons Rapides'
      },
      description: {
        pt: 'Entregas rápidas e confiáveis em toda a cidade com nossa rede de motoristas profissionais.',
        en: 'Fast and reliable deliveries across the city with our network of professional drivers.',
        fr: 'Livraisons rapides et fiables dans toute la ville avec notre réseau de chauffeurs professionnels.'
      }
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: {
        pt: 'Economize Tempo',
        en: 'Save Time',
        fr: 'Gagnez du Temps'
      },
      description: {
        pt: 'Automatize suas entregas e foque no que realmente importa para o seu negócio.',
        en: 'Automate your deliveries and focus on what really matters for your business.',
        fr: 'Automatisez vos livraisons et concentrez-vous sur ce qui compte vraiment pour votre entreprise.'
      }
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: {
        pt: 'Relatórios em Tempo Real',
        en: 'Real-time Analytics',
        fr: 'Analyses en Temps Réel'
      },
      description: {
        pt: 'Acompanhe métricas importantes e tome decisões baseadas em dados.',
        en: 'Track important metrics and make data-driven decisions.',
        fr: 'Suivez les métriques importantes et prenez des décisions basées sur les données.'
      }
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: {
        pt: 'Segurança Garantida',
        en: 'Guaranteed Security',
        fr: 'Sécurité Garantie'
      },
      description: {
        pt: 'Seus pedidos estão seguros com nosso sistema de rastreamento em tempo real.',
        en: 'Your orders are safe with our real-time tracking system.',
        fr: 'Vos commandes sont en sécurité avec notre système de suivi en temps réel.'
      }
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: {
        pt: 'Integração Fácil',
        en: 'Easy Integration',
        fr: 'Intégration Facile'
      },
      description: {
        pt: 'Integração simples com seu sistema existente via nossa API.',
        en: 'Simple integration with your existing system via our API.',
        fr: 'Intégration simple avec votre système existant via notre API.'
      }
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: {
        pt: 'Suporte Dedicado',
        en: 'Dedicated Support',
        fr: 'Support Dédié'
      },
      description: {
        pt: 'Equipe de suporte especializada disponível para ajudar sua empresa.',
        en: 'Dedicated support team available to assist your business.',
        fr: 'Équipe de support dédiée disponible pour aider votre entreprise.'
      }
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: {
        pt: 'Otimização de Recursos',
        en: 'Resource Optimization',
        fr: 'Optimisation des Ressources'
      },
      description: {
        pt: 'Alocação inteligente de recursos para maximizar a eficiência operacional da sua equipe.',
        en: 'Smart resource allocation to maximize your team\'s operational efficiency.',
        fr: 'Allocation intelligente des ressources pour maximiser l\'efficacité opérationnelle de votre équipe.'
      },
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: {
        pt: 'Experiência do Cliente',
        en: 'Customer Experience',
        fr: 'Expérience Client'
      },
      description: {
        pt: 'Interface intuitiva e suporte dedicado para garantir a melhor experiência para seus clientes.',
        en: 'Intuitive interface and dedicated support to ensure the best experience for your customers.',
        fr: 'Interface intuitive et support dédié pour garantir la meilleure expérience à vos clients.'
      },
      color: 'bg-amber-100 text-amber-600'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: {
        pt: 'Vantagens Exclusivas',
        en: 'Exclusive Benefits',
        fr: 'Avantages Exclusifs'
      },
      description: {
        pt: 'Acesso a promoções, descontos e recursos premium disponíveis apenas para clientes empresariais.',
        en: 'Access to promotions, discounts, and premium features available only to business customers.',
        fr: 'Accès à des promotions, réductions et fonctionnalités premium réservées aux clients professionnels.'
      },
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: {
        pt: 'Crescimento Escalável',
        en: 'Scalable Growth',
        fr: 'Croissance Évolutive'
      },
      description: {
        pt: 'Soluções que crescem com o seu negócio, desde pequenas empresas até grandes corporações.',
        en: 'Solutions that grow with your business, from small companies to large corporations.',
        fr: 'Des solutions qui évoluent avec votre entreprise, des petites entreprises aux grandes sociétés.'
      }
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {getTranslatedText({
              pt: 'Por que escolher nossa plataforma?',
              en: 'Why choose our platform?',
              fr: 'Pourquoi choisir notre plateforme ?'
            }, currentLanguage)}
          </h2>
          <div className="mt-4 h-1 w-20 bg-green-600 mx-auto"></div>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            {getTranslatedText({
              pt: 'Tudo o que você precisa para otimizar suas entregas em um só lugar',
              en: 'Everything you need to optimize your deliveries in one place',
              fr: 'Tout ce dont vous avez besoin pour optimiser vos livraisons au même endroit'
            }, currentLanguage)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {getTranslatedText(benefit.title, currentLanguage)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {getTranslatedText(benefit.description, currentLanguage)}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {getTranslatedText({
              pt: 'Junte-se a centenas de empresas que já otimizaram suas operações com nossa solução de entrega inteligente.',
              en: 'Join hundreds of businesses that have already optimized their operations with our smart delivery solution.',
              fr: 'Rejoignez des centaines d\'entreprises qui ont déjà optimisé leurs opérations avec notre solution de livraison intelligente.'
            }, currentLanguage)}
          </h3>
          <p className="text-blue-100 mb-6">
            {getTranslatedText({
              pt: 'Tempo médio de entrega 35% mais rápido que a concorrência, garantindo maior satisfação do cliente.',
              en: 'Average delivery time 35% faster than competitors, ensuring higher customer satisfaction.',
              fr: 'Délai de livraison moyen 35% plus rapide que la concurrence, garantissant une meilleure satisfaction client.'
            }, currentLanguage)}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              {getTranslatedText({
                pt: 'Fale com nossa equipe',
                en: 'Talk to our team',
                fr: 'Parlez à notre équipe'
              }, currentLanguage)}
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              {getTranslatedText({
                pt: 'Ver soluções',
                en: 'View solutions',
                fr: 'Voir les solutions'
              }, currentLanguage)}
            </a>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
              >
                {getTranslatedText({
                  pt: 'Fale com nossa equipe',
                  en: 'Talk to our team',
                  fr: 'Parlez à notre équipe'
                }, currentLanguage)}
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
              >
                {getTranslatedText({
                  pt: 'Ver soluções',
                  en: 'View solutions',
                  fr: 'Voir les solutions'
                }, currentLanguage)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
