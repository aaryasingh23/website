"use client";

import { machines } from "@/lib/content";
import { Counter, Eyebrow } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function MachineInventory() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.07] bg-ink-900 py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-600/60 to-transparent"
      />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Machine inventory</Eyebrow>
            <h2 className="mt-5 max-w-lg text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] text-gradient-steel">
              Every machine on the floor, counted.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/manufacturing" variant="secondary" size="sm">
              Full manufacturing spec
            </Button>
          </Reveal>
        </div>

        <Stagger
          stagger={0.05}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-4"
        >
          {machines.map((m) => (
            <StaggerItem key={m.name}>
              <div className="group relative h-full bg-ink-900 p-5 transition-colors duration-500 hover:bg-ink-850 sm:p-6">
                <p className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-white sm:text-4xl">
                  <Counter target={m.target} suffix={m.suffix} duration={1500} />
                </p>
                <p className="mt-3 text-[0.8125rem] font-medium leading-snug text-brand-200">
                  {m.name}
                </p>
                <p className="mt-1.5 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-steel-600">
                  {m.detail}
                </p>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
