import type { Metadata } from "next";
import { catalogMetadata } from "@/lib/seo";

export const metadata: Metadata = catalogMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
