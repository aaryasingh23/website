"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroSpec = { k: string; v: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  specs = [],
  crumb,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt?: string;
  specs?: HeroSpec[];
  crumb: string;
  align?: "left" | "center";
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-[var(--nav-h)]">
      {/* ---------- backdrop ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={reduce ? false : { scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.28]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/85 to-ink-950" />
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="absolute -left-[10%] top-[10%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.16),transparent_66%)] blur-[70px]" />
        <div className="absolute -right-[8%] bottom-0 h-[42vmax] w-[42vmax] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_66%)] blur-[80px]" />
      </div>

      <div className="container-x relative pb-16 pt-16 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
        {/* breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn("flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-600", align === "center" && "justify-center")}
        >
          <Link href="/" className="transition-colors hover:text-steel-300">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-signal-500">{crumb}</span>
        </motion.nav>

        <div className={cn("mt-10", align === "center" && "mx-auto max-w-3xl text-center")}>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow inline-flex items-center gap-2.5 text-brand-300/90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-signal-500 animate-[pulse-ring_2.6s_ease-out_infinite]" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-signal-500" />
            </span>
            {eyebrow}
          </motion.span>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {title.split(" ").map((w, i) => (
              <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <motion.span
                  className="inline-block text-gradient-steel"
                  initial={reduce ? false : { y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.1 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-steel-400",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </motion.p>
        </div>

        {/* ---------- spec readout ---------- */}
        {specs.length > 0 && (
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-4"
          >
            {specs.map((s) => (
              <div key={s.k} className="bg-ink-950/85 p-5 backdrop-blur-sm">
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-steel-600">
                  {s.k}
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {s.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
