"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  blur = true,
  as = "div",
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  blur?: boolean;
  as?: "div" | "section" | "li" | "span" | "header";
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const off = OFFSET[direction];
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: off.x, y: off.y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------- Staggered container ---------------- */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
}

export { containerVariants, childVariants };

/* ---------------- Per-word headline reveal ---------------- */

export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const parts = text.split(" ");

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
      >
        {parts.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={cn("inline-block", wordClassName)}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {w}
              {i < parts.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
