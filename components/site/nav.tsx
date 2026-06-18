"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Wordmark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#story", label: "The case" },
  { href: "#how", label: "How it works" },
  { href: "#responsible", label: "Responsible AI" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-hair bg-bone/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" aria-label="Better Safe Than Sued, home">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#try"
          className="rounded-md bg-ink px-4 py-2 text-[14px] font-medium text-paper transition-[transform,background-color] duration-150 hover:bg-ink-soft active:translate-y-px"
        >
          Try it
        </a>
      </nav>
    </header>
  );
}
