"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah M.",
    event: "Birthday Party",
    rating: 5,
    comment: "Everything was delivered on time and in perfect condition. Made our party planning so much easier!",
  },
  {
    name: "Tom V.",
    event: "Garden Party",
    rating: 5,
    comment: "Great service, fair prices, and no hidden costs. Highly recommend!",
  },
  {
    name: "Lisa D.",
    event: "Anniversary",
    rating: 5,
    comment: "The tent and tables were exactly as described. Professional and reliable service.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-b from-white via-primary-50/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="text-gradient">What Our Customers Say</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600"
          >
            Real reviews from real customers
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-primary-600">{testimonial.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/reviews"
            className="inline-flex items-center text-primary-600 font-semibold text-lg hover:text-primary-700 transition-colors group"
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
        </motion.div>
      </div>
    </section>
  );
}
