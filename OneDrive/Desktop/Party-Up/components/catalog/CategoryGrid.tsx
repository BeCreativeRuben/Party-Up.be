"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface CategoryGridProps {
  products: Product[];
  onAddToQuote?: (productId: string) => void;
}

export default function CategoryGrid({ products, onAddToQuote }: CategoryGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToQuote={onAddToQuote}
          index={index}
        />
      ))}
    </div>
  );
}
