import { categories, products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function PricingPage() {
  const packages = products.filter((p) => p.category === "packages");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transparent pricing with no hidden costs. All prices are per rental period.
        </p>
      </div>

      {/* Packages */}
      {packages.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-md p-8 border-2 border-primary-200"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-primary-600 mb-6">
                  {formatPrice(pkg.price)}
                </div>
                <Link
                  href="/booking"
                  className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual Items by Category */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Individual Items</h2>
        {categories
          .filter((cat) => cat.id !== "packages")
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
                          Description
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
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
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-primary-600">
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rental Terms</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Standard rental period: Friday evening pickup, Sunday evening return</li>
          <li>• All prices are per rental period unless otherwise specified</li>
          <li>• A security deposit may be required for certain items</li>
          <li>• Delivery and pickup available (additional charges may apply)</li>
          <li>• Equipment must be returned clean and in good condition</li>
        </ul>
        <p className="mt-6 text-sm text-gray-600">
          For detailed terms and conditions, please see our{" "}
          <Link href="/legal/terms" className="text-primary-600 hover:underline">
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

