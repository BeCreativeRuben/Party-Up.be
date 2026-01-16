"use client";

import Image from "next/image";
import { Product } from "@/types";
import { formatPricePerDay } from "@/lib/utils";
import { getCategoryDisplayName } from "@/lib/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAddToQuote?: (productId: string) => void;
  index?: number;
}

export default function ProductCard({ product, onAddToQuote, index = 0 }: ProductCardProps) {
  const availabilityCount = product.availabilityCount ?? 0;
  const isAvailable = product.available && availabilityCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group relative"
    >
      {/* Popular Tag */}
      {product.popular && (
        <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Popular
        </div>
      )}

      {/* Image */}
      {product.image ? (
        <div className="aspect-square bg-gray-200 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No image</span>
        </div>
      )}

      <div className="p-4">
        {/* Category Label */}
        <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
          {getCategoryDisplayName(product.category)}
        </span>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price and Availability */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-gray-900">
            {formatPricePerDay(product.price)}
          </span>
          <span className={`text-sm ${isAvailable ? 'text-gray-600' : 'text-red-600'}`}>
            {isAvailable ? `${availabilityCount} available` : '0 available'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToQuote && isAvailable && onAddToQuote(product.id)}
          disabled={!isAvailable}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isAvailable
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
