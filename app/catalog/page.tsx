"use client";

import { useState } from "react";
import Link from "next/link";
import { products, categories, getCategoryDisplayName } from "@/lib/data/products";
import { Category } from "@/types";
import CategoryGrid from "@/components/catalog/CategoryGrid";
import { useCart } from "@/contexts/CartContext";

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Onze Premium Collectie</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Bekijk ons uitgebreide aanbod van hoogwaardig feestmateriaal.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-5 py-2 rounded-full font-medium transition-all ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Alles
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.displayName}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <CategoryGrid products={filteredProducts} />

      {/* CTA Section */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Klaar om je feest te organiseren?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {itemCount > 0
              ? `Je hebt ${itemCount} item${itemCount !== 1 ? "s" : ""} in je winkelwagen. Ga verder naar de checkout om je reservering te voltooien.`
              : "Voeg items toe aan je winkelwagen en ga verder naar de checkout om je reservering te voltooien."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {itemCount > 0 ? (
              <>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-300"
                >
                  <svg
                    className="w-5 h-5"
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
                  Naar Winkelwagen
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  Direct Reserveren
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </>
            ) : (
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Start Reservering
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

