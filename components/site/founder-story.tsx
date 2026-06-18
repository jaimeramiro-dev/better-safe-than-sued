"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TriangleAlert,
  Send,
  Banknote,
  Ban,
  type LucideIcon,
} from "lucide-react";

type Tone = "neutral" | "warn" | "risk";

const STEPS: {
  icon: LucideIcon;
  title: string;
  body: string;
  tone: Tone;
}[] = [
  {
    icon: TrendingUp,
    title: "The orders looked like a breakthrough",
    body: "A rush of high-value orders for gift cards came in. After slow months, it felt like the store was finally working.",
    tone: "neutral",
  },
  {
    icon: TriangleAlert,
    title: "The platform flagged them amber, not red",
    body: "Our payment platform marked them as possible fraud but did not block them. Amber felt safe enough, so we shipped.",
    tone: "warn",
  },
  {
    icon: Send,
    title: "They were stolen cards",
    body: "The cards were stolen. The gift codes were resold on Telegram within minutes. Digital goods cannot be recalled once they are delivered.",
    tone: "risk",
  },
  {
    icon: Banknote,
    title: "Then the chargebacks came",
    body: "Months later, a flood of disputes. The banks clawed the money back and stacked a fee on every order we had shipped.",
    tone: "risk",
  },
  {
    icon: Ban,
    title: "We were banned and on the hook",
    body: "We blew past the card-network dispute threshold, lost our payment account, and were told we were personally liable. We were in high school, with no company and no advisor.",
    tone: "risk",
  },
];

const TONE: Record<Tone, { ring: string; icon: string }> = {
  neutral: { ring: "border-hair bg-paper", icon: "text-ink-soft" },
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
          <h2 className="mt-4 text-balance font-serif text-[2rem] font-medium leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.7rem]">
            We learned this the expensive way.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Before BSTS, we ran an e-commerce brand. Here is the chain of risks
            that nobody flagged for us, until the damage was already done.
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
                Every one of those steps had a name and a rule behind it.
              </p>
              <p className="mt-3 font-serif text-[1.55rem] leading-snug text-bone/65">
                We just never saw them coming.
              </p>
              <div className="mt-7 h-px w-full bg-bone/15" />
              <p className="mt-7 text-[14px] leading-relaxed text-bone/70">
                BSTS is the tool we needed that week: it surfaces the same risks
                in plain language, before a single order ships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
