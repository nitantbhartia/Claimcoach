import { NextRequest, NextResponse } from "next/server";

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

    // In production, verify the webhook signature with Stripe
    // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    // Parse the event
    const event = JSON.parse(body);

    switch (event.type) {
      case "checkout.session.completed": {
        // Handle successful payment
        // Update user's subscription tier or unlock per-claim access
        console.log("Payment successful:", event.data.object.id);
        break;
      }
      case "customer.subscription.updated": {
        // Handle subscription changes
        console.log("Subscription updated:", event.data.object.id);
        break;
      }
      case "customer.subscription.deleted": {
        // Handle subscription cancellation
        console.log("Subscription cancelled:", event.data.object.id);
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
