import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/lib/data/products";
import CategoryGrid from "@/components/catalog/CategoryGrid";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = categories.find((c) => c.id === category);

  if (!categoryData) {
    notFound();
  }

  const products = getProductsByCategory(category as any);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/catalog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors group"
        >
          <svg
            className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Catalog
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{categoryData.name}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{categoryData.description}</p>
        </div>
      </div>

      <CategoryGrid products={products} />
    </div>
  );
}
