import { cn } from "@/lib/utils";

/**
 * BSTS wordmark, set like a law-firm masthead. Full name on sm+, the "BSTS"
 * monogram on mobile so the nav stays a single line.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "select-none font-serif leading-none tracking-tight text-ink",
        className,
      )}
    >
      <span className="hidden text-[1.35rem] sm:inline">
        Better Safe Than <span className="italic">Sued</span>
      </span>
      <span className="text-[1.4rem] sm:hidden">BSTS</span>
    </span>
  );
}
