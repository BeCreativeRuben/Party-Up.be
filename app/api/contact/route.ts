import { NextRequest, NextResponse } from "next/server";
import {
  generateContactEmail,
  sendEmail,
  ContactFormData,
  ADMIN_INBOX,
  isSingleEmailAddress,
  smtpCredentialsConfigured,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields. Recipient is never taken from the body.
    if (
      (data.type !== "particulier" && data.type !== "bedrijf") ||
      !data.name ||
      !data.email ||
      !data.subject ||
      !data.message
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isSingleEmailAddress(data.email)) {
      return NextResponse.json(
        { error: "Geldig e-mailadres is verplicht" },
        { status: 400 }
      );
    }

    // Validate company fields if type is bedrijf
    if (data.type === "bedrijf" && (!data.companyName || !data.vatNumber)) {
      return NextResponse.json(
        { error: "Bedrijfsnaam en BTW-nummer zijn verplicht voor bedrijven" },
        { status: 400 }
      );
    }

    if (!smtpCredentialsConfigured()) {
      console.error("Contact form rejected: SMTP credentials are not configured");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    // Generate email content
    const adminEmail = generateContactEmail(data);

    // Always deliver to the fixed inbox. Caller-supplied to/cc/bcc/recipient fields are ignored.
    try {
      await sendEmail(ADMIN_INBOX, adminEmail.subject, adminEmail.html, adminEmail.text);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue even if email fails - the contact form is still logged
    }

    // Log contact form submission for now (in production, save to database)
    console.log("Contact form submitted:", data);

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
