"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxItem = { src: string; caption?: string };

/* ============================================================
   Viewer — full-screen image reader. Controlled.
   ============================================================ */

export function Viewer({
  items,
  index,
  onClose,
  onStep,
  label,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
  label?: string;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onStep]);

  return (
    <AnimatePresence>
      {index !== null && items[index] && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink-950/96 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={label ?? "Image viewer"}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/12"
          >
            <X className="h-5 w-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/12 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/12 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <motion.figure
            key={items[index].src}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex max-h-[88vh] w-[92vw] max-w-5xl flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
              <Image
                src={items[index].src}
                alt={items[index].caption ?? ""}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-steel-500">
              <span className="truncate text-steel-300">{items[index].caption ?? label}</span>
              <span className="shrink-0">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Gallery — grid that opens the viewer
   ============================================================ */

export function Gallery({
  items,
  className,
  tileClassName,
  priorityCount = 0,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: {
  items: LightboxItem[];
  className?: string;
  tileClassName?: string;
  priorityCount?: number;
  sizes?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + items.length) % items.length)),
    [items.length],
  );

  return (
    <>
      <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-4", className)}>
        {items.map((it, i) => (
          <motion.button
            key={it.src + i}
            type="button"
            onClick={() => setOpen(i)}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: (i % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900",
              tileClassName,
            )}
            aria-label={it.caption ? `View ${it.caption}` : "View image"}
          >
            <Image
              src={it.src}
              alt={it.caption ?? ""}
              fill
              priority={i < priorityCount}
              sizes={sizes}
              className="object-cover opacity-80 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {it.caption && (
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {it.caption}
              </span>
            )}
            <span className="absolute right-3 top-3 h-6 w-6 rounded-full border border-white/25 bg-ink-950/50 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
              <span className="absolute left-1/2 top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-white" />
              <span className="absolute left-1/2 top-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-white" />
            </span>
          </motion.button>
        ))}
      </div>

      <Viewer items={items} index={open} onClose={close} onStep={step} />
    </>
  );
}
