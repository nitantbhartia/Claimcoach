import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { COUNTER_OFFER_PROMPT } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkRateLimit(`${auth.user.id}:generate-counter`, RATE_LIMITS.ai.limit, RATE_LIMITS.ai.windowMs);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${rl.resetIn}s.` },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI generation is not available. Please try again later." },
        { status: 503 }
      );
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
