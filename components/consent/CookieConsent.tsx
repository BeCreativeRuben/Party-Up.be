"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "party-up-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-NESVHS9C11";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadAnalytics() {
  if (typeof window === "undefined" || document.getElementById("ga-loader")) return;
  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
  });
  const script = document.createElement("script");
  script.id = "ga-loader";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.onload = () => {
    window.gtag?.("js", new Date());
    window.gtag?.("config", GA_ID);
  };
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      setChoice("granted");
      loadAnalytics();
    } else if (stored === "denied") {
      setChoice("denied");
    }
    setReady(true);
  }, []);

  const save = (next: Choice) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
    if (next === "granted") loadAnalytics();
  };

  if (!ready || choice) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-text"
        className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-xl rounded-lg p-4 sm:p-5"
      >
        <h2 id="cookie-consent-title" className="text-base font-semibold text-gray-900 mb-1">
          Cookies
        </h2>
        <p id="cookie-consent-text" className="text-sm text-gray-700">
          We meten het bezoek met Google Analytics. Die cookie staat uit tot je akkoord gaat.
          Advertentiecookies gebruiken we niet.{" "}
          <Link href="/legal/privacy" className="text-blue-600 hover:underline">
            Privacybeleid
          </Link>
        </p>
        <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={() => save("denied")}
            className="min-h-11 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-50"
          >
            Weigeren
          </button>
          <button
            type="button"
            onClick={() => save("granted")}
            className="min-h-11 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
