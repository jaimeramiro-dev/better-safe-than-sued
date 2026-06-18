import type { RegulatorySource } from "@/lib/types";
import { SPAIN_SOURCES } from "@/lib/corpus/spain";
import { GERMANY_SOURCES } from "@/lib/corpus/germany";
import { FRANCE_SOURCES } from "@/lib/corpus/france";
import { ITALY_SOURCES } from "@/lib/corpus/italy";
import { NETHERLANDS_SOURCES } from "@/lib/corpus/netherlands";
import { IRELAND_SOURCES } from "@/lib/corpus/ireland";
import { PORTUGAL_SOURCES } from "@/lib/corpus/portugal";
import { BELGIUM_SOURCES } from "@/lib/corpus/belgium";

const EU_WIDE_SOURCES: RegulatorySource[] = [
  // ── Payments & SCA (PSD2) ──────────────────────────────────────
  {
    source_id: "psd2-74",
    layer: "payments-sca",
    jurisdiction: "EU",
    instrument: "PSD2 Art. 74",
    title: "Strong Customer Authentication",
    quotedText:
      "Member States shall ensure that the payment service provider applies strong customer authentication where the payer: (a) accesses its payment account online; (b) initiates an electronic payment transaction; (c) carries out any action through a remote channel which may imply a risk of payment fraud or other abuses. Strong customer authentication shall be applied dynamically linking the transaction to a specific amount and a specific payee.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L2366",
  },
  {
    source_id: "psd2-74-exemptions",
    layer: "payments-sca",
    jurisdiction: "EU",
    instrument: "PSD2 Art. 74 & RTS Art. 11-18",
    title: "SCA Exemptions — Low Value, Recurring, Whitelisted",
    quotedText:
      "SCA exemptions include: (a) contactless payments under €50 cumulative; (b) unattended transit terminals; (c) low-value remote payments under €30 per transaction with a €100 cumulative cap; (d) recurring fixed-amount transactions (same amount, same payee); (e) transactions to whitelisted beneficiaries; (f) corporate payment processes that meet security requirements. The payment service provider bears the liability for unauthorised transactions when SCA is not applied.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0389",
  },
  {
    source_id: "psd2-liability-shift",
    layer: "payments-sca",
    jurisdiction: "EU",
    instrument: "PSD2 Art. 73-74",
    title: "Liability Shift for Non-SCA Transactions",
    quotedText:
      "Where the payer's payment service provider does not require strong customer authentication, the payer shall not bear any financial consequences of unauthorised transactions unless the payer has acted fraudulently or with gross negligence. The payment service provider bears the full loss from unauthorised transactions when SCA is not applied, including chargebacks resulting from fraudulent card-not-present transactions.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L2366",
  },
  {
    source_id: "psd2-refund-right",
    layer: "payments-sca",
    jurisdiction: "EU",
    instrument: "PSD2 Art. 76",
    title: "Refund Rights for Direct Debits and Unauthorised Transactions",
    quotedText:
      "The payer has an unconditional right to a refund from their payment service provider for any unauthorised transaction. The payment service provider must refund the full amount of the unauthorised transaction immediately upon becoming aware of it, and in any event no later than the end of the following business day. The burden of proof that the transaction was authenticated lies with the payment service provider.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L2366",
  },

  // ── Chargebacks & Card-Network Rules ──────────────────────────
  {
    source_id: "visa-vdmp",
    layer: "chargebacks",
    jurisdiction: "EU",
    instrument: "Visa VDMP",
    title: "Visa Dispute Monitoring Program",
    quotedText:
      "Visa's Dispute Monitoring Program (VDMP) applies to merchants whose monthly dispute activity exceeds thresholds: (a) 0.9% dispute-to-transaction ratio for standard merchants, or (b) 1.8% for merchants processing fewer than 100,000 transactions per month. Merchants who exceed thresholds are placed into the monitoring program and face escalating fines up to $50,000 per violation, and ultimately termination of their ability to accept Visa payments.",
    url: "https://usa.visa.com/dam/VCOM/download/merchants/dispute-monitoring-program-guidelines.pdf",
  },
  {
    source_id: "mastercard-ecm",
    layer: "chargebacks",
    jurisdiction: "EU",
    instrument: "Mastercard ECM",
    title: "Mastercard Excessive Chargeback Program",
    quotedText:
      "Mastercard's Excessive Chargeback Program (ECM) applies when a merchant's monthly chargebacks exceed 1.5% of their total transactions, or 100 chargebacks, whichever is higher. Penalties include a $1,000 fee per violation, escalating monthly fees, and possible acquirer and merchant termination. Merchants in the program must submit and implement a compliance remediation plan.",
    url: "https://www.mastercard.com/global/en/merchants/safety-security/dispute-resolution.html",
  },
  {
    source_id: "chargeback-fraud-reason-codes",
    layer: "chargebacks",
    jurisdiction: "EU",
    instrument: "Card-Network Rules",
    title: "Fraud Chargeback Reason Codes — Key Patterns for Digital Goods",
    quotedText:
      "The most common fraud-related chargeback reason codes include: Visa 10.5 (EMV Liability Shift Counterfeit Fraud), Visa 10.4 (Other Fraud — Card Not Present), Mastercard 4837 (No Cardholder Authorization), Mastercard 4840 (Fraud — Card Present Transaction), and Mastercard 4849 (Questionable Merchant Activity). For digital goods and gift cards, reason code 10.4 (Visa) and 4849 (Mastercard) are most relevant as they cover stolen-card fraud in card-not-present environments.",
    url: "https://www.mastercard.com/global/en/merchants/safety-security/dispute-resolution.html",
  },
  {
    source_id: "chargeback-merchant-liability",
    layer: "chargebacks",
    jurisdiction: "EU",
    instrument: "Card-Network Rules",
    title: "Merchant Liability for Fraudulent Transactions",
    quotedText:
      "In card-not-present transactions where SCA is not applied, the merchant bears full liability for fraudulent chargebacks. This means the merchant must refund the transaction amount plus pay chargeback fees. For digital goods delivered instantly (gift cards, game codes, digital downloads), there is no recourse to recover the goods once delivered. Excessive chargebacks can result in the merchant being placed on the MATCH list (Terminated Merchant File), making it impossible to open a new payment account for up to five years.",
    url: "https://www.mastercard.com/global/en/merchants/safety-security/dispute-resolution.html",
  },

  // ── Data Protection (GDPR) ─────────────────────────────────────
  {
    source_id: "gdpr-5",
    layer: "data-protection",
    jurisdiction: "EU",
    instrument: "GDPR Art. 5",
    title: "Principles of Personal Data Processing",
    quotedText:
      "Personal data shall be: (a) processed lawfully, fairly and in a transparent manner; (b) collected for specified, explicit and legitimate purposes; (c) adequate, relevant and limited to what is necessary; (d) accurate and kept up to date; (e) kept in a form which permits identification of data subjects for no longer than necessary; (f) processed in a manner that ensures appropriate security. The controller shall be responsible for and be able to demonstrate compliance (accountability principle).",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
  },
  {
    source_id: "gdpr-6",
    layer: "data-protection",
    jurisdiction: "EU",
    instrument: "GDPR Art. 6",
    title: "Lawfulness of Processing — Legal Bases for an Online Store",
    quotedText:
      "Processing is lawful only if at least one of the following applies: (a) the data subject has given consent; (b) processing is necessary for the performance of a contract; (c) processing is necessary for compliance with a legal obligation; (d) processing is necessary to protect vital interests; (e) processing is necessary for the performance of a task carried out in the public interest; (f) processing is necessary for the legitimate interests of the controller. For an e-commerce store, contract performance (b) and consent (a) are the most relevant legal bases.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
  },
  {
    source_id: "gdpr-7",
    layer: "data-protection",
    jurisdiction: "EU",
    instrument: "GDPR Art. 7",
    title: "Conditions for Consent",
    quotedText:
      "Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented to processing of his or her personal data. If the data subject's consent is given in the context of a written declaration which also concerns other matters, the request for consent shall be presented in a manner which is clearly distinguishable from the other matters, in an intelligible and easily accessible form, using clear and plain language. The data subject shall have the right to withdraw his or her consent at any time.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
  },
  {
    source_id: "gdpr-13",
    layer: "data-protection",
    jurisdiction: "EU",
    instrument: "GDPR Art. 13",
    title: "Information to Be Provided Where Personal Data Are Collected from the Data Subject",
    quotedText:
      "Where personal data relating to a data subject are collected from the data subject, the controller shall provide the following information: the identity and contact details of the controller; the purposes and legal basis of processing; the legitimate interests pursued; the recipients of data; the intention to transfer data to a third country; the storage period; the right to access, rectify, erase, restrict processing, data portability; the right to withdraw consent; the right to lodge a complaint with a supervisory authority; and whether providing data is a contractual requirement.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
  },
  {
    source_id: "gdpr-32",
    layer: "data-protection",
    jurisdiction: "EU",
    instrument: "GDPR Art. 32",
    title: "Security of Processing — Technical and Organisational Measures",
    quotedText:
      "The controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including: (a) pseudonymisation and encryption; (b) confidentiality, integrity, availability and resilience of systems; (c) ability to restore access in the event of an incident; (d) regular testing of security measures. In assessing the appropriate level of security, account shall be taken of the risks presented by processing, including accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to personal data.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
  },
  {
    source_id: "gdpr-fines",
    layer: "data-protection",
    jurisdiction: "EU",
    instrument: "GDPR Art. 83",
    title: "Administrative Fines — Upper Bounds",
    quotedText:
      "Infringements of the basic processing principles, consent conditions, and data subjects' rights shall be subject to administrative fines up to €20,000,000 or 4% of total worldwide annual turnover, whichever is higher. Infringements of security obligations and notification duties shall be subject to fines up to €10,000,000 or 2% of total worldwide annual turnover, whichever is higher.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
  },

  // ── Consumer Rights (CRD) ──────────────────────────────────────
  {
    source_id: "crd-withdrawal-14",
    layer: "consumer-rights",
    jurisdiction: "EU",
    instrument: "CRD Art. 9-10",
    title: "Right of Withdrawal — 14-Day Cooling-Off Period",
    quotedText:
      "The consumer shall have a period of 14 days to withdraw from a distance or off-premises contract without giving any reason and without incurring any costs. The withdrawal period begins: for goods, from the day the consumer acquires physical possession; for digital content not supplied on a tangible medium, from the day the contract is concluded. The seller must provide the consumer with a standard withdrawal form and inform them of the right of withdrawal before the contract is concluded.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0083",
  },
  {
    source_id: "crd-digital-exception",
    layer: "consumer-rights",
    jurisdiction: "EU",
    instrument: "CRD Art. 16",
    title: "Digital Content Exception — When the Right of Withdrawal is Lost",
    quotedText:
      "The right of withdrawal shall not apply to the supply of digital content which is not supplied on a tangible medium if the performance has begun with the consumer's prior express consent and the consumer has acknowledged that they thereby lose the right of withdrawal. For digital gift cards and game codes delivered instantly, this exception applies: the moment the code is delivered and the consumer has consented, the cooling-off period no longer applies.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0083",
  },
  {
    source_id: "crd-info-duties",
    layer: "consumer-rights",
    jurisdiction: "EU",
    instrument: "CRD Art. 6",
    title: "Information Requirements for Distance Contracts",
    quotedText:
      "Before the consumer is bound by a distance contract, the trader shall provide clear and comprehensible information about: the main characteristics of the goods or services; the identity and contact details of the trader; the total price including taxes and delivery costs; the duration of the contract; the conditions for withdrawal; the cost of using distance communication if calculated above the basic rate; and the existence of any codes of conduct, complaint handling, and out-of-court redress mechanisms.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0083",
  },
  {
    source_id: "crd-delivery",
    layer: "consumer-rights",
    jurisdiction: "EU",
    instrument: "CRD Art. 18",
    title: "Delivery — Timeframe and Risk",
    quotedText:
      "Unless otherwise agreed, the trader shall deliver the goods by transferring the risk to the consumer within 30 days of the conclusion of the contract. If the trader fails to deliver the goods within the agreed timeframe, the consumer shall set an additional period and is entitled to terminate the contract if delivery still does not occur. For digital content delivered electronically, the trader must deliver immediately unless agreed otherwise.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0083",
  },

  // ── Fraud & AML Exposure ───────────────────────────────────────
  {
    source_id: "fraud-gift-card",
    layer: "fraud-aml",
    jurisdiction: "EU",
    instrument: "Industry Best Practice",
    title: "Gift Card Fraud Patterns — Stolen-Card Trafficking",
    quotedText:
      "Gift cards, game codes, and other instantly-delivered digital goods are the most common target for stolen-card fraud. Fraudsters use stolen credit/debit card details to purchase digital codes, which are then resold on secondary markets (Telegram, Discord, eBay) within minutes. Key red flags include: (a) high-value orders from previously inactive customers; (b) multiple identical purchases in rapid succession; (c) shipping and billing country mismatches; (d) orders placed using anonymous email addresses; (e) orders where the IP address geolocation does not match the cardholder's country.",
    url: "https://www.europeanpaymentscouncil.eu/",
  },
  {
    source_id: "fraud-signals-logistics",
    layer: "fraud-aml",
    jurisdiction: "EU",
    instrument: "Industry Best Practice",
    title: "Fraud Signals for Digital Delivery Merchants",
    quotedText:
      "For merchants delivering digital goods by email or download link, typical fraud signals include: (a) the customer orders far more quantity than typical usage; (b) the customer requests immediate delivery by a specific channel; (c) the email domain is temporary or not a major provider; (d) the order is placed from a high-risk jurisdiction not matched to the customer's location; (e) the customer uses multiple different cards for separate orders in a short time window. Platform 'amber' flags should not be treated as safe — they indicate elevated likelihood of fraud.",
    url: "https://www.europeanpaymentscouncil.eu/",
  },
  {
    source_id: "fraud-3ds",
    layer: "fraud-aml",
    jurisdiction: "EU",
    instrument: "PSD2 / RTS on SCA",
    title: "3D Secure (SCA) as a Fraud Mitigation Tool",
    quotedText:
      "Strong Customer Authentication (3D Secure / 3DS) requires the cardholder to authenticate using two or more factors: knowledge (password/PIN), possession (phone/card), or inherence (fingerprint). When 3DS is applied, liability for fraudulent transactions shifts from the merchant to the card issuer. For e-commerce merchants, enabling 3DS on all card-not-present transactions is the single most effective fraud mitigation: it prevents most stolen-card fraud and protects the merchant from chargeback liability even when fraud does occur.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0389",
  },
  {
    source_id: "fraud-aml-obligations",
    layer: "fraud-aml",
    jurisdiction: "EU",
    instrument: "AMLD4 (2015/849) & AMLD5 (2018/843)",
    title: "AML Obligations for E-Commerce Merchants",
    quotedText:
      "Merchants handling payments above €10,000 in a single transaction or series of linked transactions must apply customer due diligence measures under the EU Anti-Money Laundering Directives. For merchants of digital goods, gift cards, and high-value items, monitoring for unusual transaction patterns and reporting suspicious activity to the Financial Intelligence Unit (FIU) may be required. Each Member State operates its own FIU — check your country's designated authority.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L0849",
  },
];

export const REGULATORY_SOURCES: RegulatorySource[] = [
  ...EU_WIDE_SOURCES,
  ...SPAIN_SOURCES,
  ...GERMANY_SOURCES,
  ...FRANCE_SOURCES,
  ...ITALY_SOURCES,
  ...NETHERLANDS_SOURCES,
  ...IRELAND_SOURCES,
  ...PORTUGAL_SOURCES,
  ...BELGIUM_SOURCES,
];
