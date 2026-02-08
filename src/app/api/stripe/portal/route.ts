import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Look up the user's Stripe customer ID from their profile (prevents IDOR)
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    const customerId = profile?.stripe_customer_id;

    if (!customerId) {
      return NextResponse.json(
        { error: "No billing account found" },
        { status: 404 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
