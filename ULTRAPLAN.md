# AI Compliance Copilot — Ultraplan
### USAII AI Hackathon · EU e-commerce edition

> Working title: **Reef** — the safe waters where a new shark learns to swim before the open sea.
> (Alternatives: *Beacon*, *Harbor*, *Anchor*. Pick at kickoff; the docs use "Reef" as placeholder.)

---

## 0. TL;DR

A personalized, source-grounded **compliance & risk copilot** for first-time e-commerce founders in the EU. The founder describes their business in plain language; Reef builds a persistent **Company Profile**, crosses it against the regulatory and fraud-risk layers that actually apply to *that* combination (product × country × audience × platform × payment method × logistics), and returns a **plain-English Risk Map**: what can go wrong, what to configure before selling, what fraud signals to watch, and what they're overlooking.

It is **not a search engine** (it reasons over the founder's specific intersection) and **not legal advice** (it never issues a legal verdict — it gives a risk map, always cites its sources, and routes high-stakes decisions to a human professional).

**Anti-hallucination is the spine of the product, not an afterthought:** real law texts are retrieved (RAG) before any answer, every risk point is forced to cite a concrete source identifier (StrictCitations), and an eval harness gates quality.

---

## 1. The user & the job-to-be-done

**Who:** A young or first-time e-commerce founder, about to launch or already selling. Not a lawyer, not a payments expert. In a hurry to sell. No budget for legal/tax counsel. *Doesn't know what they don't know.*

**The lived problem (our story → the hero demo):** Sharkiez received a wave of high-value orders from Mexico, flagged amber (possible fraud) but not red in Shopify. We shipped. They were stolen-card fraudsters buying gift cards to resell on Telegram. Months later: chargebacks, banned from Shopify Payments, forced to repay, threatened with "unlimited personal liability." High-school students, no legal structure, no advisor, no warning until it was too late.

**Job-to-be-done:** *"Before I get burned, tell me — in plain language and specific to MY business — what I'm exposed to, what to set up, and what to watch, so I can act and (when it matters) talk to a professional from an informed position instead of from zero."*

**Why AI and not Google:** No page exists for "what happens if I get chargebacks from stolen-card fraud as a minor with no legal structure selling gift cards from Spain." The value is **reasoning over a specific intersection of layers** and translating it into clear, actionable guidance — with receipts.

---

## 2. Product principles

1. **Personalized, not generic.** Every answer is conditioned on the founder's Company Profile. No boilerplate.
2. **Grounded, never invented.** Every regulatory claim is retrieved from a real source and cited. No citation → no claim.
3. **A risk map, never a verdict.** We surface risk and clarity; the legal decision always stays with the human. Persistent, visible disclaimer + "validate with a professional" routing on high-severity items.
4. **Plain language first.** Founder-readable by default; the exact legal text is one click away.
5. **Transparent reasoning.** Show *why* a risk applies (which profile facts triggered it, which source backs it) — "thinking states" like Harvey/Legora.
6. **Actionable.** Each risk has a "what to do before you sell" next step and a severity.

---

## 3. UX & input model

> Informed by Harvey & Legora. Both: natural-language goal entry → agentic step-by-step reasoning with visible "thinking states" → cited output, inside a familiar surface. **Key divergence: we do NOT ingest the user's files.** Our grounding context is (a) the founder's Company Profile and (b) the curated EU law corpus. The founder is the data source, not their documents.

### 3.1 Onboarding → Company Profile (the personalization context)
A short, hybrid intake — guided fields + one free-text box — that becomes a **persistent workspace context** reused on every query (this is our analog to Harvey's "Vault"/Legora's document set, but it's a *profile*, not files):

- **What you sell** (physical / digital / gift cards / subscriptions / services) + category (e.g. age-restricted, regulated goods)
- **Where** you're based (legal entity country) and **where you ship/sell** (target countries)
- **To whom** (B2C / B2B, age of audience, are *you* a minor?)
- **Platform** (Shopify, WooCommerce, custom, marketplace)
- **Payment method/processor** (Shopify Payments, Stripe, PayPal, …)
- **Logistics model** (own stock, dropship, print-on-demand, digital delivery)
- **Free-text:** "Anything else about your situation?" — the founder describes in natural language; the LLM extracts/normalizes into the structured profile.

Output of onboarding: a structured, editable Company Profile the founder can revisit and update (re-runs the Risk Map).

### 3.2 The Risk Map (primary output surface)
Not a chat wall — a **structured, scannable dashboard** the founder can act on:

- **Risk cards**, each with: title in plain English · severity (Critical / High / Medium / Watch) · the *profile facts* that triggered it · 1–2 sentence plain explanation · **"What to do before you sell"** action · **source citation(s)** (click to read the exact article) · **"Talk to a professional about this"** flag on Critical/High.
- Grouped by **layer**: Payments & Fraud · Data Protection · Consumer Rights · Business Structure & Liability.
- A **"What you're overlooking"** section: gaps the founder didn't ask about but that apply to their profile.
- A **Fraud-signals watchlist** tailored to their payment/logistics setup (the part that would have saved Sharkiez).

### 3.3 Conversational copilot (secondary, on top of the Risk Map)
A chat where the founder asks follow-ups ("what's a chargeback?", "do I need SCA if I use Stripe?"). Every answer:
- is conditioned on their Company Profile,
- retrieves and **cites** real sources,
- shows a brief "thinking" trace (which layers/sources it consulted),
- ends with the disclaimer when the topic is high-stakes.

### 3.4 Transparency & trust UI
- **Thinking states:** "Checking PSD2/SCA against your Stripe + EU setup… Checking card-network chargeback rules… Checking consumer-rights cooling-off for digital goods…"
- **Citations everywhere:** inline superscripts → a source panel with the exact quoted article and a link.
- **Confidence + "not legal advice" banner** persistent; high-severity items get an explicit "validate with a professional" CTA.

---

## 4. AI architecture (hybrid RAG + LLM)

```
Founder input (profile + free text + follow-up questions)
        │
        ▼
[1] Profile normalizer (LLM)  ──►  structured Company Profile (JSON)
        │
        ▼
[2] Layer router  ──►  which regulatory layers apply (PSD2/SCA, chargebacks, GDPR, consumer rights, structure/liability)
        │
        ▼
[3] Retrieval (RAG)  ──►  pull the exact, real source passages for the applicable layers
        │                  (vector search over a CURATED EU law corpus + card-network rule summaries)
        ▼
[4] Reasoner (Claude, latest model)  ──►  cross profile × retrieved sources → personalized risk findings
        │                                   STRICT: every finding must cite a retrieved source id; no source → drop the claim
        ▼
[5] Grounding/verification pass  ──►  check every citation resolves to a real retrieved passage (anti-hallucination gate)
        │
        ▼
[6] Risk Map renderer  ──►  severity, plain-English, actions, citations, disclaimers
```

### 4.1 Why hybrid (this is exactly what you asked for)
- **RAG (files = the real laws):** the model never invents the *content* of the law — it retrieves the actual article text and quotes it. This is the "no hallucination" guarantee. Legal-AI research shows 13–21% of citations hallucinate *without* grounding, so this is non-negotiable.
- **LLM (personalization):** the model does the *reasoning* — which layers apply to *this* founder, how they interact, what the practical risk is, what to do — and translates legalese into plain English tailored to the company.

### 4.2 Anti-hallucination, concretely
- **StrictCitations prompting:** the reasoner must attach a `source_id` (and quoted span) to every finding. The renderer **drops any finding without a resolvable citation.** This turns the LLM into a "verifiable extractor," per current best practice.
- **Retrieval-before-reasoning:** no finding may rest on parametric knowledge; it must rest on a retrieved passage.
- **Verification pass (cheap second LLM call or rule check):** confirm each cited span actually exists in the retrieved set and supports the claim (groundedness/faithfulness check).
- **Eval harness (offline + CI):** a labeled set of founder scenarios → expected layers/risks/citations. Score **faithfulness, citation-grounding, coverage, and "no-verdict" compliance.** Tooling options (pick one for the hackathon, see §8): **Braintrust** (you flagged it — strong end-to-end evals + monitoring), **Promptfoo** (CI-native, zero hosted account, fastest to stand up), **Confident AI/DeepEval** (50+ metrics incl. faithfulness/hallucination), **Patronus/Lynx** (purpose-built for regulated domains).

### 4.3 Models
- **Reasoner:** latest Claude (Opus 4.8 for the heavy cross-layer reasoning; Sonnet 4.6 for cheaper follow-up chat). Access via **Vercel AI Gateway** with `"provider/model"` strings (built-in fallback + observability + zero data retention).
- **Profile normalization & verification:** Sonnet 4.6 / Haiku 4.5 (fast, cheap).

---

## 5. Regulatory scope — the knowledge layers (EU)

The MVP corpus is **curated and small but real** (demo-able, scalable to EU-27 later). Each layer = a folder of real source passages with stable `source_id`s.

| Layer | What it covers | Source material to ingest |
|---|---|---|
| **Payments & SCA** | PSD2 Strong Customer Authentication, when SCA applies/exempt, liability shift | PSD2 (Directive 2015/2366) + RTS on SCA (Reg. 2018/389) key articles |
| **Chargebacks & card-network rules** | Fraud chargeback reason codes, merchant liability, gift-card/high-risk patterns | Public summaries of Visa/Mastercard chargeback rules + reason codes (paraphrased, cited) |
| **Data protection** | GDPR duties for an online store: lawful basis, privacy notice, consent, data subject rights | GDPR (Reg. 2016/679) key articles (5, 6, 7, 12–22, 32) |
| **Consumer rights** | Right of withdrawal / cooling-off (incl. digital-goods exceptions), info duties, refunds | Consumer Rights Directive (2011/83/EU); Distance selling provisions |
| **Business structure & liability** | Sole trader vs company, personal liability exposure (the Sharkiez wound) | Plain-language explainers + Spain-specific autónomo/SL note for the demo |

> **Demo focus = Spain.** Build deep on the Spanish instantiation (real case), keep the architecture generic so layers swap per country to scale to EU-27.

---

## 6. Tech stack

- **Framework:** Next.js (App Router) on **Vercel** (Fluid Compute, Node 24).
- **AI:** **Vercel AI SDK** + **AI Gateway** → Claude (Opus 4.8 reasoner, Sonnet 4.6 chat). Streaming for thinking states.
- **Retrieval:** vector store for the law corpus. Hackathon-pragmatic options: a Marketplace vector DB (e.g. Upstash/Neon+pgvector) or, given the corpus is small, an in-repo embedded index. Embeddings via AI SDK.
- **UI:** **shadcn/ui** + Tailwind (fast, clean, English). Risk cards, source panel, profile editor, chat.
- **State/data:** lightweight DB (Neon Postgres via Marketplace) for Company Profiles + saved Risk Maps; or local/session for a pure-demo build.
- **Evals:** Promptfoo (fastest) or Braintrust (richest) — see §8.
- **Deploy:** Vercel preview URLs per push; production for the demo.

> Stack defaults chosen for hackathon speed + because we're already in a Vercel/Next environment. Swappable.

---

## 7. Data model (sketch)

```
CompanyProfile { id, sells[], productCategory, baseCountry, targetCountries[],
                 audience (B2C/B2B, minorFounder?), platform, paymentProcessor,
                 logisticsModel, freeText, createdAt, updatedAt }

RegulatorySource { source_id, layer, jurisdiction, instrument (e.g. "GDPR Art.6"),
                   title, quotedText, url, embedding }

RiskFinding { id, profileId, layer, title, severity,
              triggeredByFacts[], plainExplanation, actionBeforeSelling,
              citations[source_id], needsProfessional (bool) }

RiskMap { id, profileId, findings[], overlookedSection, fraudWatchlist[], generatedAt }
```

---

## 8. Anti-hallucination & evaluation strategy (judging differentiator)

This is both a quality mechanism and a **Responsible-AI talking point** for judges.

1. **Grounding:** RAG + StrictCitations + drop-uncited-claims (§4.2).
2. **Verification pass:** automatic groundedness check on every citation.
3. **Eval harness:** ~15–25 labeled founder scenarios (incl. the Sharkiez case) with expected layers/risks/citations. Metrics:
   - *Faithfulness / groundedness* (no claim beyond sources)
   - *Citation accuracy* (every citation resolves & supports)
   - *Coverage* (did we catch the applicable layers?)
   - *No-verdict compliance* (never gives a definitive legal ruling; always routes high-severity to a pro)
   - *Plain-language readability*
4. **Tool choice (recommendation):** **Promptfoo** for the hackathon (YAML assertions, GitHub Actions, no account, fastest), with **Braintrust** as the "production-grade" upgrade story to show judges (end-to-end evals + monitoring + release gating). Mention **Patronus/Lynx** as the regulated-domain option. *Decision flagged in §16.*

---

## 9. End-to-end flow (the demo path)

1. Founder lands → "Tell us about your store" → fills hybrid intake (Sharkiez: digital gift cards, based in Spain, ships globally incl. Mexico, B2C, founder is a minor, Shopify + Shopify Payments, digital delivery).
2. Reef normalizes → Company Profile.
3. Generate Risk Map (with visible thinking states).
4. Risk Map shows, e.g.:
   - **CRITICAL — Stolen-card fraud & chargeback liability on gift cards.** Triggered by: digital gift cards + high-value cross-border orders + Shopify Payments. Fraudsters buy gift cards with stolen cards → you ship → chargebacks claw back funds + fees, and your processor can hold you liable. *Action: enable SCA/3DS, set fraud rules, manual-review amber orders, delay digital delivery on high-risk.* Cite: card-network fraud reason code + PSD2 SCA liability shift. **Talk to a professional.**
   - **HIGH — Personal liability with no legal entity.** Triggered by: no company structure + minor founder. *Action: understand sole-trader vs company exposure before scaling.* Cite: structure/liability explainer. **Talk to a professional.**
   - **HIGH — SCA not enforced on EU card payments** (PSD2/RTS). Action + cite.
   - **MEDIUM — GDPR: privacy notice, lawful basis, customer data.** Cite GDPR Art. 6/13.
   - **MEDIUM — Consumer cooling-off & digital-goods exception.** Cite CRD.
   - **Fraud watchlist:** amber-flag patterns, cross-border high-value gift-card orders, velocity, mismatched geo.
5. Founder clicks a citation → reads the exact article. Founder asks a follow-up in chat → grounded, cited answer.
6. Persistent banner: *"This is a risk map, not legal advice. Validate important decisions with a professional."*

**The punchline for judges:** *"This is the tool that would have saved us. Nobody warned us. Reef would have — on day one, before we shipped."*

---

## 10. Build plan / milestones (hackathon-phased)

> Scope of THIS session per your call: **deliver the ultraplan only.** Build phases below are the roadmap for when we start coding.

- **M0 — Corpus (highest-leverage, do first).** Curate the small real EU law corpus (5 layers, Spain instantiation), assign `source_id`s, embed. *Quality of grounding = quality of the whole product.*
- **M1 — Core pipeline.** Profile normalizer → layer router → RAG → reasoner with StrictCitations → verification pass. Prove grounding on the Sharkiez scenario.
- **M2 — Risk Map UI.** shadcn dashboard: risk cards, severity, citations panel, "what you're overlooking," fraud watchlist, disclaimers.
- **M3 — Onboarding intake + profile editor + conversational copilot** with thinking states.
- **M4 — Eval harness** (Promptfoo) on labeled scenarios; tune prompts to hit faithfulness/citation targets.
- **M5 — Polish + demo:** the Sharkiez hero flow, deploy to Vercel, rehearse the pitch.

---

## 11. Responsible AI (built-in, for the judging rubric)

- **Primary risk:** a founder treats output as definitive legal advice.
- **Mitigations (product-level, not just a footer):**
  - Never a legal verdict — only a risk map; the legal decision stays with the human, by design.
  - Sources on every claim; uncited claims are dropped before display.
  - High-severity items carry an explicit "validate with a professional" CTA.
  - Grounding + verification + eval harness to prevent fabricated law.
  - Transparent reasoning (thinking states) so the founder sees *why*, not just *what*.
- **Honest limits:** EU-only, curated corpus (not exhaustive), not a substitute for counsel, may not catch everything → "what you're overlooking" is best-effort, not a guarantee.

---

## 12. Risks & mitigations (project)

| Risk | Mitigation |
|---|---|
| Citation hallucination | RAG + StrictCitations + drop-uncited + verification pass + evals |
| Corpus too thin to be credible | Go deep on Spain + 5 layers rather than shallow on 27 countries |
| Demo brittleness (live LLM) | Pre-tuned Sharkiez scenario, cached fallback, eval-gated prompts |
| Over-claiming / legal liability | Hard "no verdict" design + disclaimers + pro-routing |
| Scope creep in a hackathon | Risk Map + Sharkiez demo is the MVP; chat/eval polish are stretch |

---

## 13. Scaling story (for impact slide)

- Architecture is **layer- and jurisdiction-parameterized**: add a country = add its instantiation of each layer to the corpus.
- Path: Spain (demo) → EU-27. Same reasoning engine, swappable grounded corpus.
- Future: integrations into the founder's stack (Shopify/Stripe) to auto-populate the profile and monitor fraud signals live.

---

## 14. Open decisions (need your input before/at build)

1. **Product name:** Reef / Beacon / Harbor / Anchor / other?
2. **Eval tool:** Promptfoo (fastest) — confirm, or go Braintrust (richest, you flagged it)?
3. **Persistence:** real DB (Neon) for saved profiles, or session-only pure-demo build?
4. **Input emphasis:** lead with the **structured intake** (more controllable demo) — confirm vs. lead with conversational chat.
5. **Vector store:** embedded in-repo index (simplest, corpus is small) vs. Marketplace vector DB?

---

*Prepared for the USAII AI Hackathon. Product UI in English; demo anchored on the real Sharkiez case in Spain. Built on Claude (via Vercel AI Gateway), grounded on real EU law to avoid hallucination.*
