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

    const { data, error } = await supabase
      .from("claims")
      .update(body)
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
