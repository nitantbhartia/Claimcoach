import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient, isAIConfigured, getAIErrorMessage } from "@/lib/ai/client";
import { requireAuth } from "@/lib/auth";

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

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB per image

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!isAIConfigured()) {
      return NextResponse.json({
        description:
          `[Dev mode] Visible damage to ${files.length} area(s) of the vehicle. ` +
          "The rear bumper shows a deep dent with paint transfer and cracking. " +
          "The driver-side quarter panel is creased with misalignment at the wheel arch. " +
          "Structural damage is possible based on panel gap distortion.",
      });
    }

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

    // Validate all files are images and within size limit
    for (const file of files) {
      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 20MB limit.` },
          { status: 413 }
        );
      }
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
      { error: getAIErrorMessage(error) },
      { status: 500 }
    );
  }
}
