"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookingFormData } from "@/types";
import { products, getProductById } from "@/lib/data/products";
import { motion, AnimatePresence } from "framer-motion";

const bookingSchema = z.object({
  eventDate: z.string().min(1, "Evenementdatum is verplicht"),
  eventLocation: z.string().min(1, "Evenementlocatie is verplicht"),
  numberOfGuests: z.number().min(10, "Minimum 10 gasten").max(100, "Maximum 100 gasten"),
  contactName: z.string().min(1, "Naam is verplicht"),
  contactEmail: z.string().email("Geldig e-mailadres is verplicht"),
  contactPhone: z.string().min(1, "Telefoonnummer is verplicht"),
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
  const [submitError, setSubmitError] = useState<string | null>(null);

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


  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed");
      }
    } catch (error) {
      setSubmitError(
        "We konden jouw boekingsaanvraag niet verzenden. Controleer je gegevens en probeer het opnieuw, of neem direct contact met ons op voor hulp."
      );
      console.error("Booking submission error:", error);
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Aanvraag Verzonden!</h2>
        <p className="text-gray-600 mb-6">
          Bedankt voor jouw boekingsaanvraag. We bekijken deze en nemen binnen 24 uur contact met je op
          op het e-mailadres dat je hebt opgegeven.
        </p>
        <p className="text-sm text-gray-500">
          Je zou binnenkort een bevestigingsmail moeten ontvangen.
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
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > stepNum ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex mt-2 text-sm text-gray-600">
          <div className="flex-1 flex items-center">
            <span>Evenementgegevens</span>
          </div>
          <div className="flex-1 flex items-center">
            <span>Selecteer Items</span>
          </div>
          <div className="flex-1 flex items-center">
            <span>Verzend aanvraag</span>
          </div>
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
            className="bg-white rounded-lg shadow-md p-8"
          >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Evenementgegevens</h2>
          
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
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
                  <strong className="font-semibold">Ophalen Verplicht:</strong> Alle materiaal moet persoonlijk worden opgehaald en teruggebracht. We bieden geen bezorgservice aan.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                Evenementdatum *
              </label>
              <input
                type="date"
                id="eventDate"
                {...register("eventDate")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                Evenementlocatie *
              </label>
              <input
                type="text"
                id="eventLocation"
                {...register("eventLocation")}
                placeholder="Adres of stad"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                Aantal Gasten * (10-100)
              </label>
              <input
                type="number"
                id="numberOfGuests"
                {...register("numberOfGuests", { valueAsNumber: true })}
                min="10"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Volgende: Selecteer Items
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
            className="bg-white rounded-lg shadow-md p-8"
          >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Selecteer Items</h2>
          <div className="space-y-4 mb-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                  selectedItems.includes(product.id)
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
                onClick={() => toggleItem(product.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => toggleItem(product.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-sm text-gray-600 mb-2">
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} geselecteerd
              </p>
            </motion.div>
          )}

          <div className="flex justify-between">
            <motion.button
              type="button"
              onClick={() => setStep(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Terug
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setStep(3)}
              disabled={selectedItems.length === 0}
              whileHover={selectedItems.length > 0 ? { scale: 1.05 } : {}}
              whileTap={selectedItems.length > 0 ? { scale: 0.95 } : {}}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Volgende: Controleer & verzend aanvraag
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
            className="bg-white rounded-lg shadow-md p-8"
          >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Controleer & verzend aanvraag</h2>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contactgegevens</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Naam *
                  </label>
                  <input
                    type="text"
                    {...register("contactName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    {...register("contactEmail")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.contactEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefoon *
                  </label>
                  <input
                    type="tel"
                    {...register("contactPhone")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.contactPhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactPhone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aanvullende Opmerkingen (optioneel)
              </label>
              <textarea
                {...register("additionalNotes")}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Speciale verzoeken of aanvullende informatie..."
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Geselecteerde Items</h3>
              <div className="space-y-2 mb-4">
                {selectedItems.map((itemId) => {
                  const product = getProductById(itemId);
                  if (!product) return null;
                  return (
                    <div key={itemId} className="text-sm">
                      <span>{product.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{submitError}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setSubmitError(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <p className="mb-6 text-sm text-gray-600">
            Door je aanvraag te versturen ga je akkoord met onze{" "}
            <Link href="/legal/terms" className="text-blue-600 hover:underline">
              Algemene Voorwaarden
            </Link>{" "}
            en de{" "}
            <Link href="/legal/waiver" className="text-blue-600 hover:underline">
              Aansprakelijkheidsverklaring
            </Link>
            .
          </p>

          <div className="flex justify-between">
            <motion.button
              type="button"
              onClick={() => setStep(2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Terug
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verzenden..." : "Verstuur Aanvraag"}
            </motion.button>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

