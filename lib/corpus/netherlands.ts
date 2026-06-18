import type { RegulatorySource } from "@/lib/types";

export const NETHERLANDS_SOURCES: RegulatorySource[] = [
  {
    source_id: "nl-eenmanszaak",
    layer: "structure-liability",
    jurisdiction: "Netherlands",
    instrument: "Burgerlijk Wetboek — Eenmanszaak",
    title: "Eenmanszaak — Sole Trader Liability",
    quotedText:
      "An Eenmanszaak (sole proprietorship) is the simplest Dutch business structure. Registration is with the KVK (Kamer van Koophandel) commercial register. The founder is personally and unlimitedly liable for all business debts with their personal assets. There is no legal separation between business and private wealth. Registration requires: (a) KVK registration; (b) a BTW-ID (VAT number); (c) registration with the Belastingdienst (tax authority); (d) opening a business bank account. The eenmanszaak is the most common structure for starting e-commerce founders.",
    url: "https://wetten.overheid.nl/BWBR0003045/",
  },
  {
    source_id: "nl-bv",
    layer: "structure-liability",
    jurisdiction: "Netherlands",
    instrument: "Burgerlijk Wetboek Boek 2 — BV",
    title: "BV — Limited Liability Company in the Netherlands",
    quotedText:
      "A Besloten Vennootschap (BV) is a Dutch limited liability company providing full asset separation — shareholders are not personally liable for company debts beyond their capital contribution. The minimum share capital requirement was abolished in 2012 (€0.01 minimum). The BV requires: (a) notarised deed of incorporation; (b) registration in the KVK Handelsregister; (c) a Dutch registered office address; (d) a director (bestuurder). The BV is subject to corporate income tax (vennootschapsbelasting, 15-25.8% in brackets). Directors can be held personally liable in cases of mismanagement or bankruptcy due to negligent conduct.",
    url: "https://wetten.overheid.nl/BWBR0003045/Boek2/",
  },
  {
    source_id: "nl-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "Netherlands",
    instrument: "Wet op de omzetbelasting 1968",
    title: "VAT (BTW) Obligations for Dutch E-Commerce",
    quotedText:
      "Dutch businesses must register for BTW (omzetbelasting). Standard rate is 21%, reduced rate 9%. Registration is via the Belastingdienst. Sellers must: (a) issue compliant invoices with BTW breakdown; (b) submit quarterly or monthly BTW returns (aangifte); (c) file an annual BTW opgaaf. The kleineondernemersregeling (KOR) exempts businesses with annual turnover under €20,000 from charging BTW — once opted in, the exemption applies for at least 3 years. The OSS scheme is available for cross-border EU distance sales to consumers.",
    url: "https://wetten.overheid.nl/BWBR0002629/",
  },
  {
    source_id: "nl-data-authority",
    layer: "structure-liability",
    jurisdiction: "Netherlands",
    instrument: "UAVG & GDPR",
    title: "Autoriteit Persoonsgegevens — Dutch Data Protection Authority",
    quotedText:
      "De Autoriteit Persoonsgegevens (AP) is the Dutch data protection authority supervising GDPR compliance. Under the UAVG (Uitvoeringswet AVG), the Netherlands implements GDPR with specific rules including: mandatory DPO for certain sectors; specific rules on processing of citizen service numbers (BSN); and strict enforcement on direct marketing and unsolicited electronic communications. The AP can fine up to €20 million or 4% of annual turnover and actively enforces consent requirements for cookies and marketing emails.",
    url: "https://wetten.overheid.nl/BWBR0040940/",
  },
  {
    source_id: "nl-minor-founder",
    layer: "structure-liability",
    jurisdiction: "Netherlands",
    instrument: "Burgerlijk Wetboek Boek 1 — Minderjarigen",
    title: "Minors and Contractual Capacity — Netherlands",
    quotedText:
      "Under Dutch law, minors (under 18) have limited contractual capacity. A minor requires parental consent or authorization from the kantonrechter (cantonal judge) to operate a business. With court authorisation (handlichting), the minor gains full contractual capacity for business transactions. Without this, contracts entered into by a minor are voidable, and the minor cannot register a BV or eenmanszaak independently. Parents may be liable for debts arising from the minor's business if they authorised or benefited from it.",
    url: "https://wetten.overheid.nl/BWBR0002656/Boek1/",
  },
  {
    source_id: "nl-consumer-protection",
    layer: "structure-liability",
    jurisdiction: "Netherlands",
    instrument: "Burgerlijk Wetboek Boek 6, 7 — Consumentenkoop",
    title: "Dutch Consumer Protection — Distance Selling",
    quotedText:
      "Dutch consumer law under the Burgerlijk Wetboek provides: (a) 14-day withdrawal right (herroepingsrecht) for distance sales with a mandatory model withdrawal form; (b) extended withdrawal period if information duties are not met; (c) the seller must bear the direct cost of return for standard withdrawals; (d) a 2-year legal conformity guarantee (wettelijke garantie); (e) specific rules for digital content — the right of withdrawal is lost only upon express consent and acknowledgment; (f) sellers must provide all pre-contractual information in a clear and comprehensible manner.",
    url: "https://wetten.overheid.nl/BWBR0005288/Boek7/",
  },
  {
    source_id: "nl-idealliability",
    layer: "structure-liability",
    jurisdiction: "Netherlands",
    instrument: "Betaaldiensten & PSD2",
    title: "iDEAL and Payment Method Liability in the Netherlands",
    quotedText:
      "iDEAL is the dominant Dutch online payment method. Unlike card payments, iDEAL transactions are guaranteed bank-to-bank transfers — once the payment is confirmed, the merchant is protected against chargebacks. However, iDEAL does not protect against claims of non-delivery or disputes about goods/services. For e-commerce sellers, iDEAL eliminates card-fraud chargeback risk but does not remove the obligation for SCA under PSD2. Merchants must still implement SCA for all electronic payments via iDEAL (typically handled by the bank's authentication app).",
    url: "https://wetten.overheid.nl/BWBR0041790/",
  },
];
