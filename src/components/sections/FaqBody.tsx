"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { faqs } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const GROUPS = ["All", ...Array.from(new Set(faqs.map((f) => f.group)))];

export function FaqBody() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const [open, setOpen] = useState<string | null>(faqs[0].q);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const inGroup = group === "All" || f.group === group;
      if (!inGroup) return false;
      if (!q) return true;
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    });
  }, [query, group]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof faqs>();
    for (const f of results) {
      const arr = map.get(f.group) ?? [];
      arr.push(f);
      map.set(f.group, arr);
    }
    return Array.from(map.entries());
  }, [results]);

  return (
    <section className="relative overflow-hidden bg-ink-950 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[36vmax] w-[66vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.12),transparent_66%)] blur-[90px]"
      />

      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---------- controls ---------- */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>Buyer FAQ</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] text-gradient-steel">
                Answered factually, so you can compare.
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-steel-500">
                Common questions from sourcing managers, procurement teams and engineering leads
                evaluating Tier-1 sheet metal suppliers in India.
              </p>
            </Reveal>

            {/* search */}
            <Reveal delay={0.1}>
              <div className="relative mt-8">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-600"
                  strokeWidth={1.8}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions…"
                  aria-label="Search frequently asked questions"
                  className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-11 text-sm text-white placeholder:text-steel-600 transition-colors duration-300 focus:border-brand-400/50 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-steel-500 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </Reveal>

            {/* groups */}
            <Reveal delay={0.16}>
              <div className="mt-4 flex flex-wrap gap-2">
                {GROUPS.map((g) => {
                  const active = group === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGroup(g)}
                      aria-pressed={active}
                      className={cn(
                        "relative rounded-full border px-3.5 py-2 text-[0.8125rem] transition-colors duration-300",
                        active
                          ? "border-signal-500/40 text-white"
                          : "border-white/10 text-steel-400 hover:border-white/25 hover:text-white",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="faq-group"
                          className="absolute inset-0 rounded-full bg-signal-600"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10">{g}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-steel-600">
                {results.length} of {faqs.length} answers
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-8 rounded-2xl border border-brand-300/15 bg-brand-500/[0.05] p-6">
                <p className="text-sm leading-relaxed text-steel-300">
                  Question not answered here? Send us the part drawing and your volumes — we respond
                  within one business day.
                </p>
                <div className="mt-5">
                  <Button href="/contact" size="sm">
                    Ask us directly
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- answers ---------- */}
        <div className="lg:col-span-7 lg:col-start-6">
          {grouped.length === 0 && (
            <div className="rounded-3xl border border-white/[0.08] bg-ink-900/60 p-10 text-center">
              <p className="text-steel-400">
                No answers match <span className="text-white">“{query}”</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setGroup("All");
                }}
                className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-signal-400 hover:text-signal-300"
              >
                Reset filters
              </button>
            </div>
          )}

          {grouped.map(([g, items], gi) => (
            <div key={g} className={gi > 0 ? "mt-14" : ""}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-signal-500">
                  {g}
                </span>
                <span className="h-px flex-1 bg-white/[0.08]" />
                <span className="font-mono text-[0.625rem] text-steel-700">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-2">
                {items.map((f) => {
                  const isOpen = open === f.q;
                  return (
                    <li key={f.q} className="border-b border-white/[0.07]">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : f.q)}
                          aria-expanded={isOpen}
                          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                        >
                          <span
                            className={cn(
                              "text-[1.0625rem] font-medium leading-snug transition-colors duration-300",
                              isOpen ? "text-white" : "text-steel-300 group-hover:text-white",
                            )}
                          >
                            {f.q}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500",
                              isOpen
                                ? "rotate-45 border-signal-500/50 bg-signal-600 text-white"
                                : "border-white/12 text-steel-500 group-hover:border-white/30 group-hover:text-white",
                            )}
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-7 pr-12 text-[0.9375rem] leading-relaxed text-steel-400">
                              {f.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
