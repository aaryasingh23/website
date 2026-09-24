"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Host for the five-pass WebGL2 dispersion renderer in ./liquid-metal.js.

   The renderer is loaded lazily and only once the control is actually on
   screen. It compiles six programs and allocates five render targets, which is
   not work to do during the hero's entrance — and on a page where the CTA is
   below the fold on a short viewport, not work to do at all until it matters.
   --------------------------------------------------------------------------- */

type Props = {
  /** which control this is — the renderer tunes its glow off this */
  variant: "explore" | "play";
  className?: string;
  label: string;
  /** rendered inside the button ahead of the label */
  icon: React.ReactNode;
  /** visually hidden label for the icon-only play control */
  ariaLabel?: string;
  onActivate?: () => void;
};

export function LiquidButton({ variant, className, label, icon, ariaLabel, onActivate }: Props) {
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let dispose: (() => void) | null = null;
    let cancelled = false;

    const mount = () => {
      if (cancelled) return;
      import("./liquid-metal.js")
        .then((m) => {
          if (cancelled) return;
          dispose = m.mountLiquidMetal(host);
        })
        .catch(() => {
          /* A failed chunk or a driver that will not give up a WebGL2 context
             leaves the CSS plate standing. The control still works. */
          host.dataset.liquidFallback = "true";
        });
    };

    /* Only build the renderer once the control is near the viewport. */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          mount();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      dispose?.();
    };
  }, []);

  return (
    <span
      ref={hostRef}
      className={`liquid-stage liquid-stage--${variant}${className ? ` ${className}` : ""}`}
      data-liquid-metal={variant}
    >
      <span className="liquid-plate plate" aria-hidden="true" />
      <canvas className="liquid-fx" aria-hidden="true" />
      <button
        className={`liquid-button liquid-button--${variant} btn`}
        type="button"
        aria-label={ariaLabel}
        onClick={onActivate}
      >
        {icon}
        <span className="lbl">{label}</span>
      </button>
    </span>
  );
}
