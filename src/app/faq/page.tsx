import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FaqBody } from "@/components/sections/FaqBody";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Buyer FAQ — Evaluating a Tier-1 Sheet Metal Supplier in India",
  description:
    "Answers for sourcing managers and engineering leads: what IATF 16949 means, what PPAP requires, how to evaluate a Tier-1 sheet metal supplier, tooling lead times, press capacity and AAMPL's Industry 4.0 maturity.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        crumb="FAQ"
        eyebrow="Company"
        title="Buyer-side answers, without the sales gloss."
        lead="Fifteen questions sourcing managers actually ask when evaluating a precision sheet metal supplier in India — answered factually, so you can compare AAMPL against alternatives on the criteria that matter."
        image="/images/factory/2026/cnc-shop-floor.jpg"
        imageAlt="AAMPL CNC shop floor"
        specs={[
          { k: "Answers", v: "15" },
          { k: "Topics", v: "4" },
          { k: "Response time", v: "1 business day" },
          { k: "Standard", v: "IATF 16949" },
        ]}
      />
      <FaqBody />
    </>
  );
}
