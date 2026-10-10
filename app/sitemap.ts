import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/data/products";

const BASE = "https://party-up.be";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
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
  return [
    ...staticPaths.map(({ path, priority }) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...categories.map((c) => ({
      url: `${BASE}/catalog/${c.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${BASE}/catalog/product/${p.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
