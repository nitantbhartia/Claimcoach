import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI } from "@/lib/ai/client";
import { COUNTER_OFFER_PROMPT } from "@/lib/ai/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
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
      .replace("{claimType}", claimType || "Auto Property Damage")
      .replace("{vehicleInfo}", vehicleInfo || "Not provided")
      .replace("{insurerName}", insurerName || "Insurance Company")
      .replace("{offerAmount}", offerAmount.toString())
      .replace("{offerAnalysis}", JSON.stringify(offerAnalysis))
      .replace("{policyDetails}", JSON.stringify(policyDetails || {}))
      .replace("{damages}", JSON.stringify(damages || []))
      .replace("{financialImpacts}", JSON.stringify(financialImpacts || []));

    const result = await analyzeWithAI(
      prompt,
      `Generate a counter-offer package for this claim. Their offer: $${offerAmount}. Generate a professional, assertive counter-offer.`
    );

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const counterOffer = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ counterOffer });
  } catch (error) {
    console.error("Counter-offer generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate counter-offer. Please try again." },
      { status: 500 }
    );
  }
}
