import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { POLICY_ANALYSIS_PROMPT } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth";
import { extractJSON } from "@/lib/ai/sanitize";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_POLICY_LENGTH = 200_000;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkRateLimit(`${auth.user.id}:analyze-policy`, RATE_LIMITS.ai.limit, RATE_LIMITS.ai.windowMs);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${rl.resetIn}s.` },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI analysis is not available. Please try again later." },
        { status: 503 }
      );
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
