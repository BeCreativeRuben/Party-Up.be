"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  type: z.enum(["particulier", "bedrijf"], {
    required_error: "Selecteer of je een particulier of bedrijf bent",
  }),
  name: z.string().min(1, "Naam is verplicht"),
  email: z.string().email("Geldig e-mailadres is verplicht"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  vatNumber: z.string().optional(),
  subject: z.string().min(1, "Onderwerp is verplicht"),
  message: z.string().min(10, "Bericht moet minimaal 10 tekens bevatten"),
}).refine((data) => {
  if (data.type === "bedrijf") {
    return data.companyName && data.companyName.length > 0 && data.vatNumber && data.vatNumber.length > 0;
  }
  return true;
}, {
  message: "Bedrijfsnaam en BTW-nummer zijn verplicht voor bedrijven",
  path: ["companyName"],
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: "particulier",
    },
  });

  const watchedType = watch("type");

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset({
          type: "particulier",
          name: "",
          email: "",
          phone: "",
          companyName: "",
          vatNumber: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed");
      }
    } catch (error) {
      setSubmitError(
        "We konden je bericht niet verzenden. Probeer het opnieuw of neem direct contact met ons op via info@party-up.be"
      );
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Neem Contact Op</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Heb je een vraag? Neem contact met ons op en we reageren zo snel mogelijk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Stuur Ons een Bericht</h2>
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
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
                <div className="ml-3 flex-1">
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
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Ik ben een *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="particulier"
                    {...register("type")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">Particulier</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="bedrijf"
                    {...register("type")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">Bedrijf</span>
                </label>
              </div>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* Company Name - Only for bedrijf */}
            {watchedType === "bedrijf" && (
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrijfsnaam *
                </label>
                <input
                  type="text"
                  id="companyName"
                  {...register("companyName")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>
            )}

            {/* VAT Number - Only for bedrijf */}
            {watchedType === "bedrijf" && (
              <div>
                <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  BTW-nummer *
                </label>
                <input
                  type="text"
                  id="vatNumber"
                  {...register("vatNumber")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bijv. BE0123.456.789"
                />
                {errors.vatNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.vatNumber.message}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {watchedType === "bedrijf" ? "Contactpersoon" : "Naam"} *
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefoon (optioneel)
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Onderwerp *
              </label>
              <input
                type="text"
                id="subject"
                {...register("subject")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Bericht *
              </label>
              <textarea
                id="message"
                rows={6}
                {...register("message")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verzenden..." : "Verstuur Bericht"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contactgegevens</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">E-mail</h3>
                <a
                  href="mailto:info@party-up.be"
                  className="text-blue-600 hover:underline"
                >
                  info@party-up.be
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Telefoon</h3>
                <a
                  href="tel:+32475940048"
                  className="text-blue-600 hover:underline"
                >
                  +32 475 94 00 48
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ophalen van materialen</h3>
                <p className="text-gray-700">
                  Het ophalen van materialen gebeurt standaard &apos;s avonds na 18:00 uur. Andere tijden zijn bespreekbaar - bel ons daarvoor.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Volg Ons</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Locatie</h2>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Pereboomsteenweg+49,+9180+Moerbeke,+Belgium&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Party-Up Location - Pereboomsteenweg 49, 9180 Moerbeke"
              />
            </div>
            <p className="text-gray-700">
              <strong>Power Up BV</strong>
              <br />
              Pereboomsteenweg 49
              <br />
              9180 Moerbeke
              <br />
              Belgium
            </p>
            <div className="mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Pereboomsteenweg+49,+9180+Moerbeke,+Belgium"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Routebeschrijving
              </a>
            </div>
            
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md">
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
                    <strong className="font-semibold">Ophalen Verplicht:</strong> Alle materiaal moet persoonlijk worden opgehaald en teruggebracht op onze locatie. We bieden geen bezorgservice aan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

