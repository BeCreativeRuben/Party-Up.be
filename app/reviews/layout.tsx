import type { Metadata } from "next";
import { reviewsMetadata } from "@/lib/seo";

export const metadata: Metadata = reviewsMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
