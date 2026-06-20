"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
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
  "Retrieving the official rules that apply",
  "Grounding each risk in a cited source",
  "Mapping fraud and chargeback exposure",
  "Double-checking every claim against its source",
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
  const [showExample, setShowExample] = useState(false);

  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "loading") return;
    const id = setInterval(
      () => setStepIdx((s) => Math.min(s + 1, LOADING_STEPS.length - 1)),
      1800,
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
    const hasWords = (s: string) => /[\p{L}\p{N}]/u.test(s.trim());
    if (!hasWords(input.description) && !input.productType.trim()) {
      setHint("Describe your business or select a product type before mapping risks.");
      return;
    }
    if (!hasWords(input.description)) {
      setHint("Tell us what you sell using actual words, not just symbols.");
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

  async function loadExample() {
    setDescription(SAMPLE_INPUT.description);
    setCountry(SAMPLE_INPUT.country);
    setPlatform(SAMPLE_INPUT.platform);
    setProductType(SAMPLE_INPUT.productType);
    setSellsGiftCards(SAMPLE_INPUT.sellsGiftCards);
    setAcceptsCards(SAMPLE_INPUT.acceptsCards);

    try {
      const res = await fetch("/examples/gift-card-risk-map.json");
      if (!res.ok) throw new Error("Cached example not available");
      const data = await res.json();
      setResult(data as RiskMap);
      setStatus("done");
    } catch {
      run(SAMPLE_INPUT);
    }
  }

  const busy = status === "loading";

  return (
    <div id="try" className="scroll-mt-24">
      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-hair bg-paper px-6 py-7 font-satoshi shadow-[0_1px_0_rgba(27,26,22,0.03),0_22px_48px_-30px_rgba(27,26,22,0.28)] sm:px-8 sm:py-8"
      >
        {/* --- Description --- */}
        <div>
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
            placeholder="What you sell, where, to whom, and how you take payment. A sentence or two is plenty."
            className="mt-2 w-full resize-none rounded-lg border border-hair bg-bone/40 px-4 py-3 text-[16px] leading-relaxed text-ink outline-none transition-all placeholder:text-faint/70 hover:border-ink/15 focus:border-oxblood/40 focus:bg-paper focus:ring-[3px] focus:ring-oxblood/8"
          />
          <button
            type="button"
            onClick={() => setShowExample((v) => !v)}
            className="mt-1.5 inline-flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-ink-soft"
          >
            <Sparkles size={12} aria-hidden />
            {showExample ? "Hide example" : "Show an example"}
          </button>
          {showExample && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-lg border border-hair bg-sand/30 px-4 py-3 text-[13px] leading-relaxed text-muted"
            >
              &ldquo;We sell digital gift cards and game top-up codes through a
              Shopify store, mostly to customers across the EU. Everything is
              paid by credit or debit card and delivered instantly by email.
              It&apos;s just two of us and we haven&apos;t set up a company
              yet.&rdquo;
            </motion.div>
          )}
        </div>

        {/* --- Dropdowns --- */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <CountrySelect
            label="Country"
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

        {/* --- Toggles --- */}
        <div className="mt-6 space-y-3">
          <ToggleSwitch
            label="Sells gift cards or digital goods"
            active={sellsGiftCards}
            onClick={() => setSellsGiftCards((v) => !v)}
          />
          <ToggleSwitch
            label="Accepts card payments"
            active={acceptsCards}
            onClick={() => setAcceptsCards((v) => !v)}
          />
        </div>

        {/* --- Actions --- */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={busy}
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-oxblood bg-oxblood px-5 py-2.5 text-[14.5px] font-medium text-white shadow-[0_1px_2px_rgba(157,43,37,0.12)] transition-all hover:bg-oxblood-deep hover:shadow-[0_2px_6px_rgba(157,43,37,0.2)] active:translate-y-px disabled:opacity-60 disabled:shadow-none"
          >
            {busy ? (
              <>
                <LoaderCircle
                  size={16}
                  className="animate-spin motion-reduce:animate-none"
                  aria-hidden
                />
                Mapping risks…
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
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-hair bg-paper px-4 py-2.5 text-[14px] font-medium text-muted transition-colors hover:border-ink/15 hover:text-ink-soft disabled:opacity-60"
          >
            <Sparkles size={14} className="text-oxblood/70" aria-hidden />
            Gift-card demo
          </button>
        </div>

        {hint && (
          <p className="mt-3.5 text-[13px] text-sev-high/90">{hint}</p>
        )}
      </form>

      <div ref={outRef} aria-live="polite" className="mt-5 scroll-mt-24">
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

// ---------------------------------------------------------------------------
// CountrySelect — custom dropdown with flag
// ---------------------------------------------------------------------------

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
      <span className="mb-1.5 block text-[12px] font-medium text-muted tracking-wide uppercase">
        {label}
      </span>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-lg border border-hair bg-paper py-2.5 pl-3.5 pr-9 text-[14px] text-ink outline-none transition-all hover:border-ink/15 focus:border-oxblood/40 focus:ring-[3px] focus:ring-oxblood/8"
        >
          <span className="text-base leading-none">{COUNTRY_FLAGS[value]}</span>
          <span>{value}</span>
        </button>
        <ChevronDown
          size={14}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-transform duration-200"
          style={{ rotate: open ? "180deg" : "0deg" }}
        />
        {open && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-hair bg-paper shadow-[0_8px_32px_-8px_rgba(27,26,22,0.2)]">
            {EU_COUNTRIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[14px] text-left transition-colors hover:bg-sand ${
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

// ---------------------------------------------------------------------------
// Select — native select styled
// ---------------------------------------------------------------------------

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
      <span className="mb-1.5 block text-[12px] font-medium text-muted tracking-wide uppercase">
        {label}
      </span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-hair bg-paper py-2.5 pl-3.5 pr-9 text-[14px] text-ink outline-none transition-all hover:border-ink/15 focus:border-oxblood/40 focus:ring-[3px] focus:ring-oxblood/8"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </span>
    </label>
  );
}

// ---------------------------------------------------------------------------
// ToggleSwitch — clean pill switch (iOS / Linear style)
// ---------------------------------------------------------------------------

function ToggleSwitch({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group flex w-full items-center justify-between rounded-lg border border-transparent px-3.5 py-2.5 transition-colors hover:border-hair hover:bg-sand/30"
    >
      <span className="text-[14px] text-ink-soft group-hover:text-ink transition-colors">
        {label}
      </span>
      <span
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors duration-200",
          active
            ? "border-oxblood/50 bg-oxblood"
            : "border-hair bg-bone group-hover:border-ink/20",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(27,26,22,0.12)] transition-all duration-200",
            active ? "left-[18px]" : "left-[3px]",
          )}
        />
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// LoadingPanel
// ---------------------------------------------------------------------------

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
            <div className="h-3 w-1/3 rounded bg-sand motion-reduce:animate-none" />
            <div className="mt-3 h-2.5 w-full rounded bg-sand/70 motion-reduce:animate-none" />
            <div className="mt-2 h-2.5 w-4/5 rounded bg-sand/70 motion-reduce:animate-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ErrorPanel
// ---------------------------------------------------------------------------

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
