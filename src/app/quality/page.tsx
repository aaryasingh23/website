import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { QualityBody } from "@/components/sections/QualityBody";

export const metadata: Metadata = {
  title: "Quality & Certifications — IATF 16949, VDA 6.3 & Sanber Labs",
  description:
    "AAMPL holds IATF 16949, ISO 14001, ISO 50001, VDA 6.3, MACE and the Hyundai SQ Mark — backed by Sanber Labs, a NABL-accredited testing laboratory on our own factory premises.",
};

export default function QualityPage() {
  return (
    <>
      <PageHero
        crumb="Quality"
        eyebrow="Capabilities · 04"
        title="Certified, audited, and tested in our own laboratory."
        lead="Every badge earned through a rigorous audit cycle — a test of process discipline across all three manufacturing units. And when validation is needed, it happens on site at Sanber Labs, not in someone else's queue."
        image="/images/sanber/bridge-type-cmm-contura-g2-machines.jpg"
        imageAlt="Carl Zeiss Contura G2 coordinate measuring machine at Sanber Labs"
        specs={[
          { k: "Core standard", v: "IATF 16949" },
          { k: "Process audit", v: "VDA 6.3" },
          { k: "Laboratory", v: "NABL accredited" },
          { k: "CMM", v: "Zeiss Contura G2" },
        ]}
      />
      <QualityBody />
    </>
  );
}
