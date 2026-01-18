"use client";

import Image from "next/image";
import { Product } from "@/types";
import { getCategoryDisplayName } from "@/lib/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToQuote?: (productId: string) => void;
  index?: number;
}

export default function ProductCard({ product, onAddToQuote, index = 0 }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const availabilityCount = product.availabilityCount ?? 0;
  const isAvailable = product.available && availabilityCount > 0;
  const cartItem = items.find((item: { productId: string; quantity: number }) => item.productId === product.id);
  const inCart = cartItem !== undefined;

  const handleAddToCart = () => {
    if (isAvailable) {
      addItem(product.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
      if (onAddToQuote) {
        onAddToQuote(product.id);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group relative">
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

        {/* Availability */}
        <div className="flex items-center justify-end mb-3">
          <span className={`text-sm ${isAvailable ? 'text-gray-600' : 'text-red-600'}`}>
            {isAvailable ? `${availabilityCount} available` : '0 available'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isAvailable
              ? addedToCart || inCart
                ? 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {addedToCart ? (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Added!
            </>
          ) : inCart ? (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              In Cart ({cartItem.quantity})
            </>
          ) : (
            <>
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
