"use client";

import { useState } from "react";
import Image from "next/image";
import { Gamepad2, Lock, PartyPopper, Trophy, Users, Zap } from "lucide-react";
import {
  BentoCard,
  DisplayTitle,
  GhostBtn,
  PrimaryBtn,
  SectionLabel,
} from "@/components/v3/primitives";
import { FaqAccordion } from "@/components/v2/FaqAccordion";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { v2Birthdays, t } from "@/lib/site-v2-content";

const BASE = 249.99;
const EXTRA = 20.99;
const INCLUDED = 8;
const MAX = 24;

function Calculator({ locale }: { locale: "en" | "fr" }) {
  const [count, setCount] = useState(8);
  const extra = Math.max(0, Math.min(count - INCLUDED, MAX - INCLUDED));
  const total = BASE + extra * EXTRA;

  return (
    <BentoCard accent="pink" className="!p-8">
      <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ju-cyanGlow">
        {locale === "fr" ? "Calculateur" : "Calculator"}
      </p>
      <input
        type="range"
        min={INCLUDED}
        max={MAX}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="mt-6 w-full accent-[#FF2D95]"
      />
      <div className="mt-4 flex justify-between font-display text-2xl font-bold text-white">
        <span>{count} {locale === "fr" ? "joueurs" : "players"}</span>
        <span className="text-ju-cyanGlow">${total.toFixed(2)} + tax</span>
      </div>
    </BentoCard>
  );
}

export function BirthdaysPageContent() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const b = v2Birthdays;
  const heroImg = content.eventsPromoImage?.trim() || content.hero.backgroundImage || "/hero-background.png";
  const whyIcons = [Gamepad2, Zap, PartyPopper, Users, Trophy, Lock];

  return (
    <div className="ju-v3-shell">
      <section className="relative min-h-[55vh] border-b border-white/10">
        <div className="absolute inset-0">
          <Image src={heroImg} alt="" fill className="object-cover opacity-50" priority unoptimized={/^https?:\/\//.test(heroImg)} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 to-[#030308]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 py-28 sm:px-6 lg:px-10">
          <SectionLabel>{locale === "fr" ? "Anniversaires" : "Birthdays"}</SectionLabel>
          <DisplayTitle className="mt-4 max-w-2xl">{t(b.hero.title, locale)}</DisplayTitle>
          <p className="mt-4 text-lg text-ju-cyanGlow">{t(b.hero.sub, locale)}</p>
          <p className="mt-4 max-w-xl text-sm text-white/50">{t(b.hero.body, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryBtn href="/booking">{t(b.hero.ctaBook, locale)}</PrimaryBtn>
            <GhostBtn href="/booking">{t(b.hero.ctaCheck, locale)}</GhostBtn>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <DisplayTitle className="!text-3xl">{t(b.why.title, locale)}</DisplayTitle>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {b.why.items.map((item, i) => {
              const Icon = whyIcons[i];
              return (
              <BentoCard key={i} accent="cyan" className="!p-5">
                <Icon className="size-5 text-ju-cyanGlow" />
                <p className="mt-3 font-display text-sm font-bold uppercase text-white">{t(item.title, locale)}</p>
                <p className="mt-1 text-xs text-white/45">{t(item.sub, locale)}</p>
              </BentoCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2">
          <BentoCard accent="purple" className="!p-8">
            <DisplayTitle className="!text-2xl">{t(b.package.title, locale)}</DisplayTitle>
            <p className="mt-4 font-display text-5xl font-bold text-white">{b.package.price}</p>
            <p className="text-sm text-white/45">{t(b.package.tax, locale)}</p>
            <ul className="mt-6 space-y-2 text-sm text-white/60">
              {b.package.includes.map((line, i) => (
                <li key={i}>▸ {t(line, locale)}</li>
              ))}
            </ul>
          </BentoCard>
          <Calculator locale={locale} />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <FaqAccordion items={b.faq.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))} />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] border border-[#FF2D95]/30 bg-gradient-to-r from-[#FF2D95]/15 to-purple-900/20 px-8 py-16 text-center">
          <DisplayTitle className="!text-3xl">{t(b.final.title, locale)}</DisplayTitle>
          <PrimaryBtn href="/booking" className="mt-8">{t(b.final.cta, locale)}</PrimaryBtn>
        </div>
      </section>
    </div>
  );
}
