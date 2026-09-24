import { cn } from "@/lib/utils";

/**
 * AAMPL wordmark. Drawn rather than imaged so it stays crisp,
 * tints per surface, and carries the red/blue identity in the glyph itself.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-3", className)}>
      {/* mark: a stamped A cut from a plate */}
      <span className="relative grid h-9 w-9 shrink-0 place-items-center">
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
          <defs>
            <linearGradient id="aampl-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e11d2e" />
              <stop offset="52%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect
            x="1.5"
            y="1.5"
            width="37"
            height="37"
            rx="10"
            fill="url(#aampl-mark)"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:rotate-90"
            style={{ transformOrigin: "center" }}
          />
          {/* the A, punched through */}
          <path d="M20 9.5 L28.8 30 L24.2 30 L22.6 25.9 L17.4 25.9 L15.8 30 L11.2 30 Z M20 16.6 L18.4 21.7 L21.6 21.7 Z" fill="#fff" />
          {/* two locating holes, like a real stamping */}
          <circle cx="8.6" cy="8.6" r="1.5" fill="#fff" opacity="0.55" />
          <circle cx="31.4" cy="31.4" r="1.5" fill="#fff" opacity="0.55" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-bold tracking-[-0.02em]",
            tone === "dark" ? "text-white" : "text-steel-900",
          )}
        >
          AAMPL
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.5rem] uppercase tracking-[0.2em]",
            tone === "dark" ? "text-steel-500" : "text-steel-500",
          )}
        >
          Advanced Anmol Metcomp
        </span>
      </span>
    </span>
  );
}
