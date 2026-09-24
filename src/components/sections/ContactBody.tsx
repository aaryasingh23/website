"use client";

import { Phone, Mail, MessageCircle, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { contact, locations, whyAampl } from "@/lib/content";
import { Eyebrow, TiltCard } from "@/components/ui/Primitives";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Response within one business day",
  },
  {
    icon: Phone,
    label: "Landline",
    value: contact.phone,
    href: `tel:${contact.phone}`,
    note: "Corporate office · Faridabad",
  },
  {
    icon: MessageCircle,
    label: "Mobile / WhatsApp",
    value: contact.mobile,
    href: contact.whatsapp,
    note: "Fastest route for urgent enquiries",
    external: true,
  },
];

export function ContactBody() {
  return (
    <>
      {/* ================= channels ================= */}
      <section className="relative overflow-hidden bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[36vmax] w-[66vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.13),transparent_66%)] blur-[90px]"
        />

        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Get in touch</Eyebrow>
              </Reveal>
              <RevealWords
                as="h2"
                text="Three ways to reach us. All of them answered."
                className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel"
              />
              <Reveal delay={0.12}>
                <p className="mt-7 text-[1.0625rem] leading-relaxed text-steel-400">
                  For a new program, send part drawings, expected annual volumes, target SOP date and
                  any specific OEM requirements — PPAP level, packaging and traceability. We route it
                  to the right commercial and engineering owner the same day.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" strokeWidth={1.8} />
                  <div>
                    <p className="text-sm font-medium text-white">{contact.hours}</p>
                    <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-600">
                      {contact.hoursNote}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* leadership */}
              <Reveal delay={0.24}>
                <div className="mt-9">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-600">
                    Leadership contact
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {contact.leadership.map((p) => (
                      <li key={p.email}>
                        <a
                          href={`mailto:${p.email}`}
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-ink-900/60 px-5 py-4 transition-colors duration-500 hover:border-brand-300/25"
                        >
                          <span>
                            <span className="block text-sm font-medium text-white">{p.name}</span>
                            <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-600">
                              {p.role}
                            </span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-steel-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-400" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* channel cards */}
            <div className="lg:col-span-6 lg:col-start-7">
              <Stagger className="grid gap-4">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <StaggerItem key={c.label}>
                      <TiltCard intensity={4} className="[perspective:1200px]">
                        <a
                          href={c.href}
                          target={c.external ? "_blank" : undefined}
                          rel={c.external ? "noopener noreferrer" : undefined}
                          className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/70 p-7 transition-colors duration-500 hover:border-signal-500/30"
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                          />
                          <span className="flex items-center gap-5">
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-signal-400 transition-colors duration-500 group-hover:border-signal-500/40 group-hover:bg-signal-600 group-hover:text-white">
                              <Icon className="h-5 w-5" strokeWidth={1.7} />
                            </span>
                            <span>
                              <span className="block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-600">
                                {c.label}
                              </span>
                              <span className="mt-1.5 block font-display text-lg font-semibold tracking-tight text-white">
                                {c.value}
                              </span>
                              <span className="mt-1 block text-[0.8125rem] text-steel-500">{c.note}</span>
                            </span>
                          </span>
                          <ArrowUpRight className="h-5 w-5 shrink-0 text-steel-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-400" />
                        </a>
                      </TiltCard>
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <Reveal delay={0.2}>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href={`mailto:${contact.email}`} external size="md">
                    Send an email
                  </Button>
                  <Button href={contact.whatsapp} external variant="secondary" size="md" arrow={false}>
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= locations ================= */}
      <section className="relative overflow-hidden bg-white text-steel-900 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-50" />
        <div className="container-x relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow tone="light">Where we are</Eyebrow>
              <h2 className="mt-5 max-w-xl text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-ink">
                One corporate office, three units — all in Faridabad.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-steel-600">
                Visit during business hours to see the facility, meet the team and discuss your
                requirement face to face.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-steel-900/10 bg-steel-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((l) => (
              <StaggerItem key={l.id}>
                <div className="group relative h-full overflow-hidden bg-white p-7 transition-colors duration-500 hover:bg-steel-50">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-600 to-brand-600 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-signal-600">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                    {l.label}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-steel-900">
                    {l.name}
                  </h3>
                  <address className="mt-3 not-italic text-[0.8125rem] leading-relaxed text-steel-600">
                    {l.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  {l.note && (
                    <p className="mt-4 border-t border-steel-900/8 pt-3 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-steel-500">
                      {l.note}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= why AAMPL ================= */}
      <section className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950 section-y">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-25" />
        <div className="container-x relative">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Why AAMPL</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-gradient-steel">
                Six reasons buyers shortlist us.
              </h2>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {whyAampl.map((w, i) => (
              <StaggerItem key={w.title}>
                <div className="group relative h-full overflow-hidden bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-500 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-steel-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-500">{w.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
