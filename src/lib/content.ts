/* ============================================================
   AAMPL — canonical business content
   Sourced from aampl.in, restructured for the new site.
   ============================================================ */

export const company = {
  name: "AAMPL",
  legalName: "Advanced Anmol Metcomp Pvt. Ltd.",
  founded: 1996,
  founder: "Sanjeev Gumber",
  tagline: "Precision-Engineered Sheet Metal & Machining Components",
  descriptor: "Tier-1 automotive supplier",
  domain: "https://aampl.in",
  blurb:
    "Advanced Anmol Metcomp Pvt. Ltd. is a Tier-1 supplier of precision-engineered sheet metal and machined components to global automotive OEMs. Three units in Faridabad, 5 million+ parts a month, IATF 16949 certified since inception.",
} as const;

export const contact = {
  phone: "0129-4151766",
  phoneIntl: "+91-129-4151766",
  mobile: "+91-9999831838",
  whatsapp: "https://wa.me/919999831838",
  email: "enquiry@aampl.in",
  hours: "Monday – Saturday · 08:30 – 18:30 IST",
  hoursNote: "Closed on Sundays and national holidays",
  leadership: [
    { name: "Sanjeev Gumber", role: "Founder & Managing Director", email: "sanjeevgumber@aampl.in" },
    { name: "Anmol Gumber", role: "Director", email: "anmolgumber@aampl.in" },
  ],
} as const;

export type Location = {
  id: string;
  label: string;
  name: string;
  lines: string[];
  note?: string;
};

export const locations: Location[] = [
  {
    id: "hq",
    label: "Corporate Office",
    name: "Neelam Bata Road",
    lines: ["1A/242, Neelam Bata Road", "Faridabad – 121001", "Haryana, India"],
    note: "Commercial & administration",
  },
  {
    id: "u1",
    label: "Unit 1",
    name: "Sector 25",
    lines: ["Plot No. 160, Sector 25", "Faridabad – 121004", "Haryana, India"],
    note: "Press shop & assembly",
  },
  {
    id: "u2",
    label: "Unit 2",
    name: "SGM Nagar · Sanber Labs",
    lines: ["Plot No. 648-649, SGM Nagar", "Faridabad – 121001", "Haryana, India"],
    note: "NABL-accredited testing laboratory",
  },
  {
    id: "u3",
    label: "Unit 3",
    name: "IMT Sector 68",
    lines: ["Plot No. 79, Sector 68", "Industrial Model Town", "Faridabad – 121004", "Haryana, India"],
    note: "CNC machining & tool room",
  },
];

/* ---------------- Headline metrics ---------------- */

export type Stat = {
  value: string;
  /** numeric target for the count-up animation */
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Render `value` verbatim instead of counting up — used for the founding year. */
  literal?: boolean;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  { value: "1996", target: 1996, literal: true, label: "Founded", detail: "Three decades of precision manufacturing" },
  { value: "700+", target: 700, suffix: "+", label: "Employees", detail: "Skilled workforce across three units" },
  { value: "3", target: 3, label: "Manufacturing Units", detail: "1.5 lakh sq. ft. built-up in Faridabad" },
  { value: "132", target: 132, prefix: "₹", suffix: " Cr", label: "Revenue FY26", detail: "Sustained 19% CAGR" },
  { value: "5M+", target: 5, suffix: "M+", label: "Parts / Month", detail: "High-volume, high-precision output" },
  { value: "203", target: 203, label: "Press Machines", detail: "5T to 630T capacity range" },
];

/* ---------------- Certifications ---------------- */

export type Certification = {
  code: string;
  title: string;
  body: string;
  detail: string;
};

export const certifications: Certification[] = [
  {
    code: "IATF 16949:2016",
    title: "Automotive Quality Management",
    body: "TÜV SÜD certified",
    detail: "The baseline qualifier for any supplier shipping to a global automotive OEM.",
  },
  {
    code: "ISO 14001:2004",
    title: "Environmental Management",
    body: "Certified & audited",
    detail: "Environmental impact governed across all three manufacturing units.",
  },
  {
    code: "ISO 50001",
    title: "Energy Management",
    body: "Certified & audited",
    detail: "Energy consumption measured, targeted and reduced year on year.",
  },
  {
    code: "VDA 6.3",
    title: "Process Audit",
    body: "Aumovio (ex-Continental Automotive)",
    detail: "German automotive process audit — cleared for European OEM supply.",
  },
  {
    code: "MACE",
    title: "Maruti Suzuki Supplier Excellence",
    body: "Certified supplier",
    detail: "Recognised for meeting world-class quality and delivery standards.",
  },
  {
    code: "Hyundai SQ Mark",
    title: "Supplier Quality Certification",
    body: "Hyundai Motor Group",
    detail: "Confirms superior quality and reliability standards.",
  },
];

export const certBadges = ["IATF 16949", "ISO 14001", "ISO 50001", "VDA 6.3"] as const;

/* ---------------- Customers ---------------- */

export type Customer = { name: string; logo: string };

export const customers: Customer[] = [
  { name: "Marelli", logo: "/images/customers/marelli.png" },
  { name: "Mitsubishi Electric", logo: "/images/customers/mitsubishi-electric.png" },
  { name: "Aisin", logo: "/images/customers/aisin.png" },
  { name: "BorgWarner", logo: "/images/customers/borgwarner.png" },
  { name: "Aumovio", logo: "/images/customers/aumovio.jpg" },
  { name: "Astemo", logo: "/images/customers/astemo.jpg" },
  { name: "Tata AutoComp", logo: "/images/customers/tata-autocomp.png" },
  { name: "Pricol", logo: "/images/customers/pricol.png" },
  { name: "Hanon Systems", logo: "/images/customers/hanon.png" },
  { name: "Mikuni", logo: "/images/customers/mikuni.png" },
  { name: "Hero MotoCorp", logo: "/images/customers/hero.png" },
  { name: "FCC", logo: "/images/customers/fcc.png" },
  { name: "Lorom", logo: "/images/customers/lorom.jpg" },
];

/* ---------------- Capabilities (home cards) ---------------- */

export type Capability = {
  href: string;
  index: string;
  title: string;
  summary: string;
  points: string[];
  image: string;
};

export const capabilities: Capability[] = [
  {
    href: "/manufacturing",
    index: "01",
    title: "Manufacturing",
    summary:
      "203 presses from 5T to 630T, 25 CNC centres and 40+ welding stations across three units — built for tonnage range and sub-micron precision.",
    points: ["193 power presses · 5T–630T", "10 hydraulic presses · 10T–100T", "40+ spot, projection, MIG & TIG stations"],
    image: "/images/factory/2026/press-shop-aerial.jpg",
  },
  {
    href: "/development",
    index: "02",
    title: "Design & Development",
    summary:
      "In-house tool rooms across all three plants — 50,000+ sq ft of die-build and prototyping capacity, so tooling turnaround stays short.",
    points: ["6 Sodick CNC wire-cut machines", "Progressive die & tandem tooling", "Siemens UGNX · AutoCAD · PowerMill"],
    image: "/images/factory/2026/tool-room-build.jpg",
  },
  {
    href: "/products",
    index: "03",
    title: "Product Portfolio",
    summary:
      "4-wheeler powertrain and electronics, 2-wheeler fuel and actuation systems, and a fast-growing EV component line.",
    points: ["ECU & PCU enclosures", "Engine mounts & structural brackets", "EV busbars, trays & motor attachments"],
    image: "/images/products/2026/ecu-pcu-enclosure-01.jpg",
  },
  {
    href: "/quality",
    index: "04",
    title: "Quality & Labs",
    summary:
      "Sanber Labs — our own NABL-accredited laboratory on the factory premises. Zero third-party delays on validation.",
    points: ["Zeiss Contura G2 CMM", "Hitachi OES spectrometer", "1000 kN UTM · salt spray · climatic"],
    image: "/images/sanber/bridge-type-cmm-contura-g2-machines.jpg",
  },
  {
    href: "/digital",
    index: "05",
    title: "Digital & Sustainability",
    summary:
      "Cadence — our own AI-built production intelligence platform — runs all three units paperless with full RM-to-FG traceability.",
    points: ["300+ machines tracked live", "800+ daily operations logged", "120 kVA rooftop solar"],
    image: "/images/factory/2026/aerial-solar-rooftop.jpg",
  },
  {
    href: "/awards",
    index: "06",
    title: "Awards & Recognition",
    summary:
      "Two decades of customer recognition from Mikuni, BorgWarner, Marelli, Mitsubishi Electric, Aisin and Maruti Suzuki.",
    points: ["BorgWarner Supplier Excellence", "Marelli Supplier Quality", "MACE & Hyundai SQ Mark"],
    image: "/images/factory/2026/exterior-evening-2.jpg",
  },
];

/* ---------------- Machine inventory ---------------- */

export type Machine = { count: string; target: number; suffix?: string; name: string; detail: string };

export const machines: Machine[] = [
  { count: "193", target: 193, name: "Power Presses", detail: "5T–630T · ISGEC, SEW, Chin-Fong high-speed SPM" },
  { count: "10", target: 10, name: "Hydraulic Presses", detail: "10T–100T · Ritters" },
  { count: "10", target: 10, name: "CNC Turning Centres", detail: "Tsugami · sub-micron capability" },
  { count: "6", target: 6, name: "Vertical Machining Centres", detail: "HAAS · 3-axis VMC" },
  { count: "3", target: 3, name: "CNC Sliding Head", detail: "Citizen Japan · ±0.005 mm precision" },
  { count: "6", target: 6, name: "CNC Wire-Cut", detail: "Sodick · precision wire cutting" },
  { count: "1", target: 1, name: "EDM", detail: "Die-sinking & spark erosion" },
  { count: "40+", target: 40, suffix: "+", name: "Welding Stations", detail: "Spot · projection · MIG · TIG" },
];

/* ---------------- Localization (the differentiator) ---------------- */

export type LocalizationCase = {
  origin: string;
  flag: string;
  component: string;
  /** null where AAMPL records the saving as significant but does not publish a figure */
  leadTimePct: number | null;
  costPct: number | null;
  note?: string;
};

export const localization: LocalizationCase[] = [
  { origin: "Spain", flag: "ES", component: "Gas diffusers, baffles (35+ parts)", leadTimePct: 66, costPct: 33 },
  { origin: "Germany", flag: "DE", component: "Global brackets, baffles", leadTimePct: 33, costPct: 30 },
  { origin: "China", flag: "CN", component: "Gas boxes, baffles", leadTimePct: 66, costPct: 35 },
  { origin: "Japan", flag: "JP", component: "Gas diffusers, rings, headers (30+ parts)", leadTimePct: 66, costPct: 38 },
  { origin: "Japan", flag: "JP", component: "ECU cases, terminal lock sensors", leadTimePct: 80, costPct: 50 },
  {
    origin: "China / Switzerland",
    flag: "CH",
    component: "Motor attachments",
    leadTimePct: null,
    costPct: null,
    note: "Savings recorded as significant — figures not published",
  },
];

/* ---------------- Products ---------------- */

export type ProductCategory = "4-wheeler" | "2-wheeler" | "ev";

export type Product = {
  slug: string;
  title: string;
  category: ProductCategory;
  summary: string;
  image: string;
  gallery: string[];
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "ecu-pcu-enclosures",
    title: "ECU & PCU Enclosures",
    category: "4-wheeler",
    summary:
      "Shielded aluminium and sheet-metal enclosures, base plates and covers for engine control units, powertrain controllers and radiator-side electronics. Built to EV-grade cleanliness and sealing norms.",
    image: "/images/products/2026/ecu-pcu-enclosure-01.jpg",
    gallery: [
      "/images/products/2026/ecu-pcu-enclosure-01.jpg",
      "/images/products/2026/ecu-pcu-enclosure-02.jpg",
      "/images/products/2026/ecu-pcu-enclosure-03.jpg",
      "/images/products/2026/ecu-pcu-enclosure-04.jpg",
      "/images/products/2026/ecu-pcu-enclosure-05.jpg",
      "/images/products/2026/ecu-pcu-enclosure-06.jpg",
      "/images/products/2026/ecu-pcu-enclosure-07.jpg",
      "/images/products/2026/ecu-pcu-enclosure-08.jpg",
      "/images/products/2026/ecu-pcu-enclosure-09.jpg",
      "/images/products/2026/ecu-pcu-enclosure-10.jpg",
      "/images/products/2026/ecu-pcu-enclosure-11.jpg",
      "/images/products/2026/ecu-pcu-enclosure-12.jpg",
      "/images/products/2026/ecu-enclosure-2.jpg",
    ],
    specs: [
      { label: "Process", value: "Progressive stamping + CNC" },
      { label: "Sealing", value: "EV-grade cleanliness" },
      { label: "Materials", value: "Aluminium · CRCA" },
    ],
  },
  {
    slug: "engine-mounts-brackets",
    title: "Engine Mounts & Structural Brackets",
    category: "4-wheeler",
    summary:
      "Heavy-gauge stamped and welded mounts, chassis brackets and cross-member components — integrated isolator studs, high-strength-steel capability, and progressive-die tooling for structural and powertrain load paths.",
    image: "/images/products/2026/engine-mount-01.jpg",
    gallery: [
      "/images/products/2026/engine-mount-01.jpg",
      "/images/products/2026/engine-mount-02.jpg",
      "/images/products/2026/engine-mount-03.jpg",
      "/images/products/2026/engine-mount-04.jpg",
      "/images/products/2026/engine-mount-05.jpg",
      "/images/products/2026/engine-mount-06.jpg",
      "/images/products/2026/engine-mount-07.jpg",
      "/images/products/2026/engine-mount-08.jpg",
      "/images/products/2026/engine-mount-09.jpg",
      "/images/products/2026/engine-mount-10.jpg",
      "/images/products/2026/engine-mount-11.jpg",
      "/images/products/2026/engine-mount-12.jpg",
      "/images/products/2026/engine-mount-13.jpg",
      "/images/products/2026/engine-mount-14.jpg",
      "/images/products/2026/engine-mount-15.jpg",
      "/images/products/2026/engine-mount-16.jpg",
      "/images/products/2026/engine-mount-17.jpg",
      "/images/products/2026/heavy-bracket-1.jpg",
    ],
    specs: [
      { label: "Process", value: "Heavy-gauge stamping + welding" },
      { label: "Materials", value: "High-strength steel" },
      { label: "Tooling", value: "Progressive die" },
    ],
  },
  {
    slug: "transmission-shift-linkages",
    title: "Transmission & Shift Linkages",
    category: "4-wheeler",
    summary:
      "Multi-stage stamped and assembled linkages for gear selection and transmission actuation — precision pivot geometry for smooth shift feel and long-term reliability.",
    image: "/images/products/2026/transmission-linkage-01.jpg",
    gallery: [
      "/images/products/2026/transmission-linkage-01.jpg",
      "/images/products/2026/transmission-linkage-02.jpg",
      "/images/products/2026/transmission-linkage-03.jpg",
      "/images/products/2026/transmission-linkage-04.jpg",
      "/images/products/2026/transmission-linkage-05.jpg",
      "/images/products/2026/transmission-linkage-06.jpg",
      "/images/products/2026/transmission-linkage-07.jpg",
      "/images/products/2026/transmission-linkage-08.jpg",
      "/images/products/2026/transmission-linkage-09.jpg",
      "/images/products/2026/transmission-linkage-10.jpg",
      "/images/products/2026/transmission-linkage-11.jpg",
      "/images/products/2026/transmission-linkage-12.jpg",
      "/images/products/2026/transmission-linkage-13.jpg",
      "/images/products/2026/gear-linkage-arm.jpg",
    ],
    specs: [
      { label: "Process", value: "Multi-stage stamping + assembly" },
      { label: "Feature", value: "Precision pivot geometry" },
      { label: "Assembly", value: "Riveted sub-assemblies" },
    ],
  },
  {
    slug: "egr-thermal",
    title: "EGR Coolers & Thermal Components",
    category: "4-wheeler",
    summary:
      "Exhaust gas recirculation coolers, heat shields, thermal isolation covers and stamped housings for emission-control systems — high-temperature grade steels and precision-stamped geometries.",
    image: "/images/products/2026/egr-01.jpg",
    gallery: Array.from({ length: 21 }, (_, i) => `/images/products/2026/egr-${String(i + 1).padStart(2, "0")}.jpg`),
    specs: [
      { label: "Application", value: "Emission control · BS6" },
      { label: "Materials", value: "High-temperature grade steel" },
      { label: "Process", value: "Precision stamping" },
    ],
  },
  {
    slug: "disc-brake-parts",
    title: "Disc Brake Components",
    category: "2-wheeler",
    summary:
      "Stamped and formed disc-brake sub-components — mounting plates, retainer rings and actuation brackets. Precision-cut geometries for consistent clamping force and long service life.",
    image: "/images/products/2026/disc-brake-01.jpg",
    gallery: Array.from({ length: 5 }, (_, i) => `/images/products/2026/disc-brake-0${i + 1}.jpg`),
    specs: [
      { label: "Process", value: "Blanking + forming" },
      { label: "Feature", value: "Consistent clamping force" },
      { label: "Segment", value: "Motorcycles & scooters" },
    ],
  },
  {
    slug: "throttle-body",
    title: "Throttle Body Assemblies",
    category: "2-wheeler",
    summary:
      "Throttle-body assemblies and sub-components — stamped brackets, cable guides, IACV and choke lever assemblies. Brass inserts and precision rivets for smooth actuation and long service life.",
    image: "/images/products/2026/throttle-01.jpg",
    gallery: Array.from({ length: 15 }, (_, i) => `/images/products/2026/throttle-${String(i + 1).padStart(2, "0")}.jpg`),
    specs: [
      { label: "Process", value: "Stamping + riveted assembly" },
      { label: "Inserts", value: "Brass · precision rivets" },
      { label: "Application", value: "BS6 fuel injection" },
    ],
  },
  {
    slug: "fuel-system-brackets",
    title: "Fuel System & 2W Brackets",
    category: "2-wheeler",
    summary:
      "Fuel-level sensor housings, fuel-pump cups and retainers, motor attachment sub-parts and assorted stamped brackets for two-wheeler platforms. Assembly-ready modules for HMCL and other 2-wheeler OEMs.",
    image: "/images/products/2026/fls-01.jpg",
    gallery: [
      "/images/products/2026/fls-01.jpg",
      "/images/products/2026/fls-02.jpg",
      "/images/products/2026/fls-03.jpg",
      "/images/products/2026/fls-04.jpg",
      "/images/products/2026/fls-05.jpg",
      "/images/products/2026/fuel-pump-housing-2.jpg",
      "/images/products/2026/2w-lever-assembly-2.jpg",
      "/images/products/2026/deep-drawn-channel.jpg",
    ],
    specs: [
      { label: "Process", value: "Deep drawing + stamping" },
      { label: "Delivery", value: "Assembly-ready modules" },
      { label: "Customers", value: "HMCL & 2W OEMs" },
    ],
  },
  {
    slug: "ev-components",
    title: "EV Structural & Electrical Components",
    category: "ev",
    summary:
      "Stamped battery-pack structural rails, tray channels, module-mount brackets, motor attachment parts, copper and brass busbars, and stator contact assemblies. Designed to strict EV cleanliness and dimensional requirements, with tight hole-pattern accuracy and welded sub-assembly capability.",
    image: "/images/products/2026/ev-component-01.jpg",
    gallery: [
      "/images/products/2026/ev-component-01.jpg",
      "/images/products/2026/ev-component-02.jpg",
      "/images/products/2026/ev-component-03.jpg",
      "/images/products/2026/ev-component-04.jpg",
      "/images/products/2026/ev-component-05.jpg",
      "/images/products/2026/ev-component-06.jpg",
      "/images/products/2026/battery-tray-channel.jpg",
      "/images/products/2026/motor-busbar-2.jpg",
    ],
    specs: [
      { label: "Cleanliness", value: "EV-grade specification" },
      { label: "Materials", value: "Copper · brass · aluminium" },
      { label: "Capability", value: "Welded sub-assemblies" },
    ],
  },
];

export const productCategories: { id: ProductCategory | "all"; label: string; note: string }[] = [
  { id: "all", label: "All Components", note: "Full portfolio" },
  { id: "4-wheeler", label: "4-Wheeler", note: "Powertrain · chassis · electronics" },
  { id: "2-wheeler", label: "2-Wheeler", note: "Fuel systems · actuation · braking" },
  { id: "ev", label: "EV", note: "Battery · motor · busbars" },
];

/* ---------------- Applications ---------------- */

export const applications = [
  { title: "Fuel Injection", detail: "Precision fuel delivery components for gasoline and diesel engines" },
  { title: "Powertrain", detail: "Engine mounts, control units and transmission-related precision components" },
  { title: "Sensors", detail: "Mounting brackets and housings for temperature, pressure and speed sensors" },
  { title: "Emission Control", detail: "EGR baffles, brackets, gas boxes and machined flanges for exhaust systems" },
  { title: "EV Drivetrain", detail: "Battery pack structural components, motor attachment parts and busbars" },
  { title: "Braking Systems", detail: "Stamped and formed disc-brake sub-components, mounting plates and actuation brackets" },
];

/* ---------------- Manufacturing detail ---------------- */

export const manufacturingAreas = [
  {
    id: "press",
    title: "Press Shop",
    eyebrow: "203 machines · 5T–630T",
    body: "203 pneumatic and hydraulic presses complemented by high-speed stamping equipment and advanced material handling. Every machine carries PLC controls, overload sensors, cam sensors, auto-lubrication and tonnage calculators — fully Industry 4.0 ready.",
    points: [
      "193 power presses · ISGEC, SEW, Chin-Fong high-speed SPM",
      "10 hydraulic presses · 10T–100T Ritters",
      "PLC control, overload and cam sensing on every press",
      "Progressive and tandem die operation",
    ],
    images: [
      "/images/factory/2026/press-shop-aerial.jpg",
      "/images/factory/2026/press-shop-progressive-die.jpg",
      "/images/factory/2026/press-shop-hydraulic.jpg",
    ],
  },
  {
    id: "cnc",
    title: "CNC Machining",
    eyebrow: "±0.005 mm tolerance",
    body: "CNC machining centres delivering precision components to ±0.005 mm. Tsugami turning centres, HAAS vertical machining centres and Citizen Swiss-type sliding-head machines cover turning, milling and high-precision production.",
    points: [
      "10 Tsugami CNC turning centres · sub-micron capability",
      "6 HAAS vertical machining centres · 3-axis",
      "3 Citizen (Japan) sliding-head machines · ±0.005 mm",
      "In-line gauging and first-article inspection",
    ],
    images: [
      "/images/factory/2026/cnc-shop-floor.jpg",
      "/images/factory/2026/cnc-swiss-lathe.jpg",
      "/images/factory/2026/cnc-haas-vmc.jpg",
    ],
  },
  {
    id: "welding",
    title: "Welding & Assembly",
    eyebrow: "40+ stations",
    body: "40+ welding stations across all three units — spot, projection, MIG and TIG — supported by in-house assembly and secondary operations including riveting, tapping, drilling, ultrasonic cleaning and clean-room inspection.",
    points: [
      "Spot, projection, MIG and TIG welding",
      "Riveting, tapping and drilling cells",
      "Ultrasonic cleaning and clean-room inspection",
      "Qualified operators with in-process quality control",
    ],
    images: [
      "/images/factory/2026/assembly-pneumatic-press.jpg",
      "/images/factory/2026/tool-room-edm.jpg",
      "/images/factory/2026/exterior-evening-1.jpg",
    ],
  },
];

/* ---------------- Development ---------------- */

export const toolRoom = [
  { title: "CNC Wire-Cut", detail: "Six Sodick precision wire-cut machines for high-accuracy tool work with sub-micron tolerances" },
  { title: "EDM", detail: "Die-sinking and spark-erosion EDM for complex cavities, internal features and hardened-steel detailing" },
  { title: "Surface & Cylindrical Grinding", detail: "Advanced grinding for precision finishing and tight tolerance achievement" },
  { title: "Progressive & Tandem Tooling", detail: "In-house design and manufacture of progressive dies and tandem tooling for high-volume production" },
  { title: "Rapid Prototyping", detail: "Concept to working prototype in weeks, with full DFM analysis and optimisation" },
  { title: "In-House Design", detail: "Tool, die and component design on Siemens UGNX, AutoCAD and Delcam PowerMill — DFM reviewed before cutting metal" },
];

export const developmentProcess = [
  { step: "01", title: "DFM Analysis", detail: "Comprehensive Design for Manufacturability review to optimise parts for cost, lead time and quality from day one." },
  { step: "02", title: "In-House Simulation", detail: "FEA and process simulation to validate designs before tooling — reducing risk and rework." },
  { step: "03", title: "Prototype & Tooling", detail: "In-house prototyping cuts development time by 60%, enabling rapid iteration and design refinement." },
  { step: "04", title: "Concept to PPAP", detail: "End-to-end capability from concept sketch through full Production Part Approval Process with SPC and validation." },
];

export const valueChain = [
  { title: "Raw Material Procurement", detail: "Direct vendor relationships for steel coils, aluminium and specialty alloys — quality and cost control from day one" },
  { title: "Tool Design & Manufacturing", detail: "In-house tool room for progressive dies, tandem tooling and custom fixtures" },
  { title: "Stamping Operations", detail: "203 press machines (5T–630T) for consistent, high-volume component production" },
  { title: "CNC Machining", detail: "In-house turning, milling and finishing to achieve tight tolerances (±0.005 mm)" },
  { title: "Assembly & Secondary Ops", detail: "Riveting, welding, tapping, cleaning and precision inspection under one roof" },
  { title: "Testing & Quality Assurance", detail: "Sanber Labs NABL-accredited testing — CMM, salt spray and spectrometry without external delays" },
];

/* ---------------- Quality / Sanber Labs ---------------- */

export const labEquipment = [
  { name: "Spectrometer", make: "Hitachi (Japan)", detail: "Spectrochemical analysis (OES/ICP-OES), elemental analysis of metals & alloys", image: "/images/sanber/download-2024-05-08t121912-982-500x500.webp" },
  { name: "Coordinate Measuring Machine", make: "Carl Zeiss Contura G2", detail: "3D precision coordinate measurement with advanced metrology capabilities", image: "/images/sanber/bridge-type-cmm-contura-g2-machines.jpg" },
  { name: "Universal Testing Machine", make: "1000 kN capacity", detail: "Metal & polymer tensile, compression, bend and shear testing (ASTM/ISO)", image: "/images/sanber/1000-KN-Electrically-Operated-Universal-Testing-Machine..jpg" },
  { name: "Salt Spray Chamber", make: "Ascott (UK)", detail: "ASTM B117 / ISO 9227 cyclic corrosion testing (CCT)", image: "/images/sanber/Salt-Spray-Chamber.jpg" },
  { name: "Environmental Chamber", make: "Espec (Korea)", detail: "Temperature & humidity cycling, thermal conditioning, climatic simulation", image: "/images/sanber/espec environmental chamber.webp" },
  { name: "Surface Roughness Profiler", make: "Carl Zeiss SurfComNex", detail: "Sub-micron precision surface profiling and contour measurement", image: "/images/sanber/surfcomnex030-carl-zeiss.jpg" },
];

export const qualityFlow = [
  { step: "01", title: "Incoming Inspection", detail: "Every coil, casting and bought-out part verified against specification before it reaches the shop floor." },
  { step: "02", title: "In-Process Testing", detail: "Operator checks, in-line gauging and SPC data captured at each station, digitally logged." },
  { step: "03", title: "Final Inspection", detail: "Dimensional, metallurgical and functional validation in Sanber Labs before release." },
  { step: "04", title: "PPAP Documentation", detail: "Full submission package — design records, FMEA, control plans, MSA and capability studies." },
];

/* ---------------- Digital ---------------- */

export const digitalPillars = [
  {
    title: "RM → FG Traceability",
    detail: "Complete end-to-end tracking from raw material to finished goods — every part tracked with precision.",
    points: ["Gate entry logging", "Inward material documentation", "MRN generation", "QC inspection records", "Production operations tracking", "FG dispatch with QR codes"],
  },
  {
    title: "Paperless Workflows",
    detail: "100% digital approvals and documentation — no printing, complete digital audit trail.",
    points: ["Digital PO approvals", "Digital SO approvals", "SmartAPQP documentation", "SPC / MSA / PFMEA records", "Document management system", "Digital sign-off with timestamps"],
  },
  {
    title: "AI-Powered Maintenance",
    detail: "Factory machine maintenance module built with AI, deployed across all three units.",
    points: ["QR-coded tool identification", "Preventive maintenance scheduling", "Breakdown logging & tracking", "Predictive analytics engine", "Spare parts inventory management", "Real-time alert system"],
  },
];

export const cadence = {
  name: "Cadence",
  tagline: "AI-built production intelligence",
  detail:
    "Built with React, FastAPI and MongoDB, Cadence is AAMPL's proprietary AI-powered factory intelligence system — currently in iteration 51+ and connecting all three units in real time.",
  stack: ["React Frontend", "FastAPI Backend", "MongoDB", "Predictive AI"],
  metrics: [
    { value: "300+", target: 300, suffix: "+", label: "Machines & tools tracked live" },
    { value: "800+", target: 800, suffix: "+", label: "Daily operations logged" },
    { value: "5", target: 5, label: "Role-based access levels" },
    { value: "3", target: 3, label: "Units connected in real time" },
  ],
};

export const sustainability = [
  { title: "Solar Power", detail: "Solar plants across all manufacturing units generating up to 120 kVA of clean renewable energy annually — cutting carbon footprint and operating cost together." },
  { title: "Clean Operations", detail: "PNG gensets for backup power, RECD kits integrated across units, and full ISO 14001 Environmental Management System certification." },
  { title: "Digitised Factory", detail: "Cloud ERP for integrated operations, paperless approvals, digitised quality checks with real-time dashboards and an end-to-end digital audit trail." },
  { title: "Safety First", detail: "Advanced machine guarding, photoelectric hazard sensors, double-hand push buttons on high-risk machines and a dedicated DOJO training room." },
];

/* ---------------- Awards ---------------- */

export type Award = { org: string; title: string; detail: string; tag: string };

export const awards: Award[] = [
  { org: "Mikuni", title: "Quality & Development Excellence Award", detail: "Recognising outstanding quality standards and continuous product development capabilities.", tag: "Quality" },
  { org: "Keihin FIE", title: "Supplier Recognition Award", detail: "Recognition for consistent delivery, quality achievement and reliable supply chain partnership.", tag: "Delivery" },
  { org: "BorgWarner", title: "Supplier Excellence Award", detail: "Recognising excellence in quality, delivery, cost competitiveness and technical innovation.", tag: "Excellence" },
  { org: "IIAF Faridabad", title: "Development Excellence", detail: "Honouring our capability and excellence in developing innovative solutions for the automotive industry.", tag: "Development" },
  { org: "Marelli Powertrain", title: "Supplier Quality Recognition", detail: "Recognition for maintaining superior quality standards in powertrain component manufacturing.", tag: "Quality" },
  { org: "Mitsubishi Electric", title: "Supplier Excellence Award", detail: "Excellence in quality, on-time delivery and technical support for electrical component manufacturing.", tag: "Excellence" },
  { org: "Aisin Group", title: "Quality Achievement Award", detail: "Recognising consistent quality achievement and reliability in transmission and powertrain components.", tag: "Quality" },
  { org: "MACE", title: "Maruti Suzuki Supplier Excellence", detail: "Certification for meeting world-class quality and delivery standards.", tag: "Certification" },
  { org: "Hyundai", title: "SQ Mark Supplier Quality Certification", detail: "Hyundai Motor Group certification confirming superior quality and reliability standards.", tag: "Certification" },
];

export const timeline = [
  { year: "1996", title: "Founded", detail: "Anmol Udyog established with a vision to deliver precision-engineered components to the automotive industry." },
  { year: "2000s", title: "IATF 16949 Certification", detail: "Automotive quality management certification achieved, setting the foundation for global OEM partnerships." },
  { year: "2010s", title: "Expansion to Three Units", detail: "Growth to three manufacturing units across Faridabad with 1.5 lakh sq ft built-up area, enabling higher capacity and specialisation." },
  { year: "2010s–20s", title: "Industry Recognition", detail: "Awards and certifications from Marelli, Mitsubishi Electric, Aisin, BorgWarner and Maruti Suzuki (MACE)." },
  { year: "2020s", title: "Industry 4.0 Integration", detail: "Digital transformation with Cadence, zero-paper workflows and full traceability across every unit." },
  { year: "2026", title: "EV & Sustainability Leadership", detail: "Leading the transition to EV-ready components while investing in solar power and sustainable manufacturing." },
];

/* ---------------- Careers ---------------- */

export const careerValues = [
  { title: "Training First", detail: "Structured on-the-job training, skill matrices and cross-functional rotation — so operators build genuine capability, not just a clocked-in shift." },
  { title: "Long-Term Careers", detail: "Several senior line leaders and supervisors started as operators or apprentices. Tenure on the shop floor is measured in decades, not quarters." },
  { title: "Safety & Dignity", detail: "PPE is enforced. Workstations are ergonomic. The canteen, washrooms and rest areas are maintained to the same standard as the production line." },
  { title: "Infrastructure to Be Proud Of", detail: "A landscaped campus, a well-kept canteen, a modern tool room and training rooms — the facility is looked after, because the people in it are." },
  { title: "New Technology Exposure", detail: "Industry 4.0 shop-floor systems, CNC Swiss lathes, sub-micron inspection — you work alongside the same technology global OEMs demand." },
  { title: "A Family-Led Business", detail: "Privately owned and professionally run. Decisions get made, problems get solved, and people are recognised by name — not an employee ID." },
];

export const careerDifferentiators = [
  {
    title: "Structured training, not sink-or-swim",
    detail: "Every new operator is taken through a documented induction — PPE, safety protocols, quality standards and machine-specific training — before being assigned to a line. Skill matrices track what each team member can run, and targeted training closes the gaps.",
    points: ["Documented induction for every role", "Skill matrices reviewed quarterly", "Cross-training across units and operations", "Apprentice-to-engineer pathway"],
    image: "/images/culture/2026/careers-training-1.jpg",
  },
  {
    title: "A campus, not just a factory",
    detail: "Our Faridabad facility is landscaped, maintained and kept clean — because a workplace that's looked after sends a clear message to the people working in it. Green spaces, shaded walkways and maintained building exteriors are part of how we run.",
    points: ["Landscaped gardens and green areas", "Clean, well-lit production halls", "Modern canteen with seated dining", "Enforced PPE and safety culture"],
    image: "/images/culture/2026/careers-garden-1.jpg",
  },
  {
    title: "Modern equipment, real exposure",
    detail: "We invest 6–7% of annual revenue in R&D and new machine infrastructure. That means the team works on CNC Swiss lathes, sub-micron inspection equipment and AI-driven shop-floor software — skills that travel with you through your whole career.",
    points: ["CNC Swiss lathes (Citizen Japan)", "Sub-micron inspection & metrology", "Cadence Industry 4.0 platform", "In-house tool room & die-making"],
    image: "/images/culture/2026/careers-toolroom.jpg",
  },
  {
    title: "People stay — and grow",
    detail: "Tenure on our shop floor is measured in decades. Several line leaders and supervisors started as operators or apprentices and grew into their current roles with us. We promote from within wherever we can.",
    points: ["Long-term employment, not contract-first hiring", "Internal promotion prioritised", "Festival celebrations & team events", "Leadership that knows people by name"],
    image: "/images/culture/2026/culture-celebration.jpg",
  },
];

export const cultureGallery = [
  { src: "/images/culture/2026/careers-building.jpg", caption: "IMT Faridabad — main manufacturing plant" },
  { src: "/images/culture/2026/careers-garden-1.jpg", caption: "Campus garden" },
  { src: "/images/culture/2026/culture-canteen.jpg", caption: "Canteen" },
  { src: "/images/culture/2026/careers-training-2.jpg", caption: "Training room" },
  { src: "/images/culture/2026/careers-toolroom.jpg", caption: "Tool room" },
  { src: "/images/culture/2026/careers-garden-2.jpg", caption: "Green spaces" },
  { src: "/images/culture/2026/culture-training.jpg", caption: "Classroom training" },
  { src: "/images/culture/2026/culture-celebration.jpg", caption: "Team celebration" },
];

/* ---------------- FAQ ---------------- */

export type FaqItem = { q: string; a: string; group: string };

export const faqs: FaqItem[] = [
  {
    group: "Supplier Evaluation",
    q: "What is a Tier-1 automotive supplier?",
    a: "A Tier-1 automotive supplier sells components directly to vehicle OEMs — like Tata Motors, Mahindra, Hyundai, Maruti Suzuki or Toyota — without an intermediary. Tier-1 suppliers typically own the engineering, validation and production responsibility for the parts they ship. AAMPL is a Tier-1 supplier to OEMs and Tier-1 system integrators including Marelli, Mitsubishi Electric, Aisin, BorgWarner, Continental Automotive (Aumovio), Pricol and Tata AutoComp.",
  },
  {
    group: "Supplier Evaluation",
    q: "What certifications should a sheet metal automotive supplier in India have?",
    a: "At minimum, IATF 16949 — the global automotive quality management standard, mandatory for Tier-1 supply. Strong suppliers also hold ISO 14001 (Environmental Management), ISO 50001 (Energy Management) and VDA 6.3 (Process Audit, important for German OEMs). AAMPL holds all four, plus the Hyundai SQ Mark, and operates Sanber Labs — a NABL-accredited in-house testing laboratory.",
  },
  {
    group: "Supplier Evaluation",
    q: "How do I evaluate a Tier-1 sheet metal supplier in India?",
    a: "Eight criteria matter: (1) IATF 16949 certification — non-negotiable. (2) An in-house tool room, which reduces lead time and reliance on external tool makers. (3) Press capacity range covering your part sizes — typically 5T–630T for automotive sheet metal. (4) An established customer list, which means they have cleared PPAP audits. (5) PPAP and APQP capability. (6) Traceability — Industry 4.0 digitisation with batch-level tracking. (7) In-house NABL-accredited testing. (8) Financial stability — 25+ years in business with consistent revenue growth. AAMPL meets all eight.",
  },
  {
    group: "Supplier Evaluation",
    q: "What is the difference between Tier-1, Tier-2 and Tier-3 suppliers?",
    a: "Tier-1 suppliers sell finished assemblies or systems directly to vehicle OEMs. Tier-2 suppliers sell components or sub-assemblies to Tier-1 suppliers. Tier-3 suppliers provide raw materials, hardware or basic processed inputs to Tier-2. Tier-1 status requires higher quality systems (IATF 16949), engineering capability and direct accountability to the OEM. AAMPL operates as a Tier-1 supplier across multiple programs while also serving Tier-1 system integrators such as Marelli and BorgWarner.",
  },
  {
    group: "Quality & Compliance",
    q: "What is PPAP and why is it required for automotive parts?",
    a: "PPAP (Production Part Approval Process) is the formal package of documentation and samples a supplier submits to prove they can produce a part to the customer's specification, consistently, at production volumes. It typically includes design records, FMEAs, control plans, MSA, capability studies and initial sample inspection reports. PPAP is required by IATF 16949 before any new part goes into serial production. AAMPL handles full PPAP submission as part of new program launches and has cleared PPAP for Marelli, BorgWarner, Mitsubishi Electric and Aisin.",
  },
  {
    group: "Quality & Compliance",
    q: "What is IATF 16949 certification and why does it matter?",
    a: "IATF 16949 is the international quality management standard for the automotive industry, developed by the International Automotive Task Force in partnership with ISO. It defines requirements for the design, development, production and — where relevant — installation and service of automotive products. Without it, most OEMs will not add a supplier to their approved vendor list. AAMPL has been IATF 16949 certified continuously.",
  },
  {
    group: "Quality & Compliance",
    q: "Does AAMPL have in-house testing and validation capability?",
    a: "Yes. AAMPL operates Sanber Labs — a NABL-accredited testing laboratory located within its Unit 2 facility in Faridabad. Sanber Labs provides metallurgical testing, dimensional inspection, mechanical testing and other validation services that would otherwise need to be outsourced. This eliminates dependency on external labs and reduces lead times. Sanber Labs also serves external customers.",
  },
  {
    group: "Capabilities & Capacity",
    q: "Where is AAMPL located and what is its production capacity?",
    a: "AAMPL is headquartered in Faridabad, Haryana, India, with three manufacturing units totalling 1.5 lakh sq. ft. of built-up area. The company operates 203 press machines from 5T to 630T (pneumatic and hydraulic), producing over 5 million parts per month. AAMPL employs 700+ people and recorded ₹132 Cr revenue in FY26 with a sustained 19% CAGR.",
  },
  {
    group: "Capabilities & Capacity",
    q: "What press capacity range does AAMPL operate?",
    a: "203 press machines from 5T to 630T, covering both pneumatic and hydraulic types. That range covers virtually all common automotive sheet metal stamping requirements — from small precision parts (ECU housings, brackets, clips) through medium components (engine mounts, transmission housings) to large structural and chassis components. All presses carry PLC controls, overload sensors, cam sensors, auto-lubrication and tonnage calculators.",
  },
  {
    group: "Capabilities & Capacity",
    q: "What is the typical lead time for new tooling in sheet metal stamping?",
    a: "For a new progressive die or stamping tool, 8–14 weeks is typical depending on part complexity, number of stations and material specification. Suppliers with in-house tool rooms can compress this by 2–4 weeks compared to those who outsource tool-making. AAMPL operates in-house tool rooms across all three units — over 50,000 sq. ft. combined — with 6 Sodick CNC wire-cut machines, EDM, surface and cylindrical grinding, and in-house design on Siemens UGNX, AutoCAD and Delcam PowerMill.",
  },
  {
    group: "Capabilities & Capacity",
    q: "Is AAMPL set up for Industry 4.0 / digital manufacturing?",
    a: "Yes. AAMPL has implemented end-to-end digitisation across all three units. The operation runs paperless, with full batch-level traceability from raw material receipt through production to finished goods dispatch. Custom AI-powered tools assist with shop-floor decision-making and predictive maintenance, and all press machines have integrated PLC controls and sensor data feeds. This level of digital maturity is uncommon among mid-size Indian Tier-1 suppliers and meets requirements set by German and Japanese OEMs.",
  },
  {
    group: "Programs & Products",
    q: "Which customers does AAMPL supply?",
    a: "AAMPL supplies precision sheet metal and machined components to global automotive OEMs and Tier-1 system integrators including Marelli, Mitsubishi Electric, Aisin, BorgWarner, Continental Automotive (now Aumovio), Pricol, Tata AutoComp, Hanon, Mikuni, Hero MotoCorp and FCC. Programs span BS6 powertrain components, fuel injection system parts, EV components, engine mounts, EGR system parts, ECU housings and transmission components.",
  },
  {
    group: "Programs & Products",
    q: "Does AAMPL manufacture EV components?",
    a: "Yes. AAMPL produces precision sheet metal and machined components for electric vehicle applications including battery housings, motor housings, transmission and gearbox parts, and ECU enclosures. The company is actively investing in EV-focused capability expansion, and its existing relationships with Marelli, Mitsubishi Electric and BorgWarner — all major EV system suppliers — position it for next-generation programs.",
  },
  {
    group: "Programs & Products",
    q: "How long has AAMPL been in business?",
    a: "AAMPL (Advanced Anmol Metcomp Pvt. Ltd.) was founded in 1996 by Mr. Sanjeev Gumber. The company has been operating continuously for over 30 years, growing from a single press shop in Faridabad to three manufacturing units serving global automotive OEMs, with 19% revenue CAGR and ₹132 Cr revenue in FY26.",
  },
  {
    group: "Programs & Products",
    q: "How do I request a quote or start a sourcing conversation?",
    a: "Reach AAMPL by email at enquiry@aampl.in, by phone at +91-129-4151766, or via WhatsApp at +91-9999831838. For new programs, share part drawings, expected annual volumes, target SOP date and any specific OEM requirements (PPAP level, packaging, traceability). AAMPL typically responds within one business day.",
  },
];

/* ---------------- Why AAMPL ---------------- */

export const whyAampl = [
  { title: "Quick Response", detail: "Our team responds to enquiries within 24 hours — we commit to understanding your requirement and coming back fast." },
  { title: "Technical Expertise", detail: "30+ years of experience. Our engineering team handles precision manufacturing from concept through PPAP." },
  { title: "Quality Assured", detail: "IATF 16949, ISO 14001, ISO 50001 and VDA 6.3 certified. Every component meets global standards." },
  { title: "Global Reach", detail: "Serving automotive OEMs across India, Europe and Asia, with proven capability to scale production." },
  { title: "Full Capability", detail: "Stamping, machining, assembly and testing — everything in-house. No dependency on external partners for core manufacturing." },
  { title: "Industry 4.0", detail: "AI-powered production software, QR traceability and digital workflows for precision and transparency." },
];

export const plantTourVideoId = "HzlI0PzjNNA";
