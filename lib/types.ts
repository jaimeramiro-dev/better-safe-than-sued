// Shared contract between the AI route and the UI.

export type Severity = "low" | "medium" | "high";
export type Confidence = "high" | "medium" | "low";

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
  /** official URL for `source`, supplied by the server from the knowledge base
   *  (never written by the model). Empty when the risk is a general principle
   *  not backed by a cited source. */
  sourceUrl: string;
  /** how well this risk is grounded in its cited source, after verification */
  confidence: Confidence;
  /** true when a second model pass confirmed the claim against its cited source */
  verified: boolean;
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
