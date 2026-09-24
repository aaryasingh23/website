"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/content";
import { Eyebrow, TiltCard } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-ink-950 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-blueprint opacity-30" />
        <div className="absolute right-0 top-1/4 h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.10),transparent_66%)] blur-[80px]" />
        <div className="absolute left-0 bottom-0 h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_66%)] blur-[80px]" />
      </div>

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.02] text-gradient-steel">
              Six capabilities. One vertically integrated plant.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-500">
              From raw coil to a PPAP-cleared part, every step happens inside our own four walls —
              which is what keeps lead time, cost and accountability under our control.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.href} delay={(i % 3) * 0.08} amount={0.15}>
              <TiltCard
                intensity={6}
                className="h-full [perspective:1200px]"
                spotlightColor="rgba(96,143,250,0.18)"
              >
                <Link
                  href={c.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/70 transition-colors duration-500 hover:border-brand-300/25"
                >
                  {/* image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover opacity-70 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-transparent" />
                    <span className="absolute left-5 top-5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-signal-400">
                      {c.index}
                    </span>
                    <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-white backdrop-blur-md transition-all duration-500 group-hover:border-signal-500/50 group-hover:bg-signal-600">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-steel-500">{c.summary}</p>

                    <ul className="mt-6 grid gap-2 border-t border-white/[0.07] pt-5">
                      {c.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-steel-500 transition-colors duration-500 group-hover:text-steel-400"
                        >
                          <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-signal-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
