import Anthropic from "@anthropic-ai/sdk";

let anthropicClient: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropicClient;
}

export async function analyzeWithAI(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const client = getAnthropicClient();

  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
    system: systemPrompt,
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "";
}

export async function analyzeDocumentWithVision(
  systemPrompt: string,
  imageBase64: string,
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif"
): Promise<string> {
  const client = getAnthropicClient();

  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: "Please analyze this document according to the system instructions.",
          },
        ],
      },
    ],
    system: systemPrompt,
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "";
}
