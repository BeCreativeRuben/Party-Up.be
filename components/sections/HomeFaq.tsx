import Link from "next/link";
import { faqs } from "@/lib/faq";

const HIGHLIGHTS = [0, 1, 2, 3];

export default function HomeFaq() {
  return (
    <section className="pt-28 pb-20 bg-white" aria-labelledby="home-faq-title">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="home-faq-title" className="text-4xl font-bold text-gray-900 mb-3">
            Veelgestelde vragen
          </h2>
          <p className="text-lg text-gray-600">
            Korte antwoorden over reserveren, de huurperiode en ophalen.
          </p>
        </div>
        <div className="space-y-4">
          {HIGHLIGHTS.map((index) => {
            const faq = faqs[index];
            return (
              <article key={faq.question} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </article>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center min-h-11 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Alle veelgestelde vragen
          </Link>
        </div>
      </div>
    </section>
  );
}
