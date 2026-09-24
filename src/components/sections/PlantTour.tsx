"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";
import { plantTourVideoId } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const HIGHLIGHTS = [
  { k: "01", v: "Press shop", d: "203 machines, 5T–630T" },
  { k: "02", v: "CNC floor", d: "Tsugami · HAAS · Citizen" },
  { k: "03", v: "Tool room", d: "Sodick wire-cut & EDM" },
  { k: "04", v: "Sanber Labs", d: "NABL-accredited testing" },
];

/**
 * Facade pattern — the YouTube iframe is only injected on click,
 * so the embed costs nothing until someone actually wants it.
 */
export function PlantTour() {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section id="plant-tour" className="relative overflow-hidden bg-ink-950 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-blueprint opacity-25" />
        <div className="absolute left-1/2 top-1/3 h-[46vmax] w-[76vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.14),transparent_66%)] blur-[90px]" />
      </div>

      <div className="container-x relative">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Virtual plant tour</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.02] text-gradient-steel">
              Walk the floor before you visit it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-500">
              A walkthrough of manufacturing operations across all three units — press shop, CNC,
              tool room and laboratory.
            </p>
          </Reveal>
        </div>

        {/* ---------- player ---------- */}
        <Reveal delay={0.12} className="mt-14">
          <div className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-white/[0.09] bg-ink-900">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${plantTourVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="AAMPL virtual plant tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the AAMPL plant tour video"
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src="/images/factory/2026/press-shop-aerial.jpg"
                  alt="Aerial view of the AAMPL press shop"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover opacity-55 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-75"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-ink-950/45" />

                {/* play control */}
                <span className="absolute inset-0 grid place-items-center">
                  <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-ink-950/50 backdrop-blur-md transition-all duration-500 group-hover:border-signal-500/60 group-hover:bg-signal-600 sm:h-24 sm:w-24">
                    {!reduce && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-signal-500/50"
                        animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <Play className="ml-1 h-7 w-7 fill-white text-white sm:h-8 sm:w-8" strokeWidth={0} />
                  </span>
                </span>

                <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-left sm:p-8">
                  <span>
                    <span className="eyebrow text-signal-400">Now showing</span>
                    <span className="mt-2 block font-display text-lg font-medium text-white sm:text-xl">
                      Inside AAMPL — three units, one process
                    </span>
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-500">
                    Faridabad, India
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>

        {/* ---------- chapter strip ---------- */}
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.k} delay={i * 0.06}>
              <div className="group h-full bg-ink-950 p-5 transition-colors duration-500 hover:bg-ink-900">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-700">
                  {h.k}
                </span>
                <p className="mt-3 text-sm font-medium text-white">{h.v}</p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-steel-600">
                  {h.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
