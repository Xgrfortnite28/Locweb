import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ ok: false, message: "Invalid date format." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("owner_availability")
      .select("*")
      .eq("date", date);

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, availability: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load owner availability.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, booking_window, is_available, reason } = body;

    if (!date || !booking_window || typeof is_available !== "boolean") {
      return NextResponse.json(
        { ok: false, message: "Missing required fields: date, booking_window, is_available" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("owner_availability")
      .upsert(
        { date, booking_window, is_available, reason: reason || null },
        { onConflict: "date,booking_window" }
      )
      .select();

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update availability.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
