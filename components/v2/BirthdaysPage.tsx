"use client";

import Image from "next/image";
import { Gamepad2, Lock, Music, PartyPopper, Trophy, Users, Zap } from "lucide-react";
import {
  BentoCard,
  DisplayTitle,
  GhostBtn,
  PrimaryBtn,
  SectionLabel,
} from "@/components/v3/primitives";
import { FaqAccordion } from "@/components/v2/FaqAccordion";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { t } from "@/lib/site-v2-content";
import { formatPrice, useV2Content } from "@/hooks/useV2Content";

const WHY_ICONS = [Gamepad2, Zap, PartyPopper, Users, Trophy, Lock];
const INCLUDED_ICONS = [Gamepad2, Music, PartyPopper];

export function BirthdaysPageContent() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const { v2, pricing } = useV2Content();
  const b = v2.birthdays;
  const heroImg = content.eventsPromoImage?.trim() || content.hero.backgroundImage || "/hero-background.svg";

  return (
    <div className="ju-v3-shell">
      <section className="relative min-h-[55vh] border-b border-white/10">
        <div className="absolute inset-0">
          <Image src={heroImg} alt="" fill className="object-cover opacity-50" priority unoptimized={/^https?:\/\//.test(heroImg)} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 to-[#030308]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 pb-28 ju-pt-nav sm:px-6 lg:px-10">
          <SectionLabel>{t(b.hero.sectionLabel, locale)}</SectionLabel>
          <DisplayTitle className="mt-4 max-w-2xl">{t(b.hero.title, locale)}</DisplayTitle>
          <p className="mt-4 text-lg text-ju-cyanGlow">{t(b.hero.sub, locale)}</p>
          <p className="mt-4 max-w-xl text-sm text-white/50">{t(b.hero.body, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryBtn href="/booking">{t(b.hero.ctaBook, locale)}</PrimaryBtn>
            <GhostBtn href="/contact">{t(b.hero.ctaCheck, locale)}</GhostBtn>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <DisplayTitle className="!text-3xl">{t(b.why.title, locale)}</DisplayTitle>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {b.why.items.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? Gamepad2;
              return (
                <BentoCard key={i} accent="cyan" className="!p-5">
                  <Icon className="size-5 text-ju-cyanGlow" />
                  <p className="mt-3 font-display text-sm font-bold uppercase text-white">{t(item.title, locale)}</p>
                  <p className="mt-1 text-xs text-white/45">{t(item.sub ?? { en: "", fr: "" }, locale)}</p>
                </BentoCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <DisplayTitle className="!text-3xl">{t(b.gameplay.title, locale)}</DisplayTitle>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {b.gameplay.items.map((item, i) => {
              const Icon = INCLUDED_ICONS[i] ?? Gamepad2;
              return (
                <BentoCard key={i} accent="pink" className="!p-6">
                  <Icon className="size-5 text-[#FF2D95]" />
                  <p className="mt-3 font-display text-sm font-bold uppercase text-white">{t(item.title, locale)}</p>
                  <p className="mt-2 text-sm text-white/50">{t(item.sub ?? { en: "", fr: "" }, locale)}</p>
                </BentoCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <BentoCard accent="purple" className="!p-8 lg:!p-10">
            <DisplayTitle className="!text-2xl">{t(b.package.title, locale)}</DisplayTitle>
            <p className="mt-4 font-display text-5xl font-bold text-white">
              {b.package.price ? t(b.package.price, locale) : formatPrice(pricing.birthday.package)}
            </p>
            <p className="text-sm text-white/45">{t(b.package.tax, locale)}</p>
            <ul className="mt-6 space-y-3 text-sm text-white/65">
              {b.package.includes.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-ju-cyanGlow">▸</span>
                  <span>{t(line, locale)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/45">{t(b.package.extra, locale)}</p>
            <p className="mt-1 text-xs text-white/45">{t(b.package.capacity, locale)}</p>
            <PrimaryBtn href="/booking" className="mt-8">{t(b.final.cta, locale)}</PrimaryBtn>
          </BentoCard>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <FaqAccordion items={b.faq.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))} />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] border border-[#FF2D95]/30 bg-gradient-to-r from-[#FF2D95]/15 to-purple-900/20 px-8 py-16 text-center">
          <DisplayTitle className="!text-3xl">{t(b.final.title, locale)}</DisplayTitle>
          <p className="mt-3 text-sm text-white/55">{t(b.final.sub, locale)}</p>
          <PrimaryBtn href="/booking" className="mt-8">{t(b.final.cta, locale)}</PrimaryBtn>
        </div>
      </section>
    </div>
  );
}
