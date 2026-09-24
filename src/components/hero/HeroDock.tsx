"use client";

import Link from "next/link";

/* ---------------------------------------------------------------------------
   The floating dock.

   Sylva's nav is a centred capsule of pills that magnify as the pointer nears
   them, over a rim highlight that points back at the cursor. The springs live
   in useHeroMotion; this file is only the markup and the routes.

   The site's full navigation is grouped into four dropdown columns in Navbar.
   A dock cannot hold that — magnification and a dropdown fight each other for
   the same downward space. So the dock carries the five destinations a first
   visit actually needs, and the full nav takes over from the second section
   down, where the dock scrolls away.
   --------------------------------------------------------------------------- */

type Item = {
  href: string;
  label: string;
  /** entrance delay, matching the reference's tile-by-tile drop */
  delay: number;
  glyph: React.ReactNode;
  variant?: "enter";
};

const ITEMS: Item[] = [
  {
    href: "/manufacturing",
    label: "Manufacturing",
    delay: 180,
    glyph: (
      <svg viewBox="0 0 16 16">
        <path d="M2 13.4V7.2l3.5 2.2V7.2L9 9.4V4.8l4.9 2.6v6z" />
        <path d="M2 13.4h12" />
      </svg>
    ),
  },
  {
    href: "/products",
    label: "Products",
    delay: 230,
    glyph: (
      <svg viewBox="0 0 16 16">
        <path d="M8 2.2 13.4 5v6L8 13.8 2.6 11V5z" />
        <path d="M2.6 5 8 7.8 13.4 5M8 7.8v6" />
      </svg>
    ),
  },
  {
    href: "/quality",
    label: "Quality",
    delay: 280,
    glyph: (
      <svg viewBox="0 0 16 16">
        <path d="M8 1.9 13 4v4.1c0 3-2.1 5.1-5 6-2.9-.9-5-3-5-6V4z" />
        <path d="m5.8 7.9 1.6 1.6 3-3.2" />
      </svg>
    ),
  },
  {
    href: "/development",
    label: "Development",
    delay: 320,
    glyph: (
      <svg viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="2.1" />
        <path d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "Enquire",
    delay: 370,
    variant: "enter",
    glyph: (
      <svg viewBox="0 0 16 16">
        <path d="M6.6 2.5h5.1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6.6" />
        <path d="M2.6 8h6.6" />
        <path d="m7 5.6 2.4 2.4L7 10.4" />
      </svg>
    ),
  },
];

export function HeroDock() {
  return (
    <div className="dock-wrap">
      <nav className="dock" style={{ ["--pd" as string]: 5 }} data-spec aria-label="Primary">
        <Link
          className="dock-item dock-mark"
          data-dock
          data-spec
          href="/"
          style={{ ["--d" as string]: "120ms" }}
          aria-label="AAMPL — home"
        >
          {/* the mark: a stamped A, drawn as the press would leave it */}
          <svg viewBox="0 0 22 22" aria-hidden="true">
            <path d="M11 1.6 20.4 20.4h-5.1L11 11.2 6.7 20.4H1.6z" />
          </svg>
        </Link>

        {ITEMS.map((it) => (
          <Link
            key={it.href}
            className={`dock-item${it.variant === "enter" ? " dock-item--enter" : ""}`}
            data-dock
            data-spec
            href={it.href}
            style={{ ["--d" as string]: `${it.delay}ms` }}
          >
            <span className="glyph" aria-hidden="true">
              {it.glyph}
            </span>
            <span>{it.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
