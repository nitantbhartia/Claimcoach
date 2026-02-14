import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

const ESTIMATE_PROMPT = `You are an automotive valuation expert. Given a vehicle's details, estimate its current fair market value for a total loss insurance claim.

Consider: year, make, model, mileage, condition, and location (state affects pricing). Use your knowledge of KBB, NADA, and retail listing data.

Vehicle: {vehicleInfo}
Mileage: {mileage}
Condition: {condition}
State: {state}

Respond ONLY with JSON:
{
  "low_estimate": <number - conservative fair market value>,
  "mid_estimate": <number - most likely fair market value>,
  "high_estimate": <number - optimistic fair market value>,
  "adjustments": [
    {
      "factor": "<mileage|condition|location|trim|market_demand>",
      "label": "<human-readable label>",
      "impact": <number - positive or negative dollar adjustment>,
      "explanation": "<brief explanation>"
    }
  ],
  "base_value": <number - starting base value before adjustments>,
  "sources_referenced": ["<KBB>", "<NADA>", "<Edmunds>", "<local retail listings>"],
  "confidence": "<high|medium|low>",
  "notes": "<any caveats about the estimate>"
}`;


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleYear, vehicleMake, vehicleModel, mileage, condition, state } = body;

    if (!vehicleYear || !vehicleMake || !vehicleModel) {
      return NextResponse.json(
        { error: "Vehicle year, make, and model are required" },
        { status: 400 }
      );
    }

    const rl = checkRateLimit(`estimate-value:${request.headers.get("x-forwarded-for") || "anon"}`, RATE_LIMITS.ai.limit, RATE_LIMITS.ai.windowMs);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${rl.resetIn}s.` },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI valuation is not available. Please try again later." },
        { status: 503 }
      );
    }

    const vehicleInfo = sanitizeField(`${vehicleYear} ${vehicleMake} ${vehicleModel}`, 200);
    const safeMileage = sanitizeField(mileage ? String(mileage) : "Average for year", 30);
    const safeCondition = sanitizeField(condition || "Good", 30);
    const safeState = sanitizeField(state || "National average", 50);

    const prompt = ESTIMATE_PROMPT
      .replace("{vehicleInfo}", vehicleInfo)
      .replace("{mileage}", safeMileage)
      .replace("{condition}", safeCondition)
      .replace("{state}", safeState);

    const result = await analyzeWithAI(
      prompt,
      `Estimate the fair market value for a ${vehicleInfo} with ${safeMileage} miles in ${safeCondition} condition, located in ${safeState}.`
    );

    const jsonStr = extractJSON(result);
    if (!jsonStr) {
      return NextResponse.json(
        { error: "Failed to parse valuation data" },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonStr);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Estimate value error:", error);
    return NextResponse.json(
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
