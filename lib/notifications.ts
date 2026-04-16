import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import type { BookingInput } from "@/lib/validation";

export async function sendBookingNotification(input: BookingInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.FROM_EMAIL;

  if (!apiKey || !adminEmail || !fromEmail) {
    return { sent: false, skipped: true as const };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromEmail,
    to: [adminEmail],
    subject: `New booking request — ${siteConfig.name}`,
    text: [
      `Name: ${input.name}`,
      `Phone: ${input.phone}`,
      `Service: ${input.service}`,
      `Date: ${input.date}`,
      `Window: ${input.window}`,
      `Details: ${input.details || "None"}`,
    ].join("\n"),
  });

  return { sent: true as const };
}
