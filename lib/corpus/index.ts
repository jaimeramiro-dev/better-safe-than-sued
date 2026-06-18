import type { AnalyzeInput, RegulatorySource } from "@/lib/types";
import { REGULATORY_SOURCES } from "@/lib/corpus/sources";

/** All supported countries for jurisdiction matching. */
const SUPPORTED_COUNTRIES = new Set([
  "Spain",
  "Germany",
  "France",
  "Italy",
  "Netherlands",
  "Ireland",
  "Portugal",
  "Belgium",
]);

/**
 * Returns the set of regulatory layers that apply to the given input.
 * A layer applies when the input has relevant characteristics.
 */
function relevantLayers(input: AnalyzeInput): Set<RegulatorySource["layer"]> {
  const layers = new Set<RegulatorySource["layer"]>();

  // Payments & SCA — applies if they accept card payments
  if (input.acceptsCards) {
    layers.add("payments-sca");
  }

  // Chargebacks — applies if they accept cards and sell goods
  if (input.acceptsCards) {
    layers.add("chargebacks");
  }

  // Data protection — always applies if they collect customer data
  layers.add("data-protection");

  // Consumer rights — always applies for B2C sales
  layers.add("consumer-rights");

  // Structure & liability — always applies (especially for new founders)
  layers.add("structure-liability");

  // Fraud & AML — applies if they accept cards or sell gift cards / digital goods
  if (input.acceptsCards || input.sellsGiftCards) {
    layers.add("fraud-aml");
  }

  return layers;
}

/**
 * Retrieves the relevant regulatory passages for a given business input.
 * Filters by layer relevance and jurisdiction, then returns them as
 * a formatted string for inclusion in the LLM prompt.
 */
export function retrieveCorpusContext(input: AnalyzeInput): {
  sources: RegulatorySource[];
  context: string;
} {
  const layers = relevantLayers(input);
  const country = SUPPORTED_COUNTRIES.has(input.country)
    ? input.country
    : null;

  const sources = REGULATORY_SOURCES.filter((s) => {
    if (!layers.has(s.layer)) return false;
    if (s.jurisdiction === "EU") return true;
    if (country && s.jurisdiction === country) return true;
    return false;
  });

  const lines: string[] = ["RELEVANT REGULATORY SOURCES"];
  lines.push(
    `(retrieved for: layers=${[...layers].join(", ")}, jurisdiction=${country ?? "EU"})`,
    "",
  );

  for (const src of sources) {
    lines.push(`[${src.source_id}] ${src.instrument} — ${src.title}`);
    lines.push(`  ${src.quotedText}`);
    lines.push(`  URL: ${src.url}`);
    lines.push("");
  }

  return { sources, context: lines.join("\n") };
}
