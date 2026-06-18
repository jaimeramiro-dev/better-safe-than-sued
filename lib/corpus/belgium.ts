import type { RegulatorySource } from "@/lib/types";

export const BELGIUM_SOURCES: RegulatorySource[] = [
  {
    source_id: "be-independant",
    layer: "structure-liability",
    jurisdiction: "Belgium",
    instrument: "Code de droit économique — Indépendant / Zelfstandige",
    title: "Indépendant / Zelfstandige — Sole Trader in Belgium",
    quotedText:
      "An indépendant (FR) or zelfstandige (NL) is a Belgian sole trader with unlimited personal liability. Registration is with the Banque-Carrefour des Entreprises (BCE/KBO) across the Belgian business register. The founder must: (a) register with the BCE/KBO; (b) obtain a numéro d'entreprise/TVA (VAT number); (c) register with a social security fund for self-employed (caisse d'assurances sociales); (d) register for professional liability insurance (RC professionnelle) for certain activities. There is no legal separation between personal and business assets — creditors can pursue the founder's personal assets.",
    url: "https://www.ejustice.just.fgov.be/cgi_loi/loi.pl",
  },
  {
    source_id: "be-sprl-srl",
    layer: "structure-liability",
    jurisdiction: "Belgium",
    instrument: "Code des sociétés et associations — SPRL/SRL/BV",
    title: "SPRL / SRL / BV — Limited Liability Company in Belgium",
    quotedText:
      "Since the 2019 Companies and Associations Code reform, the Belgian private limited liability company is called the Société Privée à Responsabilité Limitée (SPRL) in French or Besloten Vennootschap (BV) in Dutch. The minimum share capital requirement was abolished (€0.01 minimum). Shareholders are not personally liable for company debts beyond their contribution. The SPRL/BV requires: (a) a notarised deed of incorporation; (b) registration with the BCE/KBO; (c) a registered office in Belgium; (d) appointment of a director (gérant/bestuurder); (e) deposit of the annual accounts with the Banque Nationale de Belgique (BNB). Directors can be held personally liable for certain debts of the company in specific circumstances (faute de gestion).",
    url: "https://www.ejustice.just.fgov.be/loi/loi.pl",
  },
  {
    source_id: "be-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "Belgium",
    instrument: "Code de la TVA — BTW-wetboek",
    title: "VAT (TVA/BTW) Obligations for Belgian E-Commerce",
    quotedText:
      "Belgian businesses must register for TVA/BTW. Standard rate is 21%, reduced rates 12% (social housing) and 6% (essential goods, food, medicine). Registration is via the SPF Finances/FOD Financiën. Sellers must: (a) issue compliant invoices with TVA/BTW breakdown in French, Dutch, or German depending on the region; (b) submit quarterly TVA/BTW declarations; (c) file an annual TVA/BTW listing; (d) submit a monthly intra-Community listing (ICL) for cross-border transactions. The franchise de TVA/BTW small business exemption applies for annual turnover under €25,000. Belgian VAT rules are administered by three regional authorities — the VAT treatment can differ between Flanders, Wallonia, and Brussels.",
    url: "https://www.ejustice.just.fgov.be/loi/loi.pl",
  },
  {
    source_id: "be-data-authority",
    layer: "structure-liability",
    jurisdiction: "Belgium",
    instrument: "Loi relative à la protection des personnes physiques — Loi 30/07/2018",
    title: "APD/GBA — Belgian Data Protection Authority",
    quotedText:
      "The Autorité de Protection des Données (APD) / Gegevensbeschermingsautoriteit (GBA) is the Belgian data protection authority. Under the Belgian GDPR Implementation Law (Law 30/07/2018), Belgium imposes additional requirements including: mandatory DPO appointment for all public bodies; specific rules on processing of national register numbers; and a unique dispute resolution system with a First Line Service, a Disputes Chamber, and an Appeals Chamber. The APD/GBA can fine up to €20 million or 4% of global turnover and is known for proactive enforcement against e-commerce sites for cookie consent and marketing violations.",
    url: "https://www.ejustice.just.fgov.be/loi/loi.pl",
  },
  {
    source_id: "be-minor-founder",
    layer: "structure-liability",
    jurisdiction: "Belgium",
    instrument: "Code civil Art. 372, 476-489",
    title: "Minors and Contractual Capacity — Belgium",
    quotedText:
      "Under Belgian law, minors (under 18) have limited contractual capacity. A minor must obtain judicial authorisation (émancipation/ontvoogding) or parental consent to operate a business. Emancipation may be granted by the family court for minors over 16 with valid reasons. An emancipated minor has full capacity for all civil acts. Without emancipation, a minor cannot independently register as an indépendant/zelfstandige or form an SPRL/BV. Contracts entered into by an unemancipated minor are voidable. Parents may incur liability for the minor's business activities if they failed to exercise proper supervision.",
    url: "https://www.ejustice.just.fgov.be/loi/loi.pl",
  },
  {
    source_id: "be-consumer-protection",
    layer: "structure-liability",
    jurisdiction: "Belgium",
    instrument: "Code de droit économique Livre VI — Pratiques du marché",
    title: "Belgian Consumer Protection — Distance Selling and E-Commerce",
    quotedText:
      "Book VI of the Belgian Code de droit économique/Wetboek van economisch recht implements the CRD with specific Belgian features: (a) 14-day withdrawal right for distance and off-premises contracts; (b) extended to 12 months if withdrawal information is not provided; (c) digital content exception — withdrawal right is lost only with the consumer's express consent; (d) specific language requirements — contract terms must be available in the language of the consumer's region (French, Dutch, or German); (e) the seller must provide a physical address and contact details; (f) blacklists of unfair contract terms are specifically defined; (g) the SPF Économie/FOD Economie is the enforcement authority.",
    url: "https://www.ejustice.just.fgov.be/loi/loi.pl",
  },
  {
    source_id: "be-language-requirements",
    layer: "structure-liability",
    jurisdiction: "Belgium",
    instrument: "Lois linguistiques — Wetgeving taalgebruik",
    title: "Belgium — Language Requirements for E-Commerce",
    quotedText:
      "Belgium has three official languages: Dutch (Flanders), French (Wallonia), and German (East Cantons). E-commerce sellers targeting Belgian consumers must provide all mandatory information (including: contract terms, privacy policy, withdrawal information, customer service) in the language of the consumer's region. The information must be offered in French and/or Dutch as a minimum for Belgium-wide sales. Failure to provide information in the correct language can lead to the contract terms being deemed unfair and unenforceable against the consumer. The language decree in Flanders specifically requires Dutch-language communication with Flemish consumers.",
    url: "https://www.ejustice.just.fgov.be/loi/loi.pl",
  },
];
