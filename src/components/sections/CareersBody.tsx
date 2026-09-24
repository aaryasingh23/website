"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { careerValues, careerDifferentiators, cultureGallery, contact } from "@/lib/content";
import { Eyebrow, Parallax } from "@/components/ui/Primitives";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Gallery } from "@/components/ui/Lightbox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CareersBody() {
  return (
    <>
      {/* ================= philosophy ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Our philosophy</Eyebrow>
              </Reveal>
              <RevealWords
                as="h2"
                text="We hire people we intend to grow with."
                className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel"
              />
            </div>
            <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
              <p className="text-[1.0625rem] leading-relaxed text-steel-400">
                AAMPL has been building precision automotive components since 1996 — and the people
                on our shop floor, in our tool room and in our offices are the reason we have kept
                global OEMs like Tata, Marelli, Astemo, BorgWarner and Pricol as customers for
                decades. Operators become line leaders, apprentices become engineers, engineers
                become managers. If you are visiting before an interview: this is the environment
                you would be working in.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {careerValues.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="group relative h-full overflow-hidden bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-white">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-500">{v.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= differentiators ================= */}
      <section className="relative overflow-hidden bg-white text-steel-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" />
        <div className="container-x relative">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow tone="light">What we do differently</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-ink">
                Four things you would notice in the first month.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-16 lg:gap-24">
            {careerDifferentiators.map((d, i) => (
              <div
                key={d.title}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                  <Reveal direction={i % 2 === 1 ? "left" : "right"}>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-signal-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-tight text-steel-900">
                      {d.title}
                    </h3>
                    <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-600">{d.detail}</p>
                    <ul className="mt-7 grid gap-3">
                      {d.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm text-steel-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-600" strokeWidth={2.4} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                <div className={cn("lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                  <Parallax offset={i % 2 === 1 ? 22 : -22}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-steel-900/10">
                      <Image
                        src={d.image}
                        alt={d.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= gallery ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div className="container-x relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow>Inside the facility</Eyebrow>
              <h2 className="mt-5 max-w-xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
                The best way to understand a workplace is to see it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-500">
                The garden, the buildings, the tool room, the canteen and the training spaces our
                team spends its day in.
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <Gallery items={cultureGallery} />
          </div>
        </div>
      </section>

      {/* ================= apply ================= */}
      <section className="relative overflow-hidden border-t border-white/[0.07] bg-ink-900 py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[36vmax] w-[64vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.12),transparent_66%)] blur-[80px]"
        />
        <div className="container-x relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Join us</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
                Interested in joining AAMPL?
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-steel-400">
                We hire across the shop floor, tool room, quality, engineering, R&amp;D and back-office
                functions. Send your CV to our HR team and we will get back to you. Walk-ins and
                apprentice enquiries are welcome during business hours.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button
                  href={`mailto:${contact.email}?subject=Careers%20Enquiry%20%E2%80%94%20CV%20Submission`}
                  external
                  size="lg"
                >
                  Email your CV
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact &amp; location
                </Button>
              </div>
              <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-steel-600">
                {contact.hours}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
