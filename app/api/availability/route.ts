import { NextResponse } from "next/server";
import { getAvailableWindowsForDate, isValidBookingDate } from "@/lib/booking";
import { checkRateLimit, getClientIp, isSameOrigin } from "@/lib/security";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ ok: false, message: "Origin not allowed." }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (!checkRateLimit(`availability:${ip}`, 30, 60_000)) {
      return NextResponse.json({ ok: false, message: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const url = new URL(request.url);
    const date = url.searchParams.get("date") || "";

    if (!isValidBookingDate(date)) {
      return NextResponse.json({ ok: false, message: "Please choose a valid booking date." }, { status: 400 });
    }

    const windows = getAvailableWindowsForDate(date);
    if (windows.length === 0) {
      return NextResponse.json({ ok: true, windows: [], unavailable: [] });
    }

    const supabase = getSupabaseAdmin();
    
    // Get booked appointments
    const { data: appointments, error: appointmentsError } = await supabase
      .from("appointments")
      .select("booking_window")
      .eq("booking_date", date)
      .in("status", ["pending", "confirmed"]);

    if (appointmentsError) {
      return NextResponse.json({ ok: false, message: appointmentsError.message }, { status: 500 });
    }

    // Get owner unavailability
    const { data: ownerUnavailable, error: ownerError } = await supabase
      .from("owner_availability")
      .select("booking_window")
      .eq("date", date)
      .eq("is_available", false);

    if (ownerError) {
      return NextResponse.json({ ok: false, message: ownerError.message }, { status: 500 });
    }

    const bookedWindows = (appointments ?? []).map((row: any) => row.booking_window as string);
    const ownerBusyWindows = (ownerUnavailable ?? []).map((row: any) => row.booking_window as string);
    const unavailable = [...new Set([...bookedWindows, ...ownerBusyWindows])];
    
    return NextResponse.json({ ok: true, windows, unavailable });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load availability.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
