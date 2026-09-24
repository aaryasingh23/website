import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ManufacturingBody } from "@/components/sections/ManufacturingBody";

export const metadata: Metadata = {
  title: "Manufacturing Capabilities — 203 Presses, 5T to 630T",
  description:
    "AAMPL's manufacturing ecosystem: 203 press machines from 5T to 630T, 25 CNC machining centres, 40+ welding stations and full assembly across three units in Faridabad.",
};

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        crumb="Manufacturing"
        eyebrow="Capabilities · 01"
        title="Built for tonnage range and sub-micron precision."
        lead="A comprehensive manufacturing ecosystem across three units spanning 1.5 lakh sq ft — 203 press machines from 5T to 630T, advanced CNC machining centres, and complete in-house assembly and secondary operations. Industry 4.0 ready, and capable of 5M+ precision components a month."
        image="/images/factory/2026/press-shop-aerial.jpg"
        imageAlt="Aerial view of the AAMPL press shop"
        specs={[
          { k: "Presses", v: "203" },
          { k: "Tonnage", v: "5T – 630T" },
          { k: "CNC centres", v: "25" },
          { k: "Monthly output", v: "5M+ parts" },
        ]}
      />
      <ManufacturingBody />
    </>
  );
}
