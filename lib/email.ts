import { BookingFormData } from "@/types";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

export function generateCustomerEmail(data: BookingFormData): { subject: string; html: string; text: string } {
  const selectedProducts = data.selectedItems
    .map((id) => getProductById(id))
    .filter((p) => p !== undefined);

  const total = selectedProducts.reduce((sum, product) => sum + (product?.price || 0), 0);

  const subject = `Booking Confirmation - Party-Up.be`;

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
            <p>No Nonsense Party Rental!</p>
          </div>
          <div class="content">
            <p>Dear ${data.contactName},</p>
            <p>Thank you for your booking request! We've received your reservation and will review it shortly.</p>
            
            <div class="section">
              <h2>Event Details</h2>
              <p><strong>Date:</strong> ${new Date(data.eventDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> ${data.eventLocation}</p>
              <p><strong>Number of Guests:</strong> ${data.numberOfGuests}</p>
            </div>

            <div class="section">
              <h2>Selected Items</h2>
              ${selectedProducts.map(
                (product) => `
                <div class="item">
                  <strong>${product?.name}</strong> - ${formatPrice(product?.price || 0)}
                </div>
              `
              ).join("")}
              <div class="total">Total: ${formatPrice(total)}</div>
            </div>

            ${data.additionalNotes ? `
            <div class="section">
              <h2>Additional Notes</h2>
              <p>${data.additionalNotes}</p>
            </div>
            ` : ""}

            <div class="section">
              <p>We'll review your request and get back to you within 24 hours to confirm availability and finalize the details.</p>
              <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:info@party-up.be">info@party-up.be</a>.</p>
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
Party-Up.be - Booking Confirmation

Dear ${data.contactName},

Thank you for your booking request! We've received your reservation and will review it shortly.

Event Details:
- Date: ${new Date(data.eventDate).toLocaleDateString()}
- Location: ${data.eventLocation}
- Number of Guests: ${data.numberOfGuests}

Selected Items:
${selectedProducts.map((p) => `- ${p?.name}: ${formatPrice(p?.price || 0)}`).join("\n")}

Total: ${formatPrice(total)}

${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}\n` : ""}

We'll review your request and get back to you within 24 hours to confirm availability and finalize the details.

If you have any questions, please contact us at info@party-up.be.

Power Up BV - Party-Up.be
  `.trim();

  return { subject, html, text };
}

export function generateAdminEmail(data: BookingFormData): { subject: string; html: string; text: string } {
  const selectedProducts = data.selectedItems
    .map((id) => getProductById(id))
    .filter((p) => p !== undefined);

  const total = selectedProducts.reduce((sum, product) => sum + (product?.price || 0), 0);

  const subject = `New Booking Request - ${data.contactName}`;

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
            <h1>New Booking Request</h1>
          </div>
          <div class="content">
            <div class="section">
              <h2>Contact Information</h2>
              <p><strong>Name:</strong> ${data.contactName}</p>
              <p><strong>Email:</strong> ${data.contactEmail}</p>
              <p><strong>Phone:</strong> ${data.contactPhone}</p>
            </div>

            <div class="section">
              <h2>Event Details</h2>
              <p><strong>Date:</strong> ${new Date(data.eventDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> ${data.eventLocation}</p>
              <p><strong>Number of Guests:</strong> ${data.numberOfGuests}</p>
            </div>

            <div class="section">
              <h2>Selected Items</h2>
              ${selectedProducts.map(
                (product) => `<p><strong>${product?.name}</strong> - ${formatPrice(product?.price || 0)}</p>`
              ).join("")}
              <p class="total">Total: ${formatPrice(total)}</p>
            </div>

            ${data.additionalNotes ? `
            <div class="section">
              <h2>Additional Notes</h2>
              <p>${data.additionalNotes}</p>
            </div>
            ` : ""}
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Booking Request

Contact Information:
- Name: ${data.contactName}
- Email: ${data.contactEmail}
- Phone: ${data.contactPhone}

Event Details:
- Date: ${new Date(data.eventDate).toLocaleDateString()}
- Location: ${data.eventLocation}
- Number of Guests: ${data.numberOfGuests}

Selected Items:
${selectedProducts.map((p) => `- ${p?.name}: ${formatPrice(p?.price || 0)}`).join("\n")}

Total: ${formatPrice(total)}

${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}\n` : ""}
  `.trim();

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

