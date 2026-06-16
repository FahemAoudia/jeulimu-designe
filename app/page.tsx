import { PublicShell } from "@/components/v2/PublicShell";
import {
  GlanceSection,
  HeroV2,
  WhatIsSection,
  HowWorksSection,
  GameModesSection,
  ExperiencesSection,
  ReviewsSection,
  FinalCtaSection,
} from "@/components/v2/HomeSections";

export default function Home() {
  return (
    <PublicShell>
      <HeroV2 />
      <GlanceSection />
      <WhatIsSection />
      <HowWorksSection />
      <GameModesSection />
      <ExperiencesSection />
      <ReviewsSection />
      <FinalCtaSection />
    </PublicShell>
  );
}
