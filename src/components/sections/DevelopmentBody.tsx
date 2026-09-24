"use client";

import Image from "next/image";
import { toolRoom, developmentProcess, valueChain } from "@/lib/content";
import { Eyebrow, Parallax } from "@/components/ui/Primitives";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { StepFlow } from "@/components/ui/StepFlow";
import { Localization } from "@/components/sections/Localization";

export function DevelopmentBody() {
  return (
    <>
      {/* ================= tool room ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-1/3 h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.11),transparent_66%)] blur-[80px]"
        />

        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>In-house tool room</Eyebrow>
            </Reveal>
            <RevealWords
              as="h2"
              text="We build our own tooling. That is why lead times hold."
              className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel"
            />
            <Reveal delay={0.12}>
              <p className="mt-7 text-[1.0625rem] leading-relaxed text-steel-400">
                Each of our three plants has its own tool room — over 50,000 sq ft of combined
                tool-making, die-build and prototyping capacity. We design, build and maintain our
                own tooling, which is why turnaround on new parts and engineering changes stays
                short.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <div className="grid gap-3">
                <Parallax offset={-18}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/[0.08]">
                    <Image
                      src="/images/factory/2026/tool-room-build.jpg"
                      alt="AAMPL tool room during a die build"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                  </div>
                </Parallax>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2">
              {toolRoom.map((t, i) => (
                <StaggerItem key={t.title}>
                  <div className="group relative h-full overflow-hidden bg-ink-950 p-6 transition-colors duration-500 hover:bg-ink-900">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold leading-snug tracking-tight text-white">
                      {t.title}
                    </h3>
                    <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-steel-500">{t.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2} className="mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08]">
                  <Image
                    src="/images/factory/2026/tool-room-edm.jpg"
                    alt="EDM machine in the AAMPL tool room"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08]">
                  <Image
                    src="/images/factory/2026/cnc-swiss-lathe.jpg"
                    alt="Citizen Swiss-type sliding head lathe"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= process ================= */}
      <section className="relative overflow-hidden border-y border-white/[0.07] bg-ink-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-40" />
        <div className="container-x relative">
          <Reveal>
            <Eyebrow>Concept to PPAP</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
              Four stages between a drawing and serial production.
            </h2>
          </Reveal>
          <div className="mt-16">
            <StepFlow steps={developmentProcess} />
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 rounded-3xl border border-brand-300/15 bg-brand-500/[0.05] p-7 sm:p-10">
              <p className="max-w-3xl text-[1.0625rem] leading-relaxed text-steel-300">
                In-house prototyping cuts development time by{" "}
                <strong className="font-medium text-white">60%</strong> — enabling rapid iteration
                and design refinement before a single tool is cut. Design runs on Siemens UGNX,
                AutoCAD and Delcam PowerMill, with DFM review before metal.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= localization ================= */}
      <Localization />

      {/* ================= value chain ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div className="container-x relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow>Vertical integration</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
                Every step of the value chain, under our control.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-500">
                From raw material procurement to final dispatch — controlling each step is what keeps
                quality, cost and response time predictable.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {valueChain.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="group relative h-full bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/12 font-mono text-[0.625rem] text-brand-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < valueChain.length - 1 && (
                      <span className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-base font-semibold leading-snug tracking-tight text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-steel-500">{v.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
