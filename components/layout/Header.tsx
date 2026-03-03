"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const { getItemCount, lastNewItemAddedAt } = useCart();
  const itemCount = getItemCount();
  const [playCartPop, setPlayCartPop] = useState(false);
  const prevNewItemAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (lastNewItemAddedAt != null && lastNewItemAddedAt !== prevNewItemAtRef.current) {
      prevNewItemAtRef.current = lastNewItemAddedAt;
      setPlayCartPop(true);
      const t = setTimeout(() => setPlayCartPop(false), 420);
      return () => clearTimeout(t);
    }
    if (lastNewItemAddedAt === null) prevNewItemAtRef.current = null;
  }, [lastNewItemAddedAt]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      const pastHero = typeof window !== "undefined" && window.scrollY > window.innerHeight - 1;
      setScrolled(pastHero);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 animate-header-slide ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            {/* Left: logo */}
            <div className="flex flex-1 justify-start min-w-0">
              <Link href="/" className="flex items-center group">
                <div className="flex items-center transition-transform duration-300 group-hover:scale-105">
                  <div className="relative bg-transparent">
                    <Image
                      src="/logo-full.svg"
                      alt="Party-Up Logo"
                      width={240}
                      height={80}
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
            </div>
            {/* Center: nav links */}
            <div className="hidden md:flex flex-1 justify-center min-w-0">
              <Navigation scrolled={scrolled} showCta={false} />
            </div>
            {/* Right: mobile menu, CTA + cart */}
            <div className="flex flex-1 justify-end items-center gap-2 min-w-0">
              <div className="md:hidden">
                <Navigation scrolled={scrolled} showCta={true} />
              </div>
              <Link
                href="/booking"
                className={`hidden md:inline-flex px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-blue-600 hover:bg-white/90"
                }`}
              >
                Reserveer Nu
              </Link>
              <Link
                href="/cart"
                className={`relative p-2 transition-colors inline-block ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                } ${playCartPop ? "animate-cart-add-pop" : ""}`}
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
