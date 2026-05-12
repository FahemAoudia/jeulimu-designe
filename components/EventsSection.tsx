"use client";

import {
  Armchair,
  CalendarDays,
  Sparkles,
  UtensilsCrossed,
  PartyPopper,
} from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized, type SpaceDetail } from "@/types/site-content";

function SpaceIcon({ icon }: { icon: string }) {
  const common = "size-5 text-ju-cyanGlow sm:size-6";
  switch (icon) {
    case "chair":
      return <Armchair className={common} aria-hidden />;
    case "food":
      return <UtensilsCrossed className={common} aria-hidden />;
    case "calendar":
      return <CalendarDays className={common} aria-hidden />;
    default:
      return <Sparkles className={common} aria-hidden />;
  }
}

function SpaceRows({ details }: { details: SpaceDetail[] }) {
  const { locale } = useLocaleContext();
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {details.map((d, i) => (
        <li
          key={i}
          className="ju-events-space-row flex gap-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-ju-electric/35 bg-ju-electric/10">
            <SpaceIcon icon={d.icon} />
          </span>
          <div>
            <h4 className="text-sm font-bold text-ju-yellow">
              {pickLocalized(d.title, locale)}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-ju-soft">
              {pickLocalized(d.body, locale)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EventsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);
  const party = content.eventsParty;

  if (!(content.sectionVisibility?.events ?? true)) return null;

  const promo = content.eventsPromoImage?.trim() ?? "";

  return (
    <section
      id="events"
      className="relative z-10 scroll-mt-28 px-4 pb-10 sm:px-6 lg:px-8 xl:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        {promo ? (
          <div className="ju-public-bleed mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_0_40px_rgba(0,174,239,0.08)]">
            <div className="relative aspect-[2/1] max-h-[min(340px,42vh)] w-full sm:aspect-[21/9]">
              <Image
                src={promo}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1440px) 100vw, 1440px"
                unoptimized={promo.startsWith("http")}
              />
            </div>
          </div>
        ) : null}
        <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard glow="cyan" className="h-full p-5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-ju-pinkGlow">
            {pickLocalized(party.sparkle, locale)}
          </p>
          <h2 className="mt-2 text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
            {pickLocalized(party.title, locale)}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ju-soft">
            {pickLocalized(party.priceLine, locale)}
          </p>
          <p className="mt-6 text-sm font-bold text-white">
            {pickLocalized(party.idealTitle, locale)}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ju-soft">
            {party.idealFor.map((line, i) => (
              <li key={i}>{pickLocalized(line, locale)}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-bold text-white">
            {pickLocalized(party.spaceTitle, locale)}
          </p>
          <SpaceRows details={party.spaceDetails} />
          <NeonButton
            variant="gradient"
            className="mt-6 w-full !rounded-xl sm:w-auto"
            href="/booking?tier=event"
          >
            {pickLocalized(party.cta, locale)}
          </NeonButton>
        </GlassCard>

        <GlassCard glow="magenta" className="h-full p-5 sm:p-8">
          <div className="flex items-center gap-2">
            <PartyPopper className="size-6 text-ju-magenta" aria-hidden />
            <h3 className="text-lg font-bold uppercase tracking-wide text-white">
              {t.events.upcoming}
            </h3>
          </div>
          {content.eventsList.length === 0 ? (
            <div className="ju-events-empty mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/25 px-4 py-14 text-center">
              <p className="text-base font-bold text-white">{t.events.noneTitle}</p>
              <p className="mt-3 max-w-sm text-sm text-ju-muted">{t.events.noneBody}</p>
            </div>
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {content.eventsList.map((ev) => {
                const img = ev.image?.trim() ?? "";
                const desc = pickLocalized(ev.description, locale).trim();
                return (
                <li
                  key={ev.id}
                  className="ju-events-row overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/45 via-black/35 to-[#0D0221]/40 shadow-[0_0_32px_rgba(123,44,255,0.1)] backdrop-blur-md transition duration-300 hover:border-ju-electric/30 hover:shadow-[0_0_36px_rgba(0,245,255,0.12)]"
                >
                  <div
                    className={`flex flex-col ${img ? "sm:flex-row sm:items-stretch" : ""}`}
                  >
                    {img ? (
                      <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-[min(44%,260px)] sm:min-h-[168px]">
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width:640px) 100vw, 260px"
                          unoptimized={img.startsWith("http")}
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#02020F]/25 sm:bg-gradient-to-l"
                          aria-hidden
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-ju-cyanGlow">
                        {pickLocalized(ev.dateLabel, locale)}
                      </p>
                      <p className="mt-1 text-lg font-bold leading-snug text-white">
                        {pickLocalized(ev.title, locale)}
                      </p>
                      {desc ? (
                        <p className="mt-2 text-sm leading-relaxed text-ju-soft">
                          {desc}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
              })}
            </ul>
          )}
        </GlassCard>
      </div>
      </div>
    </section>
  );
}
