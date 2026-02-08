import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI } from "@/lib/ai/client";
import { OFFER_ANALYSIS_PROMPT } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const body = await request.json();
    const { offerAmount, claimType, vehicleInfo, damageDescription, coverageLimits, expenses } = body;

    if (!offerAmount || typeof offerAmount !== "number") {
      return NextResponse.json(
        { error: "Offer amount is required" },
        { status: 400 }
      );
    }

    const safeAmount = Number(offerAmount) || 0;
    const prompt = OFFER_ANALYSIS_PROMPT
      .replace("{claimType}", sanitizeField(claimType || "Auto Property Damage", 100))
      .replace("{vehicleInfo}", sanitizeField(vehicleInfo || "Not provided", 200))
      .replace("{damageDescription}", sanitizeField(damageDescription || "Not provided", 1000))
      .replace("{offerAmount}", sanitizeField(String(safeAmount), 20))
      .replace("{coverageLimits}", sanitizeField(JSON.stringify(coverageLimits || {}), 5000))
      .replace("{expenses}", sanitizeField(JSON.stringify(expenses || []), 5000));

    const result = await analyzeWithAI(
      prompt,
      `Please analyze this settlement offer of $${safeAmount} for the described claim.`
    );

    const jsonStr = extractJSON(result);
    if (!jsonStr) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonStr);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Offer analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze offer. Please try again." },
      { status: 500 }
    );
  }
}
