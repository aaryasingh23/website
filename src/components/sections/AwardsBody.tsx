"use client";

import { motion, useReducedMotion } from "motion/react";
import { Trophy } from "lucide-react";
import { awards, timeline } from "@/lib/content";
import { Counter, Eyebrow, TiltCard } from "@/components/ui/Primitives";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";

const METRICS = [
  { target: 30, suffix: "+", label: "Years of excellence" },
  { target: 700, suffix: "+", label: "Skilled workforce" },
  { target: 5, suffix: "M+", label: "Parts delivered monthly" },
  { target: 9, label: "Customer awards" },
];

const TAG_TONE: Record<string, string> = {
  Quality: "text-brand-200 border-brand-300/20 bg-brand-500/[0.07]",
  Delivery: "text-brand-200 border-brand-300/20 bg-brand-500/[0.07]",
  Excellence: "text-signal-300 border-signal-500/25 bg-signal-500/[0.08]",
  Development: "text-steel-300 border-white/12 bg-white/[0.04]",
  Certification: "text-signal-300 border-signal-500/25 bg-signal-500/[0.08]",
};

export function AwardsBody() {
  return (
    <>
      {/* ================= awards grid ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[38vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.12),transparent_66%)] blur-[90px]"
        />

        <div className="container-x relative">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Recognition</Eyebrow>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-steel-400">
                Throughout our journey, the pursuit of customer satisfaction has been validated
                through awards from industry leaders. Each one represents not a moment of pride but a
                measured verdict on quality, delivery and partnership.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {awards.map((a) => (
              <StaggerItem key={`${a.org}-${a.title}`}>
                <TiltCard intensity={5} className="h-full [perspective:1200px]">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/70 p-7 transition-colors duration-500 hover:border-signal-500/25">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-signal-400 transition-colors duration-500 group-hover:border-signal-500/40 group-hover:text-signal-300">
                        <Trophy className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] ${TAG_TONE[a.tag] ?? TAG_TONE.Development}`}
                      >
                        {a.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-white">
                      {a.org}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] text-brand-200">
                      {a.title}
                    </p>
                    <p className="mt-5 flex-1 border-t border-white/[0.07] pt-5 text-sm leading-relaxed text-steel-500">
                      {a.detail}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          {/* metrics */}
          <Stagger
            stagger={0.06}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-4"
          >
            {METRICS.map((m) => (
              <StaggerItem key={m.label}>
                <div className="h-full bg-ink-950 p-6 text-center sm:p-8">
                  <p className="font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                    <Counter target={m.target} suffix={m.suffix} duration={1700} />
                  </p>
                  <p className="mt-3 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-steel-500">
                    {m.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= timeline ================= */}
      <section className="relative overflow-hidden bg-white text-steel-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" />
        <div className="container-x relative">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="light">Our journey</Eyebrow>
            </Reveal>
            <RevealWords
              as="h2"
              text="From one press shop to three units."
              className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-ink"
            />
          </div>

          <Timeline />
        </div>
      </section>
    </>
  );
}

function Timeline() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mt-16">
      {/* spine */}
      <div
        aria-hidden
        className="absolute left-[0.6875rem] top-2 h-[calc(100%-1rem)] w-px bg-steel-900/10 md:left-1/2 md:-translate-x-1/2"
      >
        <motion.span
          className="block h-full w-full origin-top bg-gradient-to-b from-signal-600 via-brand-500 to-brand-300"
          initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <ol className="grid gap-10">
        {timeline.map((t, i) => {
          const right = i % 2 === 1;
          return (
            <Reveal
              key={t.year}
              as="li"
              delay={i * 0.08}
              direction={right ? "left" : "right"}
              className="relative pl-10 md:pl-0"
            >
              <div
                className={`md:grid md:grid-cols-2 md:gap-12 ${right ? "" : "md:[direction:rtl]"}`}
              >
                <div className={`[direction:ltr] ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
                  {/* node */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-signal-600 shadow-[0_0_0_4px_rgba(225,29,46,0.14)] md:left-1/2 md:-translate-x-1/2`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>

                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-signal-600">
                    {t.year}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-steel-900">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
