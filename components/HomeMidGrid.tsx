"use client";

import { GameModes } from "@/components/GameModes";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { useSiteContext } from "@/providers/AppProviders";

/** Renders the three-column band only if at least one column is enabled in CMS. */
export function HomeMidGrid() {
  const { content } = useSiteContext();
  const v = content.sectionVisibility;
  const showGame = v?.gameModes !== false;
  const showPrice = v?.pricing !== false;
  const showTest = v?.testimonials !== false;
  if (!showGame && !showPrice && !showTest) return null;

  return (
    <section className="relative z-10 px-4 pb-10 sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] xl:gap-5">
          {showGame ? <GameModes /> : null}
          {showPrice ? <Pricing /> : null}
          {showTest ? <Testimonials /> : null}
        </div>
      </div>
    </section>
  );
}
