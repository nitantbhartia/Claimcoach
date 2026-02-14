import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { requireAuth } from "@/lib/auth";
import { extractJSON } from "@/lib/ai/sanitize";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an insurance document extraction AI. The user has uploaded a photo or scan of a settlement offer letter from their insurance company. Extract the key details and return them as JSON.

Return ONLY valid JSON with this structure (use null for fields you cannot find):
{
  "offer_amount": 4500.00,
  "insurer_name": "Insurance company name",
  "claim_number": "Claim or reference number",
  "adjuster_name": "Adjuster name if shown",
  "adjuster_phone": "Adjuster phone if shown",
  "adjuster_email": "Adjuster email if shown",
  "offer_date": "Date of the offer letter (YYYY-MM-DD if possible)",
  "vehicle_description": "Vehicle year, make, model if mentioned",
  "deductible": 500.00,
  "offer_breakdown": [
    {"item": "Actual Cash Value", "amount": 5000.00},
    {"item": "Less Deductible", "amount": -500.00}
  ],
  "response_deadline": "Any deadline mentioned for responding",
  "key_terms": ["Notable terms or conditions mentioned"]
}

Important:
- Extract ONLY what is clearly stated in the document
- For monetary amounts, return as numbers (not strings)
- offer_amount should be the net/final amount offered to the claimant
- Do not guess missing information
- Return valid JSON only, no explanations`;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const rl = checkRateLimit(`${auth.user.id}:extract-offer-letter`, RATE_LIMITS.ai.limit, RATE_LIMITS.ai.windowMs);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${rl.resetIn}s.` },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI extraction is not available. Please try again later." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "File must be a JPEG, PNG, WebP, or GIF image" },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 20MB." },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mediaType = file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif";

    const client = getAnthropicClient();

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: "text",
              text: "Please extract the settlement offer details from this document.",
            },
          ],
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const raw = textBlock ? textBlock.text : "";

    const jsonStr = extractJSON(raw);
    if (!jsonStr) {
      return NextResponse.json(
        { error: "Could not extract offer details from the document" },
        { status: 422 }
      );
    }

    const extracted = JSON.parse(jsonStr);

    return NextResponse.json({ extracted });
  } catch (error) {
    console.error("Offer extraction error:", error);
    return NextResponse.json(
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
