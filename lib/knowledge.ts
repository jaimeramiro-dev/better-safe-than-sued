import type { AnalyzeInput } from "@/lib/types";

/**
 * Curated, source-backed knowledge base. This is the anti-hallucination spine:
 * the model may ONLY cite from these entries (it returns an `id`, and the server
 * supplies the real `url` from here), so it cannot invent regulations, numbers,
 * or links. Facts are written conservatively ("commonly cited") because exact
 * card-network thresholds change; the URL points to the authoritative source.
 *
 * `tags` drive retrieval: an entry is included when any of its tags is active
 * for the founder's input (see selectSources).
 */
export interface KnowledgeEntry {
  id: string;
  framework: string;
  url: string;
  fact: string;
  tags: string[];
}

export const KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "psd2-sca",
    framework: "PSD2 / Strong Customer Authentication",
    url: "https://eur-lex.europa.eu/eli/dir/2015/2366/oj",
    fact: "Under PSD2 and the EBA's Strong Customer Authentication (SCA) rules, most online card payments in the EEA must use two-factor authentication, usually 3D Secure (a code or banking-app confirmation). A payment that skips SCA where it was required can be declined by the bank, and liability for fraud shifts to the merchant.",
    tags: ["cards"],
  },
  {
    id: "sca-exemptions",
    framework: "SCA exemptions (Delegated Reg. 2018/389)",
    url: "https://eur-lex.europa.eu/eli/reg_del/2018/389/oj",
    fact: "SCA has only limited exemptions, such as low-value transactions (broadly under €30, with count and cumulative caps) and low-risk transaction-risk-analysis by the payment provider. Treating a payment as exempt when it isn't means it can be declined or the merchant carries the fraud liability.",
    tags: ["cards"],
  },
  {
    id: "visa-vdmp",
    framework: "Visa Dispute Monitoring Program (VDMP)",
    url: "https://www.visa.com/dam/VCOM/download/about-visa/visa-rules-public.pdf",
    fact: "Visa monitors merchants for excessive disputes. The standard Dispute Monitoring Program tier is commonly cited at 100 disputes and a 0.9% dispute-to-transaction ratio in a month, with an earlier warning tier around 75 disputes / 0.65%. Sustained breaches bring fines and can end in losing card acceptance.",
    tags: ["cards"],
  },
  {
    id: "mc-ecm",
    framework: "Mastercard Excessive Chargeback Program",
    url: "https://www.mastercard.us/en-us/business/overview/support/rules.html",
    fact: "Mastercard runs an Excessive Chargeback Merchant program. The threshold is commonly cited as a 1.5% chargeback-to-transaction ratio with at least 100 chargebacks in a month. Exceeding it brings escalating fees and possible termination of the merchant account.",
    tags: ["cards"],
  },
  {
    id: "chargeback-digital",
    framework: "Card-network chargeback rules (digital goods)",
    url: "https://www.visa.com/dam/VCOM/download/about-visa/visa-rules-public.pdf",
    fact: "For instantly-delivered digital goods such as gift cards and codes, merchants rarely win fraud chargebacks: there is no signed delivery or shipment tracking to prove the real cardholder received the goods, and the value is already gone. Each lost dispute costs the order amount plus a dispute fee.",
    tags: ["giftcards", "digital", "cards"],
  },
  {
    id: "stolen-card-giftcards",
    framework: "Card-fraud patterns (stolen cards)",
    url: "https://www.visa.com/dam/VCOM/download/about-visa/visa-rules-public.pdf",
    fact: "Gift cards and game codes are a top target for stolen-card fraud: criminals buy them with stolen cards and resell them quickly (often on Telegram) because they are near-anonymous and irreversible. An 'amber' or 'review' fraud flag on a high-value digital order is a classic warning sign and is not safe to ship on.",
    tags: ["giftcards", "digital"],
  },
  {
    id: "gdpr-basics",
    framework: "GDPR (Reg. 2016/679)",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    fact: "If you handle customers' personal data (names, emails, addresses) you need a lawful basis and must tell people what you collect and why, through a privacy notice (GDPR Articles 13-14). Selling to EU consumers means GDPR applies regardless of where the business is based.",
    tags: ["always"],
  },
  {
    id: "gdpr-breach",
    framework: "GDPR breach notification (Art. 33)",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    fact: "A personal-data breach that risks people's rights and freedoms must be reported to the supervisory authority within 72 hours of becoming aware of it. For a business established in Spain, that authority is the AEPD.",
    tags: ["data", "spain"],
  },
  {
    id: "crd-withdrawal",
    framework: "Consumer Rights Directive (14-day withdrawal)",
    url: "https://eur-lex.europa.eu/eli/dir/2011/83/oj",
    fact: "EU consumers buying online generally have 14 days to withdraw and get a refund, with no reason needed. You must inform them of this right before they buy; if you fail to, the withdrawal window can extend by up to 12 months.",
    tags: ["consumer"],
  },
  {
    id: "crd-digital-exception",
    framework: "Consumer Rights Directive (digital content, Art. 16)",
    url: "https://eur-lex.europa.eu/eli/dir/2011/83/oj",
    fact: "The 14-day withdrawal right can be lost for digital content supplied immediately ONLY if the consumer gave express prior consent and acknowledged losing the right. Without that explicit step at checkout, customers may still claim refunds on codes you have already delivered.",
    tags: ["digital", "giftcards", "consumer"],
  },
  {
    id: "crd-precontract",
    framework: "Consumer Rights Directive (pre-contract info)",
    url: "https://eur-lex.europa.eu/eli/dir/2011/83/oj",
    fact: "Before purchase you must clearly give the total price, the trader's identity and contact details, delivery terms and the withdrawal procedure. Missing this mandatory information can make terms unenforceable and trigger penalties.",
    tags: ["consumer"],
  },
  {
    id: "es-autonomo",
    framework: "Spain: business registration (Hacienda + Seguridad Social)",
    url: "https://sede.agenciatributaria.gob.es",
    fact: "Selling regularly from Spain normally means registering the activity with Hacienda (modelo 036/037) and registering as autónomo with Seguridad Social (RETA), or forming a company (SL). Trading without registering risks back-taxes and penalties, and there is no exemption simply for being small or a minor.",
    tags: ["spain"],
  },
  {
    id: "eu-vat-oss",
    framework: "EU VAT on cross-border B2C sales (OSS)",
    url: "https://vat-one-stop-shop.ec.europa.eu/index_en",
    fact: "Selling digital goods or services to consumers in other EU countries usually means charging VAT at the customer's country rate. The One-Stop-Shop (OSS) lets you declare all of that EU VAT through a single registration instead of registering in each country.",
    tags: ["digital", "eu", "spain"],
  },
  {
    id: "aml-prepaid",
    framework: "EU Anti-Money-Laundering rules (5AMLD)",
    url: "https://eur-lex.europa.eu/eli/dir/2018/843/oj",
    fact: "Prepaid instruments such as gift cards are recognised money-laundering vectors, so EU AML rules tightened limits and customer checks for anonymous prepaid value. High volumes of gift-card sales can attract AML scrutiny and due-diligence obligations.",
    tags: ["giftcards"],
  },
  {
    id: "pci-saq-a",
    framework: "PCI DSS (card-data security)",
    url: "https://www.pcisecuritystandards.org/",
    fact: "Anyone accepting card payments must meet PCI DSS. Using a hosted or redirect payment provider (for example Shopify Payments) keeps you in the lightest scope (SAQ A) because card data never touches your own servers, but you still have to complete the self-assessment questionnaire.",
    tags: ["cards"],
  },
];

/** Tag-based retrieval. Deterministic and bounded, which beats a vector DB for a
 *  small curated corpus and keeps the cited set tightly controlled. */
export function selectSources(input: AnalyzeInput): KnowledgeEntry[] {
  const active = new Set<string>(["always", "consumer", "data", "eu"]);
  if (input.acceptsCards) active.add("cards");
  if (input.sellsGiftCards) {
    active.add("giftcards");
    active.add("digital");
  }
  const haystack = `${input.productType} ${input.description}`.toLowerCase();
  if (/gift|digital|download|code|top-up|subscription|software|e-?book/.test(haystack)) {
    active.add("digital");
  }
  if (input.country.trim().toLowerCase() === "spain") active.add("spain");

  return KNOWLEDGE.filter((e) => e.tags.some((t) => active.has(t)));
}
