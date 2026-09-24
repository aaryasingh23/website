"use client";

import Image from "next/image";
import { certifications, customers } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem, RevealWords } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function TrustGrid() {
  return (
    <section className="relative overflow-hidden bg-white text-steel-900 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" />

      <div className="container-x relative">
        {/* ---------- certifications ---------- */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow tone="light">Certified & audited</Eyebrow>
            </Reveal>
            <RevealWords
              as="h2"
              text="Every badge earned through an audit cycle."
              className="mt-6 text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.03] text-gradient-ink"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-steel-600">
                Certification is the entry ticket for OEM supply. We hold the full set — and back it
                with a NABL-accredited laboratory on our own premises.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <Button href="/quality" variant="light" size="md">
                  Quality &amp; labs
                </Button>
              </div>
            </Reveal>
          </div>

          <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-steel-900/10 bg-steel-900/10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {certifications.map((c) => (
              <StaggerItem key={c.code}>
                <div className="group relative h-full overflow-hidden bg-white p-6 transition-colors duration-500 hover:bg-steel-50">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-600 to-brand-600 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-signal-600">
                    {c.code}
                  </p>
                  <h3 className="mt-3 font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-steel-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] text-steel-500">{c.body}</p>
                  <p className="mt-4 border-t border-steel-900/8 pt-4 text-[0.8125rem] leading-relaxed text-steel-600">
                    {c.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* ---------- customers ---------- */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <div className="flex flex-col gap-4 border-t border-steel-900/10 pt-12 md:flex-row md:items-end md:justify-between">
              <div>
                <Eyebrow tone="light">Esteemed customers</Eyebrow>
                <h3 className="mt-5 max-w-xl text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.06] text-gradient-ink">
                  Trusted across India, Europe and Asia.
                </h3>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-steel-500">
                Global automotive OEMs, Tier-1 system integrators and leading manufacturers — and
                actively expanding into new EV, powertrain and sensor programs.
              </p>
            </div>
          </Reveal>

          <Stagger
            stagger={0.04}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-steel-900/10 bg-steel-900/10 sm:grid-cols-3 lg:grid-cols-5"
          >
            {customers.map((c) => (
              <StaggerItem key={c.name}>
                <div className="group flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-4 bg-white p-6 transition-colors duration-500 hover:bg-steel-50">
                  <Image
                    src={c.logo}
                    alt=""
                    width={150}
                    height={44}
                    sizes="150px"
                    className="h-9 w-auto max-w-[140px] object-contain opacity-75 saturate-[0.9] transition-all duration-500 group-hover:opacity-100 group-hover:saturate-100"
                  />
                  <span className="text-center font-mono text-[0.5625rem] uppercase leading-tight tracking-[0.14em] text-steel-500 transition-colors duration-500 group-hover:text-steel-800">
                    {c.name}
                  </span>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem>
              <div className="grid h-full min-h-[8.5rem] place-items-center bg-steel-50 p-6 text-center">
                <p className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-steel-500">
                  …and growing
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
