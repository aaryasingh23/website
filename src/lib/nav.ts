export type NavChild = {
  href: string;
  label: string;
  desc: string;
  meta: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  /** feature panel shown alongside the dropdown */
  feature?: { image: string; eyebrow: string; title: string; href: string };
};

export const navItems: NavItem[] = [
  {
    label: "Capabilities",
    children: [
      {
        href: "/manufacturing",
        label: "Manufacturing",
        desc: "203 presses, 25 CNC centres, 40+ weld stations",
        meta: "5T – 630T",
      },
      {
        href: "/development",
        label: "Design & Development",
        desc: "In-house tool rooms, DFM, prototyping, localization",
        meta: "50,000 SQ FT",
      },
      {
        href: "/quality",
        label: "Quality & Labs",
        desc: "Sanber Labs, NABL-accredited, CMM & metallurgy",
        meta: "IATF 16949",
      },
    ],
    feature: {
      image: "/images/factory/2026/cnc-swiss-lathe.jpg",
      eyebrow: "Precision floor",
      title: "Citizen Swiss-type sliding head — ±0.005 mm",
      href: "/manufacturing",
    },
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Innovation",
    children: [
      {
        href: "/digital",
        label: "Digital & Sustainability",
        desc: "Cadence platform, zero-paper ops, 120 kVA solar",
        meta: "INDUSTRY 4.0",
      },
      {
        href: "/awards",
        label: "Awards & Recognition",
        desc: "BorgWarner, Marelli, Aisin, MACE, Hyundai SQ",
        meta: "9 AWARDS",
      },
    ],
    feature: {
      image: "/images/factory/2026/aerial-solar-rooftop.jpg",
      eyebrow: "Cadence",
      title: "300+ machines tracked live across three units",
      href: "/digital",
    },
  },
  {
    label: "Company",
    children: [
      {
        href: "/careers",
        label: "Careers",
        desc: "Training-first culture, apprentice-to-engineer paths",
        meta: "700+ PEOPLE",
      },
      {
        href: "/faq",
        label: "Buyer FAQ",
        desc: "Answers for sourcing managers evaluating suppliers",
        meta: "15 ANSWERS",
      },
    ],
    feature: {
      image: "/images/culture/2026/careers-garden-1.jpg",
      eyebrow: "Faridabad",
      title: "A campus, not just a factory",
      href: "/careers",
    },
  },
];

export const footerNav: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Capabilities",
    links: [
      { href: "/manufacturing", label: "Manufacturing" },
      { href: "/development", label: "Design & Development" },
      { href: "/quality", label: "Quality & Labs" },
      { href: "/products", label: "Product Portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/digital", label: "Digital & Sustainability" },
      { href: "/awards", label: "Awards & Recognition" },
      { href: "/careers", label: "Careers" },
      { href: "/faq", label: "Buyer FAQ" },
    ],
  },
];
