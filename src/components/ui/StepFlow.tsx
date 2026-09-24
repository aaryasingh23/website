"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type Step = { step: string; title: string; detail: string };

/**
 * Four-stage process rail. A red→blue line draws itself across the
 * stages on scroll, with each node lighting up in sequence.
 */
export function StepFlow({ steps, tone = "dark" }: { steps: Step[]; tone?: "dark" | "light" }) {
  const reduce = useReducedMotion();
  const light = tone === "light";

  return (
    <div className="relative">
      {/* rail */}
      <div
        aria-hidden
        className={cn(
          "absolute left-0 right-0 top-[1.35rem] hidden h-px lg:block",
          light ? "bg-steel-900/12" : "bg-white/10",
        )}
      >
        <motion.span
          className="block h-full origin-left bg-gradient-to-r from-signal-600 via-brand-500 to-brand-300"
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {steps.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.12} as="li" className="relative">
            <div className="flex items-center gap-4 lg:block">
              <span
                className={cn(
                  "relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-[0.6875rem] tracking-[0.1em]",
                  light
                    ? "border-steel-900/12 bg-white text-steel-700"
                    : "border-white/12 bg-ink-900 text-brand-200",
                )}
              >
                {s.step}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-signal-500/60"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 1.8] }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: "easeOut" }}
                />
              </span>
              <h3
                className={cn(
                  "font-display text-lg font-semibold tracking-tight lg:mt-6",
                  light ? "text-steel-900" : "text-white",
                )}
              >
                {s.title}
              </h3>
            </div>
            <p
              className={cn(
                "mt-4 text-sm leading-relaxed lg:mt-3",
                light ? "text-steel-600" : "text-steel-500",
              )}
            >
              {s.detail}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
