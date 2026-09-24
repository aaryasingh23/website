import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactBody } from "@/components/sections/ContactBody";

export const metadata: Metadata = {
  title: "Contact — Faridabad, Haryana, India",
  description:
    "Reach AAMPL by email at enquiry@aampl.in, by phone at +91-129-4151766 or on WhatsApp at +91-9999831838. Corporate office and three manufacturing units in Faridabad, Haryana.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Start a program"
        title="Send us a drawing. We'll send back a plan."
        lead="Share part drawings, expected annual volumes, target SOP date and any specific OEM requirements. We typically respond within one business day — and we're happy to host a plant visit."
        image="/images/factory/2026/exterior-evening-1.jpg"
        imageAlt="AAMPL corporate facility exterior"
        specs={[
          { k: "Response", v: "1 business day" },
          { k: "Units", v: "3 + HQ" },
          { k: "Location", v: "Faridabad" },
          { k: "Hours", v: "Mon–Sat 08:30" },
        ]}
      />
      <ContactBody />
    </>
  );
}
