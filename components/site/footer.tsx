import { Wordmark } from "@/components/site/logo";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Try it", href: "#try" },
      { label: "How it works", href: "#how" },
      { label: "Responsible AI", href: "#responsible" },
    ],
  },
  {
    heading: "Why",
    links: [
      { label: "The case", href: "#story" },
      { label: "What we check", href: "#how" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bone">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark className="text-ink" />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              An AI compliance copilot for first-time EU e-commerce founders.
              Know the risks before they cost you.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-[13px] font-medium text-ink">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-hair pt-7">
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-muted">
            Better Safe Than Sued provides risk guidance and education for
            clarity, not legal advice. Using it does not create a
            lawyer-client relationship. Always validate important decisions with
            a qualified professional.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-[12.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Better Safe Than Sued</span>
            <span>Built in the EU, focused on EU regulation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
