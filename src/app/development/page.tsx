import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { DevelopmentBody } from "@/components/sections/DevelopmentBody";

export const metadata: Metadata = {
  title: "Design & Development — In-House Tool Room, DFM & Localization",
  description:
    "AAMPL's in-house tool rooms across three plants: 50,000+ sq ft of die-build and prototyping capacity, CNC wire-cut, EDM, DFM analysis, and proven import-substitution localization for global OEMs.",
};

export default function DevelopmentPage() {
  return (
    <>
      <PageHero
        crumb="Development"
        eyebrow="Capabilities · 02"
        title="From a drawing to a PPAP-cleared part."
        lead="In-house tool rooms, DFM capability and prototype manufacturing — plus a proven track record converting imported components into India-made equivalents, at up to 80% shorter lead times and 50% lower cost."
        image="/images/factory/2026/tool-room-build.jpg"
        imageAlt="Die build underway in the AAMPL tool room"
        specs={[
          { k: "Tool room", v: "50,000+ sq ft" },
          { k: "Wire-cut", v: "6 Sodick" },
          { k: "R&D spend", v: "6–7% revenue" },
          { k: "Dev time cut", v: "60%" },
        ]}
      />
      <DevelopmentBody />
    </>
  );
}
