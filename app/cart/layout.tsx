import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cart" },
  // The cart is per-visitor and has no search value; keep it out of the index.
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
