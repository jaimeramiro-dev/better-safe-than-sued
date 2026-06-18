import Anthropic from "@anthropic-ai/sdk";
import type { AnalyzeInput, RiskMap, Severity } from "@/lib/types";
import { retrieveCorpusContext } from "@/lib/corpus";

// Never cache: every request is a fresh model call.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "claude-opus-4-8";

const SYSTEM_PROMPT = `You are a senior EU e-commerce compliance and payments-risk analyst. Your reader is a first-time online founder with NO legal background and NO budget for a lawyer or tax advisor. They are about to launch, or have just launched, and they do not know what they don't know.

Your job is to read their plain-language description plus the structured context, and return a clear, specific RISK MAP: what they are exposed to, what to set up before selling, and what to watch for. You translate dense regulation into plain English a 17-year-old founder could act on.

NON-NEGOTIABLE RULES
1. SPECIFICITY OVER GENERICS. Reason about the *intersection* of the exact factors given — product type x country x audience x platform x payment method x whether they sell gift cards or digital goods. Never list generic "have a privacy policy" boilerplate. A gift-card store in Spain on Shopify taking cards MUST get visibly different, fraud-heavy output than a print-on-demand t-shirt shop in Germany. The whole value is in the combination.
2. GROUND EVERY POINT IN THE SOURCES PROVIDED BELOW. The RELEVANT REGULATORY SOURCES section contains the only legal content you may use. Every risk MUST cite at least one source_id from that section (format: [source_id]). If a claim is not supported by a provided source, do not make it. Never use your own knowledge of the law — only the passages supplied.
3. FRAUD AND CHARGEBACKS ARE THE PRIORITY when they apply. Gift cards, game codes and other instant digital goods are a top target for stolen-card fraud (bought, resold fast, irreversible). Flag clearly that: amber / grey / "review" fraud signals are NOT safe to ship on; instantly-delivered high-value digital orders are the classic stolen-card pattern; and a wave of chargebacks can exceed card-network dispute thresholds and get the founder banned from their payment processor and chased for the losses — even more dangerous with no legal entity shielding them.
4. NEVER GIVE A LEGAL VERDICT and never tell them what they are legally required to do. You explain, surface and clarify; the decision stays with the human. Recommend validating important decisions with a qualified professional. Be honest about uncertainty.
5. PLAIN LANGUAGE. No legalese in the explanations. Short sentences. Talk to them like a sharp friend who happens to know this stuff.

OUTPUT
Return between 5 and 8 risks, ordered most-severe first. Set overallRiskLevel to reflect the worst realistic exposure. The preLaunchChecklist is concrete setup actions (3-6 items). watchFor is short, specific operational/fraud red flags (3-6 items) they should literally watch for in their dashboard. Every field must be tailored to the business described.`;

// Structured-output schema. Forces strictly-valid JSON in the RiskMap shape.
const SEVERITY_ENUM: Severity[] = ["low", "medium", "high"];

const RISK_MAP_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    businessSummary: { type: "string" },
    overallRiskLevel: { type: "string", enum: SEVERITY_ENUM },
    risks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          severity: { type: "string", enum: SEVERITY_ENUM },
          plainExplanation: { type: "string" },
          whyItAppliesToYou: { type: "string" },
          source: { type: "string" },
        },
        required: [
          "title",
          "severity",
          "plainExplanation",
          "whyItAppliesToYou",
          "source",
        ],
      },
    },
    preLaunchChecklist: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          item: { type: "string" },
          reason: { type: "string" },
        },
        required: ["item", "reason"],
      },
    },
    watchFor: { type: "array", items: { type: "string" } },
  },
  required: [
    "businessSummary",
    "overallRiskLevel",
    "risks",
    "preLaunchChecklist",
    "watchFor",
  ],
} as const;

function buildUserPrompt(input: AnalyzeInput): string {
  const { context: corpusContext } = retrieveCorpusContext(input);

  const lines = [
    "Here is the founder's business. Build their risk map.",
    "",
    "STRUCTURED CONTEXT",
    `- Country (where they are based / selling from): ${input.country}`,
    `- Selling platform: ${input.platform}`,
    `- Product type: ${input.productType || "(not specified)"}`,
    `- Sells gift cards or digital goods: ${input.sellsGiftCards ? "YES" : "No"}`,
    `- Accepts card payments: ${input.acceptsCards ? "YES" : "No"}`,
    "",
    "THEIR OWN WORDS",
    input.description.trim() || "(no free-text description provided)",
    "",
    corpusContext,
  ];
  return lines.join("\n");
}

/** Defensive parse: strip stray markdown fences, then JSON.parse. */
function parseRiskMap(raw: string): RiskMap {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start > 0 || end < text.length - 1) {
    if (start !== -1 && end !== -1) text = text.slice(start, end + 1);
  }
  return JSON.parse(text) as RiskMap;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "The AI engine isn't configured yet. Add ANTHROPIC_API_KEY to .env.local and restart.",
      },
      { status: 500 },
    );
  }

  let input: AnalyzeInput;
  try {
    input = (await request.json()) as AnalyzeInput;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const hasContext =
    (input.description && input.description.trim().length > 0) ||
    (input.productType && input.productType.trim().length > 0);
  if (!hasContext) {
    return Response.json(
      { error: "Tell us a little about what you sell first." },
      { status: 400 },
    );
  }

  const client = new Anthropic();

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(input) }],
      // Structured outputs guarantee schema-valid JSON; medium effort keeps the
      // single-shot generation fast enough for a live demo.
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: RISK_MAP_SCHEMA },
      },
    } as Anthropic.MessageCreateParamsNonStreaming);

    if (message.stop_reason === "refusal") {
      return Response.json(
        {
          error:
            "The model declined to analyze this one. Try rephrasing your business description.",
        },
        { status: 422 },
      );
    }

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return Response.json(
        { error: "The model returned an empty response. Please try again." },
        { status: 502 },
      );
    }

    const riskMap = parseRiskMap(textBlock.text);
    return Response.json(riskMap);
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${err.status}:`, err.message);
      return Response.json(
        { error: "The AI engine had a hiccup. Please try again in a moment." },
        { status: 502 },
      );
    }
    console.error("Risk analysis failed:", err);
    return Response.json(
      { error: "Something went wrong generating your risk map. Please retry." },
      { status: 500 },
    );
  }
}
