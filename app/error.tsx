"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-2xl w-full text-center animate-fade-in-up">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="mb-6 animate-scale-in">
            <svg
              className="w-24 h-24 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-lg text-gray-600 mb-8">
            We encountered an unexpected error. Don&apos;t worry, our team has been notified and we&apos;re working to fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all"
            >
              Go Home
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Need immediate assistance?</p>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our support team →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
