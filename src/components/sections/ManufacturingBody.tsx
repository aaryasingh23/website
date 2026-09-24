"use client";

import Image from "next/image";
import { manufacturingAreas, machines } from "@/lib/content";
import { Counter, Eyebrow, Parallax } from "@/components/ui/Primitives";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Gallery } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

const GALLERY = [
  { src: "/images/factory/2026/press-shop-aerial.jpg", caption: "Press shop — aerial" },
  { src: "/images/factory/2026/press-shop-progressive-die.jpg", caption: "Progressive die in operation" },
  { src: "/images/factory/2026/press-shop-hydraulic.jpg", caption: "Hydraulic press line" },
  { src: "/images/factory/2026/cnc-shop-floor.jpg", caption: "CNC shop floor" },
  { src: "/images/factory/2026/cnc-swiss-lathe.jpg", caption: "Citizen Swiss-type sliding head" },
  { src: "/images/factory/2026/cnc-haas-vmc.jpg", caption: "HAAS vertical machining centre" },
  { src: "/images/factory/2026/assembly-pneumatic-press.jpg", caption: "Assembly & pneumatic press" },
  { src: "/images/factory/2026/exterior-evening-2.jpg", caption: "Plant exterior at dusk" },
];

export function ManufacturingBody() {
  return (
    <>
      {/* ================= capability blocks ================= */}
      {manufacturingAreas.map((area, i) => {
        const light = i % 2 === 1;
        return (
          <section
            key={area.id}
            id={area.id}
            className={cn(
              "relative overflow-hidden section-y",
              light ? "bg-white text-steel-900" : "bg-ink-950",
            )}
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0",
                light ? "bg-blueprint-light opacity-50" : "bg-blueprint opacity-30",
              )}
            />
            {!light && (
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[10%] top-1/4 h-[36vmax] w-[36vmax] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_66%)] blur-[80px]"
              />
            )}

            <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* copy */}
              <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                <Reveal>
                  <Eyebrow tone={light ? "light" : "dark"}>{area.eyebrow}</Eyebrow>
                </Reveal>
                <RevealWords
                  as="h2"
                  text={area.title}
                  className={cn(
                    "mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03]",
                    light ? "text-gradient-ink" : "text-gradient-steel",
                  )}
                />
                <Reveal delay={0.12}>
                  <p
                    className={cn(
                      "mt-7 text-[1.0625rem] leading-relaxed",
                      light ? "text-steel-600" : "text-steel-400",
                    )}
                  >
                    {area.body}
                  </p>
                </Reveal>

                <Stagger className="mt-9 grid gap-3">
                  {area.points.map((p) => (
                    <StaggerItem key={p}>
                      <div
                        className={cn(
                          "flex items-start gap-3 border-t pt-3 text-sm leading-relaxed",
                          light ? "border-steel-900/10 text-steel-600" : "border-white/[0.07] text-steel-400",
                        )}
                      >
                        <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-signal-500" />
                        {p}
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              {/* images */}
              <div className={cn("lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                <div className="grid gap-3 sm:grid-cols-5">
                  <Parallax offset={-24} className="sm:col-span-5">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/[0.08]">
                      <Image
                        src={area.images[0]}
                        alt={area.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
                    </div>
                  </Parallax>
                  <Parallax offset={18} className="sm:col-span-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08]">
                      <Image
                        src={area.images[1]}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 60vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                  <Parallax offset={34} className="sm:col-span-2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.08] sm:aspect-auto sm:h-full">
                      <Image
                        src={area.images[2]}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 40vw, 20vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ================= inventory ================= */}
      <section className="relative overflow-hidden border-y border-white/[0.07] bg-ink-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-50" />
        <div className="container-x relative">
          <Reveal>
            <Eyebrow>Full inventory</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
              203 presses, 25 CNC centres, one EDM and 40+ welding stations.
            </h2>
          </Reveal>

          <Stagger
            stagger={0.05}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-4"
          >
            {machines.map((m) => (
              <StaggerItem key={m.name}>
                <div className="group relative h-full bg-ink-900 p-6 transition-colors duration-500 hover:bg-ink-850">
                  <p className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-white">
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

      {/* ================= gallery ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div className="container-x relative">
          <Reveal>
            <Eyebrow>On the floor</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
              Manufacturing gallery.
            </h2>
          </Reveal>
          <div className="mt-12">
            <Gallery items={GALLERY} />
          </div>
        </div>
      </section>
    </>
  );
}
