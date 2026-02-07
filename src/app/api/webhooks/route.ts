import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";

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

    if (process.env.STRIPE_WEBHOOK_SECRET) {
      try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Webhook signature verification failed:", message);
        return NextResponse.json(
          { error: `Webhook signature verification failed: ${message}` },
          { status: 400 }
        );
      }
    } else {
      // No webhook secret configured - parse raw (dev mode only)
      event = JSON.parse(body);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { userId, claimId, priceType } = session.metadata || {};

        console.log(
          `Payment successful: user=${userId}, claim=${claimId}, type=${priceType}`
        );

        // TODO: When Supabase is connected, update user's subscription_tier
        // and unlock the specific claim if per_claim payment
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log("Subscription updated:", subscription.id, "Status:", subscription.status);
        // TODO: Update user's subscription status in Supabase
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("Subscription cancelled:", subscription.id);
        // TODO: Downgrade user to free tier in Supabase
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("Payment failed for customer:", invoice.customer);
        // TODO: Notify user of failed payment
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
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
