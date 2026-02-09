import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pagina Niet Gevonden
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we konden de pagina die je zoekt niet vinden. De pagina is mogelijk verplaatst of bestaat niet meer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
            >
              Naar Home
            </Link>
            <Link
              href="/catalog"
              className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Bekijk Catalogus
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Populaire pagina&apos;s:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/catalog" className="text-blue-600 hover:text-blue-700">
                Catalogus
              </Link>
              <Link href="/pricing" className="text-blue-600 hover:text-blue-700">
                Prijzen
              </Link>
              <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                Contact
              </Link>
              <Link href="/faq" className="text-blue-600 hover:text-blue-700">
                Veelgestelde Vragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
