import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, DEV_USER } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // If Stripe is not configured, return a message instead of crashing
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment." },
        { status: 503 }
      );
    }

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

    // Use configured app URL to prevent host header poisoning
    const origin = process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin");
    if (!origin) {
      return NextResponse.json(
        { error: "App URL not configured" },
        { status: 500 }
      );
    }

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
