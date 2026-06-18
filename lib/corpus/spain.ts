import type { RegulatorySource } from "@/lib/types";

export const SPAIN_SOURCES: RegulatorySource[] = [
  {
    source_id: "spain-autonomo",
    layer: "structure-liability",
    jurisdiction: "Spain",
    instrument: "Ley 20/2007 — Estatuto del Trabajo Autónomo",
    title: "Autónomo — Sole Trader Registration and Liability",
    quotedText:
      "Any individual who regularly carries out economic activity in Spain must register as an autónomo (self-employed worker) with the Social Security system and with Hacienda (Agencia Tributaria). As an autónomo, the individual is personally and unlimitedly liable for all business debts with their personal assets. There is no separation between personal and business liability. Registration requires: (a) Model 036 or 037 with Hacienda; (b) Social Security registration (RETA); (c) issuing of invoices with IVA (VAT) breakdown.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-13409",
  },
  {
    source_id: "spain-sl",
    layer: "structure-liability",
    jurisdiction: "Spain",
    instrument: "Ley de Sociedades de Capital (RDL 1/2010)",
    title: "Sociedad Limitada (SL) — Limited Company Structure",
    quotedText:
      "A Sociedad Limitada (SL) is a legal entity separate from its shareholders, providing limited liability protection. Shareholders are only liable up to the amount of their capital contribution. The minimum share capital is €3,000, which must be fully paid up at incorporation. The SL requires: (a) a notarised deed of incorporation (escritura pública); (b) registration in the Mercantile Register; (c) a Tax ID (NIF); (d) a corporate bank account. Operating without an SL as a minor carries significant personal liability risk.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2010-10544",
  },
  {
    source_id: "spain-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "Spain",
    instrument: "Ley 37/1992 del IVA",
    title: "VAT (IVA) Obligations for E-Commerce Sellers in Spain",
    quotedText:
      "Businesses selling goods or services in Spain must register for IVA (VAT) and: (a) charge applicable IVA rates (21% general, 10% reduced, 4% super-reduced); (b) submit quarterly Model 303 IVA returns; (c) submit annual Model 390 IVA summary; (d) issue invoices that comply with Regulation D. For cross-border e-commerce within the EU, the OSS (One-Stop Shop) scheme allows simplified IVA compliance for distance sales of goods to consumers in other Member States. Failure to register and file can result in penalties and interest.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740",
  },
  {
    source_id: "spain-aepd",
    layer: "structure-liability",
    jurisdiction: "Spain",
    instrument: "LOPDGDD 3/2018 & GDPR",
    title: "AEPD — Spanish Data Protection Authority and Additional Requirements",
    quotedText:
      "The Agencia Española de Protección de Datos (AEPD) is the Spanish supervisory authority for data protection compliance. Under the LOPDGDD (Organic Law 3/2018), Spain imposes some additional requirements beyond the GDPR, including: the mandatory appointment of a Data Protection Officer (DPO) for certain categories of merchants; specific rules on video surveillance; and additional requirements for processing of credit and debit card data. The AEPD can impose fines up to €20 million or 4% of annual turnover and publishes guidance for small businesses on GDPR compliance.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673",
  },
  {
    source_id: "spain-minor-founder",
    layer: "structure-liability",
    jurisdiction: "Spain",
    instrument: "Código Civil — Art. 1263",
    title: "Minors and Contractual Capacity in Spain",
    quotedText:
      "Under Spanish law, minors (under 18) lack full contractual capacity. Contracts entered into by a minor are voidable at the minor's option once they reach majority. However, for e-commerce transactions and business operations, a minor cannot form a legal entity (SL) on their own, cannot be registered as an autónomo without parental authorization or emancipation, and is personally liable for business debts. Parents or legal guardians may be held liable for the minor's business activities if they consented or if the minor operated without adequate supervision.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763",
  },
  {
    source_id: "spain-consumer-complaints",
    layer: "structure-liability",
    jurisdiction: "Spain",
    instrument: "RDL 1/2007 — Texto Refundido de la Ley General para la Defensa de los Consumidores",
    title: "Spanish Consumer Protection — Additional E-Commerce Requirements",
    quotedText:
      "Spanish consumer law (TRLGDCU) provides additional protections beyond the EU Consumer Rights Directive, including: a mandatory 2-year legal guarantee on goods; extended withdrawal periods if information duties are not met; and the requirement to display the Hoja de Reclamaciones (official complaints form) prominently, even for online stores. E-commerce sellers must provide a physical postal address and cannot require consumers to bear the cost of returning goods during the withdrawal period.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555",
  },
];
