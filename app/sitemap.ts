import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/data/products";
import { assertUniqueIndexableMetadata, CONTENT_LAST_MODIFIED, SITE_ORIGIN } from "@/lib/seo";

const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/catalog", priority: 0.9 },
  { path: "/pricing", priority: 0.8 },
  { path: "/booking", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/reviews", priority: 0.5 },
  { path: "/contact", priority: 0.6 },
  { path: "/legal/terms", priority: 0.2 },
  { path: "/legal/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  assertUniqueIndexableMetadata();

  const entries: MetadataRoute.Sitemap = [
    ...STATIC_PATHS.map(({ path, priority }) => ({
      url: `${SITE_ORIGIN}${path}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...categories.map((category) => ({
      url: `${SITE_ORIGIN}/catalog/${category.id}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${SITE_ORIGIN}/catalog/product/${product.id}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const urls = entries.map((entry) => entry.url);
  const seen = new Set<string>();
  for (const url of urls) {
    const parsed = new URL(url);
    if (seen.has(url)) {
      throw new Error(`Duplicate sitemap URL: ${url}`);
    }
    seen.add(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "party-up.be") {
      throw new Error(`Sitemap URL is not the apex canonical host: ${url}`);
    }
    if (parsed.search || parsed.hash) {
      throw new Error(`Sitemap URL has a query or hash: ${url}`);
    }
    if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
      throw new Error(`Sitemap URL has a trailing slash: ${url}`);
    }
    if (parsed.pathname === "/cart" || parsed.pathname.startsWith("/cart/")) {
      throw new Error(`Cart must stay out of the sitemap: ${url}`);
    }
  }

  return entries;
}
