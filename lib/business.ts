/**
 * Public name, address and phone already published on the site.
 * The registered seat and the footer use 9180 Lokeren. The contact page
 * previously said 9180 Moerbeke (the former municipality name for this
 * postcode). One wording is used everywhere so NAP stays consistent.
 */
export const BUSINESS = {
  brand: "Party-Up.be",
  legalName: "Power Up BV",
  email: "info@party-up.be",
  phoneDisplay: "+32 475 94 00 48",
  phoneTel: "+32475940048",
  street: "Pereboomsteenweg 49",
  postalCode: "9180",
  city: "Lokeren",
  country: "België",
  countryCode: "BE",
  areaServed: "België",
} as const;

export const BUSINESS_ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.country}`;

export function mapsSearchUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS_LINE)}`;
}

export function mapsDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS_ADDRESS_LINE)}`;
}

export function mapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS_ADDRESS_LINE)}&output=embed`;
}
