import { PencilLine, Layers, ClipboardCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: PencilLine,
    title: "Describe your business",
    body: "A few plain sentences: what you sell, where, to whom, on what platform, and how you take payment.",
  },
  {
    icon: Layers,
    title: "It cross-references your exact case",
    body: "The AI reasons across the EU regulation, payment rules, and fraud patterns for your specific combination, not a generic checklist.",
  },
  {
    icon: ClipboardCheck,
    title: "You get a plain-language risk map",
    body: "Severity-ranked risks with the source behind each one, a pre-launch checklist, and the fraud red flags to watch.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-hair bg-bone">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="text-balance font-serif text-[2rem] font-medium leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.7rem]">
            From a sentence to a risk map.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Why this needs AI and not a search engine: no page on the internet
            cross-references your exact product, country, audience, platform, and
            payment method, then writes it back to you in plain language. That
            intersection is the whole job.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="rounded-xl border border-hair bg-paper p-7">
              <p className="font-serif text-[1.45rem] leading-snug text-ink">
                A search engine returns pages. It can&apos;t reason about{" "}
                <span className="italic">your</span> specific combination of
                risks, or translate them into something you can act on.
              </p>
              <div className="mt-6 h-px bg-hair" />
              <p className="mt-6 text-[14.5px] leading-relaxed text-muted">
                BSTS reads your setup, cross-references the EU frameworks that
                actually apply, and pays special attention to the fraud and
                chargeback exposure that blindsides new founders. Every point
                shows its source.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="divide-y divide-hair overflow-hidden rounded-xl border border-hair bg-paper">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="flex gap-4 p-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-oxblood-wash text-oxblood">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[16.5px] font-semibold tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
