import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getProductById, getCategoryDisplayName, products } from "@/lib/data/products";
import { formatPrice, calculateVAT, calculatePriceInclVAT } from "@/lib/utils";
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
            <ProductImageGallery images={images} productName={product.name} imageClassName={product.imageClassName} imageClassNames={product.imageClassNames} />
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
          <div className="mb-6">
            <p className="text-xl font-semibold text-blue-600">{formatPrice(product.price)}</p>
            <p className="text-xs text-gray-500 mt-1">Alle prijzen zijn excl. BTW</p>
            <p className="text-sm text-gray-500 mt-1">
              BTW (21%): {formatPrice(calculateVAT(product.price))} | 
              Totaal incl. BTW: {formatPrice(calculatePriceInclVAT(product.price))}
            </p>
            <p className="text-sm text-gray-500 mt-1">per periode (3 dagen - vrijdag t/m zondag)</p>
          </div>
          <p className="text-gray-600 mb-8 whitespace-pre-line">{product.description}</p>

          {/* Specifications - Ofyr */}
          {product.id === "ofyr" && (
            <div className="mb-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Specificaties</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    <li><strong>Materiaal:</strong> Cortenstaal</li>
                    <li><strong>Bodemdiameter:</strong> 50 cm</li>
                    <li><strong>Afwerking:</strong> Poeder gecoat staal</li>
                    <li><strong>Totale hoogte:</strong> 100 cm</li>
                    <li><strong>Bakplaat:</strong> Zwart staal</li>
                    <li><strong>Gewicht:</strong> 101 kg</li>
                    <li><strong>Kookoppervlak:</strong> 100 cm</li>
                    <li><strong>Brandstof:</strong> Hout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Specifications - Only show for WC-wagen */}
          {product.id === "wc-wagen" && (
            <div className="mb-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Specificaties</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Afmetingen</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><strong>Lengte:</strong> 240 cm</li>
                      <li><strong>Lengte incl. dissel:</strong> 400 cm</li>
                      <li><strong>Breedte:</strong> 230 cm</li>
                      <li><strong>Hoogte:</strong> 275 cm</li>
                      <li><strong>Hoogte binnen:</strong> 212 cm</li>
                      <li><strong>Eigen gewicht:</strong> 750 kg</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Toiletten</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><strong>Damestoilet:</strong> 1 afgesloten toiletruimte</li>
                      <li><strong>Herentoilet:</strong> 1 afgesloten toiletruimte + urinoir</li>
                      <li><strong>Aantal assen:</strong> 1</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Stroomvoorziening</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><strong>Stroom:</strong> 1x CEE-230V / 16A</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Standaard geleverd met</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>1x CEE-230V / 16A verloopstekker</li>
                      <li>1x 20 meter CEE-230V / 16A verlengsnoer</li>
                      <li>1x 20 meter aanvoerslang</li>
                      <li>2x 20 meter afvoerslang</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Voorzieningen</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                    <li>• Ieder toilet heeft een eigen vermaalpomp (Grundfos)</li>
                    <li>• Elektrische handdrogers</li>
                    <li>• LED strips in het plafond</li>
                    <li>• Hangende toiletten met normale doorspoelfunctie</li>
                    <li>• Stabiele steunpoten</li>
                    <li>• Porseleinen opbouw wasbak en spiegel aan beide zijden</li>
                    <li>• Voorzien van verwarming (ook in technische ruimte)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    De toiletwagens van Party-Up zijn duurzaam, makkelijk te plaatsen en schoon te houden, maar ook comfortabel in gebruik. 
                    Standaard is iedere toiletruimte voorzien van eigen vermaalpomp, hangtoilet, wasbak, spiegel, verwarming, handdroger en een eigen technische ruimte.
                  </p>
                </div>
              </div>
            </div>
          )}

          <ProductDetailActions product={product} />
        </div>
      </div>
    </div>
  );
}
