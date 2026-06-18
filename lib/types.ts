// Shared contract between the AI route and the UI.

export type Severity = "low" | "medium" | "high";

export interface Risk {
  /** short risk name */
  title: string;
  severity: Severity;
  /** what this means in plain language, 2-3 sentences, no jargon */
  plainExplanation: string;
  /** ties the risk to the specific business they described */
  whyItAppliesToYou: string;
  /** the specific regulation/framework this comes from, e.g. "PSD2 / SCA" */
  source: string;
}

export interface ChecklistItem {
  /** concrete thing to set up before selling */
  item: string;
  /** why */
  reason: string;
}

export interface RiskMap {
  /** one-sentence plain-language restatement of what the founder is doing */
  businessSummary: string;
  overallRiskLevel: Severity;
  risks: Risk[];
  preLaunchChecklist: ChecklistItem[];
  /** specific fraud/operational red flags this founder should monitor */
  watchFor: string[];
}

/** The structured context the hero sends to the API. */
export interface AnalyzeInput {
  description: string;
  country: string;
  platform: string;
  productType: string;
  sellsGiftCards: boolean;
  acceptsCards: boolean;
}

/** A single passage in the grounded regulatory corpus. */
export interface RegulatorySource {
  /** stable identifier, e.g. "psd2-74" */
  source_id: string;
  /** which regulatory layer it belongs to */
  layer:
    | "payments-sca"
    | "chargebacks"
    | "data-protection"
    | "consumer-rights"
    | "structure-liability"
    | "fraud-aml";
  /** EU or a specific member state */
  jurisdiction: "EU" | "Spain";
  /** the precise legal instrument, e.g. "GDPR Art. 5" */
  instrument: string;
  /** short human-readable title */
  title: string;
  /** the actual regulatory text */
  quotedText: string;
  /** link to the full source document */
  url: string;
}

export const EU_COUNTRIES = [
  "Spain",
  "Germany",
  "France",
  "Italy",
  "Netherlands",
  "Ireland",
  "Portugal",
  "Belgium",
] as const;

export const PLATFORMS = [
  "Shopify",
  "WooCommerce",
  "Wix",
  "Etsy",
  "Custom build",
] as const;

export const CORPUS_LAYERS = [
  "payments-sca",
  "chargebacks",
  "data-protection",
  "consumer-rights",
  "structure-liability",
  "fraud-aml",
] as const;
