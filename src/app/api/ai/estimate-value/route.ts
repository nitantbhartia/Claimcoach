import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";
import { checkRateLimit } from "@/lib/rate-limit";

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

// Dev fallback
function devEstimate(year: string, make: string, model: string) {
  const baseYear = parseInt(year) || 2020;
  const age = new Date().getFullYear() - baseYear;
  const base = Math.max(8000, 30000 - age * 2500);
  return {
    low_estimate: Math.round(base * 0.85),
    mid_estimate: base,
    high_estimate: Math.round(base * 1.15),
    adjustments: [
      { factor: "mileage", label: "Mileage adjustment", impact: -800, explanation: "Average mileage for age" },
      { factor: "condition", label: "Condition adjustment", impact: 0, explanation: "Assumed good condition" },
      { factor: "location", label: "Regional market", impact: 200, explanation: "Average regional pricing" },
    ],
    base_value: base + 600,
    sources_referenced: ["KBB", "NADA", "Edmunds"],
    confidence: "medium",
    notes: `[Dev mode] Estimate for ${year} ${make} ${model}. Configure ANTHROPIC_API_KEY for real valuations.`,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Rate-limit by IP: 10 requests per minute for this public endpoint
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const rl = checkRateLimit(`estimate-value:${ip}`, 10, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetInMs / 1000)) } }
      );
    }

    const body = await request.json();
    const { vehicleYear, vehicleMake, vehicleModel, mileage, condition, state } = body;

    if (!vehicleYear || !vehicleMake || !vehicleModel) {
      return NextResponse.json(
        { error: "Vehicle year, make, and model are required" },
        { status: 400 }
      );
    }

    if (!isAIConfigured()) {
      return NextResponse.json(devEstimate(vehicleYear, vehicleMake, vehicleModel));
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
