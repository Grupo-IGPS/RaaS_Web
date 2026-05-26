"use client";

import { HeroScrub } from "@/components/sections/HeroScrub";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { SimulationSection } from "@/components/sections/SimulationSection";
import { AIAgentSection } from "@/components/sections/AIAgentSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroScrub
        frameCount={241}
        frameUrl={(index) =>
          `/hero-frames/frame_${String(index).padStart(3, "0")}.webp`
        }
        accentHex="#2D3193"
      />

      <ProblemSection />
      <HowItWorksSection />
      <SolutionsSection />
      <CaseStudiesSection />
      <SimulationSection />
      <AIAgentSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
