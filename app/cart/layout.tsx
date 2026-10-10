import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cart" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
