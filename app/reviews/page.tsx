"use client";

import { Testimonial } from "@/types";
import Image from "next/image";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    event: "Verjaardagsfeest",
    rating: 5,
    comment:
      "Alles was op tijd en in perfecte staat. Heeft onze feestplanning zoveel makkelijker gemaakt! De tent was precies wat we nodig hadden en de opzetinstructies waren duidelijk.",
  },
  {
    id: "2",
    name: "Tom V.",
    event: "Tuinfeest",
    rating: 5,
    comment:
      "Uitstekende service, eerlijke prijzen en geen verborgen kosten. Zeer aan te raden! Het geluidssysteem werkte perfect.",
  },
  {
    id: "3",
    name: "Lisa D.",
    event: "Jubileum",
    rating: 5,
    comment:
      "De tent en tafels waren precies zoals beschreven. Professionele en betrouwbare service. Zullen zeker weer gebruiken voor toekomstige evenementen.",
  },
  {
    id: "4",
    name: "Marc B.",
    event: "Bedrijfsbijeenkomst",
    rating: 5,
    comment:
      "Perfect voor ons kleine bedrijfsevenement. Het pakket maakte het makkelijk en betaalbaar. Alles was schoon en klaar voor gebruik.",
  },
  {
    id: "5",
    name: "Emma K.",
    event: "Baby Shower",
    rating: 5,
    comment:
      "Geweldige decoratie-opties! De tafelstukken waren prachtig en de service was uitstekend. Zeer tevreden met onze keuze.",
  },
  {
    id: "6",
    name: "Johan L.",
    event: "Communie",
    rating: 5,
    comment:
      "Betrouwbaar en professioneel. De tafels en stoelen waren in uitstekende staat. Het hele proces verliep soepel van boeking tot ophalen.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Klantbeoordelingen</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Echte beoordelingen van echte klanten. We publiceren alleen authentieke testimonials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image section - only renders if image exists */}
            {testimonial.image && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s ${testimonial.event}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            {/* Content section - flex-grow ensures consistent spacing */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic flex-grow">&ldquo;{testimonial.comment}&rdquo;</p>
              <div className="text-sm text-gray-600 mt-auto">
                <p className="font-semibold">{testimonial.name}</p>
                <p>{testimonial.event}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Deel Jouw Ervaring
        </h2>
        <p className="text-gray-700 mb-6">
          Een goede ervaring gehad met Party-Up.be? We horen graag van je!
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Laat een Beoordeling Achter
        </a>
      </div>
    </div>
  );
}

