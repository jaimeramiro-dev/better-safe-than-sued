"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  LoaderCircle,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { RiskMapView } from "@/components/site/risk-map";
import { SAMPLE_INPUT } from "@/lib/sample";
import {
  EU_COUNTRIES,
  PLATFORMS,
  type AnalyzeInput,
  type RiskMap,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const COUNTRY_FLAGS: Record<string, string> = {
  Spain: "🇪🇸",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Italy: "🇮🇹",
  Netherlands: "🇳🇱",
  Ireland: "🇮🇪",
  Portugal: "🇵🇹",
  Belgium: "🇧🇪",
};

const PRODUCT_TYPES = [
  "Gift cards & digital codes",
  "Digital goods / downloads",
  "Apparel & accessories",
  "Cosmetics & skincare",
  "Food & supplements",
  "Electronics",
  "Mixed / other",
];

const LOADING_STEPS = [
  "Reading your business",
  "Cross-referencing EU regulation",
  "Checking PSD2 and SCA payment rules",
  "Mapping fraud and chargeback exposure",
  "Writing your plain-language risk map",
];

type Status = "idle" | "loading" | "done" | "error";

export function RiskConsole() {
  const reduce = useReducedMotion();
  const descId = useId();

  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("Spain");
  const [platform, setPlatform] = useState("Shopify");
  const [productType, setProductType] = useState("");
  const [sellsGiftCards, setSellsGiftCards] = useState(false);
  const [acceptsCards, setAcceptsCards] = useState(true);

  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<RiskMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(
      () => setStepIdx((s) => Math.min(s + 1, LOADING_STEPS.length - 1)),
      1500,
    );
    return () => clearInterval(id);
  }, [status]);

  function currentInput(): AnalyzeInput {
    return {
      description,
      country,
      platform,
      productType,
      sellsGiftCards,
      acceptsCards,
    };
  }

  async function run(input: AnalyzeInput) {
    setHint(null);
    if (!input.description.trim() && !input.productType.trim()) {
      setHint("Tell us what you sell first, or try the example.");
      return;
    }
    setStatus("loading");
    setResult(null);
    setError(null);
    setStepIdx(0);
    requestAnimationFrame(() =>
      outRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "nearest",
      }),
    );
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setResult(data as RiskMap);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    run(currentInput());
  }

  function loadExample() {
    setDescription(SAMPLE_INPUT.description);
    setCountry(SAMPLE_INPUT.country);
    setPlatform(SAMPLE_INPUT.platform);
    setProductType(SAMPLE_INPUT.productType);
    setSellsGiftCards(SAMPLE_INPUT.sellsGiftCards);
    setAcceptsCards(SAMPLE_INPUT.acceptsCards);
    run(SAMPLE_INPUT);
  }

  const busy = status === "loading";

  return (
    <div id="try" className="scroll-mt-24">
      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-hair bg-paper p-4 shadow-[0_1px_0_rgba(27,26,22,0.03),0_22px_48px_-30px_rgba(27,26,22,0.28)] sm:p-5"
      >
        <label
          htmlFor={descId}
          className="block text-[13px] font-medium text-ink-soft"
        >
          Describe your business
        </label>
        <textarea
          id={descId}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="What you sell, where, to whom, on what platform, and how you take payment. A sentence or two is plenty."
          className="mt-2 w-full resize-none rounded-md border border-hair bg-bone/50 px-3.5 py-3 text-[14.5px] leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-oxblood/50 focus:bg-paper focus:ring-2 focus:ring-oxblood/12"
        />

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <CountrySelect
            label="Where you sell from"
            value={country}
            onChange={setCountry}
          />
          <Select
            label="Platform"
            value={platform}
            onChange={setPlatform}
            options={[...PLATFORMS]}
          />
          <Select
            label="Product type"
            value={productType}
            onChange={setProductType}
            options={PRODUCT_TYPES}
            placeholder="Select…"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Toggle
            active={sellsGiftCards}
            onClick={() => setSellsGiftCards((v) => !v)}
          >
            Sells gift cards / digital goods
          </Toggle>
          <Toggle active={acceptsCards} onClick={() => setAcceptsCards((v) => !v)}>
            Accepts card payments
          </Toggle>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={busy}
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-oxblood px-5 py-3 text-[14.5px] font-medium text-paper transition-[transform,background-color] duration-150 hover:bg-oxblood-deep active:translate-y-px disabled:opacity-70"
          >
            {busy ? (
              <>
                <LoaderCircle
                  size={16}
                  className="animate-spin motion-reduce:animate-none"
                  aria-hidden
                />
                Mapping…
              </>
            ) : (
              <>
                Map my risks
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={loadExample}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-hair bg-paper px-4 py-3 text-[14px] font-medium text-ink-soft transition-colors hover:border-ink/20 hover:text-ink disabled:opacity-60"
          >
            <Sparkles size={15} className="text-oxblood" aria-hidden />
            Try the gift-card example
          </button>
        </div>

        {hint && <p className="mt-2.5 text-[13px] text-sev-high">{hint}</p>}
      </form>

      <div ref={outRef} aria-live="polite" className="mt-4 scroll-mt-24">
        {status === "loading" && <LoadingPanel stepIdx={stepIdx} />}
        {status === "error" && (
          <ErrorPanel msg={error} onRetry={() => run(currentInput())} />
        )}
        {status === "done" && result && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <RiskMapView data={result} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CountrySelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-muted">
        {label}
      </span>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-md border border-hair bg-paper py-2.5 pl-3 pr-9 text-[14px] text-ink outline-none transition-colors focus:border-oxblood/50 focus:ring-2 focus:ring-oxblood/12"
        >
          <span className="text-base leading-none">{COUNTRY_FLAGS[value]}</span>
          <span>{value}</span>
        </button>
        <ChevronDown
          size={15}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
        {open && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-hair bg-paper shadow-[0_8px_32px_-8px_rgba(27,26,22,0.2)]">
            {EU_COUNTRIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-[14px] text-left transition-colors hover:bg-sand ${
                  c === value ? "bg-sand font-medium text-ink" : "text-ink-soft"
                }`}
              >
                <span className="text-base leading-none">{COUNTRY_FLAGS[c]}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-muted">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-md border border-hair bg-paper py-2.5 pl-3 pr-9 text-[14px] text-ink outline-none transition-colors focus:border-oxblood/50 focus:ring-2 focus:ring-oxblood/12"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </span>
    </label>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3.5 py-2 text-[13px] font-medium transition-colors",
        active
          ? "border-oxblood/30 bg-oxblood-wash text-oxblood"
          : "border-hair bg-paper text-ink-soft hover:border-ink/20",
      )}
    >
      <span
        className={cn(
          "grid h-3.5 w-3.5 place-items-center rounded-[4px] border transition-colors",
          active
            ? "border-oxblood bg-oxblood text-paper"
            : "border-hair bg-bone",
        )}
      >
        {active && <Check size={10} aria-hidden />}
      </span>
      {children}
    </button>
  );
}

function LoadingPanel({ stepIdx }: { stepIdx: number }) {
  return (
    <div className="rounded-xl border border-hair bg-paper p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <LoaderCircle
          size={18}
          className="animate-spin text-oxblood motion-reduce:animate-none"
          aria-hidden
        />
        <p className="text-[14.5px] font-medium text-ink">
          {LOADING_STEPS[stepIdx]}…
        </p>
      </div>
      <ul className="mt-4 space-y-1.5">
        {LOADING_STEPS.map((s, i) => (
          <li
            key={s}
            className={cn(
              "flex items-center gap-2 text-[12.5px] transition-colors",
              i < stepIdx
                ? "text-muted"
                : i === stepIdx
                  ? "text-ink-soft"
                  : "text-faint",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i < stepIdx
                  ? "bg-sev-low"
                  : i === stepIdx
                    ? "bg-oxblood"
                    : "bg-hair",
              )}
            />
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-hair/70 p-4">
            <div className="h-3 w-1/3 rounded bg-sand animate-pulse motion-reduce:animate-none" />
            <div className="mt-3 h-2.5 w-full rounded bg-sand/70 animate-pulse motion-reduce:animate-none" />
            <div className="mt-2 h-2.5 w-4/5 rounded bg-sand/70 animate-pulse motion-reduce:animate-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorPanel({
  msg,
  onRetry,
}: {
  msg: string | null;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-xl border border-sev-high/25 bg-sev-high-wash px-5 py-5">
      <div className="flex gap-3">
        <TriangleAlert
          size={18}
          className="mt-0.5 shrink-0 text-sev-high"
          aria-hidden
        />
        <div>
          <p className="text-[14.5px] font-medium text-ink">
            We couldn&apos;t generate your risk map
          </p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
            {msg}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-hair bg-paper px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-ink/20"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
