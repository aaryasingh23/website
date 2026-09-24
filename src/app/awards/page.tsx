import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AwardsBody } from "@/components/sections/AwardsBody";

export const metadata: Metadata = {
  title: "Awards & Recognition — BorgWarner, Marelli, Aisin, MACE",
  description:
    "Two decades of customer recognition for AAMPL — supplier excellence and quality awards from Mikuni, Keihin FIE, BorgWarner, Marelli Powertrain, Mitsubishi Electric, Aisin, Maruti Suzuki (MACE) and Hyundai.",
};

export default function AwardsPage() {
  return (
    <>
      <PageHero
        crumb="Awards"
        eyebrow="Innovation · 06"
        title="Two decades of customer verdicts."
        lead="Awards and recognitions from the OEMs and Tier-1 integrators we supply — tangible proof of a commitment to quality, delivery and long-term partnership, earned one program at a time."
        image="/images/factory/2026/exterior-evening-2.jpg"
        imageAlt="AAMPL manufacturing facility exterior in the evening"
        specs={[
          { k: "Awards", v: "9" },
          { k: "Certifications", v: "6" },
          { k: "Since", v: "1996" },
          { k: "CAGR", v: "19%" },
        ]}
      />
      <AwardsBody />
    </>
  );
}
