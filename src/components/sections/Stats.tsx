"use client";

import { stats } from "@/lib/content";
import { Counter, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink-950 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="absolute left-1/2 top-0 h-[38vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.13),transparent_66%)] blur-[80px]" />
      </div>

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>At a glance</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.02] text-gradient-steel">
              Three decades, measured in numbers.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-500">
              Scale that clears OEM capacity audits, and a growth curve that has held a 19% CAGR
              through three plant expansions.
            </p>
          </Reveal>
        </div>

        {/* ---- the grid: hairline-ruled, instrument-panel feel ---- */}
        <Stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] lg:grid-cols-3">
          {stats.map((s, i) => (
            <StaggerItem key={s.label}>
              <div
                className={cn(
                  "group relative h-full overflow-hidden bg-ink-950 p-6 transition-colors duration-500 hover:bg-ink-900 sm:p-8 lg:p-10",
                )}
              >
                {/* hover sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-500 via-brand-400 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-700">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="mt-6 font-display text-[clamp(2.2rem,5.2vw,3.6rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                  {s.literal ? (
                    s.value
                  ) : (
                    <Counter
                      target={s.target}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={1800 + i * 120}
                    />
                  )}
                </p>

                <p className="mt-4 text-[0.9375rem] font-medium text-brand-200">{s.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-steel-500">{s.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
