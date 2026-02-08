import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event;

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { userId, claimId, priceType } = session.metadata || {};

        if (userId) {
          if (priceType === "per_claim") {
            await supabase
              .from("profiles")
              .update({
                subscription_tier: "per_claim",
                stripe_customer_id: session.customer,
                claims_used: 1,
              })
              .eq("id", userId);

            if (claimId) {
              await supabase
                .from("claims")
                .update({ status: "offer_received" })
                .eq("id", claimId);
            }
          } else if (priceType === "pro") {
            await supabase
              .from("profiles")
              .update({
                subscription_tier: "pro",
                stripe_customer_id: session.customer,
              })
              .eq("id", userId);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        if (subscription.status === "active") {
          await supabase
            .from("profiles")
            .update({ subscription_tier: "pro" })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        await supabase
          .from("profiles")
          .update({ subscription_tier: "free" })
          .eq("stripe_customer_id", customerId);
        break;
      }

      case "invoice.payment_failed": {
        // Subscription status changes are handled by customer.subscription.updated
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
