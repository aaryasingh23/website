"use client";

import { useEffect } from "react";

/* ---------------------------------------------------------------------------
   One rAF for the whole hero.

   Ported from the SylvaHero reference, which runs the pointer parallax, the
   dock magnification and the specular rim off a single loop rather than three.
   That is not tidiness for its own sake: all three read layout, and splitting
   them across separate loops means three forced synchronous layouts a frame
   instead of one batch.

   The other rule carried over: every layout read happens inside the frame,
   never in the pointer handler. Dock items resize as they grow, so their rects
   have to be re-read — doing that per pointermove forces a reflow several times
   a frame. The handlers only record where the pointer is.
   --------------------------------------------------------------------------- */

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

type DockItem = { el: HTMLElement; w: number; h: number; v: number; vel: number; target: number };
type SpecItem = { el: HTMLElement; ang: number; tAng: number; br: number; tBr: number; focused: boolean; reach: number };

export type HeroMotionOptions = {
  /** the hero shell — --px / --py are published here once a frame */
  shellRef: React.RefObject<HTMLElement | null>;
  /** the 1600x880 stage, used to derive the design unit for spring distances */
  stageRef: React.RefObject<HTMLElement | null>;
  /** selector list of layers that ride the parallax */
  parallaxSelector: string;
  /** stage width in design units at the current breakpoint */
  designWidth: () => number;
};

export function useHeroMotion({ shellRef, stageRef, parallaxSelector, designWidth }: HeroMotionOptions) {
  useEffect(() => {
    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!shell || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineHover = () =>
      !reduced && window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    /* ── shared pointer state ─────────────────────────────────────────── */
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let lastX: number | null = null;
    let lastY: number | null = null;

    let aimX = 0;
    let aimY = 0;
    let aimSeen = false;
    let aimMoved = false;

    const DOCK = {
      root: null as HTMLElement | null,
      items: [] as DockItem[],
      on: false,
      live: false,
      key: false,
      dirty: false,
      u: 1,
    };
    const SPEC = { items: [] as SpecItem[], on: false, dirty: false };

    /* ── dock ─────────────────────────────────────────────────────────── */
    const measureDock = () => {
      if (!DOCK.root) return;
      DOCK.on = fineHover();
      DOCK.u = stage.getBoundingClientRect().width / designWidth();
      for (const st of DOCK.items) {
        st.el.style.width = st.el.style.height = st.el.style.transform = "";
        st.el.dataset.near = "false";
        st.v = st.vel = st.target = 0;
      }
      /* Two passes: every item has to be reset to its natural size before any
         of them is measured, or an item still carrying a grown width from the
         previous layout poisons its neighbours' base measure. */
      for (const st of DOCK.items) {
        const r = st.el.getBoundingClientRect();
        st.w = r.width;
        st.h = r.height;
      }
      DOCK.live = false;
      DOCK.dirty = true;
      aimMoved = aimSeen;
    };

    const dockRest = () => {
      DOCK.live = false;
      DOCK.dirty = true;
      for (const st of DOCK.items) {
        st.target = 0;
        st.el.dataset.near = "false";
      }
    };

    const drawDock = (dt: number) => {
      if (!DOCK.root || !DOCK.on) return;

      /* Targets are only recomputed when the pointer actually MOVES.
         Re-deriving them every frame from a stale position oscillates: the
         capsule is centred, so a growing pill shifts the whole bar sideways,
         which slides a different pill under a stationary cursor, which grows
         instead, which shifts it back.
         And whichever input moved last owns the dock, or the pointer's last
         position re-targets over keyboard focus and focus never takes. */
      if (aimSeen && aimMoved && !DOCK.key) {
        const rr = DOCK.root.getBoundingClientRect();
        /* the catch box reaches well below the bar, because that is where the
           pills grow to and the pointer has to be able to follow them */
        if (aimX > rr.left - 48 && aimX < rr.right + 48 && aimY > rr.top - 44 && aimY < rr.bottom + 104) {
          for (const st of DOCK.items) {
            const r = st.el.getBoundingClientRect();
            const prox = clamp01(1 - Math.abs(aimX - (r.left + r.width * 0.5)) / (128 * DOCK.u));
            st.target = prox * prox * (3 - 2 * prox);
            st.el.dataset.near = st.target > 0.08 ? "true" : "false";
          }
          DOCK.live = true;
          DOCK.dirty = true;
        } else if (DOCK.live) dockRest();
      }

      if (!DOCK.dirty) return;
      let moving = false;
      for (const st of DOCK.items) {
        st.vel += (st.target - st.v) * 190 * dt;
        st.vel *= Math.exp(-23 * dt);
        st.v += st.vel * dt;
        if (Math.abs(st.target - st.v) < 0.001 && Math.abs(st.vel) < 0.004) {
          st.v = st.target;
          st.vel = 0;
        } else moving = true;

        const v = Math.min(Math.max(st.v, 0), 1.08);
        const mark = st.el.classList.contains("dock-mark");
        const ew = mark ? 14 * DOCK.u : Math.min(18 * DOCK.u, st.w * 0.24);
        const eh = mark ? 14 * DOCK.u : 16 * DOCK.u;
        st.el.style.width = (st.w + ew * v).toFixed(2) + "px";
        st.el.style.height = (st.h + eh * v).toFixed(2) + "px";
        st.el.style.transform = "translateY(" + (v * 3.5 * DOCK.u).toFixed(2) + "px)";
      }
      if (!moving) DOCK.dirty = false;
    };

    /* ── specular rim ─────────────────────────────────────────────────── */
    const drawSpec = (dt: number) => {
      if (!SPEC.on) return;

      if (aimSeen && aimMoved) {
        for (const st of SPEC.items) {
          const r = st.el.getBoundingClientRect();
          const cx = r.left + r.width * 0.5;
          const cy = r.top + r.height * 0.5;
          const dx = Math.max(r.left - aimX, 0, aimX - r.right);
          const dy = Math.max(r.top - aimY, 0, aimY - r.bottom);
          const d = Math.sqrt(dx * dx + dy * dy);
          /* inside the box there is no direction to point at, so bias off the
             corner and let the offset from centre steer it */
          st.tAng =
            d === 0
              ? Math.atan2(2 / Math.max(r.height, 1), -2 / Math.max(r.width, 1)) +
                ((aimX - cx) / Math.max(r.width * 0.5, 1)) * 0.3 +
                ((cy - aimY) / Math.max(r.height * 0.5, 1)) * 0.15
              : Math.atan2(cy - aimY, aimX - cx);
          const raw = clamp01(1 - d / (st.reach * DOCK.u));
          st.tBr = Math.max(raw * raw * (3 - 2 * raw), st.focused ? 0.9 : 0);
        }
        SPEC.dirty = true;
      }

      if (!SPEC.dirty) return;
      let moving = false;
      for (const st of SPEC.items) {
        const diff = ((st.tAng - st.ang + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        st.ang += diff * (1 - Math.exp(-dt * 8));
        st.br += (st.tBr - st.br) * (1 - Math.exp(-dt * 9));
        if (Math.abs(diff) < 0.001 && Math.abs(st.tBr - st.br) < 0.002) {
          st.ang = st.tAng;
          st.br = st.tBr;
        } else moving = true;
        st.el.style.setProperty("--spec-angle", st.ang.toFixed(4) + "rad");
        st.el.style.setProperty("--spec-bright", (clamp01(st.br) * 0.92).toFixed(3));
      }
      if (!moving) SPEC.dirty = false;
    };

    /* ── wiring ───────────────────────────────────────────────────────── */
    const root = shell.querySelector<HTMLElement>(".dock");
    if (root) {
      DOCK.root = root;
      DOCK.items = Array.from(root.querySelectorAll<HTMLElement>("[data-dock]")).map((el) => ({
        el,
        w: 0,
        h: 0,
        v: 0,
        vel: 0,
        target: 0,
      }));
    }
    SPEC.items = Array.from(shell.querySelectorAll<HTMLElement>("[data-spec]")).map((el) => ({
      el,
      ang: 2.4,
      tAng: 2.4,
      br: 0,
      tBr: 0,
      focused: false,
      reach: el.classList.contains("dock") ? 250 : 185,
    }));
    SPEC.on = fineHover();

    measureDock();
    /* The labels set the pill widths, so the base measure is wrong until the
       real face has landed — Next serves Sora and JetBrains over the network. */
    if (document.fonts?.ready) document.fonts.ready.then(measureDock).catch(() => {});

    const parallaxOn = !reduced;
    if (parallaxOn) {
      for (const el of Array.from(shell.querySelectorAll(parallaxSelector))) {
        el.classList.add("par");
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      aimX = e.clientX;
      aimY = e.clientY;
      aimSeen = true;
      aimMoved = true;
      DOCK.key = false;
      DOCK.dirty = SPEC.dirty = true;

      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onPointerLeave = () => {
      aimSeen = false;
      pointer.x = pointer.y = 0;
      dockRest();
      for (const st of SPEC.items) st.tBr = st.focused ? 0.9 : 0;
      SPEC.dirty = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", measureDock);

    /* keyboard gets the same magnification, centred on the focused pill */
    const onFocusIn = (e: FocusEvent) => {
      const item = (e.target as HTMLElement)?.closest?.("[data-dock]");
      if (!item || !DOCK.on) return;
      const idx = DOCK.items.findIndex((st) => st.el === item);
      DOCK.items.forEach((st, i) => {
        st.target = i === idx ? 1 : Math.abs(i - idx) === 1 ? 0.24 : 0;
        st.el.dataset.near = st.target > 0.08 ? "true" : "false";
      });
      DOCK.live = false;
      DOCK.key = true;
      DOCK.dirty = true;
    };
    const onFocusOut = () => {
      requestAnimationFrame(() => {
        if (root && !root.contains(document.activeElement)) {
          DOCK.key = false;
          dockRest();
        }
      });
    };
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);

    const specFocus: Array<[HTMLElement, () => void, () => void]> = SPEC.items.map((st) => {
      const on = () => {
        st.focused = true;
        SPEC.dirty = true;
      };
      const off = () => {
        st.focused = false;
        SPEC.dirty = true;
      };
      st.el.addEventListener("focusin", on);
      st.el.addEventListener("focusout", off);
      return [st.el, on, off];
    });

    /* ── the loop ─────────────────────────────────────────────────────── */
    let raf = 0;
    let lastTick = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = lastTick ? Math.min((now - lastTick) / 1000, 0.05) : 0.016;
      lastTick = now;

      drawDock(dt);
      drawSpec(dt);
      aimMoved = false;

      if (parallaxOn) {
        smooth.x += (pointer.x - smooth.x) * 0.055;
        smooth.y += (pointer.y - smooth.y) * 0.055;
        /* Three decimals is finer than a pixel of travel, and rounding lets
           the writes stop entirely once the pointer settles — no style
           invalidation on an idle page. */
        const nx = Math.round(smooth.x * 1000) / 1000;
        const ny = Math.round(smooth.y * 1000) / 1000;
        if (nx !== lastX || ny !== lastY) {
          lastX = nx;
          lastY = ny;
          shell.style.setProperty("--px", String(nx));
          shell.style.setProperty("--py", String(ny));
        }
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", measureDock);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
      for (const [el, on, off] of specFocus) {
        el.removeEventListener("focusin", on);
        el.removeEventListener("focusout", off);
      }
    };
  }, [shellRef, stageRef, parallaxSelector, designWidth]);
}
