"use client";

import { motion, useReducedMotion } from "motion/react";
import { localization } from "@/lib/content";
import { Counter, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * The differentiator section. On the old site this was a plain table;
 * here each import-substitution case reads as a measured saving.
 */
export function Localization() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-steel-50 text-steel-900 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-70" />

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow tone="light">Our differentiator</Eyebrow>
            </Reveal>
            <RevealWords
              as="h2"
              text="Imported part in. India-made part out."
              className="mt-6 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.02] text-gradient-ink"
            />
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-steel-600">
                AAMPL specialises in converting imported components into India-made equivalents —
                delivering measurable reductions in cost, lead time and supply-chain risk for global
                OEMs. Below: six programs, and what each one actually saved.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 rounded-3xl border border-steel-900/10 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)]">
                <p className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-steel-900">
                  6–7<span className="text-signal-600">%</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-steel-600">
                  of annual revenue reinvested in R&amp;D and new machine infrastructure — which is
                  how we stay ahead of the localization curve.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8">
                <Button href="/development" variant="light" size="md">
                  How we develop parts
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------- the data ---------- */}
          <div className="lg:col-span-7">
            {/* legend */}
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-steel-900/10 pb-4">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-500">
                  Program
                </span>
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-steel-500">
                    <span className="h-2 w-2 rounded-full bg-brand-600" />
                    Lead time cut
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-steel-500">
                    <span className="h-2 w-2 rounded-full bg-signal-600" />
                    Cost saved
                  </span>
                </div>
              </div>
            </Reveal>

            <ul className="divide-y divide-steel-900/8">
              {localization.map((row, i) => (
                <Reveal key={`${row.origin}-${row.component}`} delay={i * 0.07} amount={0.3}>
                  <li className="group py-6 transition-colors duration-500">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-signal-600">
                          <span className="rounded border border-steel-900/12 bg-white px-1.5 py-0.5 text-steel-700">
                            {row.flag}
                          </span>
                          {row.origin}
                        </span>
                        <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-steel-900">
                          {row.component}
                        </p>
                      </div>
                      {row.leadTimePct !== null && row.costPct !== null ? (
                        <div className="flex shrink-0 gap-6 text-right">
                          <div>
                            <p className="font-display text-xl font-semibold leading-none tracking-tight text-brand-700">
                              <Counter target={row.leadTimePct} suffix="%" duration={1500} />
                            </p>
                            <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-steel-500">
                              Lead time
                            </p>
                          </div>
                          <div>
                            <p className="font-display text-xl font-semibold leading-none tracking-tight text-signal-600">
                              <Counter target={row.costPct} suffix="%" duration={1500} />
                            </p>
                            <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-steel-500">
                              Cost
                            </p>
                          </div>
                        </div>
                      ) : (
                        <span className="shrink-0 rounded-full border border-steel-900/12 bg-white px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-steel-500">
                          Not published
                        </span>
                      )}
                    </div>

                    {/* stacked bars — omitted where no figure is published */}
                    {row.leadTimePct !== null && row.costPct !== null ? (
                      <div className="mt-4 grid gap-1.5">
                        <Bar pct={row.leadTimePct} color="bg-brand-600" reduce={!!reduce} delay={i * 0.07} />
                        <Bar pct={row.costPct} color="bg-signal-600" reduce={!!reduce} delay={i * 0.07 + 0.08} />
                      </div>
                    ) : (
                      row.note && (
                        <p className="mt-4 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-steel-400">
                          {row.note}
                        </p>
                      )
                    )}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <p className="mt-6 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-steel-500">
                Figures are per-program reductions against the previously imported part.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bar({
  pct,
  color,
  reduce,
  delay,
}: {
  pct: number;
  color: string;
  reduce: boolean;
  delay: number;
}) {
  return (
    <span className="block h-1.5 overflow-hidden rounded-full bg-steel-900/8">
      <motion.span
        className={`block h-full rounded-full ${color}`}
        initial={reduce ? { width: `${pct}%` } : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.25, delay: 0.15 + delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
