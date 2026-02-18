"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { getCategoryDisplayName } from "@/lib/data/products";
import { useCart } from "@/contexts/CartContext";
import { cn, IMAGE_PLACEHOLDER_BLUR } from "@/lib/utils";
import { useState } from "react";
import LazyGif from "@/components/ui/LazyGif";

interface ProductCardProps {
  product: Product;
  onAddToQuote?: (productId: string) => void;
  index?: number;
  priority?: boolean;
}

const PLACEHOLDER_IMAGE = "/placeholder-product.svg";

export default function ProductCard({ product, onAddToQuote, index = 0, priority = false }: ProductCardProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const availabilityCount = product.availabilityCount ?? 0;
  const isAvailable = product.available && availabilityCount > 0;
  const cartItem = items.find((item: { productId: string; quantity: number }) => item.productId === product.id);
  const inCart = cartItem !== undefined;
  const currentQuantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    if (isAvailable) {
      addItem(product.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1600);
      if (onAddToQuote) {
        onAddToQuote(product.id);
      }
    }
  };

  const handleIncreaseQuantity = () => {
    if (isAvailable && currentQuantity < availabilityCount) {
      updateQuantity(product.id, currentQuantity + 1);
      if (onAddToQuote) {
        onAddToQuote(product.id);
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      updateQuantity(product.id, 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string, numbers only
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue < 0) {
      setInputValue(currentQuantity.toString());
      return;
    }
    const clampedValue = Math.min(Math.max(0, numValue), availabilityCount);
    if (clampedValue === 0) {
      updateQuantity(product.id, 0);
    } else {
      updateQuantity(product.id, clampedValue);
      if (onAddToQuote) {
        onAddToQuote(product.id);
      }
    }
    setInputValue("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const handleQuantityClick = () => {
    setIsEditing(true);
    setInputValue(currentQuantity.toString());
  };

  const displayImage = product.image ?? product.images?.[0];
  const usePlaceholder = !displayImage || imageError;
  const isGif = displayImage?.toLowerCase().endsWith('.gif');

  const imageClass = product.imageClassNames?.[0] ?? product.imageClassName;
  const imageTransform =
    imageClass === "rotate-180"
      ? "rotate(180deg)"
      : imageClass === "rotate-90"
        ? "rotate(90deg)"
        : imageClass === "-rotate-90"
          ? "rotate(-90deg)"
          : undefined;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group relative">
      {/* Popular Tag */}
      {product.popular && (
        <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          Populair
        </div>
      )}

      {/* Image - link to detail page */}
      <Link href={`/catalog/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-200 relative overflow-hidden">
          {usePlaceholder ? (
            <Image
              src={PLACEHOLDER_IMAGE}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : isGif ? (
            <LazyGif
              src={displayImage}
              alt={product.name}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              style={imageTransform ? { transform: imageTransform } : undefined}
              fill
            />
          ) : (
            <Image
              src={displayImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              placeholder="blur"
              blurDataURL={IMAGE_PLACEHOLDER_BLUR}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              style={imageTransform ? { transform: imageTransform } : undefined}
              quality={75}
              priority={priority}
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Category Label */}
        <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
          {getCategoryDisplayName(product.category)}
        </span>

        {/* Product Name - link to detail page */}
        <Link href={`/catalog/product/${product.id}`} className="block hover:text-blue-600 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Availability */}
        <div className="flex items-center justify-end mb-3">
          <span className={`text-sm ${isAvailable ? 'text-gray-600' : 'text-red-600'}`}>
            {isAvailable ? `${availabilityCount} beschikbaar` : '0 beschikbaar'}
          </span>
        </div>

        {/* Add to Cart Button or Quantity Selector */}
        {inCart && !addedToCart ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecreaseQuantity}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors active:scale-95"
              aria-label="Verlaag aantal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            {isEditing ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                className="flex-1 px-3 py-2 rounded-lg border-2 border-green-600 bg-white text-gray-900 font-medium text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
                maxLength={3}
                placeholder="Aantal"
              />
            ) : (
              <button
                onClick={handleQuantityClick}
                className="flex-1 flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all cursor-pointer border-2 border-transparent hover:border-green-400 group relative"
                title="Klik om aantal aan te passen"
              >
                <div className="flex items-center gap-2">
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
                  <span className="font-semibold">{currentQuantity} in winkelwagen</span>
                  <svg
                    className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <span className="text-xs opacity-80 group-hover:opacity-100">Klik om aan te passen</span>
              </button>
            )}
            <button
              onClick={handleIncreaseQuantity}
              disabled={currentQuantity >= availabilityCount}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors active:scale-95 ${
                currentQuantity >= availabilityCount
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Verhoog aantal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`w-full min-h-[3.5rem] flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isAvailable
                ? addedToCart
                  ? 'bg-blue-600 text-white cursor-default active:scale-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {addedToCart ? (
              <span className="relative w-full flex items-center justify-center overflow-hidden py-0.5 min-h-[1.25rem]">
                <svg
                  className="w-5 h-5 flex-shrink-0 add-cart-anim-cart"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
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
                Voeg Toe aan Winkelwagen
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
