import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAuth, isSupabaseConfigured } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

const VALID_CATEGORIES = new Set([
  "rental",
  "towing",
  "medical",
  "repair",
  "transportation",
  "lost_wages",
  "storage",
  "other",
]);

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkRateLimit(`${auth.user.id}:create-expense`, RATE_LIMITS.write.limit, RATE_LIMITS.write.windowMs);
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
    const supabase = createServerSupabaseClient();

    // Validate required fields
    if (!body.category || !VALID_CATEGORIES.has(body.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${Array.from(VALID_CATEGORIES).join(", ")}` },
        { status: 400 }
      );
    }

    if (!body.description || typeof body.description !== "string" || body.description.trim().length === 0) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const amount = Number(body.amount);
    if (isNaN(amount) || amount < 0 || amount > 10_000_000) {
      return NextResponse.json(
        { error: "Amount must be a number between 0 and 10,000,000" },
        { status: 400 }
      );
    }

    if (body.date && !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
      return NextResponse.json(
        { error: "Date must be in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    // Verify claim ownership explicitly to prevent IDOR
    const { data: claim } = await supabase
      .from("claims")
      .select("id, user_id")
      .eq("id", params.id)
      .eq("user_id", auth.user.id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("financial_impacts")
      .insert({
        claim_id: params.id,
        category: body.category,
        description: body.description.trim().slice(0, 500),
        amount,
        date: body.date || null,
        receipt_url: typeof body.receipt_url === "string" ? body.receipt_url.slice(0, 2000) : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Create expense DB error:", error);
      return NextResponse.json(
        { error: "Failed to create expense" },
        { status: 500 }
      );
    }

    return NextResponse.json({ expense: data }, { status: 201 });
  } catch (error) {
    console.error("Create expense error:", error);
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Verify claim ownership explicitly to prevent IDOR
    const { data: claim } = await supabase
      .from("claims")
      .select("id, user_id")
      .eq("id", params.id)
      .eq("user_id", auth.user.id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    const { expenseId } = await request.json();

    if (!expenseId || typeof expenseId !== "string") {
      return NextResponse.json({ error: "expenseId is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("financial_impacts")
      .delete()
      .eq("id", expenseId)
      .eq("claim_id", params.id);

    if (error) {
      console.error("Delete expense DB error:", error);
      return NextResponse.json(
        { error: "Failed to delete expense" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete expense error:", error);
    return NextResponse.json(
      { error: "Failed to delete expense" },
      { status: 500 }
    );
  }
}
