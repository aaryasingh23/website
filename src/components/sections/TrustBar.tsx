"use client";

import Image from "next/image";
import { customers } from "@/lib/content";
import { Marquee } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Light band directly beneath the hero. Logos arrive in a dozen
 * different formats and backgrounds, so a white surface is the only
 * treatment that renders all of them honestly.
 */
export function TrustBar() {
  return (
    <section id="trust" className="relative overflow-hidden bg-white py-12 md:py-14">
      {/* soften the transition out of the dark hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-steel-100 to-transparent"
      />

      <div className="container-x relative">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-px w-16 bg-steel-900/12 sm:block" />
            <p className="text-center font-mono text-[0.625rem] uppercase tracking-[0.26em] text-steel-500">
              Supplying global OEMs &amp; Tier-1 system integrators
            </p>
            <span className="hidden h-px w-16 bg-steel-900/12 sm:block" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <Marquee speed={54}>
          {customers.map((c) => (
            <div key={c.name} className="mx-8 flex shrink-0 items-center justify-center md:mx-12">
              <Image
                src={c.logo}
                alt={c.name}
                width={168}
                height={48}
                sizes="168px"
                className="h-8 w-auto max-w-[160px] object-contain opacity-70 saturate-[0.85] transition-all duration-500 hover:opacity-100 hover:saturate-100 md:h-10"
              />
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
