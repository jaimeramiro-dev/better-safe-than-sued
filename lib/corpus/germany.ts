import type { RegulatorySource } from "@/lib/types";

export const GERMANY_SOURCES: RegulatorySource[] = [
  {
    source_id: "de-einzelunternehmen",
    layer: "structure-liability",
    jurisdiction: "Germany",
    instrument: "BGB § 1 — Einzelunternehmen",
    title: "Einzelunternehmen — Sole Trader Registration and Liability",
    quotedText:
      "An Einzelunternehmen (sole proprietorship) is the simplest business structure in Germany. The founder registers with the Gewerbeamt (trade office) and obtains a Steuernummer (tax number) from the Finanzamt. There is no separation between personal and business assets — the founder is personally and unlimitedly liable for all business debts with their entire personal wealth. Registration is required for most commercial activities; freelancers (Freiberufler) register only with the Finanzamt.",
    url: "https://www.gesetze-im-internet.de/bgb/",
  },
  {
    source_id: "de-gmbh",
    layer: "structure-liability",
    jurisdiction: "Germany",
    instrument: "GmbHG § 1, § 5, § 13",
    title: "GmbH — Limited Liability Company",
    quotedText:
      "A Gesellschaft mit beschränkter Haftung (GmbH) is a legal entity with limited liability — shareholders are only liable up to their capital contribution. Minimum share capital is €25,000 (€12,500 on incorporation, the remainder paid within a reasonable timeframe via the Unternehmergesellschaft/UG path). The GmbH requires: (a) notarised articles of association; (b) entry in the Commercial Register (Handelsregister); (c) appointment of a managing director; (d) a registered office address. The UG (haftungsbeschränkt) is a cheaper variant with €1 minimum capital that must retain 25% of annual profits until reaching €25,000.",
    url: "https://www.gesetze-im-internet.de/gmbhg/",
  },
  {
    source_id: "de-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "Germany",
    instrument: "Umsatzsteuergesetz (UStG) § 1, § 19",
    title: "VAT (Umsatzsteuer) Obligations for E-Commerce Sellers",
    quotedText:
      "Businesses selling goods or services in Germany must register for Umsatzsteuer (VAT). The standard rate is 19%, reduced rate 7%. Sellers must: (a) issue invoices compliant with UStG requirements; (b) submit quarterly or monthly Voranmeldungen (advance VAT returns) via ELSTER; (c) file an annual VAT return (Jahreserklärung). The Kleinunternehmerregelung (small business scheme under §19 UStG) exempts businesses with turnover under €22,000 in the prior year and expected under €50,000 in the current year from charging VAT, but also prevents input VAT deduction.",
    url: "https://www.gesetze-im-internet.de/ustg/",
  },
  {
    source_id: "de-data-authority",
    layer: "structure-liability",
    jurisdiction: "Germany",
    instrument: "BDSG § 1 & GDPR",
    title: "BfDI — German Federal Data Protection Authority",
    quotedText:
      "The Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI) is the German federal data protection authority. Germany also has separate Landesdatenschutzbeauftragte for each state. Under the BDSG (Bundesdatenschutzgesetz), Germany imposes additional GDPR requirements including: mandatory Data Protection Officer appointment for businesses with 20+ employees processing personal data; stricter rules on data processing for direct marketing; and specific requirements for video surveillance and employee data. Fines follow GDPR scales.",
    url: "https://www.gesetze-im-internet.de/bdsg_2018/",
  },
  {
    source_id: "de-minor-founder",
    layer: "structure-liability",
    jurisdiction: "Germany",
    instrument: "BGB § 104, § 106, § 112",
    title: "Minors and Contractual Capacity — Germany",
    quotedText:
      "Under German law, minors under 7 have no contractual capacity (§104 BGB). Minors aged 7-17 have limited capacity — contracts require parental consent (§106-108 BGB). A minor can operate a business with authorisation from a family court and parental consent, which grants full contractual capacity for transactions within the business scope (§112 BGB). Without this, the minor is personally liable and contracts are voidable. A minor cannot form a GmbH without parental representation and court approval.",
    url: "https://www.gesetze-im-internet.de/bgb/",
  },
  {
    source_id: "de-consumer-protection",
    layer: "structure-liability",
    jurisdiction: "Germany",
    instrument: "BGB § 312, § 355, § 356 — Widerrufsrecht",
    title: "German Consumer Protection — Extended E-Commerce Duties",
    quotedText:
      "German consumer law follows the EU Consumer Rights Directive with additional BGB provisions: (a) a 14-day withdrawal right for distance sales with a mandatory model withdrawal form; (b) extended withdrawal period of 12 months if the right of withdrawal information is not provided; (c) specific packaging and disposal requirements (VerpackG); (d) the seller must bear the cost of return for standard deliveries; (e) a mandatory Imprint (Impressum) on the website with full business contact information under the Telemediengesetz (TMG).",
    url: "https://www.gesetze-im-internet.de/bgb/",
  },
  {
    source_id: "de-electronic-commerce",
    layer: "structure-liability",
    jurisdiction: "Germany",
    instrument: "Digitale-Dienste-Gesetz (DDG)",
    title: "Germany — Website Legal Requirements (Impressum, Datenschutz)",
    quotedText:
      "Under the Digitale-Dienste-Gesetz (DDG, formerly TMG), commercial websites in Germany must display a complete Impressum with: full name and address of the business, contact information, commercial register details, VAT ID, and professional regulatory information if applicable. A Datenschutzerklärung (privacy policy) meeting GDPR and BDSG requirements is mandatory. Failure to provide an Impressum is a legal violation subject to fines and competitor cease-and-desist warnings (Abmahnung).",
    url: "https://www.gesetze-im-internet.de/ddg/",
  },
];
