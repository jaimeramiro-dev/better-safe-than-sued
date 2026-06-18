import { Reveal } from "@/components/site/reveal";

const FRAMEWORKS = [
  "PSD2 / SCA (3D Secure)",
  "Card-network chargeback rules",
  "GDPR",
  "Consumer Rights Directive",
  "Fraud & AML exposure",
  "Spain: autónomo / SL & VAT",
];

export function FrameworksStrip() {
  return (
    <section className="border-y border-hair bg-sand/60">
      <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-8">
        <Reveal className="flex flex-col items-center gap-4">
          <p className="text-[12.5px] font-medium text-faint">
            Grounded in the rules that actually apply
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {FRAMEWORKS.map((f) => (
              <li
                key={f}
                className="rounded-pill border border-hair bg-paper px-3 py-1.5 text-[12.5px] font-medium text-muted"
              >
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
