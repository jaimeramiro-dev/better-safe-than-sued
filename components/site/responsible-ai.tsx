import { Scale, FileSearch, UserCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const POINTS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FileSearch,
    title: "Every point shows its source",
    body: "Each risk names the framework it comes from, so you can check it rather than take our word for it.",
  },
  {
    icon: Scale,
    title: "Never a legal verdict",
    body: "We explain, surface, and clarify. We never tell you what you are legally required to do, and we flag when something needs a professional.",
  },
  {
    icon: UserCheck,
    title: "The decision stays human",
    body: "The AI maps the risk. You make the call, with your eyes open, and a qualified expert in the loop when it matters.",
  },
];

export function ResponsibleAI() {
  return (
    <section id="responsible" className="border-b border-hair bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-28">
        <Reveal>
          <h2 className="text-balance font-serif text-[2rem] font-medium leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.7rem]">
            A copilot, not a legal oracle.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            The real risk with a tool like this is that someone treats its output
            as the final word. So we built the opposite of certainty.
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            You get the questions you should be asking and the source behind each
            one, never a ruling to obey. Confidence stays transparent. Judgement
            stays yours.
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
