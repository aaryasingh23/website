"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { Images } from "lucide-react";
import { products, productCategories, applications, type ProductCategory } from "@/lib/content";
import { Eyebrow, TiltCard } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem, RevealWords } from "@/components/ui/Reveal";
import { Viewer, type LightboxItem } from "@/components/ui/Lightbox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Filter = ProductCategory | "all";

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  "4-wheeler": "4-Wheeler",
  "2-wheeler": "2-Wheeler",
  ev: "EV",
};

export function ProductsBody() {
  const [filter, setFilter] = useState<Filter>("all");
  const [viewer, setViewer] = useState<{ items: LightboxItem[]; index: number; label: string } | null>(
    null,
  );
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const totalImages = useMemo(() => products.reduce((n, p) => n + p.gallery.length, 0), []);

  const step = useCallback((d: number) => {
    setViewer((v) =>
      v ? { ...v, index: (v.index + d + v.items.length) % v.items.length } : v,
    );
  }, []);

  return (
    <>
      {/* ================= portfolio ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[40vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.13),transparent_66%)] blur-[90px]"
        />

        <div className="container-x relative">
          {/* filter bar */}
          <div className="flex flex-col gap-6 border-b border-white/[0.07] pb-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <Eyebrow>Portfolio</Eyebrow>
              <h2 className="mt-5 max-w-xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] text-gradient-steel">
                Eight component families.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {productCategories.map((c) => {
                  const active = filter === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFilter(c.id as Filter)}
                      aria-pressed={active}
                      className={cn(
                        "relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                        active
                          ? "border-signal-500/40 text-white"
                          : "border-white/10 text-steel-400 hover:border-white/25 hover:text-white",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="product-filter"
                          className="absolute inset-0 rounded-full bg-signal-600"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* grid */}
          <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard intensity={5} className="h-full [perspective:1200px]">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/70 transition-colors duration-500 hover:border-brand-300/25">
                      <button
                        type="button"
                        onClick={() =>
                          setViewer({
                            items: p.gallery.map((src) => ({ src, caption: p.title })),
                            index: 0,
                            label: p.title,
                          })
                        }
                        className="relative aspect-[16/11] overflow-hidden"
                        aria-label={`View ${p.gallery.length} images of ${p.title}`}
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover opacity-75 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] group-hover:opacity-100"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent" />
                        <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-ink-950/85 px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-brand-200 backdrop-blur-md">
                          {CATEGORY_LABEL[p.category]}
                        </span>
                        <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/80 px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors duration-500 group-hover:border-signal-500/50 group-hover:bg-signal-600">
                          <Images className="h-3.5 w-3.5" strokeWidth={1.8} />
                          {p.gallery.length}
                        </span>
                      </button>

                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-white">
                          {p.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-500">{p.summary}</p>

                        <dl className="mt-6 grid gap-2 border-t border-white/[0.07] pt-5">
                          {p.specs.map((s) => (
                            <div key={s.label} className="flex items-baseline justify-between gap-4">
                              <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-steel-600">
                                {s.label}
                              </dt>
                              <dd className="text-right font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brand-200">
                                {s.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </article>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal delay={0.1}>
            <p className="mt-10 text-center font-mono text-[0.625rem] uppercase tracking-[0.18em] text-steel-600">
              {totalImages} production photographs across {products.length} component families
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= applications ================= */}
      <section className="relative overflow-hidden bg-white text-steel-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow tone="light">Key applications</Eyebrow>
              </Reveal>
              <RevealWords
                as="h2"
                text="Where our parts end up."
                className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-ink"
              />
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-steel-600">
                  Programs span BS6 powertrain components, fuel injection systems, emission control,
                  sensors, braking and next-generation EV drivetrains.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8">
                  <Button href="/contact" variant="light" size="md">
                    Request a sample
                  </Button>
                </div>
              </Reveal>
            </div>

            <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-steel-900/10 bg-steel-900/10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {applications.map((a, i) => (
                <StaggerItem key={a.title}>
                  <div className="group relative h-full overflow-hidden bg-white p-6 transition-colors duration-500 hover:bg-steel-50">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-600 to-brand-600 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-steel-900">
                      {a.title}
                    </h3>
                    <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-steel-600">{a.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <Viewer
        items={viewer?.items ?? []}
        index={viewer ? viewer.index : null}
        label={viewer?.label}
        onClose={() => setViewer(null)}
        onStep={step}
      />
    </>
  );
}
