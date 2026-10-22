import type { Metadata } from "next";
import { faqMetadata } from "@/lib/seo";

export const metadata: Metadata = faqMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
