import nodemailer from "nodemailer";
import { BookingFormData } from "@/types";
import { getProductById } from "@/lib/data/products";
import { formatPrice, calculateVAT, calculatePriceInclVAT } from "@/lib/utils";

function getItemCounts(selectedItems: string[]): Record<string, number> {
  return selectedItems.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function generateCustomerEmail(data: BookingFormData): { subject: string; html: string; text: string } {
  const itemCounts = getItemCounts(data.selectedItems);
  const uniqueIds = [...new Set(data.selectedItems)];
  const selectedProducts = uniqueIds
    .map((id) => getProductById(id))
    .filter((p) => p !== undefined);

  const total = selectedProducts.reduce((sum, product) => {
    const qty = itemCounts[product?.id ?? ""] ?? 0;
    return sum + (product?.price || 0) * qty;
  }, 0);
  const totalDeposit = selectedProducts.reduce((sum, product) => {
    const qty = itemCounts[product?.id ?? ""] ?? 0;
    return sum + (product?.deposit || 0) * qty;
  }, 0);

  const subtotalExclVAT = total;
  const vatAmount = calculateVAT(total);
  const totalInclVAT = calculatePriceInclVAT(total);

  const subject = `Boekingsbevestiging - Party-Up.be`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #dc2626, #0284c7); color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .section { margin-bottom: 20px; }
          .item { background: white; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
          .total { font-size: 1.2em; font-weight: bold; color: #dc2626; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Party-Up.be</h1>
            <p>No Nonsense Feestverhuur</p>
          </div>
          <div class="content">
            <p>Beste ${data.contactName},</p>
            <p>Bedankt voor je boekingsaanvraag! We hebben je reservering ontvangen en zullen deze binnenkort bekijken.</p>
            
            <div class="section">
              <h2>Evenementgegevens</h2>
              <p><strong>Huurperiode:</strong> ${data.rentalPeriodType === "standard" ? "Standaard (3 dagen - Vrijdag t/m Zondag)" : "Aangepaste periode"}</p>
              <p><strong>Ophaaldatum:</strong> ${new Date(data.startDate).toLocaleDateString('nl-BE')}</p>
              <p><strong>Retourdatum:</strong> ${new Date(data.endDate).toLocaleDateString('nl-BE')}</p>
              <p><strong>Locatie:</strong> ${data.eventLocation}</p>
              <p><strong>Aantal Gasten (schatting):</strong> ${data.numberOfGuests}</p>
            </div>

            <div class="section">
              <h2>Geselecteerde Items</h2>
              ${selectedProducts.map(
                (product) => {
                  const qty = itemCounts[product?.id ?? ""] ?? 0;
                  const lineTotalExclVAT = (product?.price || 0) * qty;
                  const lineVAT = calculateVAT(lineTotalExclVAT);
                  const lineTotalInclVAT = calculatePriceInclVAT(lineTotalExclVAT);
                  const lineDeposit = (product?.deposit || 0) * qty;
                  return `
                <div class="item">
                  <strong>${product?.name}</strong> × ${qty}<br>
                  Prijs/st: ${formatPrice(product?.price || 0)} excl. BTW<br>
                  Subtotaal: ${formatPrice(lineTotalExclVAT)} excl. BTW<br>
                  BTW (21%): ${formatPrice(lineVAT)}<br>
                  <strong>Totaal: ${formatPrice(lineTotalInclVAT)} incl. BTW</strong>
                  ${lineDeposit > 0 ? `<br><span style="color:#ea580c;">Waarborg: ${formatPrice(product?.deposit || 0)}/st = ${formatPrice(lineDeposit)}</span>` : ""}
                </div>
              `;
                }
              ).join("")}
              <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Subtotaal (per periode):</span>
                  <span>${formatPrice(subtotalExclVAT)} excl. BTW</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>BTW (21%):</span>
                  <span>${formatPrice(vatAmount)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold; padding-top: 8px; border-top: 2px solid #e5e7eb; margin-top: 8px;">
                  <span>Totaal incl. BTW:</span>
                  <span>${formatPrice(totalInclVAT)}</span>
                </div>
                ${totalDeposit > 0 ? `<div style="display: flex; justify-content: space-between; color:#ea580c; font-weight: bold; margin-top: 8px;">
                  <span>Totaal waarborg:</span>
                  <span>${formatPrice(totalDeposit)}</span>
                </div>` : ""}
              </div>
            </div>

            ${data.additionalNotes ? `
            <div class="section">
              <h2>Aanvullende Opmerkingen</h2>
              <p>${data.additionalNotes}</p>
            </div>
            ` : ""}

            <div class="section">
              <p>We bekijken je aanvraag en nemen binnen 24 uur contact met je op om de beschikbaarheid te bevestigen en de details af te ronden.</p>
              <p>Als je vragen hebt, aarzel dan niet om contact met ons op te nemen via <a href="mailto:info@party-up.be">info@party-up.be</a>.</p>
            </div>
          </div>
          <div class="footer">
            <p>Power Up BV - Party-Up.be</p>
            <p>info@party-up.be</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Party-Up.be - Boekingsbevestiging

Beste ${data.contactName},

Bedankt voor je boekingsaanvraag! We hebben je reservering ontvangen en zullen deze binnenkort bekijken.

Evenementgegevens:
- Huurperiode: ${data.rentalPeriodType === "standard" ? "Standaard (3 dagen - Vrijdag t/m Zondag)" : "Aangepaste periode"}
- Ophaaldatum: ${new Date(data.startDate).toLocaleDateString('nl-BE')}
- Retourdatum: ${new Date(data.endDate).toLocaleDateString('nl-BE')}
- Locatie: ${data.eventLocation}
- Aantal Gasten (schatting): ${data.numberOfGuests}

Geselecteerde Items:
${selectedProducts.map((p) => {
  const qty = itemCounts[p?.id ?? ""] ?? 0;
  const lineTotalExclVAT = (p?.price || 0) * qty;
  const lineVAT = calculateVAT(lineTotalExclVAT);
  const lineTotalInclVAT = calculatePriceInclVAT(lineTotalExclVAT);
  const lineDeposit = (p?.deposit || 0) * qty;
  return `- ${p?.name} × ${qty}
  Prijs/st: ${formatPrice(p?.price || 0)} excl. BTW
  Subtotaal: ${formatPrice(lineTotalExclVAT)} excl. BTW | BTW: ${formatPrice(lineVAT)} | Totaal: ${formatPrice(lineTotalInclVAT)} incl. BTW${lineDeposit > 0 ? `\n  Waarborg: ${formatPrice(lineDeposit)}` : ""}`;
}).join("\n\n")}

PRIJSOVERZICHT:
Subtotaal (per periode): ${formatPrice(subtotalExclVAT)} excl. BTW
BTW (21%): ${formatPrice(vatAmount)}
Totaal incl. BTW: ${formatPrice(totalInclVAT)}
${totalDeposit > 0 ? `Totaal waarborg: ${formatPrice(totalDeposit)}` : ""}

${data.additionalNotes ? `Aanvullende Opmerkingen: ${data.additionalNotes}\n` : ""}

We bekijken je aanvraag en nemen binnen 24 uur contact met je op om de beschikbaarheid te bevestigen en de details af te ronden.

Als je vragen hebt, neem dan contact met ons op via info@party-up.be.

Power Up BV - Party-Up.be
  `.trim();

  return { subject, html, text };
}

export function generateAdminEmail(data: BookingFormData): { subject: string; html: string; text: string } {
  const itemCounts = getItemCounts(data.selectedItems);
  const uniqueIds = [...new Set(data.selectedItems)];
  const selectedProducts = uniqueIds
    .map((id) => getProductById(id))
    .filter((p) => p !== undefined);

  const subtotalExclVAT = selectedProducts.reduce((sum, product) => {
    const qty = itemCounts[product?.id ?? ""] ?? 0;
    return sum + (product?.price || 0) * qty;
  }, 0);
  const vatAmount = calculateVAT(subtotalExclVAT);
  const totalInclVAT = calculatePriceInclVAT(subtotalExclVAT);
  const totalDeposit = selectedProducts.reduce((sum, product) => {
    const qty = itemCounts[product?.id ?? ""] ?? 0;
    return sum + (product?.deposit || 0) * qty;
  }, 0);

  const subject = `Nieuwe Boekingsaanvraag - ${data.contactName}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; }
          .content { background: #f9fafb; padding: 20px; }
          .section { margin-bottom: 20px; background: white; padding: 15px; border-radius: 5px; }
          .total { font-size: 1.2em; font-weight: bold; color: #dc2626; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nieuwe Boekingsaanvraag</h1>
          </div>
          <div class="content">
            <div class="section">
              <h2>Contactgegevens</h2>
              <p><strong>Naam:</strong> ${data.contactName}</p>
              <p><strong>E-mail:</strong> ${data.contactEmail}</p>
              <p><strong>Telefoon:</strong> ${data.contactPhone}</p>
            </div>

            <div class="section">
              <h2>Evenementgegevens</h2>
              <p><strong>Huurperiode:</strong> ${data.rentalPeriodType === "standard" ? "Standaard (3 dagen - Vrijdag t/m Zondag)" : "Aangepaste periode"}</p>
              <p><strong>Ophaaldatum:</strong> ${new Date(data.startDate).toLocaleDateString('nl-BE')}</p>
              <p><strong>Retourdatum:</strong> ${new Date(data.endDate).toLocaleDateString('nl-BE')}</p>
              <p><strong>Locatie:</strong> ${data.eventLocation}</p>
              <p><strong>Aantal Gasten (schatting):</strong> ${data.numberOfGuests}</p>
            </div>

            <div class="section">
              <h2>Geselecteerde Items</h2>
              ${selectedProducts.map(
                (product) => {
                  const qty = itemCounts[product?.id ?? ""] ?? 0;
                  const lineTotalExclVAT = (product?.price || 0) * qty;
                  const lineVAT = calculateVAT(lineTotalExclVAT);
                  const lineTotalInclVAT = calculatePriceInclVAT(lineTotalExclVAT);
                  const lineDeposit = (product?.deposit || 0) * qty;
                  return `<p><strong>${product?.name}</strong> × ${qty}<br>
                  Prijs/st: ${formatPrice(product?.price || 0)} excl. BTW<br>
                  Subtotaal: ${formatPrice(lineTotalExclVAT)} excl. BTW | BTW: ${formatPrice(lineVAT)} | <strong>Totaal: ${formatPrice(lineTotalInclVAT)} incl. BTW</strong>${lineDeposit > 0 ? ` <span style="color:#ea580c;">Waarborg: ${formatPrice(lineDeposit)}</span>` : ""}</p>`;
                }
              ).join("")}
              <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Subtotaal (per periode):</span>
                  <span>${formatPrice(subtotalExclVAT)} excl. BTW</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>BTW (21%):</span>
                  <span>${formatPrice(vatAmount)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold; padding-top: 8px; border-top: 2px solid #e5e7eb; margin-top: 8px;">
                  <span>Totaal incl. BTW:</span>
                  <span>${formatPrice(totalInclVAT)}</span>
                </div>
                ${totalDeposit > 0 ? `<div style="display: flex; justify-content: space-between; color:#ea580c; font-weight: bold; margin-top: 8px;">
                  <span>Totaal waarborg:</span>
                  <span>${formatPrice(totalDeposit)}</span>
                </div>` : ""}
              </div>
            </div>

            ${data.additionalNotes ? `
            <div class="section">
              <h2>Aanvullende Opmerkingen</h2>
              <p>${data.additionalNotes}</p>
            </div>
            ` : ""}
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Nieuwe Boekingsaanvraag

Contactgegevens:
- Naam: ${data.contactName}
- E-mail: ${data.contactEmail}
- Telefoon: ${data.contactPhone}

Evenementgegevens:
- Huurperiode: ${data.rentalPeriodType === "standard" ? "Standaard (3 dagen - Vrijdag t/m Zondag)" : "Aangepaste periode"}
- Ophaaldatum: ${new Date(data.startDate).toLocaleDateString('nl-BE')}
- Retourdatum: ${new Date(data.endDate).toLocaleDateString('nl-BE')}
- Locatie: ${data.eventLocation}
- Aantal Gasten (schatting): ${data.numberOfGuests}

Geselecteerde Items:
${selectedProducts.map((p) => {
  const qty = itemCounts[p?.id ?? ""] ?? 0;
  const lineTotalExclVAT = (p?.price || 0) * qty;
  const lineVAT = calculateVAT(lineTotalExclVAT);
  const lineTotalInclVAT = calculatePriceInclVAT(lineTotalExclVAT);
  const lineDeposit = (p?.deposit || 0) * qty;
  return `- ${p?.name} × ${qty}
  Prijs/st: ${formatPrice(p?.price || 0)} excl. BTW
  Subtotaal: ${formatPrice(lineTotalExclVAT)} excl. BTW | BTW: ${formatPrice(lineVAT)} | Totaal: ${formatPrice(lineTotalInclVAT)} incl. BTW${lineDeposit > 0 ? `\n  Waarborg: ${formatPrice(lineDeposit)}` : ""}`;
}).join("\n\n")}

PRIJSOVERZICHT:
Subtotaal (per periode): ${formatPrice(subtotalExclVAT)} excl. BTW
BTW (21%): ${formatPrice(vatAmount)}
Totaal incl. BTW: ${formatPrice(totalInclVAT)}
${totalDeposit > 0 ? `Totaal waarborg: ${formatPrice(totalDeposit)}` : ""}

${data.additionalNotes ? `Aanvullende Opmerkingen: ${data.additionalNotes}\n` : ""}
  `.trim();

  return { subject, html, text };
}

export type ContactFormData = {
  type: "particulier" | "bedrijf";
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  vatNumber?: string;
  subject: string;
  message: string;
};

export function generateContactEmail(data: ContactFormData): { subject: string; html: string; text: string } {
  const subject = `Contactformulier: ${data.subject}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #dc2626, #0284c7); color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .section { margin-bottom: 20px; background: white; padding: 15px; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Party-Up.be</h1>
            <p>Nieuw Contactformulier Bericht</p>
          </div>
          <div class="content">
            <div class="section">
              <h2>Contactgegevens</h2>
              <p><strong>Type:</strong> ${data.type === "bedrijf" ? "Bedrijf" : "Particulier"}</p>
              ${data.type === "bedrijf" && data.companyName ? `<p><strong>Bedrijfsnaam:</strong> ${data.companyName}</p>` : ""}
              ${data.type === "bedrijf" && data.vatNumber ? `<p><strong>BTW-nummer:</strong> ${data.vatNumber}</p>` : ""}
              <p><strong>${data.type === "bedrijf" ? "Contactpersoon" : "Naam"}:</strong> ${data.name}</p>
              <p><strong>E-mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              ${data.phone ? `<p><strong>Telefoon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ""}
            </div>

            <div class="section">
              <h2>Onderwerp</h2>
              <p>${data.subject}</p>
            </div>

            <div class="section">
              <h2>Bericht</h2>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
          <div class="footer">
            <p>Dit bericht is verzonden via het contactformulier op Party-Up.be</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Nieuw Contactformulier Bericht - Party-Up.be

Contactgegevens:
- Type: ${data.type === "bedrijf" ? "Bedrijf" : "Particulier"}
${data.type === "bedrijf" && data.companyName ? `- Bedrijfsnaam: ${data.companyName}` : ""}
${data.type === "bedrijf" && data.vatNumber ? `- BTW-nummer: ${data.vatNumber}` : ""}
- ${data.type === "bedrijf" ? "Contactpersoon" : "Naam"}: ${data.name}
- E-mail: ${data.email}
${data.phone ? `- Telefoon: ${data.phone}` : ""}

Onderwerp:
${data.subject}

Bericht:
${data.message}

---
Dit bericht is verzonden via het contactformulier op Party-Up.be
  `;

  return { subject, html, text };
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.log("Email skipped (SMTP not configured):", { to, subject });
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to,
      subject,
      html,
      text,
    });
    return true;
  } catch (err) {
    console.error("Send email error:", err);
    return false;
  }
}

