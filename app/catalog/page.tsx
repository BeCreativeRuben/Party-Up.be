import Link from "next/link";
import { categories } from "@/lib/data/products";

export default function CatalogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Catalog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our complete selection of party rental equipment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalog/${category.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 group"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
              {category.name}
            </h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <span className="text-primary-600 font-medium group-hover:underline">
              View Products →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

