import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/ai/client";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an insurance law expert. Given a US state code, provide state-specific insurance claim guidance.

Return ONLY valid JSON with this structure:
{
  "state_name": "Full state name",
  "state_code": "Two-letter code",
  "key_laws": [
    {
      "name": "Law or statute name",
      "summary": "One-sentence plain-English summary",
      "how_it_helps": "How this law helps the claimant in their negotiation"
    }
  ],
  "deadlines": [
    {
      "name": "Deadline name",
      "timeframe": "e.g., '30 days', '1 year'",
      "description": "What this deadline means for the claimant"
    }
  ],
  "consumer_rights": ["List of 4-6 key consumer rights in this state related to auto insurance claims"],
  "doi_info": {
    "name": "State Department of Insurance name",
    "website": "DOI website URL",
    "complaint_url": "Complaint filing URL",
    "phone": "Phone number"
  },
  "bad_faith_notes": "2-3 sentences on this state's bad faith insurance laws and what constitutes bad faith"
}

Guidelines:
- Include 3-5 key_laws relevant to auto property damage claims
- Include 3-4 deadlines (statute of limitations, claim filing, response requirements)
- Focus on laws that empower consumers against insurance companies
- Use real statute numbers where possible
- Be accurate about the DOI information`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { state, claimType } = body;

    if (!state) {
      return NextResponse.json({ error: "State is required" }, { status: 400 });
    }

    const client = getAnthropicClient();

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Provide state-specific insurance guidance for ${state} for a ${claimType || "auto property damage"} claim. Include relevant state laws, deadlines, consumer rights, DOI info, and bad faith notes.`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const raw = textBlock ? textBlock.text : "";

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to generate state guidance" }, { status: 500 });
    }

    const guidance = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ guidance });
  } catch (error) {
    console.error("State guidance error:", error);
    return NextResponse.json({ error: "Failed to generate state guidance" }, { status: 500 });
  }
}
