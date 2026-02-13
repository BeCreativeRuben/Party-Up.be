"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const availabilityCount = product.availabilityCount ?? 0;
  const isAvailable = product.available && availabilityCount > 0;
  const cartItem = items.find((item) => item.productId === product.id);
  const inCart = cartItem !== undefined;
  const currentQuantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    if (isAvailable) {
      addItem(product.id);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 800);
    }
  };

  const handleIncreaseQuantity = () => {
    if (isAvailable && currentQuantity < availabilityCount) {
      updateQuantity(product.id, currentQuantity + 1);
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className={`text-sm ${isAvailable ? "text-gray-600" : "text-red-600"}`}>
          {isAvailable ? `${availabilityCount} beschikbaar` : "0 beschikbaar"}
        </span>
      </div>
      {inCart && !addedToCart ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecreaseQuantity}
            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors active:scale-95"
            aria-label="Verlaag aantal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="flex-1 px-4 py-3 rounded-lg border-2 border-green-600 bg-white text-gray-900 font-medium text-center focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              autoFocus
              maxLength={3}
              placeholder="Aantal"
            />
          ) : (
            <button
              onClick={handleQuantityClick}
              className="flex-1 flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all cursor-pointer border-2 border-transparent hover:border-green-400 group relative"
              title="Klik om aantal aan te passen"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">{currentQuantity} in winkelwagen</span>
                <svg
                  className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
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
            className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors active:scale-95 ${
              currentQuantity >= availabilityCount
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label="Verhoog aantal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
            isAvailable
              ? addedToCart
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {addedToCart ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Toegevoegd!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
}
