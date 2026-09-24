# AAMPL — Advanced Anmol Metcomp Pvt. Ltd.

A ground-up rebuild of the AAMPL website: a premium, interactive marketing site for a Tier-1
automotive supplier of precision sheet-metal and machined components.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`) |
| Motion | `motion` (Framer Motion v12) |
| 3D | React Three Fiber + drei + three |
| Scroll | Lenis inertial scrolling |
| Icons | lucide-react |

Every route is statically prerendered. Three.js is lazy-loaded and never enters the shared bundle.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Design system

Defined once in `src/app/globals.css` under `@theme`, consumed as Tailwind utilities everywhere.

- **`ink-*`** — the dark canvas. Blue-black, never neutral grey.
- **`brand-*`** — brand blue. Structure, trust, links, data.
- **`signal-*`** — signal red. Energy, precision marks, active state, CTAs.
- **`steel-*`** — machined greys, and the structure of the light sections.

Type: **Sora** (display) · **Inter** (body) · **JetBrains Mono** (spec readouts, eyebrows, data
labels). The mono is what gives the site its instrument feel — use it for anything that reads as a
measurement.

Pages alternate dark and light sections deliberately. Dark carries the cinematic and 3D moments;
light carries dense, readable content (spec tables, products, FAQ).

Custom utilities worth knowing: `container-x`, `section-y`, `text-gradient-steel` /
`text-gradient-ink` / `text-gradient-brand`, `bg-blueprint` / `bg-blueprint-light`, `glass`,
`eyebrow`, `mask-edges`.

## Structure

```
src/
  app/                  one directory per route, each a thin shell:
                        metadata + <PageHero> + a body component
  components/
    layout/             Navbar (mega menu), Footer, PageHero,
                        SmoothScroll, PageTransition, Logo
    sections/           one file per page section — Hero, Stats, About,
                        Capabilities, Localization, PlantTour, …Body files
    three/              PrecisionPartScene (R3F canvas) + geometry.ts
    ui/                 Reveal/Stagger, Button, Primitives (Counter,
                        TiltCard, Marquee, Parallax…), Lightbox, StepFlow
  lib/
    content.ts          ← all business copy and data lives here
    nav.ts              navigation + mega-menu structure
    utils.ts            cn() and easing constants
public/images/          ~145 real AAMPL factory and product photographs
```

**To change copy, edit `src/lib/content.ts`.** Components read from it; nothing is hard-coded in
markup except section headings.

## The 3D hero

`src/components/three/geometry.ts` builds three real AAMPL part archetypes procedurally with
`THREE.Shape` extrusions and a lathe profile — a stamped structural bracket, an EV busbar assembly
and a deep-drawn ECU housing. No model files, no CDN assets.

Lighting is a virtual studio of `<Lightformer>`s inside drei's `<Environment>`: a broad white key
plus two narrow softbox streaks give the specular bands that read as machined metal, and a red rim
left / blue rim right carry the brand identity onto the part edges.

Performance guards, all in place:

- The canvas mounts on `requestIdleCallback`, never on the critical path.
- `frameloop` flips to `"never"` the moment the hero leaves the viewport.
- Coarse-pointer and sub-768px devices get `lite` mode — no shadows, DPR capped at 1.25.
- Below `lg` the canvas is a band of its own beneath the copy rather than an overlay behind it.
- `prefers-reduced-motion` disables the spin, float and scan sweep throughout.

## Accessibility

Skip link, visible focus rings, `aria-expanded` on all disclosures, keyboard-navigable lightbox
(← → Esc), and a full reduced-motion path — every `Reveal`, `Counter`, `TiltCard` and page
transition checks `useReducedMotion()` and renders statically.

## SEO

Per-route `metadata`, Organization JSON-LD in the root layout, FAQPage JSON-LD on `/faq`, plus
`sitemap.ts` and `robots.ts` metadata routes. Set the canonical origin in
`company.domain` (`src/lib/content.ts`) — `metadataBase` derives from it.
