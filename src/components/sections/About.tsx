"use client";

import Image from "next/image";
import { certifications } from "@/lib/content";
import { Eyebrow, Parallax, SpecChip } from "@/components/ui/Primitives";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const PILLARS = [
  {
    k: "Under one roof",
    v: "Stamping, machining, welding, assembly and testing — no external dependency on core manufacturing.",
  },
  {
    k: "Tooling in-house",
    v: "Three tool rooms, 50,000+ sq ft combined. Engineering changes turn around in weeks, not months.",
  },
  {
    k: "Own laboratory",
    v: "Sanber Labs is NABL-accredited and sits on our factory premises. Validation never waits on a third party.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white text-steel-900 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.9),transparent)]"
      />

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ---------- imagery ---------- */}
        <div className="relative lg:col-span-5">
          <Parallax offset={-38}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/factory/2026/exterior-evening-1.jpg"
                alt="AAMPL manufacturing facility in Faridabad at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="eyebrow text-white/70">Faridabad · Haryana</span>
                <p className="mt-2 font-display text-lg font-medium text-white">
                  Three units · 1.5 lakh sq. ft.
                </p>
              </div>
            </div>
          </Parallax>

          {/* offset inset image */}
          <Parallax offset={26} className="absolute -bottom-10 -right-4 w-[46%] sm:-right-8 lg:-right-12">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)]">
              <Image
                src="/images/factory/2026/press-shop-progressive-die.jpg"
                alt="Progressive die running in the AAMPL press shop"
                fill
                sizes="(max-width: 1024px) 46vw, 20vw"
                className="object-cover"
              />
            </div>
          </Parallax>

          {/* floating spec readout */}
          <Reveal
            delay={0.25}
            direction="right"
            className="absolute -left-2 top-8 hidden rounded-2xl border border-steel-900/10 bg-white/85 p-4 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)] backdrop-blur-md sm:block lg:-left-10"
          >
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-steel-500">
              Output
            </p>
            <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-steel-900">
              5M+
              <span className="ml-1 font-mono text-xs font-normal text-signal-600">/ month</span>
            </p>
          </Reveal>
        </div>

        {/* ---------- copy ---------- */}
        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <Eyebrow tone="light">Who we are</Eyebrow>
          </Reveal>

          <RevealWords
            as="h2"
            text="A Tier-1 supplier built on tooling, tolerance and traceability."
            className="mt-6 max-w-2xl text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.02] text-gradient-ink"
            delay={0.05}
          />

          <Reveal delay={0.15}>
            <div className="mt-8 grid gap-5 text-[1.0625rem] leading-relaxed text-steel-600">
              <p>
                Founded in 1996 by{" "}
                <strong className="font-medium text-steel-900">Mr. Sanjeev Gumber</strong>, Advanced
                Anmol Metcomp has grown into one of India&apos;s leading Tier-1 suppliers of precision
                sheet metal and machined components for global automotive OEMs. Three manufacturing
                units span 1.5 lakh sq. ft. in Faridabad.
              </p>
              <p>
                Our capabilities run from high-speed stamping and CNC machining through tool design,
                welding and assembly — all under one roof. We serve the full spectrum, from fuel
                injection systems and BS6-compliant parts to next-generation EV components.
              </p>
            </div>
          </Reveal>

          {/* pillars */}
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-steel-900/10 bg-steel-900/10 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={0.1 + i * 0.08}>
                <div className="group h-full bg-white p-5 transition-colors duration-500 hover:bg-steel-50">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-signal-600">
                    {p.k}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{p.v}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* certs */}
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-2">
              {certifications.slice(0, 4).map((c) => (
                <SpecChip key={c.code} tone="light">
                  {c.code}
                </SpecChip>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/quality" variant="light" size="md">
                Quality &amp; certifications
              </Button>
              <Button href="/development" variant="ghost" size="md" className="text-steel-600 hover:text-steel-900">
                Design &amp; development
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
