import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CareersBody } from "@/components/sections/CareersBody";

export const metadata: Metadata = {
  title: "Careers — A Workplace That Invests in People",
  description:
    "Structured training, apprentice-to-engineer pathways, enforced safety, a landscaped campus and exposure to Industry 4.0 technology. AAMPL hires across the shop floor, tool room, quality, engineering and R&D.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumb="Careers"
        eyebrow="Company"
        title="A workplace that invests in people, training and time."
        lead="Tenure on our shop floor is measured in decades, not quarters. Several of our line leaders and supervisors started as operators or apprentices — and grew into their roles with us."
        image="/images/culture/2026/careers-building.jpg"
        imageAlt="AAMPL IMT Faridabad manufacturing plant"
        specs={[
          { k: "Team", v: "700+" },
          { k: "Since", v: "1996" },
          { k: "R&D spend", v: "6–7% revenue" },
          { k: "Training", v: "Documented induction" },
        ]}
      />
      <CareersBody />
    </>
  );
}
