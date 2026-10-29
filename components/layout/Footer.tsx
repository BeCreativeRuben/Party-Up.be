import Link from "next/link";
import Image from "next/image";
import { BUSINESS, mapsSearchUrl } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4 relative inline-block bg-transparent">
              <Image
                src="/logo-stacked.svg"
                alt="Party-Up Logo"
                width={140}
                height={130}
                className="h-14 w-auto object-contain drop-shadow-xl"
                style={{ 
                  backgroundColor: 'transparent',
                  imageRendering: 'auto'
                }}
              />
            </div>
            <p className="text-sm">No Nonsense Feestverhuur</p>
            <p className="text-sm mt-2">Power Up BV</p>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4">Links</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/catalog" className="inline-block py-1 hover:text-white transition-colors">
                  Catalogus
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-block py-1 hover:text-white transition-colors">
                  Prijzen
                </Link>
              </li>
              <li>
                <Link href="/faq" className="inline-block py-1 hover:text-white transition-colors">
                  Veelgestelde Vragen
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="inline-block py-1 hover:text-white transition-colors">
                  Beoordelingen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4">Juridisch</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/legal/terms" className="inline-block py-1 hover:text-white transition-colors">
                  Algemene voorwaarden
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="inline-block py-1 hover:text-white transition-colors">
                  Privacybeleid
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4">Contact</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="inline-block py-1 hover:text-white transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a href={`tel:${BUSINESS.phoneTel}`} className="inline-block py-1 hover:text-white transition-colors">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mapsSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 hover:text-white transition-colors text-gray-300"
                >
                  {BUSINESS.street}<br />
                  {BUSINESS.postalCode} {BUSINESS.city}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Power Up BV. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}

