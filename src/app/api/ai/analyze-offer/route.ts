import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { OFFER_ANALYSIS_PROMPT } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth";
import { checkAIRateLimit } from "@/lib/rate-limit";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkAIRateLimit(auth.user.id);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before making another request." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetInMs / 1000)) } }
      );
    }

    if (!isAIConfigured()) {
      return NextResponse.json({
        analysis: {
          fairness_score: 38,
          fair_value_estimate: 9981,
          line_items: [
            { name: "Vehicle Base Value", their_amount: 4200, fair_amount: 6800 },
            { name: "Loss of Use / Rental", their_amount: 0, fair_amount: 720 },
            { name: "Diminished Value", their_amount: 0, fair_amount: 1800 },
            { name: "Sales Tax on Replacement", their_amount: 0, fair_amount: 476 },
            { name: "Registration / Title", their_amount: 0, fair_amount: 185 },
          ],
          summary: "[Dev mode] Sample offer analysis. Configure ANTHROPIC_API_KEY for real analysis.",
          recommendations: [
            "Request comparable vehicle listings to challenge base value",
            "File diminished value claim",
            "Include sales tax and registration fees in demand",
          ],
        },
      });
    }

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
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
