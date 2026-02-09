import Anthropic from "@anthropic-ai/sdk";

let anthropicClient: Anthropic | null = null;

export function isAIConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropicClient;
}

/**
 * Extract a user-facing error message from Anthropic SDK errors.
 */
export function getAIErrorMessage(error: unknown): string {
  if (error instanceof Anthropic.AuthenticationError) {
    return "Invalid Anthropic API key. Check ANTHROPIC_API_KEY in your environment.";
  }
  if (error instanceof Anthropic.PermissionDeniedError) {
    return "Anthropic API key does not have permission for this request.";
  }
  if (error instanceof Anthropic.RateLimitError) {
    return "Anthropic API rate limit reached. Please try again in a moment.";
  }
  if (error instanceof Anthropic.APIConnectionError) {
    return "Could not connect to Anthropic API. Check your network connection.";
  }
  if (error instanceof Anthropic.APIError) {
    return `Anthropic API error: ${error.message}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}

export async function analyzeWithAI(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const client = getAnthropicClient();

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
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
    model: "claude-haiku-4-5-20251001",
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
