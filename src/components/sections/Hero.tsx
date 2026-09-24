"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroDock } from "@/components/hero/HeroDock";
import { LiquidButton } from "@/components/hero/LiquidButton";
import { PortalFigure } from "@/components/hero/PortalFigure";
import { useHeroMotion } from "@/components/hero/useHeroMotion";

/* ===========================================================================
   Hero — adapted from the ThreeUI SylvaHero reference.

   The reference's system, kept whole: one 1600 x 880 stage, every dimension in
   --u so the composition scales rather than reflows; a WebGL scene layered
   between the back card and everything else; a magnifying dock; clip-path
   entrances; pointer parallax with a declared depth per layer.

   The dressing is this company's. Sylva sells stewardship of wild places, so
   its centrepiece is a moss root and its palette is green. AAMPL stamps and
   machines steel to five microns, so the centrepiece is a formed rail and the
   palette is the ink / brand / signal set the rest of the site already runs on.
   =========================================================================== */

/* The scene is heavy and strictly decorative — it must never block first paint
   and it must never ship to a visitor who scrolls straight past. */
const FormedSteelScene = dynamic(() => import("@/components/hero/FormedSteelScene"), {
  ssr: false,
  loading: () => null,
});

/* Which layers ride the pointer parallax. The ghost wordmark and the column
   guides sit this out on purpose: they are the furthest plane, their travel
   would be a couple of pixels, and promoting two near-full-stage boxes to
   composited layers costs more frames than the effect is worth. */
const PARALLAX =
  ".dock,.hero-eyebrow,.hero-headline,.hero-lede,.pill,.play-wrap,.play-label," +
  ".hero-stat--a,.hero-stat--b,.hero-card--about,.knob-float,.hero-card--note,.hero-scroll";

const designWidth = () => (window.matchMedia("(max-width: 900px)").matches ? 760 : 1600);

export function Hero() {
  const shellRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [mountScene, setMountScene] = useState(false);

  useHeroMotion({ shellRef, stageRef, parallaxSelector: PARALLAX, designWidth });

  /* Two things have to happen for the entrance to run correctly.

     `js` goes on synchronously via className so the masks are closed before the
     first paint — set in an effect it lands a frame late and the whole
     composition flashes in unmasked.

     `is-ready` opens them. The scene adds it as soon as it has laid out, but
     the hero cannot wait on WebGL that may never arrive, so a timer opens the
     masks regardless. Whichever fires first wins; the class is idempotent. */
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const open = window.setTimeout(() => shell.classList.add("is-ready"), 90);
    /* Once every entrance has finished, drop the clips entirely — a live
       clip-path opens a stacking context on the capability card and would trap
       its knob under the scene. */
    const done = window.setTimeout(() => shell.classList.add("intro-done"), 3200);

    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setMountScene(true), { timeout: 1200 })
      : window.setTimeout(() => setMountScene(true), 300);

    return () => {
      clearTimeout(open);
      clearTimeout(done);
      if (window.cancelIdleCallback && typeof id === "number") window.cancelIdleCallback(id);
    };
  }, []);

  const toPlantTour = useCallback(() => {
    document.getElementById("plant-tour")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toCapabilities = useCallback(() => {
    window.location.href = "/manufacturing";
  }, []);

  return (
    <div className="hero-scope js">
      <section ref={shellRef} className="hero-shell" id="hero">
        {mountScene && <FormedSteelScene />}

        <HeroDock />

        <div className="hero-stage" ref={stageRef} id="hero-stage">
          <div className="hero-guides fade" style={{ ["--d" as string]: "900ms" }} aria-hidden="true">
            <i style={{ left: "calc(405 * var(--u))" }} />
            <i style={{ left: "calc(748 * var(--u))" }} />
            <i style={{ left: "calc(1091 * var(--u))" }} />
          </div>

          <div className="hero-ghost fade" style={{ ["--d" as string]: "1150ms" }} aria-hidden="true">
            ANMOL
          </div>

          {/* This card sits *behind* the canvas, so the rail passes over its
              shoulder. It keeps z-index:auto for exactly that reason. */}
          <Link
            href="/quality"
            className="hero-card hero-card--about mask"
            style={{ ["--d" as string]: "760ms", ["--pd" as string]: 10, ["--pr" as string]: 2.2 }}
          >
            <PortalFigure
              src="/images/factory/2026/cnc-swiss-lathe.jpg"
              alt="A Citizen Swiss-type sliding-head lathe cutting a component on the shop floor"
              delay={920}
              priority
              sizes="(max-width: 900px) 30vw, 21vw"
            />
            <p className="label">Our standard</p>
            <h2>Measure everything.</h2>
          </Link>

          {/* The knob rides *outside* the card: the card has to stay a plain
              painted box under the canvas, so anything that must sit in front
              of the rail lives here instead, sharing the card's parallax origin
              so it stays glued to the corner it belongs to. */}
          <span className="knob-float" style={{ ["--pd" as string]: 10, ["--pr" as string]: 2.2 }}>
            <Link
              href="/quality"
              className="knob knob--about mask-circle"
              style={{ ["--d" as string]: "1100ms" }}
              aria-label="Quality, labs and metrology"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </span>

          <p className="hero-eyebrow mask" style={{ ["--d" as string]: "200ms", ["--pd" as string]: 16 }}>
            <span className="dot" aria-hidden="true" />
            Tier-1 automotive
            <span className="sep" aria-hidden="true" />
            Faridabad, India
            <span className="sep" aria-hidden="true" />
            Est. 1996
          </p>

          <h1 className="hero-headline" style={{ ["--pd" as string]: 18, ["--pr" as string]: 1.2 }}>
            <span>
              <i style={{ ["--d" as string]: "260ms" }}>Steel, formed</i>
            </span>
            <span>
              <i style={{ ["--d" as string]: "360ms" }}>
                to <em>five microns.</em>
              </i>
            </span>
          </h1>

          <p
            className="hero-lede mask"
            style={{ ["--d" as string]: "480ms", ["--pd" as string]: 14, ["--pr" as string]: 1 }}
          >
            Precision components for the world&apos;s automotive OEMs — five million a month,
            across three units in Faridabad.
          </p>

          <div className="pill-clip">
            <div
              className="pill mask"
              style={{ ["--d" as string]: "600ms", ["--pd" as string]: 15, ["--pr" as string]: 1.4 }}
            >
              <LiquidButton
                variant="explore"
                label="Explore capabilities"
                onActivate={toCapabilities}
                icon={
                  <svg className="ico" viewBox="0 0 115 115" aria-hidden="true">
                    <g stroke="currentColor" strokeWidth="11" strokeLinecap="round">
                      <path d="M14 34.5 H101" />
                      <path d="M14 57.5 H101" />
                      <path d="M14 80.5 H68" />
                    </g>
                  </svg>
                }
              />
            </div>
          </div>

          <span className="play-wrap" style={{ ["--pd" as string]: 20 }}>
            <span className="play-clip">
              <span className="play-glass mask-circle" style={{ ["--d" as string]: "900ms" }}>
                <LiquidButton
                  variant="play"
                  label="Watch the plant tour"
                  ariaLabel="Watch the plant tour"
                  onActivate={toPlantTour}
                  icon={
                    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5.2v13.6L19 12z" fill="currentColor" />
                    </svg>
                  }
                />
              </span>
            </span>
            <span className="play-ring mask-circle" style={{ ["--d" as string]: "840ms" }} aria-hidden="true" />
          </span>
          <p className="play-label fade" style={{ ["--d" as string]: "1200ms", ["--pd" as string]: 20 }}>
            Watch the plant tour
          </p>

          <dl className="hero-stat hero-stat--a mask" style={{ ["--d" as string]: "700ms", ["--pd" as string]: 12 }}>
            <span className="mark" aria-hidden="true">
              <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="15" cy="15" r="10.5" strokeDasharray="0.6 3.6" />
                <circle cx="15" cy="15" r="5.6" strokeDasharray="0.6 3.2" />
                <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <div>
              <dt>Parts shipped monthly</dt>
              <dd>5 million+</dd>
            </div>
          </dl>

          <dl className="hero-stat hero-stat--b mask" style={{ ["--d" as string]: "770ms", ["--pd" as string]: 13 }}>
            <span className="mark" aria-hidden="true">
              <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 23.5h21" />
                <path d="M7.5 23.5V13l5 3.4V13l5 3.4V9.5l4.5 2.9v11.1" />
              </svg>
            </span>
            <div>
              <dt>Presses on the floor</dt>
              <dd>203 · 5T–630T</dd>
            </div>
          </dl>

          <Link
            href="/manufacturing"
            className="hero-card hero-card--note mask"
            style={{ ["--d" as string]: "880ms", ["--pd" as string]: 22, ["--pr" as string]: 2.4 }}
          >
            <p className="label">On the floor</p>
            <h2>Progressive die, 630 T</h2>
            <PortalFigure
              src="/images/factory/2026/press-shop-progressive-die.jpg"
              alt="A progressive die running on the press line"
              delay={1080}
              priority
              sizes="(max-width: 900px) 40vw, 21vw"
            />
            <span className="knob" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </Link>

          <a className="hero-scroll mask" style={{ ["--d" as string]: "1040ms", ["--pd" as string]: 9 }} href="#trust">
            Explore
            <span className="track" />
          </a>
        </div>
      </section>
    </div>
  );
}
