import type { RegulatorySource } from "@/lib/types";

export const FRANCE_SOURCES: RegulatorySource[] = [
  {
    source_id: "fr-micro-entrepreneur",
    layer: "structure-liability",
    jurisdiction: "France",
    instrument: "Code de commerce L. 123-1 — Auto-entrepreneur/Micro-entrepreneur",
    title: "Micro-entrepreneur — Simplified Sole Trader Regime",
    quotedText:
      "The micro-entrepreneur (formerly auto-entrepreneur) regime is the simplest French business structure for small e-commerce founders. Registration is free via the Guichet Unique des Entreprises. The micro-entrepreneur is personally and unlimitedly liable for business debts with personal assets. Turnover caps apply: €188,700 for goods sales (BIC) and €77,700 for services (BNC) in 2025. Social charges (cotisations) are a percentage of revenue, collected monthly or quarterly. The micro-entrepreneur cannot reclaim input VAT (TVA) and benefits from a simplified accounting regime.",
    url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000005634379/",
  },
  {
    source_id: "fr-sarl-eurl",
    layer: "structure-liability",
    jurisdiction: "France",
    instrument: "Code de commerce L. 223-1 — SARL / EURL",
    title: "SARL / EURL — Limited Liability Structures",
    quotedText:
      "A Société à Responsabilité Limitée (SARL) is a French limited liability company. Shareholders' liability is limited to their capital contribution. Minimum share capital is €1, though €500-€5,000 is recommended for credibility. The EURL (Entreprise Unipersonnelle à Responsabilité Limitée) is the single-member variant. Both require: (a) publication of incorporation notice; (b) registration with the RCS (Registre du Commerce et des Sociétés); (c) appointment of a gérant (manager); (d) a registered address. Annual accounts must be filed with the commercial court registry.",
    url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000005634379/",
  },
  {
    source_id: "fr-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "France",
    instrument: "Code général des impôts Art. 256, 287, 293",
    title: "VAT (TVA) Obligations for French E-Commerce Sellers",
    quotedText:
      "French e-commerce sellers must register for TVA (Taxe sur la Valeur Ajoutée). Standard rate is 20%, reduced rates 10% and 5.5%. Registration is via the Guichet Unique. Sellers must: (a) issue compliant invoices with TVA breakdown; (b) submit monthly or quarterly TVA declarations (CA3/CA12 forms); (c) file annual TVA summary. The franchise en base de TVA scheme exempts businesses with turnover under €91,900 (goods) or €36,800 (services) from charging TVA, but prevents input TVA recovery.",
    url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069577/",
  },
  {
    source_id: "fr-cnil",
    layer: "structure-liability",
    jurisdiction: "France",
    instrument: "Loi Informatique et Libertés (L. 78-17) & GDPR",
    title: "CNIL — French Data Protection Authority",
    quotedText:
      "The Commission Nationale de l'Informatique et des Libertés (CNIL) is the French data protection authority. Under the Loi Informatique et Libertés (Law 78-17 as amended), France imposes additional GDPR requirements including: mandatory DPO appointment for certain activities; specific rules on cookies and electronic marketing (consent required); and simplified compliance via the CNIL's standard documentation. CNIL can fine up to €20 million or 4% of turnover and actively sanctions e-commerce sites for cookie consent violations and insufficient privacy policies.",
    url: "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006068624/",
  },
  {
    source_id: "fr-minor-founder",
    layer: "structure-liability",
    jurisdiction: "France",
    instrument: "Code civil Art. 388, 1146-1152",
    title: "Minors and Contractual Capacity — France",
    quotedText:
      "Under French law, minors (under 18) have limited contractual capacity. A minor must obtain parental authorisation or emancipation (émancipation) to operate a business. An emancipated minor has full capacity for acts relating to their business. Without emancipation, a minor cannot form a SARL or EURL and cannot register as a micro-entrepreneur without parental consent. The minor's parents may be held liable for business debts if they authorised the activity. A minor's contracts are voidable at their request until majority.",
    url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721/",
  },
  {
    source_id: "fr-consumer-protection",
    layer: "structure-liability",
    jurisdiction: "France",
    instrument: "Code de la consommation L. 221-1 — L. 221-28",
    title: "French Consumer Protection — Distance Selling Rules",
    quotedText:
      "The French Code de la consommation provides additional consumer protections beyond the CRD: (a) 14-day withdrawal right, extended to 12 months if information duties are missed; (b) sellers must provide a detailed pre-contractual information notice; (c) a mandatory standard withdrawal form; (d) specific rules for digital content — the right of withdrawal is lost only if the consumer expressly consented and acknowledged the loss; (e) delivery must occur within 30 days unless otherwise agreed; (f) the seller bears return costs for standard withdrawals.",
    url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006069565/",
  },
  {
    source_id: "fr-cookies",
    layer: "structure-liability",
    jurisdiction: "France",
    instrument: "CNIL Guidelines & ePrivacy Directive",
    title: "France — Cookie Consent Requirements",
    quotedText:
      "CNIL enforces strict cookie consent requirements under the ePrivacy Directive. Users must give active, informed consent before non-essential cookies are placed. Rejecting cookies must be as easy as accepting them (no dark patterns). CNIL has imposed fines of €100M+ on major tech companies for cookie violations. E-commerce sites must: (a) clearly state the purposes of each cookie; (b) allow granular consent per purpose; (c) keep consent records; (d) allow withdrawal with the same ease as consent.",
    url: "https://www.cnil.fr/en/cookies-and-other-tracking-devices",
  },
];
