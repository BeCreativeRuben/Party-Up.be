import type { Metadata } from "next";
import { bookingMetadata } from "@/lib/seo";

export const metadata: Metadata = bookingMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
