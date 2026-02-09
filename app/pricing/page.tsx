import { categories, products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Prijzen</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transparante prijzen zonder verborgen kosten. Alle prijzen zijn per huurperiode.
        </p>
      </div>

      {/* Individual Items by Category */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Individuele Items</h2>
        {categories
          .map((category) => {
            const categoryProducts = products.filter((p) => p.category === category.id);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{category.name}</h3>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Beschrijving
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prijs
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categoryProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600">{product.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-blue-600">
                            {formatPrice(product.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
      </div>

      {/* Rental Terms */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Huurvoorwaarden</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Standaard huurperiode: ophalen vrijdagavond, terugbrengen zondagavond</li>
          <li>• Alle prijzen zijn per huurperiode tenzij anders vermeld</li>
          <li>• Voor bepaalde items kan een waarborgsom vereist zijn</li>
          <li>• <strong>Klant ophaalt en brengt terug</strong> - We bieden geen bezorgservice aan</li>
          <li>• Materiaal moet schoon en in goede staat worden teruggebracht</li>
        </ul>
        <p className="mt-6 text-sm text-gray-600">
          Voor gedetailleerde voorwaarden, zie onze{" "}
          <Link href="/legal/terms" className="text-blue-600 hover:underline">
            Algemene Voorwaarden
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

