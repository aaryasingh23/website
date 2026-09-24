import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductsBody } from "@/components/sections/ProductsBody";

export const metadata: Metadata = {
  title: "Product Portfolio — 4-Wheeler, 2-Wheeler & EV Components",
  description:
    "AAMPL's precision component portfolio: ECU & PCU enclosures, engine mounts, transmission linkages, EGR and thermal parts, disc brake components, throttle bodies, fuel systems and EV busbars and battery structures.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="Capabilities · 03"
        title="Parts that go into powertrains, brakes and battery packs."
        lead="Precision sheet metal and machined components for passenger and commercial vehicles, motorcycles and scooters, and a fast-growing electric-vehicle line — serving Tier-1 OEMs across India, Europe and Asia."
        image="/images/products/2026/ecu-pcu-enclosure-03.jpg"
        imageAlt="ECU enclosure components manufactured by AAMPL"
        specs={[
          { k: "Families", v: "8" },
          { k: "Segments", v: "4W · 2W · EV" },
          { k: "Tolerance", v: "±0.005 mm" },
          { k: "Output", v: "5M+ / month" },
        ]}
      />
      <ProductsBody />
    </>
  );
}
