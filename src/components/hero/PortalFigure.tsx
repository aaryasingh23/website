"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Plate transmission — the card photographs resolve like an inspection scan.

   Ported from the SylvaHero reference. The photograph is sampled into a tiny
   grid and those colours are carried along the stepped clip edge as dots, so
   the image appears to be read off the plate rather than faded in. The canvas
   exists for this one entrance only; after the reveal it stops painting and
   the live <Image> takes over.

   The dot front, the white scan and the CSS clip all have to sit on the same
   line, which means reproducing the CSS progression exactly rather than
   approximating it: floor(t * STEPS) / STEPS, linear. An eased curve here puts
   the dots a third of a plate ahead of the edge they are meant to gather on.
   --------------------------------------------------------------------------- */

const CUT_STEPS = 12;
const CUT_MS = 1450;

type Props = {
  src: string;
  alt: string;
  /** ms after mount that the scan begins — matches the CSS animation delay */
  delay: number;
  priority?: boolean;
  sizes: string;
};

export function PortalFigure({ src, alt, delay, priority, sizes }: Props) {
  const figRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fig = figRef.current;
    if (!fig) return;
    const img = fig.querySelector("img");
    const canvasEl = fig.querySelector<HTMLCanvasElement>(".pixel-reveal");
    const media = fig.querySelector<HTMLElement>(".portal-media");
    if (!img || !canvasEl || !media) return;

    let raf = 0;
    let timer = 0;
    let cancelled = false;

    const launch = () => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        const box = canvasEl.getBoundingClientRect();
        if (!box.width || !box.height) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasEl.width = Math.max(1, Math.round(box.width * dpr));
        canvasEl.height = Math.max(1, Math.round(box.height * dpr));
        const ctx = canvasEl.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cols = 52;
        const rows = Math.max(18, Math.round((cols * box.height) / box.width));

        const sample = document.createElement("canvas");
        sample.width = cols;
        sample.height = rows;
        const sg = sample.getContext("2d", { willReadFrequently: true });
        let rgba: Uint8ClampedArray | null = null;
        try {
          sg?.drawImage(img, 0, 0, cols, rows);
          rgba = sg?.getImageData(0, 0, cols, rows).data ?? null;
        } catch {
          /* A cross-origin or not-yet-decoded source makes the pixels
             unreadable; the reveal still runs in the page's own pale steel. */
        }

        /* Layout offsets, not bounding rects — .portal-media carries a live
           transform and its rect would drift with the pointer. */
        const over = -media.offsetLeft;
        const span = media.offsetWidth;
        const reach = box.width;

        canvasEl.style.opacity = "1";
        const startedAt = performance.now();

        const paint = (now: number) => {
          if (cancelled) return;
          const t = Math.min(1, (now - startedAt) / CUT_MS);
          const stepped = Math.floor(t * CUT_STEPS) / CUT_STEPS;
          const front = (stepped * span - over) / reach;
          const tailFade = t < 0.88 ? 1 : (1 - t) / 0.12;
          ctx.clearRect(0, 0, box.width, box.height);

          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
              const an = (x + 0.5) / cols;
              const delta = an - front;
              /* Symmetric about the front: an asymmetric band puts the
                 pattern's centre of mass ahead of the edge it belongs to. */
              if (delta < -0.16 || delta > 0.16) continue;

              const band = 1 - Math.abs(delta) / 0.16;
              const pulse = 0.68 + 0.32 * Math.sin(x * 2.71 + y * 1.93 + t * 26);
              const alpha = Math.max(0, band * pulse * tailFade);
              if (alpha < 0.08) continue;

              /* Fallback tint is the page's pale steel rather than Sylva's
                 moss, so a failed sample still reads as this palette. */
              let r = 204;
              let g = 222;
              let b = 255;
              if (rgba) {
                const q = (y * cols + x) * 4;
                r = Math.min(255, rgba[q] * 1.18 + 20);
                g = Math.min(255, rgba[q + 1] * 1.18 + 24);
                b = Math.min(255, rgba[q + 2] * 1.12 + 14);
              }

              let px = ((x + 0.5) * box.width) / cols;
              let py = ((y + 0.5) * box.height) / rows;
              const jitter = (1 - band) * 5;
              px += Math.sin(y * 3.17 + x) * jitter;
              py += Math.cos(x * 2.41 - y) * jitter;
              const radius = (0.55 + band * 1.25) * Math.max(0.75, reach / 300);

              ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha * 0.92})`;
              ctx.beginPath();
              ctx.arc(px, py, radius, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          if (t < 1) raf = requestAnimationFrame(paint);
          else {
            ctx.clearRect(0, 0, box.width, box.height);
            canvasEl.style.opacity = "0";
          }
        };
        raf = requestAnimationFrame(paint);
      }, delay);
    };

    if (img.complete && img.naturalWidth) launch();
    else img.addEventListener("load", launch, { once: true });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      img.removeEventListener("load", launch);
    };
  }, [delay]);

  return (
    <figure ref={figRef} className="portal">
      <span className="portal-media">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} />
      </span>
      <canvas className="pixel-reveal" aria-hidden="true" />
    </figure>
  );
}
