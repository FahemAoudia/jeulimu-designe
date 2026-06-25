"use client";

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
import { useV2Content } from "@/hooks/useV2Content";

export function HomePageContent() {
  const { visibility } = useV2Content();

  return (
    <>
      {visibility.hero ? <HeroV2 /> : null}
      {visibility.glance ? <GlanceSection /> : null}
      {visibility.whatIs ? <WhatIsSection /> : null}
      {visibility.howWorks ? <HowWorksSection /> : null}
      {visibility.gameModes ? <GameModesSection /> : null}
      {visibility.experiences ? <ExperiencesSection /> : null}
      {visibility.reviews ? <ReviewsSection /> : null}
      {visibility.finalCta ? <FinalCtaSection /> : null}
    </>
  );
}
