"use client";

import { useState } from "react";
import { products, categories, getCategoryDisplayName } from "@/lib/data/products";
import { Category } from "@/types";
import CategoryGrid from "@/components/catalog/CategoryGrid";

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Premium Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our extensive selection of high-quality party rentals.
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
          All
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
    </div>
  );
}

