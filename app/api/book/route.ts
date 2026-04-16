import { NextResponse } from "next/server";
import { isWindowAllowed } from "@/lib/booking";
import { sendBookingNotification } from "@/lib/notifications";
import { checkRateLimit, getClientIp, isSameOrigin } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ ok: false, message: "Origin not allowed." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (!checkRateLimit(`book:${ip}`, 8, 60_000)) {
      return NextResponse.json({ ok: false, message: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const raw = await request.json();
    const parsed = bookingSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.issues[0]?.message || "Please check the form and try again.",
        },
        { status: 400 }
      );
    }

    const input = parsed.data;

    if (input.website) {
      return NextResponse.json({ ok: true, message: "Request received." });
    }

    if (!isWindowAllowed(input.date, input.window)) {
      return NextResponse.json({ ok: false, message: "That appointment window is not available." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: existing, error: lookupError } = await supabase
      .from("appointments")
      .select("id")
      .eq("booking_date", input.date)
      .eq("booking_window", input.window)
      .in("status", ["pending", "confirmed"])
      .maybeSingle();

    if (lookupError && lookupError.code !== "PGRST116") {
      return NextResponse.json({ ok: false, message: lookupError.message }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ ok: false, message: "That time window has already been booked." }, { status: 409 });
    }

    const { error: insertError } = await supabase.from("appointments").insert({
      customer_name: input.name,
      phone: input.phone,
      service_type: input.service,
      booking_date: input.date,
      booking_window: input.window,
      details: input.details,
      status: "pending",
    });

    if (insertError) {
      const duplicate = insertError.message.toLowerCase().includes("duplicate") || insertError.code === "23505";
      return NextResponse.json(
        { ok: false, message: duplicate ? "That time window has already been booked." : insertError.message },
        { status: duplicate ? 409 : 500 }
      );
    }

    try {
      await sendBookingNotification(input);
    } catch {
      // Booking is already saved. Do not fail the request if email sending fails.
    }

    return NextResponse.json({ ok: true, message: "Booking saved successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Booking failed.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
