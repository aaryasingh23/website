"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   Eyebrow — mono label with a red tick
   ============================================================ */

export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        tone === "dark" ? "text-brand-300/90" : "text-brand-700",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-signal-500 animate-[pulse-ring_2.6s_ease-out_infinite]" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-signal-500" />
      </span>
      {children}
    </span>
  );
}

/* ============================================================
   Section heading
   ============================================================ */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.03]",
          tone === "dark" ? "text-gradient-steel" : "text-gradient-ink",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-[1.0625rem]",
            tone === "dark" ? "text-steel-400" : "text-steel-600",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}

/* ============================================================
   Counter — count-up on view
   ============================================================ */

export function Counter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
  plain = false,
  className,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  /** Skip thousands separators — used for years. */
  plain?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : plain
        ? String(Math.round(value))
        : Math.round(value).toLocaleString("en-IN");

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ============================================================
   TiltCard — 3D pointer tilt + spotlight
   ============================================================ */

export function TiltCard({
  children,
  className,
  intensity = 8,
  spotlight = true,
  spotlightColor = "rgba(96,143,250,0.16)",
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  spotlight?: boolean;
  spotlightColor?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), { stiffness: 220, damping: 22 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    setGlow({ x: px * 100, y: py * 100, on: true });
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
    setGlow((g) => ({ ...g, on: false }));
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative", className)}
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-500"
          style={{
            opacity: glow.on ? 1 : 0,
            background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, ${spotlightColor}, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ============================================================
   Marquee
   ============================================================ */

export function Marquee({
  children,
  reverse = false,
  speed = 46,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden mask-edges", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex min-w-full shrink-0 items-center justify-around",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{
            animation: `${reverse ? "marquee-rev" : "marquee"} ${speed}s linear infinite`,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Spec chip — mono data pill
   ============================================================ */

export function SpecChip({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "red";
  className?: string;
}) {
  const tones = {
    dark: "border-brand-300/20 bg-brand-500/[0.07] text-brand-200",
    light: "border-steel-900/12 bg-steel-900/[0.04] text-steel-700",
    red: "border-signal-500/25 bg-signal-500/[0.09] text-signal-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ============================================================
   Section rule with a centred index marker
   ============================================================ */

export function IndexRule({ index, tone = "dark" }: { index: string; tone?: "dark" | "light" }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "font-mono text-[0.6875rem] tracking-[0.2em]",
          tone === "dark" ? "text-steel-500" : "text-steel-400",
        )}
      >
        {index}
      </span>
      <span className={cn("h-px flex-1", tone === "dark" ? "bg-white/10" : "bg-steel-900/10")} />
    </div>
  );
}

/* ============================================================
   Parallax wrapper — subtle depth on scroll
   ============================================================ */

export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 roughly
        setRange(Math.max(-1.2, Math.min(1.2, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <div style={reduce ? undefined : { transform: `translate3d(0, ${range * offset}px, 0)` }}>{children}</div>
    </div>
  );
}
