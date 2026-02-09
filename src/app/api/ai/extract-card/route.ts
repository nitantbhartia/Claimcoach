import { NextRequest, NextResponse } from "next/server";
import { analyzeDocumentWithVision, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { requireAuth } from "@/lib/auth";
import { extractJSON } from "@/lib/ai/sanitize";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an insurance document extraction AI. The user has uploaded a photo of their insurance card (front or back). Extract all visible information and return it as JSON.

Return ONLY valid JSON with this structure (use null for fields you cannot find):
{
  "insurer_name": "Insurance company name",
  "policy_number": "Policy or ID number",
  "group_number": "Group number if applicable",
  "insured_name": "Name of the insured person",
  "effective_date": "Policy start date (YYYY-MM-DD if possible)",
  "expiration_date": "Policy end date (YYYY-MM-DD if possible)",
  "vehicle_year": "Vehicle year if shown",
  "vehicle_make": "Vehicle make if shown",
  "vehicle_model": "Vehicle model if shown",
  "vehicle_vin": "VIN if shown",
  "agent_name": "Agent name if shown",
  "agent_phone": "Agent phone if shown",
  "coverage_type": "Type of coverage if shown",
  "claim_phone": "Claims phone number if shown"
}

Important:
- Extract ONLY what is clearly visible on the card
- Do not guess or infer missing information
- For dates, try to normalize to YYYY-MM-DD format
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

    if (!isAIConfigured()) {
      return NextResponse.json({
        extracted: {
          insurer_name: "[Dev] Sample Insurance Co.",
          policy_number: "POL-2024-DEV-001",
          group_number: null,
          insured_name: "John Doe",
          effective_date: "2024-01-01",
          expiration_date: "2025-01-01",
          vehicle_year: "2022",
          vehicle_make: "Honda",
          vehicle_model: "Civic EX",
          vehicle_vin: null,
          agent_name: null,
          agent_phone: "(555) 987-6543",
          coverage_type: "Comprehensive & Collision",
          claim_phone: "(800) 555-0199",
        },
      });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 20MB." },
        { status: 413 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "File must be a JPEG, PNG, WebP, or GIF image" },
        { status: 400 }
      );
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const mediaType = file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif";

    const result = await analyzeDocumentWithVision(
      SYSTEM_PROMPT,
      base64,
      mediaType
    );

    // Parse JSON from the AI response using safe brace-counting extraction
    const jsonStr = extractJSON(result);
    if (!jsonStr) {
      return NextResponse.json(
        { error: "Could not extract information from the image" },
        { status: 422 }
      );
    }

    const extracted = JSON.parse(jsonStr);

    return NextResponse.json({ extracted });
  } catch (error) {
    console.error("Insurance card extraction error:", error);
    return NextResponse.json(
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
