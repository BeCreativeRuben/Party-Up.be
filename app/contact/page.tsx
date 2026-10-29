"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUSINESS, mapsDirectionsUrl, mapsEmbedUrl } from "@/lib/business";

const contactSchema = z.object({
  type: z.enum(["particulier", "bedrijf"], {
    error: "Selecteer of je een particulier of bedrijf bent",
  }),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  vatNumber: z.string().optional(),
  subject: z.string(),
  message: z.string(),
}).check((ctx) => {
  const data = ctx.value;
  // Field rules live here so a bedrijf enquiry still reports company and VAT
  // errors when another field is also invalid. Zod skips object refinements
  // after the first field failure.
  if (data.name.trim().length === 0) {
    ctx.issues.push({
      code: "custom",
      message: "Naam is verplicht",
      path: ["name"],
      input: data.name,
    });
  }
  if (!z.email().safeParse(data.email).success) {
    ctx.issues.push({
      code: "custom",
      message: "Geldig e-mailadres is verplicht",
      path: ["email"],
      input: data.email,
    });
  }
  if (data.subject.trim().length === 0) {
    ctx.issues.push({
      code: "custom",
      message: "Onderwerp is verplicht",
      path: ["subject"],
      input: data.subject,
    });
  }
  if (data.message.length < 10) {
    ctx.issues.push({
      code: "custom",
      message: "Bericht moet minimaal 10 tekens bevatten",
      path: ["message"],
      input: data.message,
    });
  }
  if (data.type === "bedrijf" && (!data.companyName || data.companyName.length === 0)) {
    ctx.issues.push({
      code: "custom",
      message: "Bedrijfsnaam is verplicht voor bedrijven",
      path: ["companyName"],
      input: data.companyName,
    });
  }
  if (data.type === "bedrijf" && (!data.vatNumber || data.vatNumber.length === 0)) {
    ctx.issues.push({
      code: "custom",
      message: "BTW-nummer is verplicht voor bedrijven",
      path: ["vatNumber"],
      input: data.vatNumber,
    });
  }
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
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="min-w-11 min-h-11 inline-flex items-center justify-center text-red-500 hover:text-red-700"
                    aria-label="Foutmelding sluiten"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit, (errors) => {
              const order = ["type", "companyName", "vatNumber", "name", "email", "subject", "message"] as const;
              const first = order.find((name) => errors[name]);
              if (first) {
                const id = first === "type" ? "contactTypeSection" : first;
                setTimeout(() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }
            })}
            className="space-y-6"
          >
            {/* Type Selection */}
            <div id="contactTypeSection" role="radiogroup" aria-labelledby="contact-type-label">
              <p id="contact-type-label" className="block text-sm font-medium text-gray-700 mb-3">
                Ik ben een *
              </p>
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
                  aria-invalid={errors.companyName ? true : undefined}
                  aria-describedby={errors.companyName ? "companyName-error" : undefined}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyName ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                  }`}
                />
                {errors.companyName && (
                  <p id="companyName-error" className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
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
                  aria-invalid={errors.vatNumber ? true : undefined}
                  aria-describedby={errors.vatNumber ? "vatNumber-error" : undefined}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.vatNumber ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                  }`}
                  placeholder="Bijv. BE0123.456.789"
                />
                {errors.vatNumber && (
                  <p id="vatNumber-error" className="mt-1 text-sm text-red-600">{errors.vatNumber.message}</p>
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
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                aria-invalid={errors.subject ? true : undefined}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.subject ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                }`}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
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
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.message ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message.message}</p>
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
                  href={`mailto:${BUSINESS.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {BUSINESS.email}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Telefoon</h3>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="text-blue-600 hover:underline"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ophalen van materialen</h3>
                <p className="text-gray-700">
                  Het ophalen van materialen gebeurt standaard &apos;s avonds na 18:00 uur. Andere tijden zijn bespreekbaar - bel ons daarvoor.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Adres</h3>
                <p className="text-gray-700">
                  {BUSINESS.legalName}
                  <br />
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.postalCode} {BUSINESS.city}
                  <br />
                  {BUSINESS.country}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Locatie</h2>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <iframe
                src={mapsEmbedUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title={`Party-Up - ${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`}
              />
            </div>
            <p className="text-gray-700">
              <strong>{BUSINESS.legalName}</strong>
              <br />
              {BUSINESS.street}
              <br />
              {BUSINESS.postalCode} {BUSINESS.city}
              <br />
              {BUSINESS.country}
            </p>
            <div className="mt-4">
              <a
                href={mapsDirectionsUrl()}
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

