"use client";

import Image from "next/image";
import {
  ArrowRightCircle,
  MapPin,
  PlayCircle,
  Star,
  Users,
  CalendarHeart,
  Trophy,
} from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { ui } from "@/lib/ui-strings";
import { pickLocalized, pickLocalizedList } from "@/types/site-content";

const AVATAR_STYLE_BY_INDEX = [
  {
    surface: "from-sky-200 via-cyan-100 to-white",
    borderAccent: "border-cyan-500",
  },
  {
    surface: "from-fuchsia-100 via-violet-100 to-white",
    borderAccent: "border-fuchsia-500",
  },
  {
    surface: "from-pink-100 via-purple-100 to-white",
    borderAccent: "border-[#FF2D95]",
  },
] as const;

const badgeIcons = [Trophy, Users, CalendarHeart, MapPin];

function badgeShown(hero: { badgeVisible?: boolean[] }, index: number) {
  return hero.badgeVisible?.[index] !== false;
}

export function Hero() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const t = ui(locale);
  const hero = content.hero;
  const badges = pickLocalizedList(hero.badges, locale);
  const visibleBadgeIndices = badges
    .map((label, idx) => ({ label, idx }))
    .filter(({ idx }) => badgeShown(hero, idx));
  const showBook = hero.showBookCta !== false;
  const showWatch = hero.showWatchVideoCta !== false;
  const showCtaRow = showBook || showWatch;

  if (content.sectionVisibility?.hero === false) return null;

  const bgImg =
    content.hero.backgroundImage?.trim() || "/hero-background.png";
  const bgVid = content.hero.backgroundVideo?.trim();

  return (
    <section
      id="home"
      className="relative min-h-[min(100dvh,720px)] w-full overflow-hidden pt-[5.5rem] sm:pt-24 lg:pt-0"
    >
      <div className="absolute inset-0">
        {bgVid ? (
          <video
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.03] contrast-[1.05] saturate-[1.03]"
            autoPlay
            muted
            loop
            playsInline
            poster={bgImg}
            aria-label="JeuLumi hero video background"
          >
            <source src={bgVid} />
          </video>
        ) : (
          <Image
            src={bgImg}
            alt="Players on the JeuLumi interactive LED game floor"
            fill
            priority
            className="object-cover object-center brightness-[1.03] contrast-[1.05] saturate-[1.03]"
            sizes="100vw"
            unoptimized={/^https?:\/\//.test(bgImg)}
          />
        )}
        <div className="absolute inset-0 bg-hero-overlay ju-hero-scrim" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02020F]/55 via-transparent to-[#050A30]/35 ju-hero-scrim-dusk" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(100dvh,720px)] max-w-[1440px] flex-col justify-end px-4 pb-12 pt-4 sm:px-6 sm:pb-14 lg:justify-center lg:pb-16 lg:pt-24 xl:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
          <div className="ju-on-dark max-w-3xl space-y-5">
            <div className="ju-hero-loc-pill inline-flex items-center gap-2 rounded-full border border-[#FF2D95]/55 bg-black/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_0_28px_rgba(255,45,149,0.28)] backdrop-blur-md">
              <MapPin className="size-4 text-ju-cyanGlow" aria-hidden />
              {locale === "fr" ? "LA SALLE (QC)" : "LA SALLE, QC"}
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)] sm:text-5xl md:text-[2.75rem] lg:text-6xl">
                <span className="block [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]">
                  {pickLocalized(content.hero.titleStep, locale)}
                </span>
                <span className="block text-gradient-game text-gradient-headline-glow [text-shadow:0_3px_28px_rgba(0,0,0,0.75)]">
                  {pickLocalized(content.hero.titleGame, locale)}
                </span>
              </h1>
              <p className="max-w-xl text-base font-medium text-ju-soft drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] sm:text-lg">
                {pickLocalized(content.hero.subtitle, locale)}
              </p>
            </div>

            {visibleBadgeIndices.length > 0 ? (
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {visibleBadgeIndices.map(({ label, idx }) => {
                  const Icon = badgeIcons[idx % badgeIcons.length] ?? Trophy;
                  return (
                    <div
                      key={`badge-${idx}`}
                      className="flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/95 backdrop-blur-md sm:px-3 sm:text-xs"
                    >
                      <span className="flex size-6 items-center justify-center rounded-full bg-ju-electric/15 text-ju-cyanGlow shadow-[0_0_12px_rgba(0,245,255,0.35)] sm:size-7">
                        <Icon className="size-3.5 sm:size-4" aria-hidden />
                      </span>
                      {label}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {showCtaRow ? (
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-start">
                {showBook ? (
                  <NeonButton
                    variant="gradient"
                    icon={ArrowRightCircle}
                    className="w-full justify-center sm:w-auto sm:min-w-[200px] !px-7 !py-3.5 text-[13px]"
                    href="/booking"
                  >
                    {t.bookExperience}
                  </NeonButton>
                ) : null}
                {showWatch ? (
                  <NeonButton
                    variant="outline-white"
                    icon={PlayCircle}
                    iconPosition="left"
                    className="w-full justify-center sm:w-auto sm:min-w-[200px] !border-white/35 !bg-black/30 !py-3.5 text-[13px]"
                  >
                    {t.watchVideo}
                  </NeonButton>
                ) : null}
              </div>
            ) : null}
          </div>

          {content.hero.googleMapsSummary?.visible !== false ? (
            <aside className="relative lg:mb-2 lg:justify-self-end">
              <div className="ju-hero-aside-card mx-auto max-w-sm rounded-2xl border border-white/12 bg-[#0D0221]/55 p-4 shadow-glass backdrop-blur-xl sm:max-w-none lg:mx-0 lg:w-[300px] xl:w-[320px]">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-ju-electric/18 via-transparent to-[#FF2D95]/20 opacity-90 blur-sm" />
                <div className="relative flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-3">
                      {(content.hero.googleMapsSummary?.avatars ?? []).map(
                        (a, idx) => {
                          const st =
                            AVATAR_STYLE_BY_INDEX[
                              idx % AVATAR_STYLE_BY_INDEX.length
                            ];
                          return (
                            <div
                              key={a.id}
                              title={a.displayName}
                              aria-label={a.displayName}
                              className={`relative flex size-9 items-center justify-center rounded-full border-2 bg-gradient-to-br ${st.surface} ${st.borderAccent} shadow-[0_2px_10px_rgba(0,0,0,0.18)] sm:size-10`}
                            >
                              <span className="text-[11px] font-extrabold tabular-nums tracking-tight text-slate-900 sm:text-[0.8125rem]">
                                {a.initials}
                              </span>
                            </div>
                          );
                        },
                      )}
                    </div>
                    <div>
                      <p className="text-base font-bold text-white sm:text-lg">
                        {content.hero.googleMapsSummary?.scoreText ?? "5.0/5"}{" "}
                        <span className="text-xs font-medium text-ju-muted sm:text-sm">
                          {pickLocalized(
                            content.hero.googleMapsSummary?.mapsLabel ?? {
                              en: "on Google Maps",
                              fr: "sur Google Maps",
                            },
                            locale,
                          )}
                        </span>
                      </p>
                      <p className="text-xs text-ju-muted sm:text-sm">
                        {pickLocalized(
                          content.hero.googleMapsSummary?.locationLine ?? {
                            en: "LaSalle, Quebec",
                            fr: "LaSalle (Québec)",
                          },
                          locale,
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 shrink-0 fill-[#FF2D95] text-[#FF2D95] sm:size-[1.05rem]"
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
