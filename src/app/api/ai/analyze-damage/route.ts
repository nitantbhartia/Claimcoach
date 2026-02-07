import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/ai/client";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an auto damage assessment AI for insurance claims. The user has uploaded photos of vehicle damage. Analyze the visible damage and write a clear, detailed description suitable for an insurance claim.

Your description should:
- List each damaged area/component (e.g., "rear bumper", "driver-side quarter panel")
- Describe the type and severity of damage (e.g., "deep dent", "cracked", "crushed", "misaligned")
- Note if structural damage appears likely
- Note if airbags deployed (if visible)
- Use plain language a non-expert can understand
- Be factual — only describe what is visible in the photos
- Keep the description to 2-4 sentences

Return ONLY the damage description text, no JSON or formatting.`;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 images allowed" },
        { status: 400 }
      );
    }

    // Validate all files are images
    for (const file of files) {
      if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json(
          { error: `File "${file.name}" is not a supported image type. Use JPEG, PNG, WebP, or GIF.` },
          { status: 400 }
        );
      }
    }

    // Build image content blocks
    const imageBlocks = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        return {
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
            data: base64,
          },
        };
      })
    );

    const client = getAnthropicClient();

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            ...imageBlocks,
            {
              type: "text" as const,
              text: `Please analyze ${files.length === 1 ? "this photo" : "these photos"} of vehicle damage and write a clear description for an insurance claim.`,
            },
          ],
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const description = textBlock ? textBlock.text : "";

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Damage analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze damage photos" },
      { status: 500 }
    );
  }
}
