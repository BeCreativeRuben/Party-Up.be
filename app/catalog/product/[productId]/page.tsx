import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getProductById, getCategoryDisplayName, products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import ProductDetailActions from "@/components/catalog/ProductDetailActions";

const ProductImageGallery = dynamic(() => import("@/components/catalog/ProductImageGallery"), {
  loading: () => (
    <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
  ),
});

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  const images = product.images ?? (product.image ? [product.image] : []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/catalog"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors group"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div className="lg:sticky lg:top-28">
          {images.length > 0 ? (
            <ProductImageGallery images={images} productName={product.name} imageClassName={product.imageClassName} />
          ) : (
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {getCategoryDisplayName(product.category)}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-4">{product.name}</h1>
          <p className="text-xl font-semibold text-blue-600 mb-6">{formatPrice(product.price)}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>

          <ProductDetailActions product={product} />
        </div>
      </div>
    </div>
  );
}
