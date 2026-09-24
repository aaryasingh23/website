"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { company, contact, certBadges, locations } from "@/lib/content";
import { footerNav } from "@/lib/nav";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const reduce = useReducedMotion();
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950">
      {/* ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-blueprint opacity-30" />
        <div className="absolute -bottom-[30%] left-1/2 h-[46vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.16),transparent_65%)] blur-[80px]" />
        <div className="absolute -bottom-[24%] right-[8%] h-[30vmax] w-[30vmax] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.13),transparent_65%)] blur-[70px]" />
      </div>

      {/* ---------- CTA band ---------- */}
      <div className="container-x relative border-b border-white/[0.07] py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow text-signal-400">Start a program</span>
            <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.02] text-gradient-steel">
              Send us a drawing.
              <br />
              We&apos;ll send back a plan.
            </h2>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-steel-400">
              Share part drawings, annual volumes and your target SOP date. We typically respond
              within one business day — from concept through full PPAP.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Get in touch
            </Button>
            <Button href={contact.whatsapp} external variant="secondary" size="lg" arrow={false}>
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- link grid ---------- */}
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel-500">{company.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {certBadges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-brand-300/15 bg-brand-500/[0.06] px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand-200"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {footerNav.map((group) => (
          <div key={group.title} className="md:col-span-2">
            <h3 className="eyebrow text-steel-600">{group.title}</h3>
            <ul className="mt-5 grid gap-3">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-sm text-steel-400 transition-colors duration-300 hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-4">
          <h3 className="eyebrow text-steel-600">Contact</h3>
          <ul className="mt-5 grid gap-4 text-sm">
            <li className="flex items-start gap-3 text-steel-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" strokeWidth={1.8} />
              <span>
                {locations[0].lines[0]}
                <br />
                {locations[0].lines[1]}, {locations[0].lines[2]}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-signal-500" strokeWidth={1.8} />
              <span className="flex flex-wrap gap-x-3 text-steel-400">
                <a href={`tel:${contact.phone}`} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
                <span className="text-steel-700">·</span>
                <a
                  href={`tel:${contact.mobile.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.mobile}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-signal-500" strokeWidth={1.8} />
              <a
                href={`mailto:${contact.email}`}
                className="text-steel-400 transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </li>
          </ul>

          <p className="mt-6 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-steel-600">
            {contact.hours}
          </p>
        </div>
      </div>

      {/* ---------- oversized wordmark ---------- */}
      <div aria-hidden className="container-x relative overflow-hidden pb-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="select-none bg-gradient-to-b from-white/[0.09] to-white/[0.01] bg-clip-text text-center font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.8] tracking-[-0.05em] text-transparent"
        >
          AAMPL
        </motion.p>
      </div>

      {/* ---------- baseline ---------- */}
      <div className="container-x relative flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-7 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-600">
          © {year} {company.legalName} All rights reserved.
        </p>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-600">
          Faridabad · Haryana · India
        </p>
      </div>
    </footer>
  );
}
