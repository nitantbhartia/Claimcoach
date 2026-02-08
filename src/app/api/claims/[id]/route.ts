import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch claim (RLS ensures user can only see their own)
    const { data: claim, error: claimError } = await supabase
      .from("claims")
      .select("*")
      .eq("id", params.id)
      .single();

    if (claimError || !claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    // Fetch related data in parallel
    const [documentsRes, expensesRes, policyRes, offerRes, counterRes] =
      await Promise.all([
        supabase
          .from("claim_documents")
          .select("*")
          .eq("claim_id", params.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("financial_impacts")
          .select("*")
          .eq("claim_id", params.id)
          .order("date", { ascending: false }),
        supabase
          .from("policy_analyses")
          .select("*")
          .eq("claim_id", params.id)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("offer_analyses")
          .select("*")
          .eq("claim_id", params.id)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("counter_offers")
          .select("*")
          .eq("claim_id", params.id)
          .order("created_at", { ascending: false })
          .limit(1),
      ]);

    // Fetch user profile for subscription tier
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_tier, stripe_customer_id")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      claim,
      documents: documentsRes.data ?? [],
      expenses: expensesRes.data ?? [],
      policyAnalysis: policyRes.data?.[0]?.analysis ?? null,
      offerAnalysis: offerRes.data?.[0]?.analysis ?? null,
      counterOffer: counterRes.data?.[0]?.counter_offer ?? null,
      subscription: profile?.subscription_tier ?? "free",
    });
  } catch (error) {
    console.error("Fetch claim error:", error);
    return NextResponse.json(
      { error: "Failed to fetch claim" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Whitelist allowed fields to prevent mass-assignment attacks
    const ALLOWED_FIELDS = new Set([
      "status",
      "offer_amount",
      "desired_amount",
      "fairness_score",
      "damage_description",
      "insurer_name",
      "claim_number",
      "has_offer",
      "filed_with_insurer",
      "policy_uploaded",
      "policy_summary",
      "coverage_limits",
      "hidden_coverages",
      "vehicle_year",
      "vehicle_make",
      "vehicle_model",
    ]);

    const updates: Record<string, unknown> = {};
    for (const key of Object.keys(body)) {
      if (ALLOWED_FIELDS.has(key)) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("claims")
      .update(updates)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ claim: data });
  } catch (error) {
    console.error("Update claim error:", error);
    return NextResponse.json(
      { error: "Failed to update claim" },
      { status: 500 }
    );
  }
}
