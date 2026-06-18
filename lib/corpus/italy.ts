import type { RegulatorySource } from "@/lib/types";

export const ITALY_SOURCES: RegulatorySource[] = [
  {
    source_id: "it-partita-iva",
    layer: "structure-liability",
    jurisdiction: "Italy",
    instrument: "D.P.R. 633/1972 & Legge 388/2000 — Partita IVA",
    title: "Partita IVA — Sole Trader Registration in Italy",
    quotedText:
      "Anyone starting a business in Italy must obtain a Partita IVA (VAT number) from the Agenzia delle Entrate. As a sole trader (ditta individuale), the founder is personally and unlimitedly liable for all business debts — there is no separation between personal and business assets. Registration requires: (a) opening a Partita IVA via the Agenzia delle Entrate; (b) registration with INPS (social security); (c) registration with the Camera di Commercio (chamber of commerce). The regime forfettario (flat-rate scheme) offers simplified taxation for businesses with annual revenue under €85,000.",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2000-388",
  },
  {
    source_id: "it-srl",
    layer: "structure-liability",
    jurisdiction: "Italy",
    instrument: "Codice Civile Art. 2462-2483 — SRL",
    title: "SRL — Limited Liability Company in Italy",
    quotedText:
      "A Società a Responsabilità Limitata (SRL) is the most common Italian limited liability company. Shareholders are liable only up to their capital contribution. Minimum share capital is €1 (with specific rules for retained earnings), though €10,000 is standard. The SRL requires: (a) a public deed of incorporation (atto costitutivo) by a notary; (b) registration in the Registro delle Imprese; (c) a Codice Fiscale and Partita IVA; (d) appointment of an amministratore (director). An SRL semplificata (simplified SRL) is available with €1 minimum capital for founders under 35.",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile",
  },
  {
    source_id: "it-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "Italy",
    instrument: "D.P.R. 633/1972 — IVA",
    title: "VAT (IVA) Obligations for Italian E-Commerce",
    quotedText:
      "Italian businesses must register for IVA (Imposta sul Valore Aggiunto). Standard rate is 22%, reduced rates 10% and 4% (for specific goods). Sellers must: (a) issue fatture elettroniche (electronic invoices) via the Sistema di Interscambio (SDI) — mandatory since 2019 for most transactions; (b) submit monthly or quarterly IVA declarations (LIPE); (c) file annual IVA dichiarazione; (d) submit the Communication of Invoice Data to the Agenzia delle Entrate. The regime forfettario exempts from charging IVA but also prevents input IVA deduction.",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:1972-633",
  },
  {
    source_id: "it-garante-privacy",
    layer: "structure-liability",
    jurisdiction: "Italy",
    instrument: "Codice Privacy (D.Lgs. 196/2003) & GDPR",
    title: "Garante per la Protezione dei Dati Personali — Italian Data Authority",
    quotedText:
      "The Garante per la Protezione dei Dati Personali is the Italian data protection authority. Under the Codice Privacy (D.Lgs. 196/2003 as amended), Italy adds GDPR requirements including: specific rules on processing of genetic and health data; mandatory DPO appointment for certain sectors; stricter rules for electronic communications consent; and a public register of processing activities for larger enterprises. The Garante can impose fines up to €20 million or 4% of turnover and conducts proactive inspections of e-commerce sites.",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2003-196",
  },
  {
    source_id: "it-minor-founder",
    layer: "structure-liability",
    jurisdiction: "Italy",
    instrument: "Codice Civile Art. 2-10, 394, 396",
    title: "Minors and Contractual Capacity — Italy",
    quotedText:
      "Under Italian law, minors (under 18) lack full contractual capacity. Contracts entered into by a minor are annullable (voidable) at the minor's request upon reaching majority. A minor may be authorised by a court (tribunale per i minorenni) to operate a business with parental assistance, granting capacity for acts within the business scope. A minor cannot independently form an SRL or obtain a Partita IVA without parental representation and court authorisation. Parents may be held jointly liable for the minor's business debts.",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile",
  },
  {
    source_id: "it-consumer-protection",
    layer: "structure-liability",
    jurisdiction: "Italy",
    instrument: "Codice del Consumo (D.Lgs. 206/2005)",
    title: "Italian Consumer Code — Additional E-Commerce Protections",
    quotedText:
      "The Codice del Consumo (Consumer Code) implements the CRD and provides additional protections: (a) 14-day withdrawal right, extended to 12 months if not informed; (b) digital content exception — withdrawal right is lost only with express consent and acknowledgment; (c) warranty of conformity for 2 years from delivery; (d) consumer must report defects within 2 months of discovery (this limitation has been eliminated in recent reforms); (e) unfair commercial practices are strictly prohibited; (f) alternative dispute resolution (ADR) through the Camera di Commercio.",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2005-206",
  },
  {
    source_id: "it-e-invoicing",
    layer: "structure-liability",
    jurisdiction: "Italy",
    instrument: "D.L. 119/2018 — Fatturazione Elettronica",
    title: "Italy — Mandatory Electronic Invoicing for All Businesses",
    quotedText:
      "Since 2019, Italy mandates electronic invoicing (fatturazione elettronica) for all domestic B2B and B2C transactions via the Sistema di Interscambio (SDI). Invoices must be in XML format and transmitted electronically. Non-compliance carries penalties from €250 to €2,000 per invoice. E-commerce sellers must integrate their platforms with the SDI system or use intermediary software. Foreign businesses selling to Italian consumers via e-commerce may also need to comply with specific invoicing rules.",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2018-119",
  },
];
