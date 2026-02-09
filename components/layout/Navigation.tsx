"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavigationProps {
  scrolled?: boolean;
}

export default function Navigation({ scrolled = false }: NavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalogus" },
    { href: "/pricing", label: "Prijzen" },
    { href: "/faq", label: "Veelgestelde Vragen" },
    { href: "/contact", label: "Contact" },
    { href: "/reviews", label: "Beoordelingen" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(link.href)
                ? scrolled
                  ? "text-blue-700 bg-blue-100"
                  : "text-white bg-white/20"
                : scrolled
                ? "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/booking"
          className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            scrolled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white text-blue-600 hover:bg-white/90"
          }`}
        >
          Reserveer Nu
        </Link>
      </div>

      {/* Mobile: Hamburger button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-2.5 rounded-xl transition-all duration-300 ${
            scrolled
              ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              : "text-white hover:text-blue-100 hover:bg-white/10"
          } ${isOpen ? "rounded-full bg-white/20" : ""}`}
          aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={isOpen}
        >
          <span className="sr-only">{isOpen ? "Menu sluiten" : "Menu openen"}</span>
          <span className="relative block h-6 w-6">
            <span
              className={`absolute left-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-all duration-300 ${
                isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1.5"
              }`}
              style={{ transformOrigin: "center" }}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-current transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
              style={{ transformOrigin: "center" }}
            />
            <span
              className={`absolute left-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-all duration-300 ${
                isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1.5"
              }`}
              style={{ transformOrigin: "center" }}
            />
          </span>
        </button>

        {/* Mobile menu overlay + panel */}
        <div
          className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ease-out ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          {/* Backdrop with blur */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
            aria-label="Menu sluiten"
          />

          {/* Slide-in panel */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-full max-w-[min(320px,85vw)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                aria-label="Menu sluiten"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-5 py-3.5 text-base font-medium transition-colors border-l-4 border-transparent ${
                    isActive(link.href)
                      ? "text-blue-700 bg-blue-50 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 border-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA at bottom */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-3.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                Reserveer Nu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

