import { FileSearch, Scale, Gauge, UserCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const POINTS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FileSearch,
    title: "Every risk shows its source",
    body: "It names the framework behind it: PSD2, GDPR, the card-network rules. No source, no claim.",
  },
  {
    icon: Scale,
    title: "We never issue a verdict",
    body: "We surface risks and questions, never legal requirements, and we flag when a professional is needed.",
  },
  {
    icon: Gauge,
    title: "Confidence is visible, not hidden",
    body: "Low-confidence points are marked as such, not smoothed into false certainty.",
  },
  {
    icon: UserCheck,
    title: "The decision stays human",
    body: "We map the risk. You make the call.",
  },
];

export function ResponsibleAI() {
  return (
    <section id="responsible" className="border-b border-hair bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-28">
        <Reveal>
          <h2 className="text-balance font-serif text-[2rem] font-medium leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.6rem]">
            If our AI gets it wrong, what happens to you?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            The dangerous failure mode isn&apos;t a wrong answer. It&apos;s a
            confident wrong answer that a founder treats as legal clearance, ships
            on, and gets sued over. The person harmed is the user we built this
            for: a first-time founder with no lawyer to sanity-check the output.
            So we designed against our own certainty:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-hair overflow-hidden rounded-xl border border-hair">
            {POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex gap-4 bg-paper p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-oxblood-wash text-oxblood">
                    <Icon size={18} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
