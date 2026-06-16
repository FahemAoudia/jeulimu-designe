"use client";

import Image from "next/image";
import {
  Brain,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section, SectionHeading } from "@/components/v2/Section";
import { IconCard, StatCard } from "@/components/v2/IconCard";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { v2Home, t } from "@/lib/site-v2-content";
import { pickLocalized } from "@/types/site-content";
import { cn } from "@/lib/cn";

const GLANCE_EMOJI = ["📐", "👥", "🎮", "🏆", "🔒", "🧑‍🏫", "🎯"];

export function HeroV2() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const hero = content.hero;
  const bgImg = hero.backgroundImage?.trim() || "/hero-background.png";
  const bgVid = hero.backgroundVideo?.trim();
  const h = v2Home.hero;

  return (
    <section className="relative min-h-[min(100dvh,900px)] w-full overflow-hidden">
      <div className="absolute inset-0">
        {bgVid ? (
          <video
            className="absolute inset-0 h-full w-full object-cover brightness-[1.05] contrast-[1.08]"
            autoPlay
            muted
            loop
            playsInline
            poster={bgImg}
          >
            <source src={bgVid} />
          </video>
        ) : (
          <Image
            src={bgImg}
            alt=""
            fill
            priority
            className="object-cover brightness-[1.05] contrast-[1.08]"
            sizes="100vw"
            unoptimized={/^https?:\/\//.test(bgImg)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02020F]/92 via-[#050A30]/75 to-[#02020F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02020F] via-transparent to-[#050A30]/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(100dvh,900px)] max-w-[1280px] flex-col justify-end px-4 pb-16 pt-24 sm:px-6 lg:justify-center lg:pb-20 lg:pt-28 xl:px-12">
        <div className="ju-on-dark max-w-3xl space-y-6">
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl">
            {t(h.headline, locale)}
          </h1>
          <p className="text-lg font-medium text-white/90 sm:text-xl lg:text-2xl">
            {t(h.sub, locale)}
          </p>
          <p className="max-w-xl text-base text-white/75 sm:text-lg">
            {t(h.support, locale)}
          </p>
          <div className="flex flex-wrap gap-2">
            {h.pills.map((pill, i) => (
              <span
                key={i}
                className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md sm:text-[11px]"
              >
                {t(pill, locale)}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <NeonButton href="/birthdays" variant="outline-white" className="!text-xs">
              {t(h.ctaBirthdays, locale)}
            </NeonButton>
            <NeonButton href="/groups-pricing" className="!text-xs">
              {t(h.ctaGroups, locale)}
            </NeonButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GlanceSection() {
  const { locale } = useLocaleContext();
  return (
    <Section className="!py-12 sm:!py-14">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 lg:gap-4">
        {v2Home.glance.map((item, i) => (
          <StatCard
            key={i}
            emoji={GLANCE_EMOJI[i]}
            title={t(item.title, locale)}
            subtitle={t(item.sub, locale)}
          />
        ))}
      </div>
    </Section>
  );
}

export function WhatIsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const img =
    content.gallery?.[0]?.image?.trim() || content.hero.backgroundImage || "/hero-background.png";
  const w = v2Home.whatIs;

  return (
    <Section dark id="experience">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
          <Image
            src={img}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized={/^https?:\/\//.test(img)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02020F]/50 to-transparent" />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            {t(w.title, locale)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ju-soft">{t(w.body, locale)}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {w.features.map((f, i) => (
              <IconCard
                key={i}
                icon={
                  i === 0 ? Zap : i === 1 ? Users : i === 2 ? Trophy : i === 3 ? Brain : Users
                }
                title={t(f.title, locale)}
                subtitle={t(f.sub, locale)}
                className="!p-4"
              />
            ))}
          </div>
          <NeonButton href="/faq" variant="outline-white" className="mt-8 !text-xs">
            {t(w.cta, locale)}
          </NeonButton>
        </div>
      </div>
    </Section>
  );
}

export function HowWorksSection() {
  const { locale } = useLocaleContext();
  const h = v2Home.howWorks;
  const colors = [
    "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
    "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    "from-pink-500/20 to-pink-500/5 border-pink-500/30",
  ];

  return (
    <Section id="how-it-works">
      <SectionHeading title={t(h.title, locale)} subtitle={t(h.body, locale)} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {h.steps.map((step, i) => (
          <div
            key={i}
            className={cn(
              "rounded-2xl border bg-gradient-to-b p-5 backdrop-blur-sm",
              colors[i],
            )}
          >
            <span className="text-2xl" aria-hidden>
              {i === 0 ? "🔷" : i === 1 ? "🎯" : i === 2 ? "⚡" : i === 3 ? "🧠" : "🏆"}
            </span>
            <p className="mt-3 text-sm font-bold uppercase text-white">{t(step.title, locale)}</p>
            <p className="mt-1 text-xs text-ju-soft">{t(step.sub, locale)}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <NeonButton href="#game-modes" variant="outline-white" className="!text-xs">
          {t(h.cta, locale)}
        </NeonButton>
      </div>
    </Section>
  );
}

export function GameModesSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const gm = v2Home.gameModes;
  const modes = content.gameModes?.length
    ? content.gameModes.slice(0, 3)
  : null;

  return (
    <Section dark id="game-modes">
      <SectionHeading title={t(gm.title, locale)} />
      <div className="grid gap-6 md:grid-cols-3">
        {modes
          ? modes.map((m, i) => {
              const v2 = gm.modes[i];
              const img = m.image?.trim() || "/hero-background.png";
              return (
                <article
                  key={m.id ?? i}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-black/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="400px"
                      unoptimized={/^https?:\/\//.test(img)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02020F] to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-ju-cyanGlow">
                      {v2 ? t(v2.tag, locale) : ""}
                    </p>
                    <h3 className="mt-1 text-xl font-black uppercase text-white">
                      {pickLocalized(m.name, locale)}
                    </h3>
                    <p className="mt-2 text-sm text-ju-soft">
                      {v2 ? t(v2.desc, locale) : pickLocalized(m.description, locale)}
                    </p>
                    <NeonButton href="/faq" variant="outline-white" className="mt-4 !text-[10px]">
                      {t(gm.cta, locale)}
                    </NeonButton>
                  </div>
                </article>
              );
            })
          : gm.modes.map((m) => (
              <IconCard
                key={m.id}
                emoji={m.icon === "coop" ? "🤝" : m.icon === "trophy" ? "🏆" : "🧠"}
                title={t(m.name, locale)}
                subtitle={t(m.desc, locale)}
              />
            ))}
      </div>
    </Section>
  );
}

export function ExperiencesSection() {
  const { locale } = useLocaleContext();
  const e = v2Home.experiences;

  return (
    <Section>
      <SectionHeading title={t(e.title, locale)} subtitle={t(e.body, locale)} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#FF2D95]/30 bg-gradient-to-br from-[#FF2D95]/10 to-ju-purple/10 p-8">
          <h3 className="text-xl font-black uppercase text-white sm:text-2xl">
            {t(e.birthday.title, locale)}
          </h3>
          <p className="mt-2 text-sm text-ju-soft">{t(e.birthday.sub, locale)}</p>
          <NeonButton href="/birthdays" className="mt-6 !text-xs">
            {t(e.birthday.cta, locale)}
          </NeonButton>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h3 className="text-xl font-black uppercase text-white sm:text-2xl">
            {t(e.groups.title, locale)}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ju-soft">
            {e.groups.perfectFor.map((item, i) => (
              <li key={i}>• {t(item, locale)}</li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2">
            {e.groups.pricing.map((item, i) => (
              <li
                key={i}
                className="rounded-full border border-ju-electric/30 bg-ju-electric/10 px-3 py-1 text-[11px] font-bold uppercase text-ju-cyanGlow"
              >
                {t(item, locale)}
              </li>
            ))}
          </ul>
          <NeonButton href="/groups-pricing" variant="outline-white" className="mt-6 !text-xs">
            {t(e.groups.cta, locale)}
          </NeonButton>
        </div>
      </div>
      <div className="mt-6 rounded-3xl border border-dashed border-white/20 bg-black/20 p-8 text-center">
        <span className="rounded-full border border-ju-yellow/40 bg-ju-yellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ju-yellow">
          {t(e.mobile.badge, locale)}
        </span>
        <h3 className="mt-4 text-2xl font-black uppercase text-white">{t(e.mobile.title, locale)}</h3>
        <p className="mt-2 text-sm text-ju-soft">{t(e.mobile.sub, locale)}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <NeonButton href="/mobile-events" variant="outline-white" className="!text-xs">
            {t(e.mobile.ctaLearn, locale)}
          </NeonButton>
          <NeonButton href="/mobile-events#waitlist" className="!text-xs">
            {t(e.mobile.ctaWaitlist, locale)}
          </NeonButton>
        </div>
      </div>
    </Section>
  );
}

export function ReviewsSection() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const reviews = content.testimonialReviews ?? [];
  const r = v2Home.reviews;

  return (
    <Section dark id="reviews">
      <SectionHeading title={t(r.title, locale)} />
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-4">
          {(reviews.length > 0 ? [...reviews, ...reviews] : [
            {
              id: "demo",
              quote: { en: "Amazing experience!", fr: "Expérience incroyable !" },
              name: { en: "Guest", fr: "Client" },
              meta: { en: "Google", fr: "Google" },
              when: { en: "Recent", fr: "Récent" },
            },
            {
              id: "demo2",
              quote: { en: "Kids loved it!", fr: "Les enfants ont adoré !" },
              name: { en: "Family", fr: "Famille" },
              meta: { en: "Google", fr: "Google" },
              when: { en: "Recent", fr: "Récent" },
            },
          ]).map((rev, i) => (
            <ReviewCard key={`${rev.id}-${i}`} review={rev} locale={locale} />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <NeonButton
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-white"
          className="!text-xs"
        >
          {t(r.cta, locale)}
        </NeonButton>
      </div>
    </Section>
  );
}

function ReviewCard({
  review,
  locale,
}: {
  review: {
    quote: { en: string; fr: string };
    name: { en: string; fr: string };
    meta?: { en: string; fr: string };
  };
  locale: "en" | "fr";
}) {
  return (
    <article className="w-[min(100%,320px)] shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:w-[320px]">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-[#FF2D95] text-[#FF2D95]" aria-hidden />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/90">
        “{pickLocalized(review.quote, locale)}”
      </p>
      <p className="mt-3 text-xs font-bold text-ju-cyanGlow">{pickLocalized(review.name, locale)}</p>
    </article>
  );
}

export function FinalCtaSection() {
  const { locale } = useLocaleContext();
  const f = v2Home.finalCta;

  return (
    <Section className="!py-20">
      <div className="rounded-3xl border border-[#FF2D95]/40 bg-gradient-to-r from-[#FF2D95]/15 via-ju-purple/15 to-ju-electric/10 px-8 py-16 text-center sm:px-12">
        <h2 className="text-3xl font-black uppercase text-white sm:text-4xl lg:text-5xl">
          {t(f.title, locale)}
        </h2>
        <p className="mt-3 text-lg text-ju-soft">{t(f.sub, locale)}</p>
        <NeonButton href="/booking" className="mt-8 !px-10 !text-sm">
          {t(f.cta, locale)}
        </NeonButton>
      </div>
    </Section>
  );
}
