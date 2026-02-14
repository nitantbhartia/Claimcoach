import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { requireAuth } from "@/lib/auth";
import { sanitizeField, extractJSON } from "@/lib/ai/sanitize";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are an insurance claim negotiation coach. Generate a structured phone call script for calling an insurance adjuster to negotiate a higher settlement.

The script should be practical, specific, and include exact dollar amounts and evidence references from the claim data provided.

Return ONLY valid JSON with this structure:
{
  "opening": "Exact words to say when the call starts (1-2 sentences)",
  "key_points": [
    {
      "topic": "Short topic name (e.g., 'Vehicle Valuation')",
      "what_to_say": "Exact script of what to say to the adjuster about this topic",
      "if_they_say": "The most likely pushback or objection from the adjuster",
      "your_response": "Exact response to counter their objection"
    }
  ],
  "closing": "Exact words to close the call with a deadline and next steps",
  "dos": ["List of 5-6 things to do during the call"],
  "donts": ["List of 5-6 things to avoid during the call"]
}

Guidelines:
- Use specific dollar amounts from the claim data
- Reference specific evidence (KBB, NADA, comparables)
- Include 4-6 key_points covering the main negotiation topics
- Make the script sound natural, not robotic
- Include power phrases that show knowledge of insurance practices
- The dos/donts should be practical behavioral advice`;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkRateLimit(`${auth.user.id}:generate-call-script`, RATE_LIMITS.ai.limit, RATE_LIMITS.ai.windowMs);
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
    const { offerAmount, demandAmount, vehicleInfo, insurerName, lineItems, state } = body;

    if (!offerAmount || !demandAmount) {
      return NextResponse.json({ error: "Offer and demand amounts are required" }, { status: 400 });
    }

    const client = getAnthropicClient();

    const safeOffer = Number(offerAmount) || 0;
    const safeDemand = Number(demandAmount) || 0;
    const userPrompt = `Generate a phone call script for negotiating with ${sanitizeField(insurerName || "the insurance company", 100)}.

Claim details:
- Vehicle: ${sanitizeField(vehicleInfo || "Not specified", 200)}
- Their offer: $${safeOffer}
- My demand: $${safeDemand}
- Gap: $${safeDemand - safeOffer}
- State: ${sanitizeField(state || "Not specified", 50)}
${lineItems ? `- Line items: ${sanitizeField(JSON.stringify(lineItems), 3000)}` : ""}

Create a complete call script with opening, key negotiation points with objection handlers, closing, and behavioral dos/donts.`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const raw = textBlock ? textBlock.text : "";

    const jsonStr = extractJSON(raw);
    if (!jsonStr) {
      return NextResponse.json({ error: "Failed to generate call script" }, { status: 500 });
    }

    const script = JSON.parse(jsonStr);
    return NextResponse.json({ script });
  } catch (error) {
    console.error("Call script generation error:", error);
    return NextResponse.json({ error: getAIErrorMessage(error) }, { status: 500 });
  }
}
