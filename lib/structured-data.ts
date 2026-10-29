import type { Product } from "@/types";
import { BUSINESS, BUSINESS_ADDRESS_LINE } from "@/lib/business";
import { faqs } from "@/lib/faq";
import { HOME_DESCRIPTION, SITE_ORIGIN, categoryLabel } from "@/lib/seo";

function absolute(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? "" : "/"}${encodeURI(path)}`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.brand,
    legalName: BUSINESS.legalName,
    url: SITE_ORIGIN,
    image: `${SITE_ORIGIN}/og.jpg`,
    telephone: BUSINESS.phoneTel,
    email: BUSINESS.email,
    description: HOME_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressCountry: BUSINESS.countryCode,
    },
    areaServed: {
      "@type": "Country",
      name: BUSINESS.areaServed,
    },
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productJsonLd(product: Product) {
  const paths = product.images?.length ? product.images : product.image ? [product.image] : [];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: paths.map(absolute),
    brand: { "@type": "Brand", name: BUSINESS.brand },
    category: categoryLabel(product.category),
    offers: {
      "@type": "Offer",
      url: `${SITE_ORIGIN}/catalog/product/${product.id}`,
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      description: `Huurprijs excl. BTW per huurperiode (vrijdag t/m zondag). ${BUSINESS_ADDRESS_LINE}. Zelf ophalen en terugbrengen.`,
    },
  };
}
