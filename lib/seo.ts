import type { Metadata } from "next";
import type { Category, Product } from "@/types";
import { categories, getProductsByCategory, products } from "@/lib/data/products";
import { calculatePriceInclVAT, formatPrice } from "@/lib/utils";

export const SITE_NAME = "Party-Up.be";
export const SITE_ORIGIN = "https://party-up.be";

/**
 * Last meaningful update of public page copy or metadata.
 * Do not stamp sitemap lastmod with `new Date()`: that marks every URL as
 * changed on each build and makes lastmod useless to Google.
 * Bump this when indexable copy actually changes.
 */
export const CONTENT_LAST_MODIFIED = new Date("2026-10-22T00:00:00.000Z");

export const HOME_TITLE = "Party-Up.be - No Nonsense Feestverhuur";
export const HOME_DESCRIPTION =
  "Verhuur van feest- en evenementmateriaal voor privé- en kleine professionele evenementen in België. Geen opslag, geen onderhoud, betrouwbare service.";

/** Dutch category names for titles and on-page copy. Ids stay the URL slugs. */
const CATEGORY_LABEL: Record<Category, string> = {
  tents: "Tenten",
  "tables-chairs": "Tafels en stoelen",
  "sound-light": "Geluid en licht",
  decoration: "Decoratie",
  catering: "Catering",
  facilities: "Faciliteiten",
};

export function categoryLabel(category: Category): string {
  return CATEGORY_LABEL[category];
}

function normalize(text: string): string {
  return text.replace(/[\u00a0\u202f]/g, " ").replace(/\s+/g, " ").trim();
}

export function clipMeta(text: string, max = 158): string {
  const clean = normalize(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd();
  return `${base}…`;
}

function money(price: number): string {
  return normalize(formatPrice(price));
}

function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} en ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} en ${names[names.length - 1]}`;
}

/** Document title + matching Open Graph, with a self-referencing canonical path. */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  absolute = false
): Metadata {
  const canonical = path === "" ? "/" : path;
  const fullTitle = absolute ? title : `${title} | ${SITE_NAME}`;
  const desc = clipMeta(description);
  // Absolute titles so a parent layout that sets its own title cannot
  // drop the root "%s | Party-Up.be" template on nested routes.
  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: canonical,
      siteName: SITE_NAME,
      locale: "nl_BE",
      type: "website",
    },
  };
}

export function catalogDescription(): string {
  const labels = categories.map((category) => CATEGORY_LABEL[category.id].toLowerCase());
  return clipMeta(
    `Catalogus van Party-Up: ${products.length} items, van ${joinNames(labels)}. Huur per weekend, prijzen excl. BTW. Zelf ophalen en terugbrengen.`
  );
}

export function categorySummary(categoryId: Category): string {
  const label = CATEGORY_LABEL[categoryId];
  const items = getProductsByCategory(categoryId);
  if (items.length === 0) {
    return `${label} huren bij Party-Up. In deze categorie staan momenteel geen items.`;
  }
  const prices = items.map((item) => item.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const pricePart =
    min === max
      ? `Prijs: ${money(min)} excl. BTW`
      : `Prijzen van ${money(min)} tot ${money(max)} excl. BTW`;
  return normalize(
    `${label} huren bij Party-Up. In deze categorie: ${joinNames(items.map((item) => item.name))}. ${pricePart} per huurperiode (vrijdag t/m zondag).`
  );
}

/** Visible product copy built only from stored fields and the site-wide huurperiode. */
export function productRentalParagraph(product: Product): string {
  const label = CATEGORY_LABEL[product.category].toLowerCase();
  const sentences = [
    `${product.name} huur je bij Party-Up in de categorie ${label}.`,
    `De huurprijs is ${money(product.price)} excl. BTW (${money(calculatePriceInclVAT(product.price))} incl. 21% BTW) per huurperiode van vrijdag tot en met zondag.`,
  ];
  if (typeof product.availabilityCount === "number") {
    sentences.push(`${product.availabilityCount} beschikbaar.`);
  }
  if (typeof product.deposit === "number") {
    sentences.push(`Waarborg: ${money(product.deposit)}.`);
  }
  if (typeof product.minimumRentalPeriod === "number") {
    sentences.push(`Minimale huurperiode: ${product.minimumRentalPeriod} dagen.`);
  }
  return normalize(sentences.join(" "));
}

export function productMetaDescription(product: Product): string {
  const label = CATEGORY_LABEL[product.category].toLowerCase();
  const lead = `${product.name} huren (${label}).`;
  const detail = normalize(product.description);
  const tail = `${money(product.price)} excl. BTW per huurperiode bij Party-Up.`;
  const full = normalize(`${lead} ${detail} ${tail}`);
  if (full.length <= 158) return full;

  const reserved = normalize(`${lead} ${tail}`);
  const bridge = "… ";
  const room = 158 - reserved.length - bridge.length;
  if (room < 24) return clipMeta(full);

  let snippet = detail.slice(0, room);
  const lastSpace = snippet.lastIndexOf(" ");
  if (lastSpace > 16) snippet = snippet.slice(0, lastSpace);
  snippet = snippet.trimEnd().replace(/[.,;:]+$/, "");
  return normalize(`${lead} ${snippet}${bridge}${tail}`);
}

export function productPageMetadata(product: Product): Metadata {
  const label = CATEGORY_LABEL[product.category];
  return pageMetadata(
    `${product.name} huren (${label})`,
    productMetaDescription(product),
    `/catalog/product/${product.id}`
  );
}

export function categoryPageMetadata(categoryId: Category): Metadata {
  const label = CATEGORY_LABEL[categoryId];
  return pageMetadata(
    `${label} huren`,
    categorySummary(categoryId),
    `/catalog/${categoryId}`
  );
}

export const catalogMetadata: Metadata = pageMetadata(
  "Feestmateriaal huren",
  catalogDescription(),
  "/catalog"
);

export const pricingMetadata: Metadata = pageMetadata(
  "Prijzen feestverhuur",
  "Alle huurprijzen van Party-Up op een rij. Excl. BTW, per huurperiode van vrijdag tot zondag. Geen verborgen kosten.",
  "/pricing"
);

export const bookingMetadata: Metadata = pageMetadata(
  "Offerte aanvragen",
  "Vraag een offerte aan voor feestmateriaal bij Party-Up. Kies items, datum en locatie. We nemen binnen 24 uur contact op.",
  "/booking"
);

export const faqMetadata: Metadata = pageMetadata(
  "Veelgestelde vragen",
  "Antwoorden over reserveren, de huurperiode van vrijdag tot zondag, zelf ophalen, borg, schade, annuleren en betalen bij Party-Up.",
  "/faq"
);

export const reviewsMetadata: Metadata = pageMetadata(
  "Klantbeoordelingen",
  "Beoordelingen van klanten over Party-Up: tenten, tafels en feestmateriaal voor verjaardagen, tuinfeesten, communies en kleine bedrijfsbijeenkomsten.",
  "/reviews"
);

export const contactMetadata: Metadata = pageMetadata(
  "Contact",
  "Contacteer Party-Up met een vraag over feestverhuur. Particulier of bedrijf, we reageren zo snel mogelijk. Mail ook via info@party-up.be.",
  "/contact"
);

export const privacyMetadata: Metadata = pageMetadata(
  "Privacybeleid",
  "Privacybeleid van Power Up BV, handelend als Party-Up.be. Welke gegevens we verzamelen bij offertes en verhuur, en hoe we die beschermen.",
  "/legal/privacy"
);

export const termsMetadata: Metadata = pageMetadata(
  "Algemene voorwaarden",
  "Algemene voorwaarden van Party-Up voor de verhuur van feest- en evenementmateriaal. Van toepassing op offertes, overeenkomsten en facturen.",
  "/legal/terms"
);

export const homeMetadata: Metadata = pageMetadata(HOME_TITLE, HOME_DESCRIPTION, "/", true);

export const cartMetadata: Metadata = {
  ...pageMetadata(
    "Winkelwagen",
    "Je geselecteerde feestmateriaal bij Party-Up. Deze winkelwagen is persoonlijk en wordt niet geïndexeerd.",
    "/cart"
  ),
  // Per-visitor cart has no search value. Keep it out of the index.
  robots: { index: false, follow: true },
};

function resolvedTitle(metadata: Metadata): string {
  const title = metadata.title;
  if (title && typeof title === "object" && "absolute" in title && title.absolute) {
    return title.absolute;
  }
  if (typeof title === "string") return `${title} | ${SITE_NAME}`;
  return "";
}

function resolvedDescription(metadata: Metadata): string {
  return typeof metadata.description === "string" ? metadata.description : "";
}

/** Throws when two indexable URLs would still share a title or description. */
export function assertUniqueIndexableMetadata(): void {
  const pages: { path: string; title: string; description: string }[] = [
    { path: "/", metadata: homeMetadata },
    { path: "/catalog", metadata: catalogMetadata },
    { path: "/pricing", metadata: pricingMetadata },
    { path: "/booking", metadata: bookingMetadata },
    { path: "/faq", metadata: faqMetadata },
    { path: "/reviews", metadata: reviewsMetadata },
    { path: "/contact", metadata: contactMetadata },
    { path: "/legal/terms", metadata: termsMetadata },
    { path: "/legal/privacy", metadata: privacyMetadata },
    ...categories.map((category) => ({
      path: `/catalog/${category.id}`,
      metadata: categoryPageMetadata(category.id),
    })),
    ...products.map((product) => ({
      path: `/catalog/product/${product.id}`,
      metadata: productPageMetadata(product),
    })),
  ].map(({ path, metadata }) => ({
    path,
    title: resolvedTitle(metadata),
    description: resolvedDescription(metadata),
  }));

  const problems: string[] = [];
  const seenTitles = new Map<string, string>();
  const seenDescriptions = new Map<string, string>();

  for (const page of pages) {
    if (!page.title || !page.description) {
      problems.push(`${page.path} is missing a title or description`);
    }
    const titleOwner = seenTitles.get(page.title);
    if (titleOwner) problems.push(`duplicate title "${page.title}" on ${titleOwner} and ${page.path}`);
    else seenTitles.set(page.title, page.path);

    const descriptionOwner = seenDescriptions.get(page.description);
    if (descriptionOwner) {
      problems.push(`duplicate description on ${descriptionOwner} and ${page.path}`);
    } else seenDescriptions.set(page.description, page.path);

    if (page.description.length > 158) {
      problems.push(`${page.path} description is ${page.description.length} characters`);
    }
  }

  if (problems.length > 0) {
    throw new Error(`Indexable metadata is not unique:\n${problems.join("\n")}`);
  }
}
