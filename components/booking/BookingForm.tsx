"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookingFormData } from "@/types";
import { products, getProductById } from "@/lib/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import type { Product } from "@/types";

function getProductImageStyle(product: Product): React.CSSProperties | undefined {
  const c = product.imageClassName;
  if (c === "rotate-180") return { transform: "rotate(180deg)" };
  if (c === "rotate-90") return { transform: "rotate(90deg)" };
  if (c === "-rotate-90") return { transform: "rotate(-90deg)" };
  return undefined;
}

const bookingSchema = z.object({
  rentalPeriodType: z.enum(["standard", "custom"]),
  startDate: z.string().min(1, "Ophaaldatum is verplicht"),
  endDate: z.string().min(1, "Retourdatum is verplicht"),
  eventLocation: z.string().min(1, "Evenementlocatie is verplicht"),
  numberOfGuests: z.number({ required_error: "Aantal gasten is verplicht" }).min(1, "Minimum 1 gast").max(1000, "Maximum 1000 gasten"),
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

type RentalPeriodType = "standard" | "custom";

export default function BookingForm({ initialItems = [] }: BookingFormProps) {
  const { items, addItem, removeItem, updateQuantity } = useCart();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [rentalPeriodType, setRentalPeriodType] = useState<RentalPeriodType>("standard");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      selectedItems: [],
      numberOfGuests: 20,
      rentalPeriodType: "standard",
    },
  });

  const numberOfGuests = watch("numberOfGuests");

  // Add initial items to cart on mount
  useEffect(() => {
    if (initialItems.length > 0) {
      initialItems.forEach(itemId => {
        const existingItem = items.find(item => item.productId === itemId);
        if (!existingItem) {
          addItem(itemId);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set default dates for standard period on mount (suggest next Friday)
  useEffect(() => {
    if (rentalPeriodType === "standard" && !startDate && !endDate) {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 5 - dayOfWeek + 7;
      const friday = new Date(today);
      friday.setDate(today.getDate() + daysUntilFriday);
      const sunday = new Date(friday);
      sunday.setDate(friday.getDate() + 2);
      
      const startDateStr = friday.toISOString().split("T")[0];
      const endDateStr = sunday.toISOString().split("T")[0];
      
      setStartDate(startDateStr);
      setEndDate(endDateStr);
      setValue("startDate", startDateStr);
      setValue("endDate", endDateStr);
      setValue("rentalPeriodType", "standard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top when changing step so the new step is visible
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Get suggested products based on items in cart
  const getSuggestedProducts = () => {
    if (items.length === 0) {
      // If cart is empty, suggest popular items
      return products.filter(p => p.popular).slice(0, 4);
    }
    
    // Get categories of items in cart
    const cartCategories = new Set(
      items.map(item => {
        const product = getProductById(item.productId);
        return product?.category;
      }).filter(Boolean)
    );
    
    // Get cart product IDs
    const cartProductIds = new Set(items.map(item => item.productId));
    
    // Suggest products from same or related categories, excluding items already in cart
    const suggestions = products
      .filter(product => {
        // Don't suggest items already in cart
        if (cartProductIds.has(product.id)) return false;
        // Suggest items from same category or popular items
        return cartCategories.has(product.category) || product.popular;
      })
      .slice(0, 4);
    
    return suggestions;
  };


  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Get selected items from cart
      const selectedItems = items.map(item => item.productId);
      
      // Ensure dates are set correctly
      const formData = {
        ...data,
        rentalPeriodType: rentalPeriodType,
        startDate: rentalPeriodType === "standard" ? startDate : data.startDate,
        endDate: rentalPeriodType === "standard" ? endDate : data.endDate,
        selectedItems,
      };
      
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
            {/* Rental Period Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Huurperiode *
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rentalPeriod"
                      value="standard"
                      checked={rentalPeriodType === "standard"}
                      onChange={(e) => {
                        setRentalPeriodType(e.target.value as RentalPeriodType);
                        setValue("rentalPeriodType", e.target.value as RentalPeriodType);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">Standaard (3 dagen)</span>
                  </label>
                  <span className="text-sm text-gray-500">Vrijdag t/m zondag</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rentalPeriod"
                      value="custom"
                      checked={rentalPeriodType === "custom"}
                      onChange={(e) => {
                        setRentalPeriodType(e.target.value as RentalPeriodType);
                        setValue("rentalPeriodType", e.target.value as RentalPeriodType);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">Aangepaste periode</span>
                  </label>
                </div>

                {/* Date inputs - always visible */}
                <div className="ml-6 mt-3 space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Ophaaldatum *
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        {...register("startDate")}
                        value={startDate}
                        onChange={(e) => {
                          const newStartDate = e.target.value;
                          setStartDate(newStartDate);
                          setValue("startDate", newStartDate);
                          
                          // If standard period, auto-calculate end date (start + 2 days = 3 days total)
                          if (rentalPeriodType === "standard" && newStartDate) {
                            const start = new Date(newStartDate);
                            const end = new Date(start);
                            end.setDate(start.getDate() + 2); // +2 days = 3 days total (including start day)
                            const endDateStr = end.toISOString().split("T")[0];
                            setEndDate(endDateStr);
                            setValue("endDate", endDateStr);
                          }
                        }}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-xs text-red-600">{errors.startDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Retourdatum *
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        {...register("endDate")}
                        value={endDate}
                        onChange={(e) => {
                          const newEndDate = e.target.value;
                          setEndDate(newEndDate);
                          setValue("endDate", newEndDate);
                        }}
                        min={rentalPeriodType === "standard" && startDate ? (() => {
                          const start = new Date(startDate);
                          const minEnd = new Date(start);
                          minEnd.setDate(start.getDate() + 2);
                          return minEnd.toISOString().split("T")[0];
                        })() : (startDate || new Date().toISOString().split("T")[0])}
                        disabled={rentalPeriodType === "standard"}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          rentalPeriodType === "standard" ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-xs text-red-600">{errors.endDate.message}</p>
                      )}
                      {rentalPeriodType === "standard" && (
                        <p className="mt-1 text-xs text-gray-500">
                          Automatisch berekend (3 dagen vanaf ophaaldatum)
                        </p>
                      )}
                    </div>
                  </div>
                  {startDate && endDate && (
                    <div className="text-sm text-gray-600">
                      {(() => {
                        const start = new Date(startDate);
                        const end = new Date(endDate);
                        const diffTime = Math.abs(end.getTime() - start.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                        const isValid = rentalPeriodType === "standard" ? diffDays === 3 : diffDays >= 3;
                        return isValid ? (
                          <span className="text-green-600 font-medium">
                            ✓ Periode: {diffDays} dag{diffDays !== 1 ? "en" : ""} 
                            {rentalPeriodType === "standard" ? " (standaard 3 dagen)" : ` (minimum: 3 dagen)`}
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            ⚠ Periode: {diffDays} dag{diffDays !== 1 ? "en" : ""} 
                            {rentalPeriodType === "standard" ? " (moet exact 3 dagen zijn)" : " (minimum: 3 dagen vereist)"}
                          </span>
                        );
                      })()}
                    </div>
                  )}
                  {rentalPeriodType === "custom" && (
                    <p className="text-xs text-gray-500 mt-2">
                      Minimum huurperiode is 3 dagen. Voor aangepaste periodes neem contact met ons op voor beschikbaarheid en prijsopgave.
                    </p>
                  )}
                </div>
              </div>
              {(errors.startDate || errors.endDate) && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startDate?.message || errors.endDate?.message}
                </p>
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
                Aantal Gasten (schatting) *
              </label>
              <input
                type="number"
                id="numberOfGuests"
                {...register("numberOfGuests", { 
                  valueAsNumber: true,
                  setValueAs: (value) => value === "" ? undefined : Number(value)
                })}
                min="1"
                max="1000"
                placeholder="Bijv. 50"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Controleer je bestelling</h2>
          
          {/* Cart Items */}
          {items.length > 0 ? (
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Jouw winkelmandje</h3>
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const availabilityCount = product.availabilityCount ?? 0;
                const maxQuantity = availabilityCount;
                const canIncrease = item.quantity < maxQuantity;
                
                return (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      {product.image ? (
                        <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            style={getProductImageStyle(product)}
                          />
                        </div>
                      ) : (
                        <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-400 text-xs">Geen afbeelding</span>
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(product.price)} per stuk
                        </p>
                        {product.deposit != null && product.deposit > 0 && (
                          <p className="text-xs text-orange-600 font-medium mt-1">
                            Waarborg: {formatPrice(product.deposit)} per stuk
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                          aria-label="Verlaag aantal"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={!canIncrease}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                            canIncrease
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          aria-label="Verhoog aantal"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="ml-2 text-red-600 hover:text-red-700 transition-colors p-2"
                          aria-label="Verwijder item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {items.some((item) => {
                const p = getProductById(item.productId);
                return p?.deposit != null && p.deposit > 0;
              }) && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-medium text-gray-700">Totaal waarborg</span>
                  <span className="font-semibold text-orange-600">
                    {formatPrice(
                      items.reduce((sum, item) => {
                        const p = getProductById(item.productId);
                        return sum + (p?.deposit ?? 0) * item.quantity;
                      }, 0)
                    )}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-600 mb-4">Je winkelmandje is leeg</p>
              <Link
                href="/catalog"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Bekijk Catalogus
              </Link>
            </div>
          )}

          {/* Suggestions */}
          {(() => {
            const suggestions = getSuggestedProducts();
            if (suggestions.length === 0) return null;
            
            return (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dit wordt vaak samengebruikt met:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suggestions.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => addItem(product.id)}
                    >
                      <div className="flex items-start gap-3">
                        {product.image ? (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg relative overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              style={getProductImageStyle(product)}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                          <p className="text-sm font-medium text-blue-600">
                            {formatPrice(product.price)}
                          </p>
                          {product.deposit != null && product.deposit > 0 && (
                            <p className="text-xs text-orange-600 font-medium">
                              Waarborg: {formatPrice(product.deposit)}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem(product.id);
                          }}
                          className="ml-2 p-2 text-blue-600 hover:text-blue-700 transition-colors"
                          aria-label="Voeg toe"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}

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
              disabled={items.length === 0}
              whileHover={items.length > 0 ? { scale: 1.05 } : {}}
              whileTap={items.length > 0 ? { scale: 0.95 } : {}}
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
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">Aantal: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(product.price * item.quantity)}
                      </p>
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

