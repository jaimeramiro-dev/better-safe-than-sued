import type { RegulatorySource } from "@/lib/types";

export const IRELAND_SOURCES: RegulatorySource[] = [
  {
    source_id: "ie-sole-trader",
    layer: "structure-liability",
    jurisdiction: "Ireland",
    instrument: "Companies Act 2014 — Sole Trader",
    title: "Sole Trader — Registration and Liability in Ireland",
    quotedText:
      "A sole trader in Ireland is the simplest business structure — the founder operates under their own name or a registered business name. Registration is with the Revenue Commissioners for tax purposes. There is no separation between personal and business assets; the founder is personally and unlimitedly liable for all business debts. Registration requires: (a) registration with Revenue for Income Tax; (b) registration for VAT if turnover exceeds €37,500 (services) or €75,000 (goods); (c) business name registration with the Companies Registration Office (CRO) if not trading under legal name.",
    url: "https://www.irishstatutebook.ie/eli/2014/act/38/enacted",
  },
  {
    source_id: "ie-dac",
    layer: "structure-liability",
    jurisdiction: "Ireland",
    instrument: "Companies Act 2014 — DAC / CLG",
    title: "DAC — Designated Activity Company (Limited Liability)",
    quotedText:
      "A Designated Activity Company (DAC) is the standard Irish private limited company. Shareholders' liability is limited to their shareholding. Minimum share capital is €1 (though €100+ is typical). The DAC requires: (a) a constitution (memorandum and articles of association); (b) registration with the CRO; (c) at least one director and a company secretary; (d) a registered office in Ireland; (e) annual returns to the CRO; (f) annual financial statements. Directors must file a CRO compliance statement and may be personally liable for reckless trading.",
    url: "https://www.irishstatutebook.ie/eli/2014/act/38/enacted",
  },
  {
    source_id: "ie-vat-obligations",
    layer: "structure-liability",
    jurisdiction: "Ireland",
    instrument: "Value-Added Tax Consolidation Act 2010",
    title: "VAT Obligations for Irish E-Commerce Sellers",
    quotedText:
      "Irish businesses must register for VAT with Revenue. Standard rate is 23%, reduced rates 13.5%, 9%, and 0%. Registration thresholds: €37,500 for services, €75,000 for goods (€35,000 for cross-border acquisitions from other EU states). Sellers must: (a) issue compliant tax invoices; (b) submit bi-monthly or quarterly VAT returns (VAT3 form); (c) file an annual VAT return (VAT3); (d) maintain digital records for Revenue inspections. The OSS is available for cross-border distance sales to EU consumers. Revenue conducts active compliance checks on e-commerce sellers.",
    url: "https://www.irishstatutebook.ie/eli/2010/act/31/enacted",
  },
  {
    source_id: "ie-data-protection",
    layer: "structure-liability",
    jurisdiction: "Ireland",
    instrument: "Data Protection Act 2018 & GDPR",
    title: "DPC — Irish Data Protection Commission",
    quotedText:
      "The Data Protection Commission (DPC) is Ireland's independent data protection authority. Under the Data Protection Act 2018, Ireland implements GDPR with specific provisions including: mandatory DPO appointment for public bodies and certain private entities; specific rules on children's data (digital age of consent is 16, lowerable to 13); and the power to conduct investigations and impose fines up to €20 million or 4% of global turnover. The DPC is the lead supervisory authority for many major tech companies due to the EU's one-stop-shop mechanism and handles cross-border data protection cases.",
    url: "https://www.irishstatutebook.ie/eli/2018/act/7/enacted",
  },
  {
    source_id: "ie-minor-founder",
    layer: "structure-liability",
    jurisdiction: "Ireland",
    instrument: "Age of Majority Act 1985 — Minors",
    title: "Minors and Contractual Capacity — Ireland",
    quotedText:
      "Under Irish law, the age of majority is 18. Minors (under 18) have limited capacity to contract. Contracts for necessaries (essential goods) are binding, but business contracts entered into by a minor are generally voidable at the minor's option. A minor cannot be a director of a DAC or CLG and cannot independently register as a sole trader without parental consent. The Infants Relief Act 1874 (still in force in Ireland) provides that certain contracts made with minors are void. Parents are not automatically liable for a minor's business debts.",
    url: "https://www.irishstatutebook.ie/eli/1985/act/2/enacted",
  },
  {
    source_id: "ie-consumer-protection",
    layer: "structure-liability",
    jurisdiction: "Ireland",
    instrument: "Consumer Rights Act 2022",
    title: "Irish Consumer Rights Act 2022 — Modernised E-Commerce Rules",
    quotedText:
      "The Consumer Rights Act 2022 modernises Irish consumer law, implementing the CRD and the Sale of Goods Directive. Key provisions: (a) 14-day withdrawal right for distance and off-premises contracts; (b) digital content and digital services have specific conformity rules; (c) digital content withdrawal right is lost only with the consumer's express consent and acknowledgment; (d) 6-year limitation period for bringing claims; (e) the CCPC (Competition and Consumer Protection Commission) enforces consumer law with powers to investigate and take enforcement actions; (f) sellers must provide pre-contractual information clearly and in a durable medium.",
    url: "https://www.irishstatutebook.ie/eli/2022/act/37/enacted",
  },
  {
    source_id: "ie-company-secretary",
    layer: "structure-liability",
    jurisdiction: "Ireland",
    instrument: "Companies Act 2014 § 151, 179",
    title: "Ireland — Company Secretary Requirement for Limited Companies",
    quotedText:
      "Every Irish limited company (DAC/CLG) must appoint a company secretary within 6 months of incorporation. The company secretary is responsible for: maintaining statutory registers; filing annual returns with the CRO; ensuring compliance with Companies Act requirements; and maintaining minutes of directors' and shareholders' meetings. The company secretary can be an individual or a corporate body. A sole director cannot also be the company secretary. Failure to maintain proper company records and file returns is a criminal offence with fines and potential director disqualification.",
    url: "https://www.irishstatutebook.ie/eli/2014/act/38/enacted",
  },
];
