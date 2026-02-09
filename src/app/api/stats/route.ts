import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * GET /api/stats
 *
 * Returns aggregate outcome stats across all resolved claims.
 * Used on the landing page and dashboard to show social proof.
 * No auth required — data is anonymous aggregates only.
 */
export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      // Dev fallback with realistic sample stats
      return NextResponse.json({
        total_resolved: 127,
        avg_increase_pct: 47,
        total_extra_recovered: 412850,
        avg_settlement: 14200,
        avg_original_offer: 9660,
        claims_with_increase: 104,
        pct_with_increase: 82,
      });
    }

    const supabase = createServerSupabaseClient();

    // Fetch all resolved claims that have both offer_amount and final_settlement
    const { data: resolved, error } = await supabase
      .from("claims")
      .select("offer_amount, final_settlement")
      .eq("status", "resolved")
      .not("final_settlement", "is", null);

    if (error) {
      console.error("Stats query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 }
      );
    }

    if (!resolved || resolved.length === 0) {
      return NextResponse.json({
        total_resolved: 0,
        avg_increase_pct: 0,
        total_extra_recovered: 0,
        avg_settlement: 0,
        avg_original_offer: 0,
        claims_with_increase: 0,
        pct_with_increase: 0,
      });
    }

    const total_resolved = resolved.length;

    // Only consider claims where both values exist for comparison metrics
    const withBoth = resolved.filter(
      (c) => c.offer_amount != null && c.final_settlement != null
    );

    let total_extra_recovered = 0;
    let claims_with_increase = 0;
    let sum_settlement = 0;
    let sum_offer = 0;

    for (const c of resolved) {
      sum_settlement += c.final_settlement ?? 0;
    }

    for (const c of withBoth) {
      const diff = (c.final_settlement ?? 0) - (c.offer_amount ?? 0);
      if (diff > 0) {
        total_extra_recovered += diff;
        claims_with_increase++;
      }
      sum_offer += c.offer_amount ?? 0;
    }

    const avg_settlement = Math.round(sum_settlement / total_resolved);
    const avg_original_offer =
      withBoth.length > 0 ? Math.round(sum_offer / withBoth.length) : 0;
    const avg_increase_pct =
      avg_original_offer > 0
        ? Math.round(
            ((avg_settlement - avg_original_offer) / avg_original_offer) * 100
          )
        : 0;
    const pct_with_increase =
      withBoth.length > 0
        ? Math.round((claims_with_increase / withBoth.length) * 100)
        : 0;

    return NextResponse.json({
      total_resolved,
      avg_increase_pct,
      total_extra_recovered: Math.round(total_extra_recovered),
      avg_settlement,
      avg_original_offer,
      claims_with_increase,
      pct_with_increase,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to compute stats" },
      { status: 500 }
    );
  }
}
