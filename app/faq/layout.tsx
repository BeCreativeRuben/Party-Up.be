import type { Metadata } from "next";
import { faqMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = faqMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      {children}
    </>
  );
}
