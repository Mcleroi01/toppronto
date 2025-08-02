import React from "react";
import { motion } from "framer-motion";
import { Shield, Heart, Users, Truck, Building2 } from "lucide-react";

type ImageUrls = {
  [key: string]: string;
};

const imageMap: ImageUrls = {
  "stock-management": "stock-management.jpg",
  "public-relations": "public-relations.jpg",
  "various-deliveries": "various-deliveries.jpg",
  "biological-material-transport": "biological-material-transport.jpg",
  "pharmaceutical-distribution": "pharmaceutical-distribution.jpg",
  "business-manager": "business-manager.jpg",
};

interface ServiceProps {
  title: string;
  description: string;
  importance: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image: string;
  index: number;
}

export default function ServiceSection({
  title,
  description,
  importance,
  icon: Icon,
  image,
  index,
}: ServiceProps) {
  const imageUrls: ImageUrls = {
    "stock-management":
      "https://cdn.prod.website-files.com/6193d546dfb64eec20323f4a/66fee6767ff2debfc1a93c45_Mouvement-de-stocks.png",
    "public-relations":
      "https://portalviana.sieg.co.ao/sites/default/files/2023-07/news-500x280-delivery_0.png",
    "various-deliveries":
      "https://mercadoeconsumo.com.br/wp-content/smush-webp/2020/10/Delivery-Center-1024x678.jpeg.webp",
    "biological-material-transport":
      "https://www.melissas.com/cdn/shop/products/image-of-organic-mixed-fruit-only-box-southern-california-delivery-fruit-28569055363116.jpg?v=1626304328",
    "pharmaceutical-distribution":
      "https://static.wixstatic.com/media/0204e8_8392b5e7c77d4c06afdc75090c05f035~mv2.jpg/v1/fill/w_560,h_290,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0204e8_8392b5e7c77d4c06afdc75090c05f035~mv2.jpg",
    "business-manager":
      "https://media.istockphoto.com/id/1474043686/photo/business-manager-talking-to-a-group-of-employees-at-a-distribution-warehouse.jpg?s=612x612&w=0&k=20&c=i-sXngKASrpPfoOA0-NdebfCHbFlLZ_OsDyyQspvNWw=",
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative mb-16 rounded-3xl overflow-hidden "
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image section */}
        <div className="h-full">
          <img
            src={imageUrls[image] || "default.jpg"}
            alt={title}
            className="w-full h-full object-cover"
            style={{ aspectRatio: "1/1" }}
          />
        </div>

        {/* Content section */}
        <div className="p-6 flex flex-col space-y-6">
          {/* Title with icon */}
          <div className="flex items-center gap-3">
            <Icon className="w-8 h-8 text-green-600 shrink-0" />
            <h2 className="text-2xl font-bold text-green-800">{title}</h2>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

          {/* Importance points */}
          <div className="space-y-4">
            {importance.map((point, pointIndex) => (
              <div key={pointIndex} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
                <span className="text-base text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
