"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { LumiGridBg } from "@/components/v3/primitives";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { t } from "@/lib/site-v2-content";
import { pickLocalized } from "@/types/site-content";
import { LumiFloor3D } from "@/components/v3/LumiFloor3D";
import { SectionPrimaryBtn, SectionGhostBtn } from "@/components/SectionButtons";
import { SectionStatPill } from "@/components/SectionStatPill";
import {
  SectionBodyText,
  SectionCard,
  SectionCardIcon,
  SectionCardText,
  SectionCardTitle,
  SectionHeading,
  SectionHeadingLine1,
  SectionHeadingLine2,
  SectionIcon,
  SectionLabelText,
  SectionShell,
  SectionSubtext,
  SectionTitleText,
} from "@/components/SectionShell";
import { SectionItemIcon, SectionItemShell } from "@/lib/section-icons";
import { GameModeMedia } from "@/components/v2/GameModeMedia";
import { useSectionStyle } from "@/hooks/useSectionStyle";
import { useV2Content } from "@/hooks/useV2Content";
import { cn } from "@/lib/cn";

const MODE_COLORS = ["#00F5FF", "#FF2D95", "#7B2CFF"];

export function HeroV2() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const { v2 } = useV2Content();
  const hero = content.hero;
  const bgImg = hero.backgroundImage?.trim() || "/hero-background.svg";
  const bgVid = hero.backgroundVideo?.trim();
  const h = v2.home.hero;
  const heroStyle = useSectionStyle("home.hero");
  const lines = t(h.headline, locale).split(". ").filter(Boolean);

  return (
    <SectionShell id="home.hero" className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        {bgVid ? (
          <video className="h-full w-full object-cover scale-105" autoPlay muted loop playsInline poster={bgImg}>
            <source src={bgVid} />
          </video>
        ) : (
          <Image src={bgImg} alt="" fill priority className="object-cover scale-105" sizes="100vw" unoptimized={/^https?:\/\//.test(bgImg)} />
        )}
        <div className="absolute inset-0 bg-[#030308]/88 lg:bg-[#030308]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/95 via-[#030308]/70 to-[#030308]/90 lg:bg-gradient-to-r lg:from-[#030308]/95 lg:via-[#030308]/55 lg:to-[#030308]/25" />
        <LumiGridBg />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-10 ju-pt-nav sm:px-6 sm:pb-10 lg:justify-center lg:pb-16 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="ju-on-dark lg:col-span-7">
            <SectionIcon>
              <SectionLabelText>{t(h.locationLabel, locale)}</SectionLabelText>
            </SectionIcon>
            <SectionHeading className="mt-4">
              <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight">
                <SectionHeadingLine1>{lines[0] ?? t(h.headline, locale)}</SectionHeadingLine1>
                {lines[1] ? (
                  <SectionHeadingLine2 className="mt-1 block">{lines[1]}</SectionHeadingLine2>
                ) : null}
              </h1>
            </SectionHeading>
            <SectionBodyText className="mt-6 max-w-lg text-base sm:text-lg">
              {t(h.support, locale)}
            </SectionBodyText>

            <div className="mt-8 flex flex-wrap gap-4">
              <SectionPrimaryBtn href="/birthdays" config={heroStyle.primaryButton}>
                {t(h.ctaBirthdays, locale)}
              </SectionPrimaryBtn>
              <SectionGhostBtn href="/groups-events" config={heroStyle.secondaryButton}>
                {t(h.ctaGroups, locale)}
              </SectionGhostBtn>
            </div>
          </div>
          <div className="hidden flex-col items-center gap-4 lg:col-span-5 lg:flex">
            <LumiFloor3D className="w-full" showStage />
          </div>
        </div>

        <div className="mt-10 w-full lg:hidden">
          <LumiFloor3D className="w-full max-w-[400px] mx-auto" showStage />
        </div>
      </div>
    </SectionShell>
  );
}

export function HomeMarqueeSection() {
  const { locale } = useLocaleContext();
  const { v2, visibility } = useV2Content();
  const marqueeStyle = useSectionStyle("home.marquee");

  if (!visibility.marquee) return null;

  return (
    <SectionShell
      id="home.marquee"
      className="relative z-10 border-y border-white/10 bg-black/70 backdrop-blur-md"
    >
      <div className="flex overflow-hidden py-1 sm:py-0">
        <div className="ju-marquee-track flex gap-2 sm:gap-0">
          {[...v2.home.marquee, ...v2.home.marquee, ...v2.home.marquee].map((s, i) => {
            const key = String(i % v2.home.marquee.length);
            const itemStyle = marqueeStyle.items?.[key];
            return (
              <SectionStatPill
                key={i}
                value={s.v}
                label={t(s.l, locale)}
                itemStyle={itemStyle}
                iconFirst={Boolean(itemStyle?.iconEmoji || itemStyle?.iconLucide || itemStyle?.iconImage)}
              />
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

export function GlanceSection() {
  const { locale } = useLocaleContext();
  const { v2 } = useV2Content();
  const items = v2.home.glance ?? [];
  const glanceStyle = useSectionStyle("home.glance");

  if (!items.length) return null;

  return (
    <SectionShell id="home.glance" className="border-b border-white/10 bg-black/50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {items.map((item, i) => {
          const itemStyle = glanceStyle.items?.[String(i)];
          return (
            <SectionItemShell
              key={i}
              itemStyle={itemStyle}
              className="border border-white/10 bg-[#0a0a12]/80 px-4 py-5 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <SectionItemIcon itemStyle={itemStyle} contentIcon={item.icon} size="size-6" />
                <p className="ju-item-title font-display text-2xl font-bold text-ju-cyanGlow">
                  {t(item.title, locale)}
                </p>
                <p className="ju-item-text text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                  {item.sub ? t(item.sub, locale) : ""}
                </p>
              </div>
            </SectionItemShell>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function WhatIsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const img = content.gallery?.[0]?.image?.trim() || content.hero.backgroundImage || "/hero-background.svg";
  const { v2 } = useV2Content();
  const w = v2.home.whatIs;
  const style = useSectionStyle("home.whatIs");

  return (
    <SectionShell id="home.whatIs" className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-28">
      <LumiGridBg className="opacity-40" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[460px]">
            <div className="ju-section-card absolute inset-0 overflow-hidden border border-white/10">
              <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={/^https?:\/\//.test(img)} />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030308]/85 via-transparent to-[#7B2CFF]/15" />
            </div>
          </div>
          <SectionCard className="!p-5 sm:!p-8 lg:!p-10">
            <SectionLabelText>{t(w.sectionLabel, locale)}</SectionLabelText>
            <SectionTitleText className="mt-3 font-display text-2xl font-extrabold uppercase sm:text-3xl lg:text-4xl">
              {t(w.title, locale)}
            </SectionTitleText>
            <SectionBodyText className="mt-4 text-sm leading-relaxed">
              {t(w.body, locale)}
            </SectionBodyText>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {w.features.map((f, i) => {
                const itemStyle = style.items?.[String(i)];
                return (
                  <SectionItemShell key={i} itemStyle={itemStyle} className="rounded-lg border border-white/5 p-3">
                    <div className="flex gap-2">
                      <SectionCardIcon>
                        <SectionItemIcon itemStyle={itemStyle} contentIcon={f.icon} size="size-4" />
                      </SectionCardIcon>
                      <div>
                        <SectionCardTitle className="!normal-case !tracking-wide">
                          {t(f.title, locale)}
                        </SectionCardTitle>
                        {f.sub ? (
                          <SectionCardText className="mt-1 !normal-case !text-xs leading-relaxed">
                            {t(f.sub, locale)}
                          </SectionCardText>
                        ) : null}
                      </div>
                    </div>
                  </SectionItemShell>
                );
              })}
            </ul>
            <SectionGhostBtn href="/faq" config={style.primaryButton} className="mt-8 !text-[10px]">
              {t(w.cta, locale)}
            </SectionGhostBtn>
          </SectionCard>
        </div>
      </div>
    </SectionShell>
  );
}

export function HowWorksSection() {
  const { locale } = useLocaleContext();
  const { v2 } = useV2Content();
  const h = v2.home.howWorks;
  const style = useSectionStyle("home.howWorks");

  return (
    <SectionShell
      id="home.howWorks"
      className="border-y border-white/10 bg-black/40 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabelText>{t(h.sectionLabel, locale)}</SectionLabelText>
        <SectionTitleText className="mt-3 font-display text-3xl font-extrabold uppercase sm:text-4xl lg:text-5xl">
          {t(h.title, locale)}
        </SectionTitleText>
        <SectionBodyText className="mt-4 max-w-xl text-sm">{t(h.body, locale)}</SectionBodyText>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-5 lg:gap-6">
          {h.steps.map((step, i) => {
            const itemStyle = style.items?.[String(i)];
            const stripe = itemStyle?.iconColor || MODE_COLORS[i % 3];
            return (
              <SectionItemShell
                key={i}
                itemStyle={itemStyle}
                className="relative pl-6 ju-mode-stripe"
                style={{ "--stripe-color": stripe } as React.CSSProperties}
              >
                <span className="ju-item-title font-display text-4xl font-bold text-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="ju-item-title mt-2 font-display text-sm font-bold uppercase tracking-wide text-white">
                  {t(step.title, locale)}
                </p>
                <p className="ju-item-text mt-2 text-xs leading-relaxed text-white/45">
                  {t(step.sub ?? { en: "", fr: "" }, locale)}
                </p>
              </SectionItemShell>
            );
          })}
        </div>
        <div className="mt-12">
          <SectionGhostBtn href="#game-modes" config={style.primaryButton} className="!text-[10px]">
            {t(h.cta, locale)}
          </SectionGhostBtn>
        </div>
      </div>
    </SectionShell>
  );
}

export function GameModesSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const { v2 } = useV2Content();
  const gm = v2.home.gameModes;
  const style = useSectionStyle("home.gameModes");
  const modes = content.gameModes?.length ? content.gameModes.slice(0, 3) : null;

  return (
    <SectionShell id="home.gameModes" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabelText>{t(gm.title, locale)}</SectionLabelText>
        <SectionTitleText className="mt-3 font-display text-3xl font-extrabold uppercase sm:text-4xl lg:text-5xl">
          {t(gm.subtitle, locale)}
        </SectionTitleText>

        <div className="mt-12 space-y-6">
          {(modes ?? []).map((m, i) => {
            const v2m = gm.modes[i];
            const fallback = `/images/${m.id === "lumivs" ? "lumivs" : m.id === "lumilogik" ? "lumilogik" : "lumiquest"}.svg`;
            const color = MODE_COLORS[i];
            return (
              <article
                key={m.id}
                className={cn(
                  "ju-section-card group grid overflow-hidden border border-white/10 bg-[#0a0a12]/60 lg:grid-cols-2",
                  i % 2 === 1 && "[&>div:first-child]:lg:order-2",
                )}
                style={{ borderLeftColor: color, borderLeftWidth: 4 }}
              >
                <div className="relative flex items-center justify-center bg-black/25 p-4 sm:p-6 lg:min-h-[300px]">
                  <GameModeMedia
                    image={m.image}
                    video={m.video}
                    alt={pickLocalized(m.name, locale)}
                    accentColor={color}
                    fallbackSrc={fallback}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
                  <p className="font-display text-[10px] uppercase tracking-[0.3em]" style={{ color }}>
                    {v2m ? t(v2m.tag, locale) : ""}
                  </p>
                  <h3 className="ju-section-card-title mt-2 font-display text-2xl font-bold uppercase sm:text-3xl">
                    {pickLocalized(m.name, locale)}
                  </h3>
                  <SectionCardText className="mt-4 text-sm">
                    {v2m ? t(v2m.desc, locale) : pickLocalized(m.description, locale)}
                  </SectionCardText>
                  <SectionGhostBtn href="/faq" config={style.primaryButton} className="mt-6 !text-[10px] inline-flex w-fit items-center gap-2">
                    {t(gm.cta, locale)} <ArrowRight className="size-3.5" />
                  </SectionGhostBtn>
                </div>
              </article>
            );
          })}
          {!modes?.length &&
            gm.modes.map((m) => (
              <SectionCard key={m.id} className="!p-6">
                <SectionCardTitle className="!text-2xl">{t(m.name, locale)}</SectionCardTitle>
                <SectionCardText className="mt-2 text-sm">{t(m.desc, locale)}</SectionCardText>
              </SectionCard>
            ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function ExperiencesSection() {
  const { locale } = useLocaleContext();
  const { v2 } = useV2Content();
  const e = v2.home.experiences;
  const style = useSectionStyle("home.experiences");

  const cards = [
    {
      key: "0",
      href: "/birthdays",
      label: t(e.birthday.label, locale),
      title: t(e.birthday.title, locale),
      sub: t(e.birthday.sub, locale),
      cta: t(e.birthday.cta, locale),
      isGroups: false,
    },
    {
      key: "1",
      href: "/groups-events",
      label: t(e.groups.label, locale),
      title: t(e.groups.title, locale),
      sub: "",
      cta: t(e.groups.cta, locale),
      isGroups: true,
    },
    {
      key: "2",
      href: "/mobile-events",
      label: t(e.mobile.label, locale),
      title: t(e.mobile.title, locale),
      sub: t(e.mobile.sub, locale),
      cta: t(e.mobile.ctaLearn, locale),
      isGroups: false,
    },
  ];

  return (
    <SectionShell id="home.experiences" className="border-t border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabelText>{t(e.title, locale)}</SectionLabelText>
        <SectionTitleText className="mt-3 text-2xl font-extrabold uppercase sm:text-3xl lg:text-4xl">
          {t(e.subtitle, locale)}
        </SectionTitleText>
        <SectionBodyText className="mt-4 max-w-2xl text-sm leading-relaxed">
          {t(e.body, locale)}
        </SectionBodyText>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => {
            const itemStyle = style.items?.[card.key];
            if (itemStyle?.visible === false) return null;
            return (
              <SectionCard
                key={card.href}
                className={cn(
                  "ju-exp-card group !min-h-[220px] !p-6 sm:!p-7 transition hover:border-white/20",
                  card.isGroups && "!min-h-[280px]",
                )}
                style={{
                  background: itemStyle?.background || undefined,
                  borderColor: itemStyle?.borderColor || undefined,
                }}
              >
                <a href={card.href} className="flex h-full flex-col">
                  <span className="ju-item-text text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    {card.label}
                  </span>
                  <h3 className="ju-item-title mt-4 font-display text-lg font-bold uppercase leading-snug text-white sm:text-xl">
                    {card.title}
                  </h3>
                  {card.isGroups ? (
                    <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/50">
                      {e.groups.perfectFor.map((line, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="ju-section-icon shrink-0">▸</span>
                          <span>{t(line, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ju-item-text mt-2 text-xs leading-relaxed text-white/45 line-clamp-3">
                      {card.sub}
                    </p>
                  )}
                  <span className="ju-section-accent mt-auto pt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF2D95] group-hover:text-ju-cyanGlow">
                    {card.cta} <ArrowRight className="size-3.5 shrink-0" />
                  </span>
                </a>
              </SectionCard>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

export function ReviewsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const reviews = content.testimonialReviews ?? [];
  const { v2 } = useV2Content();
  const r = v2.home.reviews;
  const style = useSectionStyle("home.reviews");
  const items =
    reviews.length > 0
      ? reviews
      : [
          { id: "1", quote: { en: "Kids had an amazing time!", fr: "Les enfants ont adoré !" }, name: { en: "Parent", fr: "Parent" }, meta: { en: "Google", fr: "Google" }, when: { en: "", fr: "" } },
          { id: "2", quote: { en: "Best birthday party ever.", fr: "Meilleure fête d’anniversaire." }, name: { en: "Family", fr: "Famille" }, meta: { en: "Google", fr: "Google" }, when: { en: "", fr: "" } },
        ];

  return (
    <SectionShell id="home.reviews" className="bg-black/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabelText>{t(r.sectionLabel, locale)}</SectionLabelText>
        <SectionTitleText className="mt-3 text-3xl font-extrabold uppercase">
          {t(r.title, locale)}
        </SectionTitleText>
        <div className="ju-snap-x mt-10 flex gap-4 overflow-x-auto pb-4">
          {items.map((rev) => (
            <SectionCard key={rev.id} className="w-[min(100%,340px)] shrink-0 !p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-[#FF2D95] text-[#FF2D95]" />
                ))}
              </div>
              <SectionCardText className="mt-4 text-sm leading-relaxed !text-white/75">
                &ldquo;{pickLocalized(rev.quote, locale)}&rdquo;
              </SectionCardText>
              <SectionCardTitle className="mt-4 !text-xs !tracking-wider text-ju-cyanGlow">
                {pickLocalized(rev.name, locale)}
              </SectionCardTitle>
            </SectionCard>
          ))}
        </div>
        <SectionGhostBtn href="https://www.google.com/maps" config={style.primaryButton} className="mt-8 !text-[10px]">
          {t(r.cta, locale)}
        </SectionGhostBtn>
      </div>
    </SectionShell>
  );
}

export function FinalCtaSection() {
  const { locale } = useLocaleContext();
  const { v2 } = useV2Content();
  const f = v2.home.finalCta;
  const style = useSectionStyle("home.finalCta");

  return (
    <SectionShell id="home.finalCta" className="px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
      <SectionCard className="relative mx-auto max-w-[1400px] overflow-hidden border-[#FF2D95]/30 bg-gradient-to-r from-[#FF2D95]/20 via-[#7B2CFF]/15 to-cyan-500/10 px-5 py-12 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <LumiGridBg className="opacity-50" />
        <div className="relative">
          <SectionTitleText className="text-3xl font-extrabold uppercase sm:text-4xl lg:text-6xl">
            {t(f.title, locale)}
          </SectionTitleText>
          <SectionSubtext className="mt-3 text-sm sm:mt-4">{t(f.sub, locale)}</SectionSubtext>
          <SectionPrimaryBtn href="/booking" config={style.primaryButton} className="mt-8 w-full justify-center sm:mt-10 sm:w-auto !px-10 !py-3.5 !text-xs">
            {t(f.cta, locale)}
          </SectionPrimaryBtn>
        </div>
      </SectionCard>
    </SectionShell>
  );
}
