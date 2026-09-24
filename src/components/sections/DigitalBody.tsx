"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { digitalPillars, cadence, sustainability } from "@/lib/content";
import { Counter, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function DigitalBody() {
  return (
    <>
      {/* ================= digital operations ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div className="container-x relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow>Digital operations</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
                Zero paper. Full traceability. Three units.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-500">
                A level of digital maturity uncommon among mid-size Indian Tier-1 suppliers — and one
                that meets requirements set by German and Japanese OEMs.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
            {digitalPillars.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/70 p-7 transition-colors duration-500 hover:border-brand-300/25">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-500 via-brand-400 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-500">{p.detail}</p>

                  <ul className="mt-6 grid gap-2.5 border-t border-white/[0.07] pt-5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[0.8125rem] text-steel-400">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-500" strokeWidth={2.5} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= Cadence ================= */}
      <section
        id="cadence"
        className="relative overflow-hidden border-y border-white/[0.07] bg-ink-900 section-y"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[8%] top-1/4 h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_66%)] blur-[80px]"
        />

        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Built in-house</Eyebrow>
            </Reveal>
            <RevealWords
              as="h2"
              text="Cadence — our own production intelligence platform."
              className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel"
            />
            <Reveal delay={0.12}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-steel-400">{cadence.detail}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-2">
                {cadence.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-brand-300/18 bg-brand-500/[0.07] px-3.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            <Stagger className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06]">
              {cadence.metrics.map((m) => (
                <StaggerItem key={m.label}>
                  <div className="h-full bg-ink-900 p-5">
                    <p className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-white">
                      <Counter target={m.target} suffix={m.suffix} duration={1600} />
                    </p>
                    <p className="mt-3 text-[0.8125rem] leading-snug text-steel-500">{m.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <CadencePanel />
          </div>
        </div>
      </section>

      {/* ================= sustainability ================= */}
      <section className="relative overflow-hidden bg-white text-steel-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow tone="light">Sustainability</Eyebrow>
              </Reveal>
              <RevealWords
                as="h2"
                text="Clean energy, clean operations, clean data."
                className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-ink"
              />
              <Reveal delay={0.12}>
                <p className="mt-7 text-[1.0625rem] leading-relaxed text-steel-600">
                  Sustainability is built into operations rather than bolted on. Industry 4.0
                  eliminates waste and paper; precision manufacturing minimises material loss; and
                  clean energy with rigorous environmental management covers the rest.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-3xl border border-steel-900/10">
                  <Image
                    src="/images/factory/2026/aerial-solar-rooftop.jpg"
                    alt="Rooftop solar installation across AAMPL manufacturing units"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent p-5">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/70">
                      Rooftop solar
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">
                      Up to 120 kVA generated annually
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-steel-900/10 bg-steel-900/10 sm:grid-cols-2 lg:col-span-7">
              {sustainability.map((s, i) => (
                <StaggerItem key={s.title}>
                  <div className="group relative h-full overflow-hidden bg-white p-7 transition-colors duration-500 hover:bg-steel-50">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-600 to-brand-600 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-steel-900">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-steel-600">{s.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-steel-900/10 bg-steel-50 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-steel-900">
                  See Industry 4.0 in action
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-steel-600">
                  Visit AAMPL to see the AI-powered production system, digital workflows and
                  sustainable operations firsthand.
                </p>
              </div>
              <Button href="/contact" variant="light" size="md">
                Schedule a tour
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   Cadence panel — an illustrative view of the platform,
   not a screenshot. Bars animate on scroll; nodes pulse live.
   ============================================================ */

const UNITS = [
  { name: "Unit 1 · Sector 25", load: 82, ops: "Press shop" },
  { name: "Unit 2 · SGM Nagar", load: 64, ops: "Sanber Labs" },
  { name: "Unit 3 · IMT 68", load: 91, ops: "CNC & tool room" },
];

const ROLES = ["Superadmin", "Plant head", "Supervisor", "Operator", "Quality"];

function CadencePanel() {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={0.1}>
      <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-ink-950/80 shadow-[0_40px_100px_-60px_rgba(59,130,246,0.6)] backdrop-blur-xl">
        {/* title bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-signal-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-steel-400">
              Cadence · iteration 51+
            </span>
          </div>
          <span className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-brand-300">
            <span className="relative flex h-1.5 w-1.5">
              {!reduce && (
                <span className="absolute inset-0 rounded-full bg-brand-400 animate-[pulse-ring_2.6s_ease-out_infinite]" />
              )}
              <span className="relative h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            Connected
          </span>
        </div>

        {/* unit load */}
        <div className="grid gap-5 p-5 sm:p-7">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-steel-600">
            Units online
          </p>
          {UNITS.map((u, i) => (
            <div key={u.name}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[0.8125rem] font-medium text-white">{u.name}</span>
                <span className="font-mono text-[0.6875rem] text-brand-200">{u.load}%</span>
              </div>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-300"
                  initial={reduce ? { width: `${u.load}%` } : { width: 0 }}
                  whileInView={{ width: `${u.load}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.3, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <p className="mt-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-steel-600">
                {u.ops}
              </p>
            </div>
          ))}
        </div>

        {/* throughput sparkline */}
        <div className="border-t border-white/[0.07] px-5 py-6 sm:px-7">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-steel-600">
              Operations logged · daily
            </p>
            <p className="font-display text-lg font-semibold text-white">
              <Counter target={800} suffix="+" duration={1800} />
            </p>
          </div>
          <div className="mt-4 flex h-16 items-end gap-1">
            {[38, 52, 44, 61, 55, 72, 66, 81, 74, 88, 79, 94, 86, 97].map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-signal-800 to-signal-500"
                initial={reduce ? { height: `${h}%` } : { height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>

        {/* roles */}
        <div className="border-t border-white/[0.07] px-5 py-5 sm:px-7">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-steel-600">
            Role-based access
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <span
                key={r}
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-steel-400"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <p className="border-t border-white/[0.07] px-5 py-3 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-steel-700 sm:px-7">
          Representative view — not a live data feed
        </p>
      </div>
    </Reveal>
  );
}
