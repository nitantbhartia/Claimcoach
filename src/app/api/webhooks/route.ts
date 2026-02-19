import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  sendPerClaimReceipt,
  sendProActivation,
  sendProCancelled,
} from "@/lib/email";

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

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let event;
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

    // -----------------------------------------------------------------------
    // Idempotency — skip events we've already processed
    // -----------------------------------------------------------------------
    const { data: existing } = await supabase
      .from("stripe_event_log")
      .select("event_id")
      .eq("event_id", event.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Record the event before processing to prevent races on concurrent retries
    await supabase.from("stripe_event_log").insert({ event_id: event.id });

    // -----------------------------------------------------------------------
    // Event handling
    // -----------------------------------------------------------------------
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { userId, claimId, priceType } = session.metadata || {};

        if (!userId) break;

        if (priceType === "per_claim") {
          // Use an RPC increment to avoid hard-resetting claims_used on replay
          await supabase.rpc("increment_claims_used", { user_id: userId });

          await supabase
            .from("profiles")
            .update({
              subscription_tier: "per_claim",
              stripe_customer_id: session.customer as string,
            })
            .eq("id", userId);

          if (claimId) {
            await supabase
              .from("claims")
              .update({ status: "offer_received" })
              .eq("id", claimId);
          }

          // Send payment receipt email
          const { data: profile } = await supabase
            .from("profiles")
            .select("email")
            .eq("id", userId)
            .single();

          if (profile?.email) {
            let vehicleDescription: string | undefined;
            if (claimId) {
              const { data: claim } = await supabase
                .from("claims")
                .select("vehicle_year, vehicle_make, vehicle_model")
                .eq("id", claimId)
                .single();
              if (claim) {
                vehicleDescription =
                  [claim.vehicle_year, claim.vehicle_make, claim.vehicle_model]
                    .filter(Boolean)
                    .join(" ") || undefined;
              }
            }
            await sendPerClaimReceipt({
              to: profile.email,
              claimId: claimId ?? undefined,
              vehicleDescription,
              amountCents: session.amount_total ?? 7900,
              stripeReceiptUrl:
                (session as { receipt_url?: string }).receipt_url ?? undefined,
            });
          }
        } else if (priceType === "pro") {
          await supabase
            .from("profiles")
            .update({
              subscription_tier: "pro",
              stripe_customer_id: session.customer as string,
            })
            .eq("id", userId);

          const { data: profile } = await supabase
            .from("profiles")
            .select("email")
            .eq("id", userId)
            .single();

          if (profile?.email) {
            await sendProActivation({
              to: profile.email,
              stripeReceiptUrl:
                (session as { receipt_url?: string }).receipt_url ?? undefined,
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

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
        const customerId = subscription.customer as string;

        await supabase
          .from("profiles")
          .update({ subscription_tier: "free" })
          .eq("stripe_customer_id", customerId);

        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile?.email) {
          await sendProCancelled(profile.email);
        }
        break;
      }

      case "invoice.payment_failed":
        // Subscription status changes are handled by customer.subscription.updated
        break;

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
