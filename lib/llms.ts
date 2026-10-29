import { BUSINESS, BUSINESS_ADDRESS_LINE } from "@/lib/business";
import { faqs } from "@/lib/faq";
import { products } from "@/lib/data/products";
import { SITE_ORIGIN, categoryLabel } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export function buildLlmsTxt(): string {
  const priceLines = products
    .map((product) => {
      const deposit =
        typeof product.deposit === "number" ? ` Waarborg ${formatPrice(product.deposit)}.` : "";
      return `- ${product.name} (${categoryLabel(product.category)}): ${formatPrice(product.price)} excl. BTW per huurperiode.${deposit} ${SITE_ORIGIN}/catalog/product/${product.id}`;
    })
    .join("\n");

  const faqLines = faqs
    .map((faq) => `### ${faq.question}\n${faq.answer}`)
    .join("\n\n");

  return `# ${BUSINESS.brand}

> ${BUSINESS.brand} is de handelsnaam van ${BUSINESS.legalName}. Feest- en evenementverhuur voor privéfeesten en kleine professionele evenementen in België. Klanten halen het materiaal zelf op en brengen het zelf terug. Geen bezorging.

## Who
- Brand: ${BUSINESS.brand}
- Legal name: ${BUSINESS.legalName}
- Slogan: No Nonsense Feestverhuur

## What
Verhuur van feest- en evenementmateriaal (tenten, tafels en stoelen, cateringmateriaal, geluid en licht, decoratie en faciliteiten zoals een VIP WC-wagen). Geschikt voor evenementen met 10 tot 100 gasten. Standaard huurperiode: ophalen vrijdagavond, terugbrengen zondagavond. Prijzen zijn exclusief 21% BTW en gelden per huurperiode, tenzij een productbeschrijving iets anders zegt. Geen bezorgservice.

## Area served
${BUSINESS.areaServed}. De algemene voorwaarden beperken de huur tot het Belgisch grondgebied. Ophalen en terugbrengen op ${BUSINESS_ADDRESS_LINE}. Ophalen standaard 's avonds na 18:00 uur; andere tijden zijn bespreekbaar.

## Contact
- Email: ${BUSINESS.email}
- Phone: ${BUSINESS.phoneDisplay}
- Address: ${BUSINESS_ADDRESS_LINE}
- Quote form: ${SITE_ORIGIN}/booking
- Contact form: ${SITE_ORIGIN}/contact

## Prices
Alle prijzen hieronder komen van de catalogus en zijn excl. 21% BTW, per huurperiode van vrijdag tot en met zondag.

${priceLines}

Volledige tabel: ${SITE_ORIGIN}/pricing

## FAQ

${faqLines}

Volledige pagina: ${SITE_ORIGIN}/faq

## Pages
- ${SITE_ORIGIN}/
- ${SITE_ORIGIN}/catalog
- ${SITE_ORIGIN}/pricing
- ${SITE_ORIGIN}/booking
- ${SITE_ORIGIN}/faq
- ${SITE_ORIGIN}/contact
- ${SITE_ORIGIN}/reviews
- ${SITE_ORIGIN}/legal/terms
- ${SITE_ORIGIN}/legal/privacy
`;
}
