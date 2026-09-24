"use client";

import Image from "next/image";
import { certifications, labEquipment, qualityFlow } from "@/lib/content";
import { Eyebrow, TiltCard } from "@/components/ui/Primitives";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { StepFlow } from "@/components/ui/StepFlow";
import { Button } from "@/components/ui/Button";

export function QualityBody() {
  return (
    <>
      {/* ================= certifications ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[38vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.13),transparent_66%)] blur-[90px]"
        />
        <div className="container-x relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow>Certifications</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
                Six credentials, each earned through an audit cycle.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-500">
                Recognised by Marelli Powertrain, Mitsubishi Electric and Aisin — and audited to VDA
                6.3 by Aumovio (ex-Continental Automotive).
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <StaggerItem key={c.code}>
                <TiltCard intensity={5} className="h-full [perspective:1200px]">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/70 p-7 transition-colors duration-500 hover:border-brand-300/25">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-500 via-brand-400 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-signal-400">
                      {c.code}
                    </p>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-brand-200">
                      {c.body}
                    </p>
                    <p className="mt-5 flex-1 border-t border-white/[0.07] pt-5 text-sm leading-relaxed text-steel-500">
                      {c.detail}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= Sanber Labs ================= */}
      <section id="sanber" className="relative overflow-hidden bg-white text-steel-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow tone="light">Sanber Labs</Eyebrow>
              </Reveal>
              <RevealWords
                as="h2"
                text="Our own NABL-accredited lab, on the factory premises."
                className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-ink"
              />
              <Reveal delay={0.12}>
                <p className="mt-7 text-[1.0625rem] leading-relaxed text-steel-600">
                  On-site testing means zero third-party delays. Metallurgical analysis, dimensional
                  inspection, mechanical and environmental testing all happen inside Unit 2 — and
                  Sanber Labs also serves external clients as a separate line of business.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-steel-900/10 bg-steel-900/10 sm:grid-cols-2">
                  {[
                    { k: "Accreditation", v: "NABL" },
                    { k: "Location", v: "Unit 2 · SGM Nagar" },
                    { k: "Instruments", v: "6 core systems" },
                    { k: "Third-party delay", v: "Zero" },
                  ].map((s) => (
                    <div key={s.k} className="bg-white p-5">
                      <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-steel-500">
                        {s.k}
                      </p>
                      <p className="mt-2 font-display text-base font-semibold tracking-tight text-steel-900">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-9">
                  <Button href="https://sanberlabs.com" external variant="light" size="md">
                    Visit sanberlabs.com
                  </Button>
                </div>
              </Reveal>
            </div>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {labEquipment.map((e) => (
                <StaggerItem key={e.name}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-steel-900/10 bg-white transition-shadow duration-500 hover:shadow-[0_28px_60px_-40px_rgba(15,23,42,0.45)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
                      <Image
                        src={e.image}
                        alt={e.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-steel-900">
                        {e.name}
                      </h3>
                      <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-signal-600">
                        {e.make}
                      </p>
                      <p className="mt-3 text-[0.8125rem] leading-relaxed text-steel-600">{e.detail}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ================= quality flow ================= */}
      <section className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div className="container-x relative">
          <Reveal>
            <Eyebrow>Quality process</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
              Four gates between raw coil and dispatch.
            </h2>
          </Reveal>
          <div className="mt-16">
            <StepFlow steps={qualityFlow} />
          </div>
        </div>
      </section>
    </>
  );
}
