"use client";

import { products } from "@/lib/data/products";
import ProductCard from "@/components/catalog/ProductCard";
import Link from "next/link";

export default function FeaturedProducts() {
  // Get top 4 popular products, or top 4 products if not enough popular ones
  const featuredProducts = products
    .filter(p => p.popular)
    .slice(0, 4)
    .concat(
      products
        .filter(p => !p.popular)
        .slice(0, Math.max(0, 4 - products.filter(p => p.popular).length))
    )
    .slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular party rental items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View All Products
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
