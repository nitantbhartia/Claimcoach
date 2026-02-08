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

    const { priceType, claimId } = await request.json();
    const userId = user?.id || "";
    const userEmail = user?.email || "";

    if (!priceType || !["per_claim", "pro"].includes(priceType)) {
      return NextResponse.json(
        { error: "Invalid price type. Must be 'per_claim' or 'pro'." },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Look up or create customer
    let customerId: string | undefined;
    if (userEmail) {
      const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({ email: userEmail });
        customerId = customer.id;
      }
    }

    const sessionParams: Record<string, unknown> = {
      customer: customerId,
      payment_method_types: ["card"],
      success_url: `${origin}/dashboard?payment=success&claim=${claimId || ""}`,
      cancel_url: `${origin}/pricing?payment=cancelled`,
      metadata: {
        userId: userId || "",
        claimId: claimId || "",
        priceType,
      },
    };

    if (priceType === "per_claim") {
      // One-time payment for a single claim
      sessionParams.mode = "payment";
      sessionParams.line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ClaimCoach Full Toolkit",
              description: "Complete AI analysis, counter-offer letter, and negotiation toolkit for one claim",
            },
            unit_amount: 7900, // $79.00
          },
          quantity: 1,
        },
      ];
    } else {
      // Monthly subscription
      sessionParams.mode = "subscription";
      sessionParams.line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ClaimCoach Pro",
              description: "Unlimited claims, full AI toolkit, priority support",
            },
            unit_amount: 14700, // $147.00/quarter ($49/mo billed quarterly)
            recurring: { interval: "month", interval_count: 3 },
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams as Parameters<typeof stripe.checkout.sessions.create>[0]);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
