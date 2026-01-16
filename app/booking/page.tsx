"use client";

import BookingForm from "@/components/booking/BookingForm";
import { motion } from "framer-motion";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Request a Quote
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to request a quote for your event. We&apos;ll get back to you
            within 24 hours.
          </p>
        </motion.div>

        <BookingForm />
      </div>
    </div>
  );
}
