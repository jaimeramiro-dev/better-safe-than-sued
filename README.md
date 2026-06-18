# Better Safe Than Sued (BSTS)

An AI compliance copilot for first-time EU e-commerce founders. You describe
your store in plain language, and BSTS returns a plain-language map of the
**regulatory, payment, and fraud risks** you are walking into, before they cost
you. The landing page **is** the product: the hero contains a live demo that
generates a real risk map inline.

Built for the USAII hackathon. Next.js (App Router) + TypeScript + Tailwind v4,
with the AI engine running server-side via the Anthropic API.

> This is guidance for clarity, not legal advice. BSTS never issues a legal
> verdict, cites the framework behind every point, and recommends validating
> important decisions with a qualified professional.

---

## How it works

1. The founder describes their business in the hero (free text + quick chips for
   country, platform, product type, whether they sell gift cards/digital goods,
   and whether they accept cards).
2. The browser POSTs that to `app/api/analyze/route.ts` (a server-only Next.js
   Route Handler).
3. The route calls **Claude (`claude-opus-4-8`)** with a compliance-analyst
   system prompt and **structured outputs** (a JSON schema), so the model is
   forced to return a strict, schema-valid risk map. The route parses it
   defensively and returns it to the client.
4. The risk map renders inline beneath the input: a business summary with an
   overall risk badge, severity-coded risk cards (each showing a plain
   explanation, why it applies to you, and its source framework), a pre-launch
   checklist, and the fraud red flags to watch for.

The API key lives in `.env.local` as `ANTHROPIC_API_KEY` and is **never** sent to
the client.

---

## Run it locally

Requires Node.js 18.18+ (Node 24 recommended).

```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key
cp .env.example .env.local
#   then edit .env.local and paste your key:
#   ANTHROPIC_API_KEY=sk-ant-...

# 3. Start the dev server
npm run dev
```

Open http://localhost:3000. Click **"Try the gift-card example"** in the hero to
watch a real, fraud-focused risk map generate, or describe your own store.

Get an API key at https://console.anthropic.com (Settings → API Keys).

### Without a key

The app still runs and the UI is fully interactive, but the analyze endpoint
returns a clear "AI engine isn't configured yet" message until you add
`ANTHROPIC_API_KEY` and restart.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In the [Vercel dashboard](https://vercel.com/new), import the repository.
   Vercel auto-detects Next.js — no build configuration needed.
3. Add the environment variable **before deploying**:
   - Project → **Settings → Environment Variables**
   - Name: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key
   - Apply to **Production** (and Preview/Development if you want previews to
     work).
4. Deploy. If you added the variable after the first deploy, trigger a redeploy
   so it takes effect.

The Anthropic call runs in a Vercel Function (Node.js runtime), so the key stays
server-side.

---

## Project structure

```
app/
  layout.tsx              # fonts (Newsreader serif + Geist) + metadata
  page.tsx                # section composition
  globals.css             # design tokens (bone / ink / oxblood), Tailwind v4
  api/analyze/route.ts    # the AI engine — server-side Anthropic call
components/site/
  hero.tsx                # headline + the live demo
  risk-console.tsx        # the interactive input, loading + error states
  risk-map.tsx            # renders the structured risk map
  frameworks-strip.tsx    # "grounded in the rules that apply"
  founder-story.tsx       # the chargeback disaster (why this exists)
  how-it-works.tsx        # 3 steps + why this needs AI, not a search engine
  responsible-ai.tsx      # one risk, the mitigation, human-in-the-loop
  nav.tsx / footer.tsx / logo.tsx / reveal.tsx
lib/
  types.ts                # RiskMap contract shared by route + UI
  sample.ts               # the one-click demo scenario
```

---

## Notes on the AI engine

- **Model:** `claude-opus-4-8` (the strongest current Claude model).
- **Strict JSON:** uses Anthropic structured outputs (`output_config.format`
  with a JSON schema) so the response is always schema-valid. The route still
  parses defensively (strips stray code fences, `try/catch`).
- **Specificity:** the system prompt forces the model to reason about the
  *intersection* of the founder's factors (product × country × audience ×
  platform × payment × gift-cards) and to ground every risk in a real EU
  framework (PSD2/SCA, card-network chargeback rules, GDPR, the Consumer Rights
  Directive, fraud/AML), with Spain-specific notes when relevant. A gift-card
  store in Spain gets visibly different, fraud-heavy output than a t-shirt shop
  in Germany.
- **No verdicts:** the model is instructed to explain and surface risk, never to
  rule on what is legally required, and to point to a professional for
  high-stakes decisions.
