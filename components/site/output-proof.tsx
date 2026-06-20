import { RiskMapView } from "@/components/site/risk-map";
import { Reveal } from "@/components/site/reveal";
import type { RiskMap } from "@/lib/types";

const VISA_RULES =
  "https://www.visa.com/dam/VCOM/download/about-visa/visa-rules-public.pdf";

// Static proof of the output for the Sharkiez setup (gift cards, Spain, Shopify,
// card payments). Lets judges see a real risk map without interacting. Rendered
// with the same RiskMapView component the live demo uses.
const PROOF: RiskMap = {
  businessSummary:
    "You sell gift cards and digital codes to EU consumers from Spain on Shopify, paid by card and delivered instantly, with no company set up yet.",
  overallRiskLevel: "high",
  referToLawyer: false,
  assumptions: [
    "We assumed you are the merchant of record: you charge the customer's card on Shopify and deliver the codes yourself.",
    "We assumed the codes are delivered instantly and digitally, so they can't be recalled once sent.",
  ],
  risks: [
    {
      title: "Card payments need Strong Customer Authentication",
      severity: "medium",
      plainExplanation:
        "Most EU online card payments must use two-factor authentication, usually 3D Secure. Skipping it where it is required lets the bank decline the payment and shifts fraud liability to you.",
      whyItAppliesToYou:
        "You take card payments from EU shoppers, so SCA applies to your checkout.",
      evidence: ["Accepts card payments", "Sells to EU consumers"],
      source: "PSD2 / Strong Customer Authentication",
      sourceUrl: "https://eur-lex.europa.eu/eli/dir/2015/2366/oj",
      confidence: "high",
      verified: true,
    },
    {
      title: "Irrecoverable gift cards are a stolen-card magnet",
      severity: "high",
      plainExplanation:
        "Instantly-delivered codes can't be recalled, and you rarely win a fraud dispute because there is no proof the real cardholder received them. You lose the order value and a dispute fee every time.",
      whyItAppliesToYou:
        "Gift cards delivered by email are exactly what fraud rings buy with stolen cards and resell.",
      evidence: [
        "Sells gift cards / digital codes",
        "Delivered instantly",
        "Accepts card payments",
      ],
      source: "Card-network chargeback rules (digital goods)",
      sourceUrl: VISA_RULES,
      confidence: "high",
      verified: true,
    },
    {
      title: "Too many disputes can get your payment account terminated",
      severity: "high",
      plainExplanation:
        "Visa and Mastercard run dispute-monitoring programs. If your dispute ratio passes their thresholds, your processor can fine you and shut down your ability to accept cards.",
      whyItAppliesToYou:
        "A wave of stolen-card chargebacks on gift cards can push you past those thresholds fast.",
      evidence: [
        "High chargeback exposure on digital goods",
        "Accepts card payments",
      ],
      source: "Visa Dispute Monitoring Program (VDMP)",
      sourceUrl: VISA_RULES,
      confidence: "medium",
      verified: true,
    },
    {
      title: "No legal structure means unlimited personal liability",
      severity: "high",
      plainExplanation:
        "Trading from Spain normally means registering as autónomo or forming an SL. Without a company, chargebacks and debts can fall on you personally rather than on the business.",
      whyItAppliesToYou:
        "You are taking real money from Spain with no company set up yet.",
      evidence: ["Based in Spain", "No company set up yet"],
      source: "Spain: business registration (Hacienda + Seguridad Social)",
      sourceUrl: "https://sede.agenciatributaria.gob.es",
      confidence: "medium",
      verified: true,
    },
  ],
  preLaunchChecklist: [
    {
      item: "Turn on 3D Secure and a manual-review rule for high-value orders",
      reason: "Stops amber-flagged stolen-card orders before they ship.",
    },
    {
      item: "Capture explicit consent before delivering codes instantly",
      reason: "Sets the terms for the 14-day withdrawal right on digital goods.",
    },
    {
      item: "Register with Hacienda and choose autónomo or an SL",
      reason:
        "Decides whether liability stops at the business or reaches you personally.",
    },
  ],
  watchFor: [
    "Amber or review-flagged high-value gift-card orders from new accounts",
    "Your dispute ratio creeping toward the card networks' monitoring thresholds",
    "Repeat orders on different cards tied to the same email, device, or IP",
  ],
};

export function OutputProof() {
  return (
    <section className="border-b border-hair bg-bone">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal className="mb-8 text-center">
          <h2 className="text-balance font-serif text-[2rem] font-medium leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.5rem]">
            This is what you get back.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
            A gift-card store in Spain, mapped. The exact setup that ended
            Sharkiez, with every risk surfaced before a single order ships.
          </p>
        </Reveal>
        <RiskMapView data={PROOF} />
      </div>
    </section>
  );
}
