"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Wordmark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#story", label: "The case" },
  { href: "#how", label: "How it works" },
  { href: "#responsible", label: "Responsible AI" },
];

const STORAGE_KEY = "bsts-theme";

function getInitialDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function useTheme() {
  const [dark, setDark] = useState(getInitialDark);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  return { dark, toggle };
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { dark, toggle } = useTheme();
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-md border border-hair bg-paper text-muted transition-colors hover:border-ink/20 hover:text-ink"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            href="#try"
            className="rounded-md bg-ink px-4 py-2 text-[14px] font-medium text-paper transition-[transform,background-color] duration-150 hover:bg-ink-soft active:translate-y-px"
          >
            Try it
          </a>
        </div>
      </nav>
    </header>
  );
}
