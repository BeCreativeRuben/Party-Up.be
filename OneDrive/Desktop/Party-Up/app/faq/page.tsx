"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I make a reservation?",
    answer:
      "You can request a quote through our online booking form on the website. Simply fill out the form with your event details, select the items you need, and we'll get back to you within 24 hours to confirm availability and pricing.",
  },
  {
    question: "What is the rental period?",
    answer:
      "Our standard rental period is Friday evening pickup with Sunday evening return. This gives you the full weekend for your event. Other arrangements can be discussed based on availability.",
  },
  {
    question: "Do you deliver and pick up?",
    answer:
      "Yes, we offer delivery and pickup services. Delivery charges depend on your location. Please include your address in the booking form, and we'll provide a delivery quote.",
  },
  {
    question: "Is a deposit required?",
    answer:
      "A security deposit may be required for certain high-value items. The deposit amount and terms will be communicated when you receive your quote. The deposit is fully refundable upon return of equipment in good condition.",
  },
  {
    question: "What happens if equipment is damaged?",
    answer:
      "Normal wear and tear is expected. However, if equipment is damaged due to misuse or negligence, repair or replacement costs will be deducted from the security deposit. Please refer to our Terms & Conditions for detailed information.",
  },
  {
    question: "Can I cancel my reservation?",
    answer:
      "Yes, cancellations are accepted. Please contact us as soon as possible. Cancellation terms vary based on how far in advance you cancel. Please see our Terms & Conditions for specific cancellation policies.",
  },
  {
    question: "What size events do you cater to?",
    answer:
      "We specialize in events with 10-100 guests. This includes home and garden parties, birthdays, anniversaries, communions, baby showers, and small company gatherings.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-3 weeks in advance, especially during peak season (spring and summer). However, we'll do our best to accommodate last-minute requests when possible.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers and cash payments. Payment terms will be detailed in your quote. Typically, a deposit is required to secure your booking, with the balance due before or upon delivery.",
  },
  {
    question: "Do you provide setup instructions?",
    answer:
      "Basic setup instructions are provided with all equipment. For tents and more complex setups, we can provide setup assistance for an additional fee. Please mention this in your booking request.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our party rental services
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary-50 rounded-lg p-6 text-center">
        <p className="text-gray-700 mb-4">
          Still have questions? We&apos;re here to help!
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

