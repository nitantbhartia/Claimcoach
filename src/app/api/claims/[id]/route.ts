import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, DEV_USER } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient();
    let user: { id: string; email?: string } | null = null;

    if (!isSupabaseConfigured()) {
      user = DEV_USER;
    } else {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch claim with explicit user_id filter (defense-in-depth, supplements RLS)
    const { data: claim, error: claimError } = await supabase
      .from("claims")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (claimError || !claim) {
      // In dev mode, return a placeholder claim so the UI renders
      if (!isSupabaseConfigured()) {
        const now = new Date().toISOString();
        return NextResponse.json({
          claim: {
            id: params.id,
            user_id: user.id,
            claim_type: "auto",
            status: "documenting",
            created_at: now,
            updated_at: now,
          },
          documents: [],
          expenses: [],
          policyAnalysis: null,
          offerAnalysis: null,
          counterOffer: null,
          subscription: "free",
        });
      }
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

    if (!isSupabaseConfigured()) {
      const now = new Date().toISOString();
      return NextResponse.json({
        claim: {
          id: params.id,
          claim_type: "auto",
          status: "documenting",
          created_at: now,
          updated_at: now,
        },
        documents: [],
        expenses: [],
        policyAnalysis: null,
        offerAnalysis: null,
        counterOffer: null,
        subscription: "free",
      });
    }

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
    let user: { id: string; email?: string } | null = null;

    if (!isSupabaseConfigured()) {
      user = DEV_USER;
    } else {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    }

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
      "state",
    ]);

    const updates: Record<string, unknown> = {};
    for (const key of Object.keys(body)) {
      if (ALLOWED_FIELDS.has(key)) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Explicit user_id filter on PATCH to prevent IDOR
    const { data, error } = await supabase
      .from("claims")
      .update(updates)
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Update claim DB error:", error);
      return NextResponse.json({ error: "Failed to update claim" }, { status: 500 });
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
