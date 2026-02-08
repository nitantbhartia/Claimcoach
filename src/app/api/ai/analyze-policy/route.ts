import { NextRequest, NextResponse } from "next/server";
import { analyzeWithAI } from "@/lib/ai/client";
import { POLICY_ANALYSIS_PROMPT } from "@/lib/ai/prompts";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_POLICY_LENGTH = 200_000;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

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

    // Parse the JSON response from the AI
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
    console.error("Policy analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze policy. Please try again." },
      { status: 500 }
    );
  }
}
