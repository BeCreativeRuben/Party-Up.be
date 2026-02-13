import { BookingFormData } from "@/types";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

export function generateCustomerEmail(data: BookingFormData): { subject: string; html: string; text: string } {
  const selectedProducts = data.selectedItems
    .map((id) => getProductById(id))
    .filter((p) => p !== undefined);

  const total = selectedProducts.reduce((sum, product) => sum + (product?.price || 0), 0);

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
                (product) => `
                <div class="item">
                  <strong>${product?.name}</strong> - ${formatPrice(product?.price || 0)}
                </div>
              `
              ).join("")}
              <div class="total">Totaal: ${formatPrice(total)}</div>
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
${selectedProducts.map((p) => `- ${p?.name}: ${formatPrice(p?.price || 0)}`).join("\n")}

Totaal: ${formatPrice(total)}

${data.additionalNotes ? `Aanvullende Opmerkingen: ${data.additionalNotes}\n` : ""}

We bekijken je aanvraag en nemen binnen 24 uur contact met je op om de beschikbaarheid te bevestigen en de details af te ronden.

Als je vragen hebt, neem dan contact met ons op via info@party-up.be.

Power Up BV - Party-Up.be
  `.trim();

  return { subject, html, text };
}

export function generateAdminEmail(data: BookingFormData): { subject: string; html: string; text: string } {
  const selectedProducts = data.selectedItems
    .map((id) => getProductById(id))
    .filter((p) => p !== undefined);

  const total = selectedProducts.reduce((sum, product) => sum + (product?.price || 0), 0);

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
                (product) => `<p><strong>${product?.name}</strong> - ${formatPrice(product?.price || 0)}</p>`
              ).join("")}
              <p class="total">Totaal: ${formatPrice(total)}</p>
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
${selectedProducts.map((p) => `- ${p?.name}: ${formatPrice(p?.price || 0)}`).join("\n")}

Totaal: ${formatPrice(total)}

${data.additionalNotes ? `Aanvullende Opmerkingen: ${data.additionalNotes}\n` : ""}
  `.trim();

  return { subject, html, text };
}

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
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
              <p><strong>Naam:</strong> ${data.name}</p>
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
- Naam: ${data.name}
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

// TODO: Integrate with actual email service (Resend, SendGrid, Nodemailer, etc.)
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<boolean> {
  // Placeholder implementation
  // In production, integrate with email service:
  // - Resend: https://resend.com
  // - SendGrid: https://sendgrid.com
  // - Nodemailer with SMTP
  
  console.log("Email would be sent:", { to, subject });
  console.log("HTML:", html);
  console.log("Text:", text);
  
  // Return true for now - actual implementation needed
  return true;
}

