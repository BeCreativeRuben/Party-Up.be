"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookingFormData } from "@/types";
import { products, getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const bookingSchema = z.object({
  eventDate: z.string().min(1, "Event date is required"),
  eventLocation: z.string().min(1, "Event location is required"),
  numberOfGuests: z.number().min(10, "Minimum 10 guests").max(100, "Maximum 100 guests"),
  contactName: z.string().min(1, "Name is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(1, "Phone number is required"),
  additionalNotes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema> & {
  selectedItems: string[];
};

interface BookingFormProps {
  initialItems?: string[];
}

export default function BookingForm({ initialItems = [] }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>(initialItems);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      selectedItems: initialItems,
      numberOfGuests: 20,
    },
  });

  const numberOfGuests = watch("numberOfGuests");

  const toggleItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const product = getProductById(itemId);
      return total + (product?.price || 0);
    }, 0);
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          selectedItems,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      alert("There was an error submitting your request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your booking request. We&apos;ll review it and get back to you within 24 hours
          at the email address you provided.
        </p>
        <p className="text-sm text-gray-500">
          You should receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= stepNum
                    ? "bg-primary-600 border-primary-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > stepNum ? "bg-primary-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Event Details</span>
          <span>Select Items</span>
          <span>Review & Submit</span>
        </div>
      </motion.div>

      {/* Step 1: Event Details */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
          
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-amber-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-800">
                  <strong className="font-semibold">Pickup Required:</strong> All equipment must be picked up and returned personally. We do not offer delivery services.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                id="eventDate"
                {...register("eventDate")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.eventDate && (
                <p className="mt-1 text-sm text-red-600">{errors.eventDate.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="eventLocation"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Event Location *
              </label>
              <input
                type="text"
                id="eventLocation"
                {...register("eventLocation")}
                placeholder="Address or city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.eventLocation && (
                <p className="mt-1 text-sm text-red-600">{errors.eventLocation.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="numberOfGuests"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Guests * (10-100)
              </label>
              <input
                type="number"
                id="numberOfGuests"
                {...register("numberOfGuests", { valueAsNumber: true })}
                min="10"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.numberOfGuests && (
                <p className="mt-1 text-sm text-red-600">{errors.numberOfGuests.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <motion.button
                type="button"
                onClick={() => setStep(2)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Next: Select Items
              </motion.button>
            </div>
          </div>
        </motion.div>
        )}

        {/* Step 2: Select Items */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Items</h2>
          <div className="space-y-4 mb-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  selectedItems.includes(product.id)
                    ? "border-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-md"
                    : "border-gray-200 hover:border-primary-300 hover:shadow-md"
                }`}
                onClick={() => toggleItem(product.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => toggleItem(product.id)}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200"
            >
              <p className="text-sm text-gray-600 mb-2">
                Selected {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Total: {formatPrice(calculateTotal())}
              </p>
            </motion.div>
          )}

          <div className="flex justify-between">
            <motion.button
              type="button"
              onClick={() => setStep(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setStep(3)}
              disabled={selectedItems.length === 0}
              whileHover={selectedItems.length > 0 ? { scale: 1.05 } : {}}
              whileTap={selectedItems.length > 0 ? { scale: 0.95 } : {}}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Next: Review & Submit
            </motion.button>
          </div>
        </motion.div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register("contactName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("contactEmail")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {errors.contactEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    {...register("contactPhone")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {errors.contactPhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactPhone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (optional)
              </label>
              <textarea
                {...register("additionalNotes")}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any special requests or additional information..."
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Selected Items</h3>
              <div className="space-y-2 mb-4">
                {selectedItems.map((itemId) => {
                  const product = getProductById(itemId);
                  if (!product) return null;
                  return (
                    <div key={itemId} className="flex justify-between text-sm">
                      <span>{product.name}</span>
                      <span>{formatPrice(product.price)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total:</span>
                <span className="text-primary-600">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <motion.button
              type="button"
              onClick={() => setStep(2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </motion.button>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

