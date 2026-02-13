import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Minimal gray blur placeholder for images - prevents layout shift and improves perceived load */
export const IMAGE_PLACEHOLDER_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AwABmX//Z";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(price);
}

export function formatPricePerDay(price: number): string {
  return `€${price} / day`;
}

// BTW/VAT calculations (21% BTW in Belgium)
const VAT_RATE = 0.21;

export function calculateVAT(priceExclVAT: number): number {
  return priceExclVAT * VAT_RATE;
}

export function calculatePriceInclVAT(priceExclVAT: number): number {
  return priceExclVAT + calculateVAT(priceExclVAT);
}

export function formatPriceExclVAT(price: number): string {
  return formatPrice(price);
}

export function formatPriceInclVAT(price: number): string {
  return formatPrice(calculatePriceInclVAT(price));
}
