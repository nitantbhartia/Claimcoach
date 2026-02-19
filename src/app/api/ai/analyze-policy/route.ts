import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { POLICY_ANALYSIS_PROMPT } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth";
import { checkAIRateLimit } from "@/lib/rate-limit";
import { extractJSON } from "@/lib/ai/sanitize";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_POLICY_LENGTH = 200_000;

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
          summary: "[Dev mode] Sample policy analysis. Configure ANTHROPIC_API_KEY for real analysis.",
          coverages: [
            { name: "Collision", limit: "$50,000", deductible: "$500" },
            { name: "Comprehensive", limit: "$50,000", deductible: "$250" },
            { name: "Rental Reimbursement", limit: "$30/day, 30 days", deductible: "$0" },
          ],
          hidden_coverages: ["Diminished Value (must request)", "OEM Parts Endorsement"],
          exclusions: ["Wear and tear", "Mechanical breakdown"],
          recommendations: ["File diminished value claim", "Request OEM parts for repairs"],
        },
      });
    }

    const { policyText } = await request.json();

    if (!policyText || typeof policyText !== "string") {
      return NextResponse.json(
        { error: "Policy text is required" },
        { status: 400 }
      );
    }

    if (policyText.length > MAX_POLICY_LENGTH) {
      return NextResponse.json(
        { error: "Policy text too long" },
        { status: 413 }
      );
    }

    const result = await analyzeWithAI(
      POLICY_ANALYSIS_PROMPT,
      `Here is the insurance policy document text:\n\n${policyText}`
    );

    // Parse the JSON response from the AI using safe brace-counting extraction
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
    console.error("Policy analysis error:", error);
    return NextResponse.json(
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
