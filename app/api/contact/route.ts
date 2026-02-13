import { NextRequest, NextResponse } from "next/server";
import { generateContactEmail, sendEmail, ContactFormData } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (
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

    // Generate email content
    const adminEmail = generateContactEmail(data);

    // Send email to admin
    // Note: In production, you'll need to configure an actual email service
    // The sendEmail function is a placeholder that logs to console
    try {
      await sendEmail("info@party-up.be", adminEmail.subject, adminEmail.html, adminEmail.text);
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
