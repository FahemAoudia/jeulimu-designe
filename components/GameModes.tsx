"use client";

import Image from "next/image";
import { ArrowUpRight, Brain, Rocket, Swords } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized } from "@/types/site-content";

const iconById: Record<string, typeof Rocket> = {
  lumiquest: Rocket,
  lumivs: Swords,
  lumilogik: Brain,
};

const accents: Record<
  string,
  { border: string; accent: string; iconBg: string }
> = {
  lumiquest: {
    border: "border-[#7B2CFF]/50",
    accent: "from-[#7B2CFF]/55 via-[#0D0221]/75 to-[#02020F]/95",
    iconBg: "bg-[#7B2CFF]/25 text-ju-cyanGlow",
  },
  lumivs: {
    border: "border-ju-electric/50",
    accent: "from-ju-electric/50 via-[#050A30]/70 to-[#02020F]/95",
    iconBg: "bg-ju-electric/20 text-ju-cyanGlow",
  },
  lumilogik: {
    border: "border-[#FF2D95]/50",
    accent: "from-[#FF2D95]/50 via-[#0D0221]/72 to-[#02020F]/95",
    iconBg: "bg-[#FF2D95]/20 text-ju-pinkGlow",
  },
};

export function GameModes() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();

  if (content.sectionVisibility?.gameModes === false) return null;
  const t = ui(locale);
  const intro = content.gameModesIntro;

  return (
    <GlassCard glow="purple" className="flex h-full flex-col" id="game-modes">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
        {pickLocalized(intro.sparkle, locale)}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-ju-soft sm:text-sm">
        {pickLocalized(intro.title, locale)}
      </p>

      <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-1 lg:gap-2.5 xl:gap-3">
        {content.gameModes.map((m) => {
          const Icon = iconById[m.id] ?? Rocket;
          const style = accents[m.id] ?? accents.lumiquest;
          const src = m.image || "/hero-background.png";
          return (
            <div
              key={m.id}
              className={`ju-on-dark group relative flex min-h-[140px] flex-col overflow-hidden rounded-xl border ${style.border} bg-black/45 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
            >
              <Image
                src={src}
                alt={pickLocalized(m.name, locale)}
                fill
                className="object-cover opacity-[0.72] transition duration-500 group-hover:scale-105 group-hover:opacity-[0.88]"
                sizes="(max-width:1024px) 100vw, 400px"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${style.accent}`}
                aria-hidden
              />
              <div className="relative flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-black tracking-wide text-white drop-shadow-md sm:text-lg">
                      {pickLocalized(m.name, locale)}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-ju-yellow">
                      {pickLocalized(m.tagline, locale)}
                    </p>
                  </div>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 ${style.iconBg} backdrop-blur-md sm:size-10`}
                  >
                    <Icon className="size-4 sm:size-[1.15rem]" aria-hidden />
                  </span>
                </div>
                <p className="mt-2 text-[13px] font-semibold text-white sm:text-sm">
                  {pickLocalized(m.lead, locale)}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-white/85 sm:text-[13px]">
                  {pickLocalized(m.description, locale)}
                </p>
                <button
                  type="button"
                  className="mt-2 inline-flex size-9 items-center justify-center self-end rounded-full border border-white/25 bg-black/40 text-white shadow-[0_0_16px_rgba(255,255,255,0.12)] backdrop-blur-md transition hover:border-ju-cyanGlow hover:text-ju-cyanGlow sm:size-10"
                  aria-label={`Explore ${pickLocalized(m.name, locale)}`}
                >
                  <ArrowUpRight className="size-4 sm:size-[1.15rem]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <NeonButton
        variant="outline"
        className="mt-4 w-full !rounded-xl !py-2.5 text-xs"
      >
        {t.exploreModes}
      </NeonButton>
    </GlassCard>
  );
}
