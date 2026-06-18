import type { AnalyzeInput } from "@/lib/types";

/**
 * The one-click demo scenario — the exact shape of the founders' real scar:
 * a gift-card / digital-goods store in Spain, on Shopify, taking cards, with no
 * legal structure. Running this gives a judge an impressive, fraud-focused
 * result in seconds.
 */
export const SAMPLE_INPUT: AnalyzeInput = {
  description:
    "We sell digital gift cards and game top-up codes through a Shopify store, mostly to customers across the EU. Everything is paid by credit or debit card and delivered instantly by email. It's just two of us and we haven't set up a company yet.",
  country: "Spain",
  platform: "Shopify",
  productType: "Gift cards & digital codes",
  sellsGiftCards: true,
  acceptsCards: true,
};
