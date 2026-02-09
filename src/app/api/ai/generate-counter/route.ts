import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { COUNTER_OFFER_PROMPT } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    if (!isAIConfigured()) {
      return NextResponse.json({
        counterOffer: {
          demand_amount: 9981,
          letter: "[Dev mode] Sample counter-offer letter. Configure ANTHROPIC_API_KEY for real generation.",
          line_items: [
            { name: "Vehicle Base Value", amount: 6800 },
            { name: "Loss of Use", amount: 720 },
            { name: "Diminished Value", amount: 1800 },
            { name: "Sales Tax", amount: 476 },
            { name: "Registration & Title", amount: 185 },
          ],
          strategy_notes: "Counter with documented market comparables and state-specific entitlements.",
        },
      });
    }

    const body = await request.json();
    const {
      claimType,
      vehicleInfo,
      insurerName,
      offerAmount,
      offerAnalysis,
      policyDetails,
      damages,
      financialImpacts,
    } = body;

    if (!offerAmount || !offerAnalysis) {
      return NextResponse.json(
        { error: "Offer amount and analysis are required" },
        { status: 400 }
      );
    }

    const prompt = COUNTER_OFFER_PROMPT
      .replace("{claimType}", sanitizeField(claimType || "Auto Property Damage", 100))
      .replace("{vehicleInfo}", sanitizeField(vehicleInfo || "Not provided", 200))
      .replace("{insurerName}", sanitizeField(insurerName || "Insurance Company", 100))
      .replace("{offerAmount}", sanitizeField(String(Number(offerAmount) || 0), 20))
      .replace("{offerAnalysis}", sanitizeField(JSON.stringify(offerAnalysis), 5000))
      .replace("{policyDetails}", sanitizeField(JSON.stringify(policyDetails || {}), 5000))
      .replace("{damages}", sanitizeField(JSON.stringify(damages || []), 5000))
      .replace("{financialImpacts}", sanitizeField(JSON.stringify(financialImpacts || []), 5000));

    const safeAmount = Number(offerAmount) || 0;
    const result = await analyzeWithAI(
      prompt,
      `Generate a counter-offer package for this claim. Their offer: $${safeAmount}. Generate a professional, assertive counter-offer.`
    );

    const jsonStr = extractJSON(result);
    if (!jsonStr) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const counterOffer = JSON.parse(jsonStr);

    return NextResponse.json({ counterOffer });
  } catch (error) {
    console.error("Counter-offer generation error:", error);
    return NextResponse.json(
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
