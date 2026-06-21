"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  Code,
  LoaderCircle,
  Plus,
  Sparkles,
  Square,
  TriangleAlert,
  X,
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

const PLATFORM_IMAGES: Record<string, string | null> = {
  Shopify: "/brands-images/shopify.png",
  WooCommerce: "/brands-images/woocommerce.png",
  Wix: "/brands-images/wix.png",
  Etsy: "/brands-images/etsy.png",
  "Custom build": null,
};

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

type Phase = "idle" | "assuming" | "review" | "generating" | "done" | "error";

function isAbort(e: unknown): boolean {
  return (
    !!e && typeof e === "object" && (e as { name?: string }).name === "AbortError"
  );
}

export function RiskConsole() {
  const reduce = useReducedMotion();
  const descId = useId();

  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("Spain");
  const [platform, setPlatform] = useState("Shopify");
  const [productType, setProductType] = useState("");
  const [sellsGiftCards, setSellsGiftCards] = useState(false);
  const [acceptsCards, setAcceptsCards] = useState(true);

  const [phase, setPhase] = useState<Phase>("idle");
  const [assumptions, setAssumptions] = useState<string[]>([]);
  const [result, setResult] = useState<RiskMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);

  const outRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const busy = phase === "assuming" || phase === "generating";

  useEffect(() => {
    if (phase !== "generating") return;
    const id = setInterval(
      () => setStepIdx((s) => Math.min(s + 1, LOADING_STEPS.length - 1)),
      1800,
    );
    return () => clearInterval(id);
  }, [phase]);

  // Abort any in-flight request if the component unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

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

  function validate(input: AnalyzeInput): boolean {
    setHint(null);
    const hasWords = (s: string) => /[\p{L}\p{N}]/u.test(s.trim());
    if (!hasWords(input.description) && !input.productType.trim()) {
      setHint("Describe your business or select a product type before mapping risks.");
      return false;
    }
    if (!hasWords(input.description)) {
      setHint("Tell us what you sell using actual words, not just symbols.");
      return false;
    }
    return true;
  }

  function scrollToOutput() {
    requestAnimationFrame(() =>
      outRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "nearest",
      }),
    );
  }

  async function postAnalyze(
    body: Record<string, unknown>,
    signal: AbortSignal,
  ): Promise<unknown> {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
    const data = await res.json();
    if (!res.ok) throw new Error((data as { error?: string })?.error ?? "Something went wrong.");
    return data;
  }

  // Phase 1 — surface the assumptions so the founder can review them first.
  async function requestAssumptions(input: AnalyzeInput) {
    if (!validate(input)) return;
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setPhase("assuming");
    setResult(null);
    setError(null);
    setAssumptions([]);
    scrollToOutput();
    try {
      const data = await postAnalyze({ ...input, phase: "assumptions" }, ctrl.signal);
      const list = (data as { assumptions?: unknown }).assumptions;
      setAssumptions(Array.isArray(list) ? (list as string[]) : []);
      setPhase("review");
      scrollToOutput();
    } catch (e) {
      if (isAbort(e)) {
        setPhase("idle");
        return;
      }
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("error");
    } finally {
      abortRef.current = null;
    }
  }

  // Phase 2 — generate the full risk map using the confirmed assumptions.
  async function generate(input: AnalyzeInput, confirmed: string[]) {
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setPhase("generating");
    setResult(null);
    setError(null);
    setStepIdx(0);
    scrollToOutput();
    try {
      const data = await postAnalyze(
        { ...input, phase: "generate", confirmedAssumptions: confirmed },
        ctrl.signal,
      );
      setResult(data as RiskMap);
      setPhase("done");
    } catch (e) {
      if (isAbort(e)) {
        // Stopped mid-generation — fall back to the review step so the founder
        // keeps the assumptions they had just edited.
        setPhase("review");
        return;
      }
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("error");
    } finally {
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    requestAssumptions(currentInput());
  }

  function updateAssumption(i: number, value: string) {
    setAssumptions((list) => list.map((a, idx) => (idx === i ? value : a)));
  }
  function removeAssumption(i: number) {
    setAssumptions((list) => list.filter((_, idx) => idx !== i));
  }
  function addAssumption() {
    setAssumptions((list) => [...list, ""]);
  }

  async function loadExample() {
    setDescription(SAMPLE_INPUT.description);
    setCountry(SAMPLE_INPUT.country);
    setPlatform(SAMPLE_INPUT.platform);
    setProductType(SAMPLE_INPUT.productType);
    setSellsGiftCards(SAMPLE_INPUT.sellsGiftCards);
    setAcceptsCards(SAMPLE_INPUT.acceptsCards);
    setHint(null);
    setError(null);
    setAssumptions([]);

    try {
      const res = await fetch("/examples/gift-card-risk-map.json");
      if (!res.ok) throw new Error("Cached example not available");
      const data = await res.json();
      setResult(data as RiskMap);
      setPhase("done");
      scrollToOutput();
    } catch {
      // No cached demo — generate it directly, skipping the review step.
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setPhase("generating");
      setStepIdx(0);
      scrollToOutput();
      try {
        const data = await postAnalyze({ ...SAMPLE_INPUT, phase: "generate" }, ctrl.signal);
        setResult(data as RiskMap);
        setPhase("done");
      } catch (e) {
        if (isAbort(e)) {
          setPhase("idle");
        } else {
          setError(e instanceof Error ? e.message : "Something went wrong.");
          setPhase("error");
        }
      } finally {
        abortRef.current = null;
      }
    }
  }

  return (
    <div id="try" className="scroll-mt-24">
      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-hair bg-paper px-6 py-7 font-satoshi shadow-[0_1px_0_rgba(27,26,22,0.03),0_22px_48px_-30px_rgba(27,26,22,0.28)] sm:px-8 sm:py-8 relative border-t-2 border-t-oxblood/50"
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
          <PlatformSelect
            label="Platform"
            value={platform}
            onChange={setPlatform}
          />
          <ProductTypeField value={productType} onChange={setProductType} />
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
          {busy ? (
            <>
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-oxblood bg-oxblood px-5 py-2.5 text-[14.5px] font-medium text-white opacity-70 shadow-none"
              >
                <LoaderCircle
                  size={16}
                  className="animate-spin motion-reduce:animate-none"
                  aria-hidden
                />
                <span className="font-serif italic">
                  {phase === "assuming"
                    ? "Reading your business…"
                    : "Mapping risks…"}
                </span>
              </button>
              <button
                type="button"
                onClick={stop}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-hair bg-paper px-4 py-2.5 text-[14px] font-medium text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
              >
                <Square size={12} fill="currentColor" aria-hidden />
                Stop
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-oxblood bg-oxblood px-5 py-2.5 text-[14.5px] font-medium text-white shadow-[0_1px_2px_rgba(157,43,37,0.12)] transition-all hover:bg-oxblood-deep hover:shadow-[0_2px_6px_rgba(157,43,37,0.2)] active:translate-y-px"
              >
                <span className="font-serif italic">Map my risks</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                onClick={loadExample}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-hair bg-paper px-4 py-2.5 text-[14px] font-medium text-muted transition-colors hover:border-ink/15 hover:text-ink-soft"
              >
                <Sparkles size={14} className="text-oxblood/70" aria-hidden />
                Gift-card demo
              </button>
            </>
          )}
        </div>

        {hint && (
          <p className="mt-3.5 text-[13px] text-sev-high/90">{hint}</p>
        )}
      </form>

      <div ref={outRef} aria-live="polite" className="mt-5 scroll-mt-24">
        {phase === "assuming" && <AssumingPanel />}
        {phase === "review" && (
          <AssumptionsReview
            assumptions={assumptions}
            reduce={!!reduce}
            onUpdate={updateAssumption}
            onRemove={removeAssumption}
            onAdd={addAssumption}
            onGenerate={() =>
              generate(
                currentInput(),
                assumptions.map((a) => a.trim()).filter(Boolean),
              )
            }
          />
        )}
        {phase === "generating" && <LoadingPanel stepIdx={stepIdx} />}
        {phase === "error" && (
          <ErrorPanel msg={error} onRetry={() => requestAssumptions(currentInput())} />
        )}
        {phase === "done" && result && (
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
// PlatformSelect — custom dropdown with brand image
// ---------------------------------------------------------------------------

function PlatformSelect({
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
          {PLATFORM_IMAGES[value] ? (
            <Image
              src={PLATFORM_IMAGES[value]!}
              alt={value}
              width={20}
              height={20}
              className="h-5 w-auto object-contain"
            />
          ) : (
            <Code size={18} className="text-muted" aria-hidden />
          )}
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
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  onChange(p);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[14px] text-left transition-colors hover:bg-sand ${
                  p === value ? "bg-sand font-medium text-ink" : "text-ink-soft"
                }`}
              >
                {PLATFORM_IMAGES[p] ? (
                  <Image
                    src={PLATFORM_IMAGES[p]!}
                    alt={p}
                    width={20}
                    height={20}
                    className="h-5 w-auto object-contain"
                  />
                ) : (
                  <Code size={18} className="text-muted" aria-hidden />
                )}
                <span>{p}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// ProductTypeField — preset list + a "Something else…" free-text escape hatch
// ---------------------------------------------------------------------------

const PRODUCT_TYPE_OTHER = "__other__";

function ProductTypeField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const isPreset = PRODUCT_TYPES.includes(value);
  const [custom, setCustom] = useState(value !== "" && !isPreset);

  // Adjust state during render when the value is set externally (e.g. the demo
  // picks a preset): the React-recommended alternative to a syncing effect.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (value && isPreset) setCustom(false);
  }

  const selectValue = custom ? PRODUCT_TYPE_OTHER : isPreset ? value : "";

  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-muted tracking-wide uppercase">
        Product type
      </span>
      <span className="relative block">
        <select
          value={selectValue}
          onChange={(e) => {
            const v = e.target.value;
            if (v === PRODUCT_TYPE_OTHER) {
              setCustom(true);
              onChange("");
            } else {
              setCustom(false);
              onChange(v);
            }
          }}
          className="w-full appearance-none rounded-lg border border-hair bg-paper py-2.5 pl-3.5 pr-9 text-[14px] text-ink outline-none transition-all hover:border-ink/15 focus:border-oxblood/40 focus:ring-[3px] focus:ring-oxblood/8"
        >
          <option value="">Select…</option>
          {PRODUCT_TYPES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
          <option value={PRODUCT_TYPE_OTHER}>Something else…</option>
        </select>
        <ChevronDown
          size={14}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </span>
      {custom && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your product type…"
          aria-label="Your product type"
          className="mt-2 w-full rounded-lg border border-hair bg-bone/40 px-3.5 py-2.5 text-[14px] text-ink outline-none transition-all placeholder:text-faint/70 hover:border-ink/15 focus:border-oxblood/40 focus:bg-paper focus:ring-[3px] focus:ring-oxblood/8"
        />
      )}
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
// AssumingPanel — slim feedback while we work out the assumptions
// ---------------------------------------------------------------------------

function AssumingPanel() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hair bg-paper px-5 py-4">
      <LoaderCircle
        size={16}
        className="animate-spin text-oxblood motion-reduce:animate-none"
        aria-hidden
      />
      <p className="text-[14px] text-ink-soft">
        Reading your business and working out what we&apos;d need to assume…
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AssumptionsReview — editable assumptions the founder confirms before we map
// ---------------------------------------------------------------------------

function AssumptionsReview({
  assumptions,
  reduce,
  onUpdate,
  onRemove,
  onAdd,
  onGenerate,
}: {
  assumptions: string[];
  reduce: boolean;
  onUpdate: (i: number, value: string) => void;
  onRemove: (i: number) => void;
  onAdd: () => void;
  onGenerate: () => void;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-hair border-t-2 border-t-oxblood/50 bg-paper p-5 font-satoshi sm:p-6"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sand text-ink">
          <CircleHelp size={16} aria-hidden />
        </span>
        <div>
          <h3 className="font-serif text-[1.15rem] leading-snug text-ink">
            Before we map your risks, check what we&apos;re assuming
          </h3>
          <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
            Your risk map is built on these. Edit anything that&apos;s off, remove
            what doesn&apos;t apply, or add something we missed — then generate.
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {assumptions.map((a, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-[15px] h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood/50" />
            <textarea
              value={a}
              onChange={(e) => onUpdate(i, e.target.value)}
              rows={2}
              placeholder="Describe an assumption…"
              className="w-full resize-none rounded-lg border border-hair bg-bone/40 px-3.5 py-2 text-[14px] leading-relaxed text-ink outline-none transition-all placeholder:text-faint/70 hover:border-ink/15 focus:border-oxblood/40 focus:bg-paper focus:ring-[3px] focus:ring-oxblood/8"
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label="Remove this assumption"
              className="mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border border-transparent text-muted transition-colors hover:border-hair hover:text-sev-high"
            >
              <X size={15} aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      {assumptions.length === 0 && (
        <p className="mt-4 rounded-lg border border-dashed border-hair bg-sand/30 px-4 py-3 text-[13px] leading-relaxed text-muted">
          We didn&apos;t need to assume much about your business. Add anything we
          should know, or generate your risk map.
        </p>
      )}

      <button
        type="button"
        onClick={onAdd}
        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-ink-soft"
      >
        <Plus size={14} aria-hidden />
        Add an assumption
      </button>

      <div className="mt-6 flex flex-col gap-3 border-t border-hair/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] leading-relaxed text-muted">
          We&apos;ll treat each line above as fact about your business.
        </p>
        <button
          type="button"
          onClick={onGenerate}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-oxblood bg-oxblood px-5 py-2.5 text-[14.5px] font-medium text-white shadow-[0_1px_2px_rgba(157,43,37,0.12)] transition-all hover:bg-oxblood-deep hover:shadow-[0_2px_6px_rgba(157,43,37,0.2)] active:translate-y-px"
        >
          <span className="font-serif italic">Generate risk map</span>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </button>
      </div>
    </motion.div>
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
