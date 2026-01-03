"use client";

import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAddToQuote?: (productId: string) => void;
  index?: number;
}

export default function ProductCard({ product, onAddToQuote, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {product.image ? (
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 animate-pulse" />
          <span className="text-gray-400 text-sm relative z-10">No image</span>
        </div>
      )}
      <div className="p-6 relative">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors relative z-10">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm relative z-10">{product.description}</p>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          {product.available ? (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold animate-pulse-glow">
              Available
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
              Unavailable
            </span>
          )}
        </div>
        {onAddToQuote && product.available && (
          <motion.button
            onClick={() => onAddToQuote(product.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden group/btn"
          >
            <span className="relative z-10">Add to Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
