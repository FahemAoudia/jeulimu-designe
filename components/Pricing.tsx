"use client";

import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { pickLocalized, pickLocalizedList } from "@/types/site-content";

export function Pricing() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const head = content.pricing;

  if (content.sectionVisibility?.pricing === false) return null;

  return (
    <GlassCard glow="cyan" className="flex h-full flex-col" id="pricing">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ju-cyanGlow">
        {pickLocalized(head.sparkle, locale)}
      </p>
      <h2 className="mt-1 text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
        {pickLocalized(head.title, locale)}
      </h2>

      <div className="mt-4 grid flex-1 gap-2.5 sm:grid-cols-1 sm:items-stretch sm:gap-3 lg:grid-cols-1">
        {content.pricingTiers.map((tier) => {
          const extras = pickLocalizedList(tier.extras, locale);
          const ctaLabel = pickLocalized(tier.cta, locale);
          const isContact =
            ctaLabel.toLowerCase() === "contact us" ||
            ctaLabel.toLowerCase() === "contactez-nous";

          return (
            <div
              key={tier.id}
              className={cn(
                "ju-on-dark relative flex flex-col overflow-hidden rounded-xl border bg-black/40 p-4 backdrop-blur-md",
                tier.featured
                  ? "glow-magenta-popular border-[#FF2D95]/55"
                  : "border-white/12",
              )}
            >
              {tier.badge && (tier.badge.en || tier.badge.fr) ? (
                <span className="absolute right-3 top-3 rounded-full bg-ju-yellow px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black shadow-[0_0_20px_rgba(255,106,0,0.45)]">
                  {pickLocalized(tier.badge, locale)}
                </span>
              ) : null}
              <h3 className="text-lg font-bold text-white">
                {pickLocalized(tier.title, locale)}
              </h3>
              <p className="mt-1 text-sm font-medium text-ju-muted">
                {pickLocalized(tier.players, locale)}
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-black text-ju-electric drop-shadow-[0_0_20px_rgba(0,174,239,0.45)] sm:text-[2rem]">
                  {tier.price}
                </span>
                <span className="text-sm text-ju-muted">
                  {pickLocalized(tier.priceNote, locale)}
                </span>
              </div>
              {tier.kidNote ? (
                <p className="mt-2 text-xs leading-snug text-ju-soft">
                  💡 {pickLocalized(tier.kidNote, locale)}
                </p>
              ) : null}
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-white/85">
                {extras.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-ju-green" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <NeonButton
                  variant={
                    tier.featured || !isContact ? "gradient" : "outline-white"
                  }
                  className={cn(
                    "w-full !rounded-xl !py-2.5 text-xs",
                    tier.featured && "!shadow-btn-brand",
                  )}
                  href={
                    isContact
                      ? "#contact"
                      : tier.id === "small"
                        ? "/booking?tier=small"
                        : tier.id === "medium"
                          ? "/booking?tier=medium"
                        : "/booking"
                  }
                >
                  {ctaLabel}
                </NeonButton>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
