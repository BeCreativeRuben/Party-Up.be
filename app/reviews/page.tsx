"use client";

import { Testimonial } from "@/types";
import Image from "next/image";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    event: "Birthday Party",
    rating: 5,
    comment:
      "Everything was delivered on time and in perfect condition. Made our party planning so much easier! The tent was exactly what we needed and the setup instructions were clear.",
  },
  {
    id: "2",
    name: "Tom V.",
    event: "Garden Party",
    rating: 5,
    comment:
      "Great service, fair prices, and no hidden costs. Highly recommend! The sound system worked perfectly and the delivery was prompt.",
  },
  {
    id: "3",
    name: "Lisa D.",
    event: "Anniversary",
    rating: 5,
    comment:
      "The tent and tables were exactly as described. Professional and reliable service. Will definitely use again for future events.",
  },
  {
    id: "4",
    name: "Marc B.",
    event: "Company Gathering",
    rating: 5,
    comment:
      "Perfect for our small company event. The package deal made it easy and affordable. Everything arrived clean and ready to use.",
  },
  {
    id: "5",
    name: "Emma K.",
    event: "Baby Shower",
    rating: 5,
    comment:
      "Loved the decoration options! The centerpieces were beautiful and the service was excellent. Very happy with our choice.",
  },
  {
    id: "6",
    name: "Johan L.",
    event: "Communion",
    rating: 5,
    comment:
      "Reliable and professional. The tables and chairs were in great condition. The whole process was smooth from booking to pickup.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Customer Reviews</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real reviews from real customers. We only publish authentic testimonials.
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
          Share Your Experience
        </h2>
        <p className="text-gray-700 mb-6">
          Had a great experience with Party-Up.be? We&apos;d love to hear from you!
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Leave a Review
        </a>
      </div>
    </div>
  );
}

