import type { RegulatorySource } from "@/lib/types";

export const PORTUGAL_SOURCES: RegulatorySource[] = [
  {
    source_id: "pt-empresario-nome-individual",
    layer: "structure-liability",
    jurisdiction: "Portugal",
    instrument: "Código Comercial Art. 13-18 — Empresário em Nome Individual",
    title: "Empresário em Nome Individual — Sole Trader in Portugal",
    quotedText:
      "An Empresário em Nome Individual is a Portuguese sole trader with unlimited personal liability for business debts. Registration requires: (a) obtaining a NIF (Número de Identificação Fiscal) from the Autoridade Tributária; (b) registration with the Segurança Social (social security); (c) registration with RNPC (Registo Nacional de Pessoas Colectivas). The empresário is personally responsible for all business obligations with their full personal estate. There is a simplified regime for small businesses with annual turnover under €200,000.",
    url: "https://diariodarepublica.pt/legislacao/codigo-comercial",
  },
  {
    source_id: "pt-unipessoal",
    layer: "structure-liability",
    jurisdiction: "Portugal",
    instrument: "Código das Sociedades Comerciais Art. 270-275 — Unipessoal Lda",
    title: "Unipessoal Lda — Single-Member Limited Company",
    quotedText:
      "A Sociedade Unipessoal por Quotas (Unipessoal Lda) is a Portuguese single-member limited liability company. The shareholder's liability is limited to their capital contribution. Minimum share capital is €1 (though €5,000+ is recommended for credibility). The Unipessoal requires: (a) a public deed of incorporation or online incorporation via Empresa na Hora; (b) registration with the Conservatória do Registo Comercial; (c) a NIF and NIPC (business tax ID); (d) a registered office address; (e) appointment of a gerente (manager). The manager can be personally liable for illegal or mismanagement actions.",
    url: "https://diariodarepublica.pt/legislacao/codigo-sociedades-comerciais",
  },
  {
    source_id: "pt-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "Portugal",
    instrument: "Código do IVA — Decreto-Lei 394-B/1984",
    title: "VAT (IVA) Obligations for Portuguese E-Commerce",
    quotedText:
      "Portuguese businesses must register for IVA (Imposto sobre o Valor Acrescentado) with the Autoridade Tributária. Standard rate is 23%, with reduced rates of 13% (mainland) and 6% for essential goods. Madeira and the Azores have separate rates. Sellers must: (a) issue compliant invoices with IVA breakdown, using certified invoicing software; (b) submit monthly or quarterly IVA declarations (Declaração Periódica); (c) file an annual IVA summary (Declaração Anual); (d) submit SAF-T (Standard Audit File for Tax) files electronically. The Regime de IVA de Caixa (cash accounting scheme) is available for businesses with turnover under €500,000.",
    url: "https://diariodarepublica.pt/legislacao/codigo-iva",
  },
  {
    source_id: "pt-cnpd",
    layer: "structure-liability",
    jurisdiction: "Portugal",
    instrument: "Lei 58/2019 & GDPR",
    title: "CNPD — Portuguese Data Protection Authority",
    quotedText:
      "A Comissão Nacional de Protecção de Dados (CNPD) is the Portuguese data protection authority. Under Lei 58/2019 (national GDPR implementation law), Portugal imposes additional requirements including: mandatory DPO appointment for certain processing activities; specific rules on processing of health data; and a requirement to notify the CNPD of certain processing activities. The CNPD can impose fines up to €20 million or 4% of annual turnover and actively enforces rules on electronic marketing, video surveillance, and data breach notifications.",
    url: "https://diariodarepublica.pt/legislacao/lei-58-2019",
  },
  {
    source_id: "pt-minor-founder",
    layer: "structure-liability",
    jurisdiction: "Portugal",
    instrument: "Código Civil Art. 122-130 — Menores",
    title: "Minors and Contractual Capacity — Portugal",
    quotedText:
      "Under Portuguese law, minors (under 18) have limited contractual capacity. A minor needs parental authorisation or emancipation to operate a business. Emancipation (emancipação) can be granted by parents or by court order for minors over 16. An emancipated minor has full capacity for business acts. Without emancipation, a minor cannot register as an Empresário em Nome Individual or form a Unipessoal Lda. Contracts entered into by an unemancipated minor are voidable (anuláveis). Parents may be held responsible for the minor's business debts.",
    url: "https://diariodarepublica.pt/legislacao/codigo-civil",
  },
  {
    source_id: "pt-consumer-protection",
    layer: "structure-liability",
    jurisdiction: "Portugal",
    instrument: "Lei 24/96 — Defesa do Consumidor & Decreto-Lei 84/2021",
    title: "Portuguese Consumer Protection — Distance Selling",
    quotedText:
      "Portuguese consumer law under Lei 24/96 (Defesa do Consumidor) and DL 84/2021 provides: (a) 14-day withdrawal right for distance contracts with a mandatory model withdrawal form; (b) extended withdrawal period of 12 months if the trader fails to provide the required information; (c) digital content exception — withdrawal right is lost only with the consumer's express consent and acknowledgment; (d) 3-year legal guarantee (dobrada — the seller must repair or replace and the 3-year period applies to the repaired item); (e) consumer may complain via the Portal da Queixa and the Direção-Geral do Consumidor (DGC).",
    url: "https://diariodarepublica.pt/legislacao/lei-24-1996",
  },
  {
    source_id: "pt-saf-t",
    layer: "structure-liability",
    jurisdiction: "Portugal",
    instrument: "Portaria 302/2016 — SAF-T (PT)",
    title: "Portugal — Mandatory SAF-T Digital Tax Filing",
    quotedText:
      "Portugal requires all businesses to maintain certified invoicing software and submit SAF-T (Standard Audit File for Tax) files to the Autoridade Tributária. The SAF-T (PT) file contains transaction-level data and must be submitted monthly, quarterly, or annually depending on the business's regime. E-commerce platforms and payment gateways must integrate with certified invoicing systems. Non-compliance can result in fines and business closure orders. Foreign e-commerce sellers selling to Portuguese consumers may also need to comply if they have a Portuguese VAT registration.",
    url: "https://diariodarepublica.pt/legislacao/portaria-302-2016",
  },
];
