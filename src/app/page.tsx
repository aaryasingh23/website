import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { MachineInventory } from "@/components/sections/MachineInventory";
import { Localization } from "@/components/sections/Localization";
import { PlantTour } from "@/components/sections/PlantTour";
import { TrustGrid } from "@/components/sections/TrustGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Stats />
      <About />
      <Capabilities />
      <MachineInventory />
      <Localization />
      <PlantTour />
      <TrustGrid />
    </>
  );
}
