"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Check,
  CircleAlert,
  CircleHelp,
  Eye,
  ShieldCheck,
} from "lucide-react";
import type { Risk, RiskMap, Severity } from "@/lib/types";

const SEV: Record<
  Severity,
  { label: string; text: string; wash: string; ring: string; dot: string }
> = {
  high: {
    label: "High",
    text: "text-sev-high",
    wash: "bg-sev-high-wash",
    ring: "border-sev-high/25",
    dot: "bg-sev-high",
  },
  medium: {
    label: "Medium",
    text: "text-sev-med",
    wash: "bg-sev-med-wash",
    ring: "border-sev-med/30",
    dot: "bg-sev-med",
  },
  low: {
    label: "Low",
    text: "text-sev-low",
    wash: "bg-sev-low-wash",
    ring: "border-sev-low/35",
    dot: "bg-sev-low",
  },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Trust indicator derived from the server's verification verdict. */
function trustOf(risk: Risk) {
  if (!risk.verified) {
    return { label: "Verify this", className: "text-sev-med", Icon: CircleAlert };
  }
  if (risk.confidence === "high") {
    return { label: "Verified source", className: "text-sev-low", Icon: BadgeCheck };
  }
  return { label: "Grounded", className: "text-muted", Icon: BadgeCheck };
}

export function RiskMapView({ data }: { data: RiskMap }) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const overall = SEV[data.overallRiskLevel];
  const verifiedCount = data.risks.filter((r) => r.verified).length;
  const total = data.risks.length;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3"
    >
      {/* Result header: how we read the business + overall risk */}
      <motion.div
        variants={item}
        className="flex flex-col gap-4 rounded-lg border border-hair bg-paper p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6"
      >
        <div className="flex gap-3.5">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sand text-ink">
            <ShieldCheck size={18} aria-hidden />
          </span>
          <div>
            <p className="text-[12.5px] font-medium text-muted">
              Your business, as we read it
            </p>
            <p className="mt-1 font-serif text-[1.15rem] leading-snug text-ink">
              {data.businessSummary}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-2 self-start rounded-pill border ${overall.ring} ${overall.wash} px-3 py-1.5 text-[13px] font-medium ${overall.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${overall.dot}`} />
          {overall.label} overall risk
        </span>
      </motion.div>

      {/* Trust bar: the anti-hallucination signal */}
      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-lg border border-hair bg-sand/40 px-4 py-2.5 text-[12px] text-muted"
      >
        <span className="inline-flex items-center gap-1.5 font-medium text-ink">
          <BadgeCheck size={14} className="text-sev-low" aria-hidden />
          {verifiedCount} of {total} risks verified against a cited source
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen size={13} className="text-faint" aria-hidden />
          Grounded in official sources, then double-checked
        </span>
      </motion.div>

      {/* What we assumed — surfaced so the founder can confirm or correct it */}
      {data.assumptions.length > 0 && (
        <motion.div
          variants={item}
          className="flex gap-3 rounded-lg border border-hair bg-sand/40 p-5"
        >
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-paper text-muted">
            <CircleHelp size={15} aria-hidden />
          </span>
          <div className="flex-1">
            <p className="text-[13.5px] font-semibold text-ink">
              What we assumed about your business
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">
              These risks depend on the reading below. If any of it is wrong,
              edit your description and map again.
            </p>
            <ul className="mt-3 space-y-2">
              {data.assumptions.map((a, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted/50" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Risk cards, ordered by the model most-severe first */}
      <div className="flex flex-col gap-3">
        {data.risks.map((risk, i) => {
          const s = SEV[risk.severity];
          const trust = trustOf(risk);
          return (
            <motion.article
              key={i}
              variants={item}
              className={`overflow-hidden rounded-lg border ${s.ring} bg-paper`}
            >
              <div className="flex items-start gap-3 border-b border-hair/70 px-5 py-3.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                <h4 className="flex-1 text-[15.5px] font-semibold leading-snug text-ink">
                  {risk.title}
                </h4>
                <span
                  className={`shrink-0 rounded-pill ${s.wash} px-2.5 py-0.5 text-[11.5px] font-medium ${s.text}`}
                >
                  {s.label}
                </span>
              </div>
              <div className="space-y-3 px-5 py-4">
                <p className="text-[14.5px] leading-relaxed text-ink-soft">
                  {risk.plainExplanation}
                </p>
                <div>
                  <p className="text-[12.5px] font-medium text-muted">
                    Why this applies to you
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                    {risk.whyItAppliesToYou}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-0.5">
                  {risk.sourceUrl ? (
                    <a
                      href={risk.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-pill bg-sand px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-ink"
                    >
                      <span className="text-faint">Source</span>
                      {risk.source}
                      <ArrowUpRight
                        size={12}
                        className="text-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-pill bg-sand px-2.5 py-1 font-mono text-[11px] text-muted">
                      <span className="text-faint">Source</span>
                      {risk.source}
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1 text-[11.5px] font-medium ${trust.className}`}
                  >
                    <trust.Icon size={13} aria-hidden />
                    {trust.label}
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Pre-launch checklist + fraud watch list */}
      <div className="grid gap-3 lg:grid-cols-2">
        <motion.div
          variants={item}
          className="rounded-lg border border-hair bg-paper p-5"
        >
          <h4 className="font-serif text-[1.05rem] text-ink">Before you sell</h4>
          <p className="mt-0.5 text-[13px] text-muted">Set these up first.</p>
          <ul className="mt-4 space-y-3.5">
            {data.preLaunchChecklist.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-sev-low/40 bg-sev-low-wash text-sev-low">
                  <Check size={12} aria-hidden />
                </span>
                <div>
                  <p className="text-[14px] font-medium leading-snug text-ink">
                    {c.item}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted">
                    {c.reason}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-lg border border-hair bg-paper p-5"
        >
          <h4 className="font-serif text-[1.05rem] text-ink">Watch for</h4>
          <p className="mt-0.5 text-[13px] text-muted">
            Red flags worth catching early.
          </p>
          <ul className="mt-4 space-y-3">
            {data.watchFor.map((w, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sev-high-wash text-sev-high">
                  <Eye size={12} aria-hidden />
                </span>
                <p className="text-[14px] leading-relaxed text-ink-soft">{w}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Persistent disclaimer */}
      <motion.p
        variants={item}
        className="rounded-xl border border-hair bg-paper px-5 py-4 text-[12.5px] leading-relaxed text-muted"
      >
        <span className="font-semibold text-foreground">
          Every risk is grounded in an official source you can open
        </span>
        , and a second model double-checks each claim against that source. This
        is still{" "}
        <span className="font-semibold text-foreground">
          guidance for clarity, not legal advice
        </span>
        , and reading it does not create a lawyer-client relationship. For
        anything that carries{" "}
        <span className="font-semibold text-foreground">
          real money or liability
        </span>
        , validate it with a qualified professional before you act.
      </motion.p>
    </motion.div>
  );
}
