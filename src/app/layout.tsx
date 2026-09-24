import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { company, contact, locations } from "@/lib/content";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.domain),
  title: {
    default: "AAMPL — Precision Sheet Metal & Machined Components | Tier-1 Automotive Supplier",
    template: "%s | AAMPL",
  },
  description:
    "Advanced Anmol Metcomp Pvt. Ltd. — Tier-1 supplier of precision sheet metal and machined components to global automotive OEMs. IATF 16949 certified, 700+ employees, 5M+ parts a month across three units in Faridabad, India.",
  keywords: [
    "sheet metal components",
    "precision stamping",
    "CNC machining",
    "Tier-1 automotive supplier India",
    "IATF 16949",
    "Faridabad",
    "EV components",
    "progressive die tooling",
    "PPAP",
  ],
  authors: [{ name: company.legalName }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: company.domain,
    siteName: company.name,
    title: "AAMPL — Precision Automotive Components | IATF 16949 Certified",
    description:
      "Precision-engineered sheet metal & machining components for global automotive OEMs. 700+ employees, 5M+ parts/month, 203 press machines.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AAMPL — Precision Automotive Components",
    description:
      "Leading Tier-1 supplier of precision sheet metal & machined components to global automotive OEMs.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Manufacturer",
  "@id": `${company.domain}/#organization`,
  name: company.legalName,
  alternateName: company.name,
  url: company.domain,
  foundingDate: String(company.founded),
  founder: { "@type": "Person", name: company.founder },
  description:
    "Tier-1 supplier of precision-engineered sheet metal and machined components for global automotive OEMs. IATF 16949 certified, 700+ employees, 5M+ parts per month across 3 manufacturing units in Faridabad, India.",
  numberOfEmployees: { "@type": "QuantitativeValue", value: "700+" },
  address: {
    "@type": "PostalAddress",
    streetAddress: locations[0].lines[0],
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    postalCode: "121001",
    addressCountry: "IN",
  },
  telephone: contact.phoneIntl,
  email: contact.email,
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Global" },
  ],
  knowsAbout: [
    "Sheet Metal Stamping",
    "CNC Machining",
    "Progressive Die Tooling",
    "Automotive Components",
    "BS6 Powertrain Parts",
    "EV Components",
    "Welding and Assembly",
    "Tier-1 Automotive Supply",
    "Tool Room",
    "Industry 4.0 Manufacturing",
    "PPAP",
    "APQP",
  ],
  hasCredential: ["IATF 16949", "ISO 14001", "ISO 50001", "VDA 6.3"].map((n) => ({
    "@type": "EducationalOccupationalCredential",
    name: n,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-signal-600 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
