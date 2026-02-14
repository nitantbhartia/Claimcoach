import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAuth, isSupabaseConfigured } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

const VALID_CLAIM_TYPES = new Set(["auto", "property", "health", "other"]);
const VALID_FAULT_STATUSES = new Set(["at_fault", "not_at_fault", "partial", "unknown"]);
const MAX_STRING_LENGTH = 500;

function sanitizeString(val: unknown, maxLen = MAX_STRING_LENGTH): string | null {
  if (val == null || typeof val !== "string") return null;
  return val.trim().slice(0, maxLen) || null;
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkRateLimit(`${auth.user.id}:create-claim`, RATE_LIMITS.write.limit, RATE_LIMITS.write.windowMs);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${rl.resetIn}s.` },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate claim_type
    const claimType = typeof body.claim_type === "string" ? body.claim_type : "auto";
    if (!VALID_CLAIM_TYPES.has(claimType)) {
      return NextResponse.json(
        { error: `Invalid claim type. Must be one of: ${Array.from(VALID_CLAIM_TYPES).join(", ")}` },
        { status: 400 }
      );
    }

    // Validate fault_status
    const faultStatus = typeof body.fault_status === "string" ? body.fault_status : "unknown";
    if (!VALID_FAULT_STATUSES.has(faultStatus)) {
      return NextResponse.json(
        { error: `Invalid fault status. Must be one of: ${Array.from(VALID_FAULT_STATUSES).join(", ")}` },
        { status: 400 }
      );
    }

    // Validate offer_amount if provided
    const offerAmount = body.offer_amount != null ? Number(body.offer_amount) : null;
    if (offerAmount != null && (isNaN(offerAmount) || offerAmount < 0 || offerAmount > 10_000_000)) {
      return NextResponse.json(
        { error: "Offer amount must be a number between 0 and 10,000,000" },
        { status: 400 }
      );
    }

    // Validate accident_date if provided
    const accidentDate = sanitizeString(body.accident_date, 10);
    if (accidentDate && !/^\d{4}-\d{2}-\d{2}$/.test(accidentDate)) {
      return NextResponse.json(
        { error: "Accident date must be in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const claimRow = {
      user_id: auth.user.id,
      claim_type: claimType,
      accident_date: accidentDate,
      fault_status: faultStatus,
      filed_with_insurer: Boolean(body.filed_with_insurer),
      insurer_name: sanitizeString(body.insurer_name, 200),
      claim_number: sanitizeString(body.claim_number, 100),
      has_offer: Boolean(body.has_offer),
      offer_amount: offerAmount,
      vehicle_year: sanitizeString(body.vehicle_year, 4),
      vehicle_make: sanitizeString(body.vehicle_make, 50),
      vehicle_model: sanitizeString(body.vehicle_model, 50),
      damage_description: sanitizeString(body.damage_description, 2000),
      state: sanitizeString(body.state, 2),
      status: body.has_offer ? "offer_received" : "documenting",
    };

    const { data, error } = await supabase
      .from("claims")
      .insert(claimRow)
      .select()
      .single();

    if (error) {
      console.error("Create claim DB error:", error);
      return NextResponse.json({ error: "Failed to create claim" }, { status: 500 });
    }

    return NextResponse.json({ claim: data }, { status: 201 });
  } catch (error) {
    console.error("Create claim error:", error);
    return NextResponse.json(
      { error: "Failed to create claim" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 503 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Explicit user_id filter as defense-in-depth (supplements RLS)
    const { data, error } = await supabase
      .from("claims")
      .select("*")
      .eq("user_id", auth.user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("List claims DB error:", error);
      return NextResponse.json({ error: "Failed to fetch claims" }, { status: 500 });
    }

    return NextResponse.json({ claims: data ?? [] });
  } catch (error) {
    console.error("List claims error:", error);
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    );
  }
}
