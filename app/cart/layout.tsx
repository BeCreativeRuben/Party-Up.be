import type { Metadata } from "next";
import { cartMetadata } from "@/lib/seo";

export const metadata: Metadata = cartMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
