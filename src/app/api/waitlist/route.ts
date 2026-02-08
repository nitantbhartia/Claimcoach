import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { email, interest } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim().slice(0, 320);

    const supabase = createServerSupabaseClient();

    const { error } = await supabase
      .from("waitlist")
      .upsert(
        { email: normalizedEmail, interest: interest || "general" },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Waitlist insert error:", error);
      // Don't leak whether email exists — always return success
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
