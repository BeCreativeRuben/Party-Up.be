"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/reviews", label: "Reviews" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(link.href)
                ? "text-primary-600 bg-primary-50"
                : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/booking"
          className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          Reserve Now
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm ${
                  isActive(link.href)
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm bg-primary-600 text-white hover:bg-primary-700"
            >
              Reserve Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

