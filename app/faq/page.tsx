"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { faqs } from "@/lib/faq";

function answerWithLinks(text: string) {
  const phrase = "Algemene Voorwaarden";
  const parts = text.split(phrase);
  if (parts.length < 2) return text;
  return parts.map((part, i) =>
    i < parts.length - 1 ? (
      <span key={i}>
        {part}
        <Link href="/legal/terms" className="text-blue-600 hover:underline font-medium">
          {phrase}
        </Link>
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function FAQPage() {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Veelgestelde Vragen
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Vind antwoorden op veelgestelde vragen over onze feestverhuur
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.has(index);
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;
          return (
            <div
              key={faq.question}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h2>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full min-h-11 px-6 py-5 text-left flex justify-between items-center hover:bg-blue-50 transition-colors group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h2>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={isOpen ? undefined : true}
                className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 py-5 bg-gradient-to-b from-blue-50 to-white border-t border-blue-100">
                    <p className="text-gray-700 leading-relaxed">{answerWithLinks(faq.answer)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-8 text-center border border-blue-100 shadow-md">
        <p className="text-gray-700 mb-4 text-lg">Nog vragen? We helpen je graag!</p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center min-h-11 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Neem Contact Op
        </Link>
      </div>
    </div>
  );
}
