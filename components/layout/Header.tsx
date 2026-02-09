"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NOT YET FINISHED Banner */}
      <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-center py-2 px-4 text-sm font-semibold z-50">
        ⚠️ NOT YET FINISHED - Website Under Construction
      </div>
      <header
        className={`fixed left-0 right-0 top-10 z-40 transition-all duration-300 animate-header-slide ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center transition-transform duration-300 group-hover:scale-105">
                <div className="relative bg-transparent">
                  <Image
                    src="/logo-full.png"
                    alt="Party-Up Logo"
                    width={200}
                    height={100}
                    className="h-14 w-auto object-contain drop-shadow-md"
                    priority
                    style={{
                      backgroundColor: "transparent",
                      imageRendering: "auto",
                    }}
                  />
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Navigation scrolled={scrolled} />
              <Link
                href="/cart"
                className={`relative p-2 transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
                aria-label="Shopping cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
