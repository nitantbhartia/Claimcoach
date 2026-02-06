import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI } from "@/lib/ai/client";
import { OFFER_ANALYSIS_PROMPT } from "@/lib/ai/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { offerAmount, claimType, vehicleInfo, damageDescription, coverageLimits, expenses } = body;

    if (!offerAmount || typeof offerAmount !== "number") {
      return NextResponse.json(
        { error: "Offer amount is required" },
        { status: 400 }
      );
    }

    const prompt = OFFER_ANALYSIS_PROMPT
      .replace("{claimType}", claimType || "Auto Property Damage")
      .replace("{vehicleInfo}", vehicleInfo || "Not provided")
      .replace("{damageDescription}", damageDescription || "Not provided")
      .replace("{offerAmount}", offerAmount.toString())
      .replace("{coverageLimits}", JSON.stringify(coverageLimits || {}))
      .replace("{expenses}", JSON.stringify(expenses || []));

    const result = await analyzeWithAI(
      prompt,
      `Please analyze this settlement offer of $${offerAmount} for the described claim.`
    );

    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Offer analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze offer. Please try again." },
      { status: 500 }
    );
  }
}
