"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-[0.9375rem]",
};

/**
 * Magnetic CTA. Pointer pulls the button ~8px toward the cursor,
 * with a red→blue sheen that tracks the cursor position.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
  external = false,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  external?: boolean;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - r.left;
    const relY = e.clientY - r.top;
    setCursor({ x: (relX / r.width) * 100, y: (relY / r.height) * 100 });
    setPos({ x: (relX - r.width / 2) * 0.16, y: (relY - r.height / 2) * 0.22 });
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 });
    setCursor({ x: 50, y: 50 });
  }

  const base =
    "group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300 will-change-transform";

  const variants: Record<Variant, string> = {
    primary: "bg-signal-600 text-white hover:bg-signal-500 shadow-[0_10px_40px_-12px_var(--color-signal-600)]",
    secondary:
      "border border-brand-300/25 bg-white/[0.04] text-white backdrop-blur-md hover:border-brand-300/50 hover:bg-white/[0.09]",
    ghost: "text-steel-300 hover:text-white",
    light: "bg-steel-900 text-white hover:bg-brand-700 shadow-[0_10px_40px_-16px_rgba(15,23,42,0.7)]",
  };

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
      className={cn(base, SIZES[size], variants[variant], className)}
    >
      {/* cursor-tracked sheen */}
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(140px circle at ${cursor.x}% ${cursor.y}%, rgba(255,255,255,0.28), transparent 65%)`,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span className="relative z-10 grid h-4 w-4 place-items-center overflow-hidden">
          <ArrowRight
            className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5"
            strokeWidth={2}
          />
          <ArrowRight
            className="absolute h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            strokeWidth={2}
          />
        </span>
      )}
    </motion.span>
  );

  if (!href) {
    return (
      <button type="button" onClick={onClick} className="inline-flex">
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex" onClick={onClick}>
      {inner}
    </Link>
  );
}
