import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, DEV_USER } from "@/lib/auth";

export const runtime = "nodejs";

function generateDevId(): string {
  return "dev-" + Math.random().toString(36).substring(2, 10);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    const claimRow = {
      user_id: user.id,
      claim_type: body.claim_type || "auto",
      accident_date: body.accident_date || null,
      fault_status: body.fault_status || "unknown",
      filed_with_insurer: body.filed_with_insurer ?? false,
      insurer_name: body.insurer_name || null,
      claim_number: body.claim_number || null,
      has_offer: body.has_offer ?? false,
      offer_amount: body.offer_amount ?? null,
      vehicle_year: body.vehicle_year || null,
      vehicle_make: body.vehicle_make || null,
      vehicle_model: body.vehicle_model || null,
      damage_description: body.damage_description || null,
      state: body.state || null,
      status: body.has_offer ? "offer_received" : "documenting",
    };

    const { data, error } = await supabase
      .from("claims")
      .insert(claimRow)
      .select()
      .single();

    if (error) {
      console.error("Create claim DB error:", error);

      // If the DB operation fails in dev mode, return a mock claim
      // so the user can continue testing the UI flow
      if (!isSupabaseConfigured()) {
        const now = new Date().toISOString();
        return NextResponse.json({
          claim: {
            id: generateDevId(),
            ...claimRow,
            created_at: now,
            updated_at: now,
          },
        }, { status: 201 });
      }

      return NextResponse.json({ error: "Failed to create claim" }, { status: 500 });
    }

    return NextResponse.json({ claim: data }, { status: 201 });
  } catch (error) {
    console.error("Create claim error:", error);

    // If Supabase is not configured, still allow claim creation with mock data
    if (!isSupabaseConfigured()) {
      const now = new Date().toISOString();
      return NextResponse.json({
        claim: {
          id: generateDevId(),
          claim_type: "auto",
          status: "documenting",
          created_at: now,
          updated_at: now,
        },
      }, { status: 201 });
    }

    return NextResponse.json(
      { error: "Failed to create claim" },
      { status: 500 }
    );
  }
}

export async function GET() {
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

    // Explicit user_id filter as defense-in-depth (supplements RLS)
    const { data, error } = await supabase
      .from("claims")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("List claims DB error:", error);

      // Return empty list in dev mode so dashboard still renders
      if (!isSupabaseConfigured()) {
        return NextResponse.json({ claims: [] });
      }

      return NextResponse.json({ error: "Failed to fetch claims" }, { status: 500 });
    }

    return NextResponse.json({ claims: data ?? [] });
  } catch (error) {
    console.error("List claims error:", error);

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ claims: [] });
    }

    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    );
  }
}
