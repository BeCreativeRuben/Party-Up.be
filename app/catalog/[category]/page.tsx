import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/lib/data/products";
import { categoryLabel, categoryPageMetadata, categorySummary } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import CategoryGrid from "@/components/catalog/CategoryGrid";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = categories.find((item) => item.id === category);
  if (!categoryData) {
    return { title: "Categorie niet gevonden", robots: { index: false, follow: false } };
  }
  return categoryPageMetadata(categoryData.id);
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

  const categoryId = categoryData.id;
  const products = getProductsByCategory(categoryId);
  const label = categoryLabel(categoryId);

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
          Terug naar Catalogus
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{label} huren</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{categorySummary(categoryId)}</p>
        </div>
        {products.length > 0 && (
          <ul className="max-w-2xl mx-auto mb-10 divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
            {products.map((product) => (
              <li key={product.id} className="flex items-baseline justify-between gap-4 px-4 py-3 text-left">
                <Link
                  href={`/catalog/product/${product.id}`}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  {product.name}
                </Link>
                <span className="shrink-0 text-sm text-gray-700">{formatPrice(product.price)} excl. BTW</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CategoryGrid products={products} />
    </div>
  );
}
