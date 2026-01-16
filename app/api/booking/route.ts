import { NextRequest, NextResponse } from "next/server";
import { BookingFormData } from "@/types";
import { generateCustomerEmail, generateAdminEmail, sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data: BookingFormData = await request.json();

    // Validate required fields
    if (
      !data.eventDate ||
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

    // Generate email content
    const customerEmail = generateCustomerEmail(data);
    const adminEmail = generateAdminEmail(data);

    // Send emails
    // Note: In production, you'll need to configure an actual email service
    // The sendEmail function is a placeholder that logs to console
    try {
      await sendEmail(data.contactEmail, customerEmail.subject, customerEmail.html, customerEmail.text);
      await sendEmail("info@party-up.be", adminEmail.subject, adminEmail.html, adminEmail.text);
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

