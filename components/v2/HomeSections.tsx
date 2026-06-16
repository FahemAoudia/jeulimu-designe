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
import { v2Home, t } from "@/lib/site-v2-content";
import { pickLocalized } from "@/types/site-content";
import { cn } from "@/lib/cn";

const GLANCE = [
  { v: "16×24", l: { en: "LED Floor ft", fr: "pi plancher" } },
  { v: "24", l: { en: "Max players", fr: "Joueurs max" } },
  { v: "3", l: { en: "Game modes", fr: "Modes de jeu" } },
  { v: "7+", l: { en: "Ages", fr: "Âges" } },
  { v: "🔒", l: { en: "Private", fr: "Privé" } },
];

const MODE_COLORS = ["#00F5FF", "#FF2D95", "#7B2CFF"];

export function HeroV2() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const hero = content.hero;
  const bgImg = hero.backgroundImage?.trim() || "/hero-background.png";
  const bgVid = hero.backgroundVideo?.trim();
  const h = v2Home.hero;
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
        <div className="absolute inset-0 bg-[#030308]/75" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B2CFF]/25 via-transparent to-[#FF2D95]/20" />
        <LumiGridBg />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-10 pt-28 sm:px-6 lg:justify-center lg:pb-16 lg:pt-24 lg:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="ju-on-dark lg:col-span-7">
            <SectionLabel>{locale === "fr" ? "LaSalle, QC" : "LaSalle, QC"}</SectionLabel>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-white">
              {lines[0] ?? t(h.headline, locale)}
              {lines[1] ? (
                <span className="block ju-hero-outline mt-1">{lines[1]}</span>
              ) : null}
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/60 sm:text-lg">{t(h.support, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryBtn href="/booking">{t(v2Home.finalCta.cta, locale)}</PrimaryBtn>
              <GhostBtn href="/groups-pricing">{t(h.ctaGroups, locale)}</GhostBtn>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="ju-bento border border-cyan-400/20 bg-black/50 p-8 backdrop-blur-md">
              <p className="font-display text-xs uppercase tracking-[0.25em] text-ju-cyanGlow">At a glance</p>
              <ul className="mt-6 space-y-4">
                {v2Home.glance.slice(0, 5).map((item, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                    <span className="text-white/50">{t(item.title, locale)}</span>
                    <span className="font-display font-bold text-white">{GLANCE[i]?.v ?? "—"}</span>
                  </li>
                ))}
              </ul>
              <GhostBtn href="/birthdays" className="mt-8 w-full !text-[10px]">
                {t(h.ctaBirthdays, locale)}
              </GhostBtn>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-y border-white/10 bg-black/60 backdrop-blur-md">
        <div className="flex overflow-hidden">
          <div className="ju-marquee-track flex gap-0">
            {[...GLANCE, ...GLANCE, ...GLANCE].map((s, i) => (
              <StatPill key={i} value={s.v} label={t(s.l, locale)} />
            ))}
          </div>
        </div>
      </div>
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
  const w = v2Home.whatIs;

  return (
    <section id="experience" className="relative px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <LumiGridBg className="opacity-40" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="relative lg:col-span-7 lg:-ml-10">
            <div className="relative aspect-[16/11] overflow-hidden border border-white/10 lg:aspect-auto lg:h-[520px]">
              <Image src={img} alt="" fill className="object-cover" sizes="60vw" unoptimized={/^https?:\/\//.test(img)} />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030308] via-transparent to-[#7B2CFF]/20" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:-ml-16 lg:mt-12">
            <BentoCard accent="cyan" className="!p-8 lg:!p-10">
              <SectionLabel>{locale === "fr" ? "L’expérience" : "The experience"}</SectionLabel>
              <DisplayTitle className="mt-4 !text-3xl lg:!text-4xl">{t(w.title, locale)}</DisplayTitle>
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
  const h = v2Home.howWorks;

  return (
    <section id="how-it-works" className="border-y border-white/10 bg-black/40 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>{locale === "fr" ? "Gameplay" : "Gameplay"}</SectionLabel>
        <DisplayTitle className="mt-3">{t(h.title, locale)}</DisplayTitle>
        <p className="mt-4 max-w-xl text-sm text-white/50">{t(h.body, locale)}</p>

        <div className="mt-14 grid gap-6 md:grid-cols-5">
          {h.steps.map((step, i) => (
            <div key={i} className="relative pl-6 ju-mode-stripe" style={{ "--stripe-color": MODE_COLORS[i % 3] } as React.CSSProperties}>
              <span className="font-display text-4xl font-bold text-white/15">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide text-white">{t(step.title, locale)}</p>
              <p className="mt-2 text-xs text-white/45 leading-relaxed">{t(step.sub, locale)}</p>
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
  const gm = v2Home.gameModes;
  const modes = content.gameModes?.length ? content.gameModes.slice(0, 3) : null;

  return (
    <section id="game-modes" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>{t(gm.title, locale)}</SectionLabel>
        <DisplayTitle className="mt-3">{locale === "fr" ? "Trois univers" : "Three worlds"}</DisplayTitle>

        <div className="mt-12 space-y-6">
          {(modes ?? []).map((m, i) => {
            const v2 = gm.modes[i];
            const img = m.image?.trim() || "/hero-background.png";
            const color = MODE_COLORS[i];
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
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="font-display text-[10px] uppercase tracking-[0.3em]" style={{ color }}>{v2 ? t(v2.tag, locale) : ""}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold uppercase text-white">{pickLocalized(m.name, locale)}</h3>
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
  const e = v2Home.experiences;

  return (
    <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>{t(e.title, locale)}</SectionLabel>
        <p className="mt-4 max-w-2xl text-sm text-white/50">{t(e.body, locale)}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-4 md:h-[420px]">
          <BentoCard href="/birthdays" accent="pink" className="md:col-span-7 md:row-span-2 flex flex-col justify-end !p-10">
            <DisplayTitle className="!text-2xl lg:!text-3xl">{t(e.birthday.title, locale)}</DisplayTitle>
            <p className="mt-2 text-sm text-white/50">{t(e.birthday.sub, locale)}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF2D95]">
              {t(e.birthday.cta, locale)} <ArrowRight className="size-3.5" />
            </span>
          </BentoCard>
          <BentoCard href="/groups-pricing" accent="cyan" className="md:col-span-5 md:row-span-1 !p-6">
            <h3 className="font-display text-lg font-bold uppercase text-white">{t(e.groups.title, locale)}</h3>
            <p className="mt-2 text-xs text-white/45">{t(e.groups.cta, locale)}</p>
          </BentoCard>
          <BentoCard href="/mobile-events" accent="purple" className="md:col-span-5 md:row-span-1 !p-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ju-yellow">{t(e.mobile.badge, locale)}</span>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-white">{t(e.mobile.title, locale)}</h3>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const reviews = content.testimonialReviews ?? [];
  const r = v2Home.reviews;
  const items =
    reviews.length > 0
      ? reviews
      : [
          { id: "1", quote: { en: "Kids had an amazing time!", fr: "Les enfants ont adoré !" }, name: { en: "Parent", fr: "Parent" }, meta: { en: "Google", fr: "Google" }, when: { en: "", fr: "" } },
          { id: "2", quote: { en: "Best birthday party ever.", fr: "Meilleure fête d’anniversaire." }, name: { en: "Family", fr: "Famille" }, meta: { en: "Google", fr: "Google" }, when: { en: "", fr: "" } },
        ];

  return (
    <section id="reviews" className="bg-black/50 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Google</SectionLabel>
        <DisplayTitle className="mt-3 !text-3xl">{t(r.title, locale)}</DisplayTitle>
        <div className="ju-snap-x mt-10 flex gap-4 overflow-x-auto pb-4">
          {items.map((rev) => (
            <article key={rev.id} className="w-[min(100%,340px)] shrink-0 border border-white/10 bg-[#0a0a12] p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-[#FF2D95] text-[#FF2D95]" />
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
  const f = v2Home.finalCta;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden border border-[#FF2D95]/30 bg-gradient-to-r from-[#FF2D95]/20 via-[#7B2CFF]/15 to-cyan-500/10 px-8 py-20 text-center sm:px-16">
        <LumiGridBg className="opacity-50" />
        <div className="relative">
          <DisplayTitle className="!text-4xl sm:!text-5xl lg:!text-6xl">{t(f.title, locale)}</DisplayTitle>
          <p className="mt-4 text-white/55">{t(f.sub, locale)}</p>
          <PrimaryBtn href="/booking" className="mt-10 !px-12 !py-4 !text-xs">{t(f.cta, locale)}</PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
