import { NextRequest, NextResponse } from "next/server";
import { BookingFormData } from "@/types";
import {
  generateCustomerEmail,
  generateAdminEmail,
  sendEmail,
  ADMIN_INBOX,
  isSingleEmailAddress,
  smtpCredentialsConfigured,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data: BookingFormData = await request.json();

    // Validate required fields
    if (
      !data.startDate ||
      !data.endDate ||
      !data.eventLocation ||
      !data.numberOfGuests ||
      !data.contactName ||
      !data.contactEmail ||
      !data.contactPhone ||
      !data.selectedItems ||
      data.selectedItems.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (data.type === "bedrijf" && (!data.companyName?.trim() || !data.vatNumber?.trim())) {
      return NextResponse.json(
        { error: "Bedrijfsnaam en BTW-nummer zijn verplicht voor bedrijven" },
        { status: 400 }
      );
    }

    if (!isSingleEmailAddress(data.contactEmail)) {
      return NextResponse.json(
        { error: "Geldig e-mailadres is verplicht" },
        { status: 400 }
      );
    }

    if (!smtpCredentialsConfigured()) {
      console.error("Booking request rejected: SMTP credentials are not configured");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    // Generate email content
    const customerEmail = generateCustomerEmail(data);
    const adminEmail = generateAdminEmail(data);

    // Confirmation goes only to the submitter's own address. Admin copy goes to the fixed inbox.
    try {
      await sendEmail(data.contactEmail, customerEmail.subject, customerEmail.html, customerEmail.text);
      await sendEmail(ADMIN_INBOX, adminEmail.subject, adminEmail.html, adminEmail.text);
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
      // Continue even if email fails - the booking is still logged
    }

    // Log booking for now (in production, save to database)
    console.log("Booking request received:", data);

    return NextResponse.json(
      { message: "Booking request received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing booking request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

