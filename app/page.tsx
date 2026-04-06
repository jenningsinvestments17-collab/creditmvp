import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { IntakePreviewSection } from "@/components/home/IntakePreviewSection";

export default function HomePage() {
  return (
    <div className="page-rhythm">
      <Hero />
      <HowItWorksSection />
      <IntakePreviewSection />
      <FinalCTA />
    </div>
  );
}
