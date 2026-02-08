/**
 * Input sanitization for AI prompt injection mitigation.
 *
 * User-controlled strings that are interpolated into LLM prompts
 * are truncated, stripped of control characters, and wrapped in
 * clear delimiters so the model can distinguish data from instructions.
 */

const MAX_FIELD_LENGTH = 500;
const MAX_CONTEXT_LENGTH = 10_000;

/** Strip characters that could be used for prompt boundary manipulation. */
function stripControlChars(input: string): string {
  // Remove null bytes, backspace, and other C0 control chars except \n and \t
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

/** Sanitize a short field value (insurer name, vehicle info, state, etc.) */
export function sanitizeField(value: string, maxLen = MAX_FIELD_LENGTH): string {
  return stripControlChars(value).slice(0, maxLen).trim();
}

/** Sanitize a longer text block (policy context for chat) with delimiters. */
export function sanitizeContext(value: string, maxLen = MAX_CONTEXT_LENGTH): string {
  const cleaned = stripControlChars(value).slice(0, maxLen).trim();
  return `<user_context>\n${cleaned}\n</user_context>`;
}

/**
 * Validate a US state code against the known list of 50 states + DC + territories.
 * Returns the validated code or null if invalid.
 */
const VALID_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
  "DC","PR","GU","VI","AS","MP",
]);

export function validateState(state: string): string | null {
  const code = state.trim().toUpperCase().slice(0, 2);
  return VALID_STATES.has(code) ? code : null;
}

/**
 * Extract JSON object from a string using brace counting instead of greedy regex.
 * This avoids potential ReDoS with /\{[\s\S]*\}/ and is more correct for nested JSON.
 */
export function extractJSON(text: string): string | null {
  const start = text.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\") {
      if (inString) escape = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  return null;
}
