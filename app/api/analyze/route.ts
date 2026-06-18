import Anthropic from "@anthropic-ai/sdk";
import { selectSources, type KnowledgeEntry } from "@/lib/knowledge";
import type {
  AnalyzeInput,
  Confidence,
  RiskMap,
  Severity,
} from "@/lib/types";

// Never cache: every request is a fresh model call.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "claude-opus-4-8";
const SEVERITY_ENUM: Severity[] = ["low", "medium", "high"];
const CONFIDENCE_ENUM: Confidence[] = ["high", "medium", "low"];

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

const GENERATION_SYSTEM = `You are a senior EU e-commerce compliance and payments-risk analyst. Your reader is a first-time online founder with NO legal background and NO budget for a lawyer or tax advisor. They are about to launch, or just launched, and they do not know what they don't know.

Return a clear, specific RISK MAP grounded in the SOURCES you are given. Translate dense regulation into plain English a 17-year-old founder could act on.

NON-NEGOTIABLE RULES
1. GROUNDED, NEVER INVENTED. You are given a list of SOURCES (each has an id, a framework name and a fact). Every risk MUST be grounded in one of these sources. Set "sourceId" to the id of the single source that backs the risk. Do NOT invent regulations, article numbers, thresholds, or facts that are not in the provided sources; take numbers and wording from the source text. If a genuinely important risk for THIS business is not covered by any source, you may still include it but set its "sourceId" to "general".
2. CONFIDENCE. Set "confidence" to "high" when the cited source directly and specifically supports the claim, "medium" when it broadly supports it, and "low" for a general principle or a loose connection. Also lower the confidence for any risk that depends on an assumption you had to make about their business (see rules 4 and 5).
3. ANALYZE THE BUSINESS IN FRONT OF YOU, NOT A TEMPLATE. Reason from what THIS founder actually described. Do not project a default story (gift cards, instant-code resale, stolen-card fraud) onto every business. Respect their explicit answers: if they said they do NOT sell gift cards or digital goods, do not treat them as a gift-card seller. Include a risk only if it plausibly fits what they told you.
4. STATE ASSUMPTIONS, DO NOT ASSERT THEM. If the description is vague about what they sell or how money flows, say plainly what the risk depends on and tell them to confirm it, instead of stating a guess as fact. Use "if you are X, then..." framing for anything you are inferring. Never invent specifics they did not give: say "your payment processor" unless they named one, and do not assert a particular product, PCI scope, or tool as fact unless they mentioned it.
5. WHO ACTUALLY BEARS THE RISK. A chargeback or stolen-card loss only falls on the founder if THEY are the merchant of record: the one charging the customer's card and delivering the goods. If a platform processes the payment and merely pays them out, or the customer buys from a platform directly, the payment-fraud and chargeback exposure sits with that platform, not the founder. Work out which case applies from what they said; if it is unclear, present the risk conditionally and tell them to confirm who charges the customer.
6. CALIBRATE, DO NOT CATASTROPHIZE. Match severity and emphasis to what they actually described. Do not default every card-taking or digital business to maximum fraud-and-chargeback panic. Fraud and chargebacks are serious WHEN they clearly apply (the founder takes cards as merchant of record and delivers instantly); lead with them only when the facts support it. Otherwise give them their proper weight among the other risks.
7. NEVER GIVE A LEGAL VERDICT. Explain, surface and clarify; the decision stays with the human. Be honest about uncertainty and recommend validating important decisions with a qualified professional.
8. PLAIN LANGUAGE. No legalese in the explanations. Short sentences, like a sharp friend who happens to know this stuff.

OUTPUT: the risks that genuinely apply to this specific business, most-severe first (usually 5 to 7; do not pad with generic risks). overallRiskLevel reflects the worst realistic exposure given what they actually described. preLaunchChecklist has 3-6 concrete setup actions that fit their business. watchFor has 3-6 short, specific red flags relevant to them.`;

const VERIFICATION_SYSTEM = `You are a strict fact-checker for a compliance tool. You are given risk claims and the exact source text each one cites. For every risk, decide whether the cited source actually supports the claim.

Be skeptical and protect the user from hallucinations:
- "verified": true ONLY if the cited source genuinely supports the claim, including any specific numbers or rules stated. If the claim invents a threshold, article, or fact that is not in the cited source, set "verified": false.
- "confidence": "high" if the source fully and specifically supports the claim, "medium" if it broadly supports it, "low" if it is weakly supported, contradicted, or a general principle with no real source.
Do not add new claims. Return one verdict per risk, using the same "index".`;

// ---------------------------------------------------------------------------
// Schemas (structured outputs -> guaranteed schema-valid JSON)
// ---------------------------------------------------------------------------

function generationSchema(sourceIds: string[]) {
  return {
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
            sourceId: { type: "string", enum: [...sourceIds, "general"] },
            confidence: { type: "string", enum: CONFIDENCE_ENUM },
          },
          required: [
            "title",
            "severity",
            "plainExplanation",
            "whyItAppliesToYou",
            "sourceId",
            "confidence",
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
}

const VERIFICATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    verdicts: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          index: { type: "integer" },
          verified: { type: "boolean" },
          confidence: { type: "string", enum: CONFIDENCE_ENUM },
        },
        required: ["index", "verified", "confidence"],
      },
    },
  },
  required: ["verdicts"],
} as const;

// ---------------------------------------------------------------------------
// Internal shapes
// ---------------------------------------------------------------------------

interface GenRisk {
  title: string;
  severity: Severity;
  plainExplanation: string;
  whyItAppliesToYou: string;
  sourceId: string;
  confidence: Confidence;
}
interface GenResult {
  businessSummary: string;
  overallRiskLevel: Severity;
  risks: GenRisk[];
  preLaunchChecklist: { item: string; reason: string }[];
  watchFor: string[];
}
interface Verdict {
  index: number;
  verified: boolean;
  confidence: Confidence;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sourcesBlock(sources: KnowledgeEntry[]): string {
  return sources
    .map((s) => `[${s.id}] ${s.framework}: ${s.fact}`)
    .join("\n");
}

function buildGenerationPrompt(
  input: AnalyzeInput,
  sources: KnowledgeEntry[],
): string {
  return [
    "Build the risk map for this founder. Ground every risk in the SOURCES below and cite each one by its id.",
    "",
    "STRUCTURED CONTEXT",
    `- Country (based / selling from): ${input.country}`,
    `- Selling platform: ${input.platform}`,
    `- Product type: ${input.productType || "(not specified)"}`,
    `- Sells gift cards or digital goods: ${input.sellsGiftCards ? "YES" : "No"}`,
    `- Accepts card payments: ${input.acceptsCards ? "YES" : "No"}`,
    "",
    "THEIR OWN WORDS",
    input.description.trim() || "(no free-text description provided)",
    "",
    "SOURCES (cite only from these, by id):",
    sourcesBlock(sources),
  ].join("\n");
}

function buildVerificationPrompt(
  gen: GenResult,
  factById: Map<string, string>,
): string {
  const blocks = gen.risks.map((r, i) => {
    const fact = factById.get(r.sourceId) ?? "(no cited source - general principle)";
    return [
      `RISK ${i}`,
      `Claim: ${r.plainExplanation} ${r.whyItAppliesToYou}`,
      `Cited source text: ${fact}`,
    ].join("\n");
  });
  return [
    "Check each risk claim against its cited source text and return one verdict per risk.",
    "",
    blocks.join("\n\n"),
  ].join("\n");
}

function parseJson<T>(raw: string): T {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) text = text.slice(start, end + 1);
  return JSON.parse(text) as T;
}

class RefusalError extends Error {}

async function callStructured<T>(
  client: Anthropic,
  opts: {
    system: string;
    user: string;
    schema: unknown;
    effort: "low" | "medium" | "high";
    maxTokens: number;
  },
): Promise<T> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens,
    system: opts.system,
    messages: [{ role: "user", content: opts.user }],
    output_config: {
      effort: opts.effort,
      format: { type: "json_schema", schema: opts.schema },
    },
  } as Anthropic.MessageCreateParamsNonStreaming);

  if (message.stop_reason === "refusal") throw new RefusalError();
  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") throw new Error("Empty model response");
  return parseJson<T>(block.text);
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

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

  const sources = selectSources(input);
  const sourceById = new Map(sources.map((s) => [s.id, s]));
  const factById = new Map(sources.map((s) => [s.id, s.fact]));
  const client = new Anthropic();

  try {
    // 1) Grounded generation — the model may only cite the provided sources.
    const gen = await callStructured<GenResult>(client, {
      system: GENERATION_SYSTEM,
      user: buildGenerationPrompt(input, sources),
      schema: generationSchema(sources.map((s) => s.id)),
      effort: "medium",
      maxTokens: 4000,
    });

    // 2) Verification pass — a second model audits each claim against its source.
    //    Wrapped so a failure degrades gracefully instead of breaking the request.
    const verdicts = new Map<number, Verdict>();
    try {
      const result = await callStructured<{ verdicts: Verdict[] }>(client, {
        system: VERIFICATION_SYSTEM,
        user: buildVerificationPrompt(gen, factById),
        schema: VERIFICATION_SCHEMA,
        effort: "low",
        maxTokens: 1500,
      });
      for (const v of result.verdicts) verdicts.set(v.index, v);
    } catch (err) {
      console.warn("Verification pass failed; using grounded defaults.", err);
    }

    // 3) Merge: the server supplies the real source label + URL (the model never
    //    writes a URL), and the verdict adjusts trust.
    const risks: RiskMap["risks"] = gen.risks.map((r, i) => {
      const src = sourceById.get(r.sourceId);
      const isGeneral = !src;
      const verdict = verdicts.get(i);

      let verified = !isGeneral;
      let confidence: Confidence = r.confidence;
      if (verdict) {
        if (!verdict.verified) {
          verified = false;
          confidence = "low";
        } else {
          confidence = verdict.confidence;
        }
      }
      if (isGeneral) {
        verified = false;
        confidence = "low";
      }

      return {
        title: r.title,
        severity: r.severity,
        plainExplanation: r.plainExplanation,
        whyItAppliesToYou: r.whyItAppliesToYou,
        source: src ? src.framework : "General compliance principle",
        sourceUrl: src ? src.url : "",
        confidence,
        verified,
      };
    });

    const riskMap: RiskMap = {
      businessSummary: gen.businessSummary,
      overallRiskLevel: gen.overallRiskLevel,
      risks,
      preLaunchChecklist: gen.preLaunchChecklist,
      watchFor: gen.watchFor,
    };
    return Response.json(riskMap);
  } catch (err) {
    if (err instanceof RefusalError) {
      return Response.json(
        {
          error:
            "The model declined to analyze this one. Try rephrasing your business description.",
        },
        { status: 422 },
      );
    }
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
