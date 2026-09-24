import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { DigitalBody } from "@/components/sections/DigitalBody";

export const metadata: Metadata = {
  title: "Digital & Sustainability — Industry 4.0, Cadence & Solar",
  description:
    "End-to-end digitisation across all three AAMPL units: zero paper, full RM-to-FG traceability, the in-house Cadence AI production platform tracking 300+ machines, and 120 kVA of rooftop solar.",
};

export default function DigitalPage() {
  return (
    <>
      <PageHero
        crumb="Digital"
        eyebrow="Innovation · 05"
        title="A factory that runs on data, not paper."
        lead="End-to-end digitisation across all three units — zero paper, full batch-level traceability from raw material to finished goods, and Cadence: an AI-powered production intelligence platform we built ourselves."
        image="/images/factory/2026/aerial-solar-rooftop.jpg"
        imageAlt="Aerial view of solar panels on the AAMPL factory roof"
        specs={[
          { k: "Paper", v: "Zero" },
          { k: "Machines tracked", v: "300+" },
          { k: "Daily ops logged", v: "800+" },
          { k: "Solar", v: "120 kVA" },
        ]}
      />
      <DigitalBody />
    </>
  );
}
