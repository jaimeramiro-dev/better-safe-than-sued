"use client";

import { motion } from "framer-motion";
import {
  TriangleAlert,
  MessageSquare,
  Banknote,
  Ban,
  type LucideIcon,
} from "lucide-react";

type Tone = "warn" | "risk";

const STEPS: {
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}[] = [
  {
    icon: TriangleAlert,
    title: "The flag we ignored",
    body: "Shopify marked the orders amber, possible fraud, not a hard block. Amber felt safe enough. We shipped.",
    tone: "warn",
  },
  {
    icon: MessageSquare,
    title: "The screenshot that explained everything",
    body: "A customer sent us a screenshot. Buyers were using stolen credit cards to buy gift cards in our own store, then reselling the codes at a discount on Telegram within minutes. Digital goods can't be recalled. The money was already gone.",
    tone: "risk",
  },
  {
    icon: Banknote,
    title: "The chargebacks",
    body: "Months later the banks clawed the money back one by one, a fee on every order. We blew past the card-network dispute threshold.",
    tone: "risk",
  },
  {
    icon: Ban,
    title: "Banned, and personally liable",
    body: "We lost our payment account. To get it back they demanded we cover every chargeback and warned us we had unlimited liability, with the named account holder on the hook personally. No company structure, no advisor, no idea what unlimited liability meant.",
    tone: "risk",
  },
];

const TONE: Record<Tone, { ring: string; icon: string }> = {
  warn: { ring: "border-sev-med/30 bg-sev-med-wash", icon: "text-sev-med" },
  risk: { ring: "border-sev-high/30 bg-sev-high-wash", icon: "text-sev-high" },
};

export function FounderStory() {
  return (
    <section id="story" className="border-b border-hair bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-oxblood">
            Why this exists
          </p>
          <h2 className="mt-4 text-balance font-serif text-[2rem] font-medium leading-[1.12] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
            We learned this the expensive way. Our store was called Sharkiez.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Two high-schoolers built Sharkiez, a shark-shaped footwear brand. A
            wave of high-value gift-card orders came from Mexico and felt like a
            breakthrough after slow months.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <ol className="relative border-l border-hair pl-8 sm:pl-10">
            {STEPS.map((step, i) => {
              const t = TONE[step.tone];
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  className="relative pb-9 last:pb-0"
                >
                  <span
                    className={`absolute -left-[2.7rem] grid h-9 w-9 place-items-center rounded-full border ${t.ring} sm:-left-[3.35rem]`}
                  >
                    <Icon size={16} className={t.icon} aria-hidden />
                  </span>
                  <h3 className="text-[18px] font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          <div className="lg:pt-2">
            <div className="rounded-xl border border-hair bg-ink p-8 text-bone lg:sticky lg:top-24">
              <p className="font-serif text-[1.55rem] leading-snug text-bone">
                Every step had a name and a rule.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/70">
                PSD2, the Visa dispute-monitoring threshold, irrecoverable
                digital goods, autónomo vs SL liability. We never saw them
                coming.
              </p>
              <div className="mt-7 h-px w-full bg-bone/15" />
              <p className="mt-7 text-[14px] leading-relaxed text-bone/70">
                Run our exact old setup through BSTS and it surfaces every one of
                these, before a single order ships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
