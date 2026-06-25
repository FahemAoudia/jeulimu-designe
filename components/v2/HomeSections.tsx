"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import {
  BentoCard,
  DisplayTitle,
  GhostBtn,
  LumiGridBg,
  PrimaryBtn,
  SectionLabel,
  StatPill,
} from "@/components/v3/primitives";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { t } from "@/lib/site-v2-content";
import { pickLocalized } from "@/types/site-content";
import { LumiFloor3D } from "@/components/v3/LumiFloor3D";
import { formatPrice, useV2Content } from "@/hooks/useV2Content";
import { cn } from "@/lib/cn";

export function HeroV2() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const { v2, pricing, visibility } = useV2Content();
  const hero = content.hero;
  const bgImg = hero.backgroundImage?.trim() || "/hero-background.png";
  const bgVid = hero.backgroundVideo?.trim();
  const h = v2.home.hero;
  const lines = t(h.headline, locale).split(". ").filter(Boolean);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        {bgVid ? (
          <video className="h-full w-full object-cover scale-105" autoPlay muted loop playsInline poster={bgImg}>
            <source src={bgVid} />
          </video>
        ) : (
          <Image src={bgImg} alt="" fill priority className="object-cover scale-105" sizes="100vw" unoptimized={/^https?:\/\//.test(bgImg)} />
        )}
        <div className="absolute inset-0 bg-[var(--ju-bg-deep)]/88 lg:bg-[var(--ju-bg-deep)]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ju-bg-deep)]/95 via-[var(--ju-bg-deep)]/70 to-[var(--ju-bg-deep)]/90 lg:bg-gradient-to-r lg:from-[var(--ju-bg-deep)]/95 lg:via-[var(--ju-bg-deep)]/55 lg:to-[var(--ju-bg-deep)]/25" />
        <LumiGridBg />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-10 pt-[4.75rem] sm:px-6 sm:pb-10 sm:pt-24 lg:justify-center lg:pb-16 lg:pt-24 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="ju-on-dark lg:col-span-7">
            <SectionLabel>{t(h.locationLabel, locale)}</SectionLabel>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-white">
              {lines[0] ?? t(h.headline, locale)}
              {lines[1] ? (
                <span className="block ju-hero-outline mt-1">{lines[1]}</span>
              ) : null}
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/60 sm:text-lg">{t(h.support, locale)}</p>

            <div className="mt-8 hidden flex-wrap gap-4 lg:flex">
              <PrimaryBtn href="/booking">{t(v2.home.finalCta.cta, locale)}</PrimaryBtn>
              <GhostBtn href="/groups-pricing">{t(h.ctaGroups, locale)}</GhostBtn>
            </div>
          </div>
          <div className="hidden flex-col items-center gap-4 lg:col-span-5 lg:flex">
            <LumiFloor3D className="w-full" showStage />
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
              {locale === "fr" ? "Dès" : "From"}{" "}
              <span className="text-ju-cyanGlow">
                {formatPrice(pricing.largeGroup.perPlayer)}
              </span>
              {locale === "fr" ? " / participant" : " / player"}
            </p>
          </div>
        </div>

        <div className="mt-10 w-full lg:hidden">
          <LumiFloor3D className="w-full max-w-[400px] mx-auto" showStage />
          <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
            {locale === "fr" ? "Dès" : "From"}{" "}
            <span className="text-ju-cyanGlow">{formatPrice(pricing.largeGroup.perPlayer)}</span>
            {locale === "fr" ? " / participant" : " / player"}
          </p>
        </div>
      </div>

      {visibility.marquee ? (
      <div className="relative z-10 border-y border-white/10 bg-black/70 backdrop-blur-md">
        <div className="flex overflow-hidden py-1 sm:py-0">
          <div className="ju-marquee-track flex gap-2 sm:gap-0">
            {[...v2.home.marquee, ...v2.home.marquee, ...v2.home.marquee].map((s, i) => (
              <StatPill key={i} value={s.v} label={t(s.l, locale)} />
            ))}
          </div>
        </div>
      </div>
      ) : null}
    </section>
  );
}

export function GlanceSection() {
  return null;
}

export function WhatIsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const img = content.gallery?.[0]?.image?.trim() || content.hero.backgroundImage || "/hero-background.png";
  const { v2 } = useV2Content();
  const w = v2.home.whatIs;

  return (
    <section id="experience" className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-28">
      <LumiGridBg className="opacity-40" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[460px]">
            <div className="absolute inset-0 overflow-hidden border border-white/10">
              <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={/^https?:\/\//.test(img)} />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030308]/85 via-transparent to-[#7B2CFF]/15" />
            </div>
          </div>
          <div>
            <BentoCard accent="cyan" className="!p-5 sm:!p-8 lg:!p-10">
              <SectionLabel>{t(w.sectionLabel, locale)}</SectionLabel>
              <DisplayTitle className="mt-3 !text-2xl sm:!text-3xl lg:!text-4xl">{t(w.title, locale)}</DisplayTitle>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{t(w.body, locale)}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {w.features.map((f, i) => (
                  <li key={i} className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                    <span className="text-ju-cyanGlow">▸</span> {t(f.title, locale)}
                  </li>
                ))}
              </ul>
              <GhostBtn href="/faq" className="mt-8 !text-[10px]">{t(w.cta, locale)}</GhostBtn>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowWorksSection() {
  const { locale } = useLocaleContext();
  const { v2, theme } = useV2Content();
  const h = v2.home.howWorks;
  const modeColors = [theme.cyan, theme.magenta, theme.purple];

  return (
    <section id="how-it-works" className="border-y border-white/10 bg-black/40 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>{t(h.sectionLabel, locale)}</SectionLabel>
        <DisplayTitle className="mt-3">{t(h.title, locale)}</DisplayTitle>
        <p className="mt-4 max-w-xl text-sm text-white/50">{t(h.body, locale)}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-5 lg:gap-6">
          {h.steps.map((step, i) => (
            <div key={i} className="relative pl-6 ju-mode-stripe" style={{ "--stripe-color": modeColors[i % 3] } as React.CSSProperties}>
              <span className="font-display text-4xl font-bold text-white/15">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide text-white">{t(step.title, locale)}</p>
              <p className="mt-2 text-xs text-white/45 leading-relaxed">{t(step.sub ?? { en: "", fr: "" }, locale)}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <GhostBtn href="#game-modes" className="!text-[10px]">{t(h.cta, locale)}</GhostBtn>
        </div>
      </div>
    </section>
  );
}

export function GameModesSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const { v2, theme } = useV2Content();
  const gm = v2.home.gameModes;
  const modeColors = [theme.cyan, theme.magenta, theme.purple];
  const modes = content.gameModes?.length ? content.gameModes.slice(0, 3) : null;

  return (
    <section id="game-modes" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>{t(gm.title, locale)}</SectionLabel>
        <DisplayTitle className="mt-3">{t(gm.subtitle, locale)}</DisplayTitle>

        <div className="mt-12 space-y-6">
          {(modes ?? []).map((m, i) => {
            const v2 = gm.modes[i];
            const img = m.image?.trim() || "/hero-background.png";
            const color = modeColors[i % modeColors.length];
            return (
              <article
                key={m.id}
                className={cn(
                  "group grid overflow-hidden border border-white/10 bg-[#0a0a12]/60 lg:grid-cols-2",
                  i % 2 === 1 && "[&>div:first-child]:lg:order-2",
                )}
                style={{ borderLeftColor: color, borderLeftWidth: 4 }}
              >
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[280px]">
                  <Image src={img} alt="" fill className="object-cover transition duration-700 group-hover:scale-105" sizes="50vw" unoptimized={/^https?:\/\//.test(img)} />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#030308]/80 to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
                  <p className="font-display text-[10px] uppercase tracking-[0.3em]" style={{ color }}>{v2 ? t(v2.tag, locale) : ""}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold uppercase text-white sm:text-3xl">{pickLocalized(m.name, locale)}</h3>
                  <p className="mt-4 text-sm text-white/50">{v2 ? t(v2.desc, locale) : pickLocalized(m.description, locale)}</p>
                  <GhostBtn href="/faq" className="mt-6 !text-[10px] inline-flex w-fit items-center gap-2">
                    {t(gm.cta, locale)} <ArrowRight className="size-3.5" />
                  </GhostBtn>
                </div>
              </article>
            );
          })}
          {!modes?.length &&
            gm.modes.map((m, i) => (
              <BentoCard key={m.id} accent={i === 0 ? "cyan" : i === 1 ? "pink" : "purple"}>
                <h3 className="font-display text-2xl font-bold uppercase text-white">{t(m.name, locale)}</h3>
                <p className="mt-2 text-sm text-white/50">{t(m.desc, locale)}</p>
              </BentoCard>
            ))}
        </div>
      </div>
    </section>
  );
}

export function ExperiencesSection() {
  const { locale } = useLocaleContext();
  const { v2, pricing } = useV2Content();
  const e = v2.home.experiences;

  const cards = [
    {
      href: "/birthdays",
      accent: "pink" as const,
      label: t(e.birthday.label, locale),
      title: t(e.birthday.title, locale),
      sub: t(e.birthday.sub, locale),
      cta: t(e.birthday.cta, locale),
      badge: formatPrice(pricing.birthday.package),
    },
    {
      href: "/groups-pricing",
      accent: "cyan" as const,
      label: t(e.groups.label, locale),
      title: t(e.groups.sub, locale),
      sub: `${formatPrice(pricing.smallGroup.perPlayer)} – ${formatPrice(pricing.largeGroup.perPlayer)} / player`,
      cta: t(e.groups.cta, locale),
      badge: t(e.groups.badge, locale),
    },
    {
      href: "/mobile-events",
      accent: "purple" as const,
      label: t(e.mobile.label, locale),
      title: t(e.mobile.title, locale),
      sub: t(e.mobile.sub, locale),
      cta: t(e.mobile.ctaLearn, locale),
      badge: t(e.mobile.badge, locale),
    },
  ];

  return (
    <section className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>{t(e.title, locale)}</SectionLabel>
        <DisplayTitle className="mt-3 !text-2xl sm:!text-3xl lg:!text-4xl">
          {t(e.subtitle, locale)}
        </DisplayTitle>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">{t(e.body, locale)}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => (
            <BentoCard
              key={card.href}
              href={card.href}
              accent={card.accent}
              className="ju-exp-card !min-h-[220px] !p-6 sm:!p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                  {card.label}
                </span>
                <span className="shrink-0 rounded-sm border border-white/15 bg-black/40 px-2 py-1 text-[10px] font-bold text-ju-cyanGlow">
                  {card.badge}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold uppercase leading-snug text-white sm:text-xl line-clamp-3">
                {card.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/45 line-clamp-2">{card.sub}</p>
              <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF2D95] group-hover:text-ju-cyanGlow">
                {card.cta} <ArrowRight className="size-3.5 shrink-0" />
              </span>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const { v2, theme } = useV2Content();
  const reviews = content.testimonialReviews ?? [];
  const r = v2.home.reviews;
  const items =
    reviews.length > 0
      ? reviews
      : [
          { id: "1", quote: { en: "Kids had an amazing time!", fr: "Les enfants ont adoré !" }, name: { en: "Parent", fr: "Parent" }, meta: { en: "Google", fr: "Google" }, when: { en: "", fr: "" } },
          { id: "2", quote: { en: "Best birthday party ever.", fr: "Meilleure fête d’anniversaire." }, name: { en: "Family", fr: "Famille" }, meta: { en: "Google", fr: "Google" }, when: { en: "", fr: "" } },
        ];

  return (
    <section id="reviews" className="bg-black/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>{t(r.sectionLabel, locale)}</SectionLabel>
        <DisplayTitle className="mt-3 !text-3xl">{t(r.title, locale)}</DisplayTitle>
        <div className="ju-snap-x mt-10 flex gap-4 overflow-x-auto pb-4">
          {items.map((rev) => (
            <article key={rev.id} className="w-[min(100%,340px)] shrink-0 border border-white/10 bg-[#0a0a12] p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5" style={{ fill: theme.magenta, color: theme.magenta }} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                &ldquo;{pickLocalized(rev.quote, locale)}&rdquo;
              </p>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-ju-cyanGlow">
                {pickLocalized(rev.name, locale)}
              </p>
            </article>
          ))}
        </div>
        <GhostBtn href="https://www.google.com/maps" className="mt-8 !text-[10px]">{t(r.cta, locale)}</GhostBtn>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  const { locale } = useLocaleContext();
  const { v2, theme } = useV2Content();
  const f = v2.home.finalCta;

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
      <div
        className="relative mx-auto max-w-[1400px] overflow-hidden border px-5 py-12 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20"
        style={{
          borderColor: `${theme.magenta}4d`,
          background: `linear-gradient(to right, ${theme.magenta}33, ${theme.purple}26, ${theme.cyan}1a)`,
        }}
      >
        <LumiGridBg className="opacity-50" />
        <div className="relative">
          <DisplayTitle className="!text-3xl sm:!text-4xl lg:!text-6xl">{t(f.title, locale)}</DisplayTitle>
          <p className="mt-3 text-sm text-white/55 sm:mt-4">{t(f.sub, locale)}</p>
          <PrimaryBtn href="/booking" className="mt-8 w-full justify-center sm:mt-10 sm:w-auto !px-10 !py-3.5 !text-xs">{t(f.cta, locale)}</PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
