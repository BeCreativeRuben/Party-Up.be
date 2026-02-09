"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const testimonials: Array<{
  name: string;
  event: string;
  rating: number;
  comment: string;
  image?: string;
}> = [
  {
    name: "Sarah M.",
    event: "Verjaardagsfeest",
    rating: 5,
    comment: "Alles was op tijd en in perfecte staat. Heeft onze feestplanning zoveel makkelijker gemaakt!",
  },
  {
    name: "Tom V.",
    event: "Tuinfeest",
    rating: 5,
    comment: "Uitstekende service, eerlijke prijzen en geen verborgen kosten. Zeer aan te raden!",
  },
  {
    name: "Lisa D.",
    event: "Jubileum",
    rating: 5,
    comment: "De tent en tafels waren precies zoals beschreven. Professionele en betrouwbare service.",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="pt-28 pb-20 bg-white relative overflow-hidden scroll-mt-28">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Wat Onze Klanten Zeggen</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Echte beoordelingen van echte klanten</p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
              style={{
                transitionDelay: isInView ? `${index * 100}ms` : "0ms",
              }}
            >
              {testimonial.image && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name}'s ${testimonial.event}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}

              <div className="relative z-10 p-8 flex flex-col flex-grow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed flex-grow">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="text-sm text-gray-600 mt-auto">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-blue-600">{testimonial.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-500 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/reviews"
            className="inline-flex items-center text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors group"
          >
            Read More Reviews
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
