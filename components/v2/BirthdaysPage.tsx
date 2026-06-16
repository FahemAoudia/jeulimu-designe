"use client";

import { useState } from "react";
import { NeonButton } from "@/components/NeonButton";
import { Section, SectionHeading } from "@/components/v2/Section";
import { IconCard } from "@/components/v2/IconCard";
import { FaqAccordion } from "@/components/v2/FaqAccordion";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Birthdays, t } from "@/lib/site-v2-content";
import {
  Brain,
  Gamepad2,
  Lock,
  PartyPopper,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useSiteContext } from "@/providers/AppProviders";

const BASE = 249.99;
const EXTRA = 20.99;
const INCLUDED = 8;
const MAX = 24;

function BirthdayCalculator({ locale }: { locale: "en" | "fr" }) {
  const [count, setCount] = useState(8);
  const extra = Math.max(0, Math.min(count - INCLUDED, MAX - INCLUDED));
  const total = BASE + extra * EXTRA;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <label className="text-sm font-bold uppercase tracking-wide text-white">
        {locale === "fr" ? "Nombre de participants" : "Number of participants"}
      </label>
      <input
        type="range"
        min={INCLUDED}
        max={MAX}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="mt-4 w-full accent-[#FF2D95]"
      />
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-black text-white">{count}</span>
        <span className="text-sm text-ju-muted">
          {locale === "fr" ? "Estimation" : "Estimate"}:{" "}
          <strong className="text-ju-cyanGlow">${total.toFixed(2)}</strong>{" "}
          {locale === "fr" ? "+ taxes" : "+ tax"}
        </span>
      </div>
      {extra > 0 ? (
        <p className="mt-2 text-xs text-ju-muted">
          {extra} {locale === "fr" ? "participants additionnels" : "additional participants"} × $
          {EXTRA.toFixed(2)}
        </p>
      ) : null}
    </div>
  );
}

export function BirthdaysPageContent() {
  const { locale } = useLocaleContext();
  const { content } = useSiteContext();
  const b = v2Birthdays;
  const heroImg =
    content.eventsPromoImage?.trim() ||
    content.hero.backgroundImage ||
    "/hero-background.png";

  const whyIcons = [Gamepad2, Zap, PartyPopper, Users, Trophy, Lock];

  return (
    <>
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image
          src={heroImg}
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized={/^https?:\/\//.test(heroImg)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02020F]/95 to-[#02020F]/50" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8 xl:px-12">
          <div className="ju-on-dark max-w-2xl">
            <h1 className="text-4xl font-black uppercase text-white sm:text-5xl">
              {t(b.hero.title, locale)}
            </h1>
            <p className="mt-2 text-lg font-bold text-ju-cyanGlow">{t(b.hero.sub, locale)}</p>
            <p className="mt-4 text-base text-white/80">{t(b.hero.body, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/booking">{t(b.hero.ctaBook, locale)}</NeonButton>
              <NeonButton href="/booking" variant="outline-white">
                {t(b.hero.ctaCheck, locale)}
              </NeonButton>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading title={t(b.why.title, locale)} align="left" className="!mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {b.why.items.map((item, i) => (
            <IconCard
              key={i}
              icon={whyIcons[i]}
              title={t(item.title, locale)}
              subtitle={t(item.sub, locale)}
            />
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black uppercase text-white">{t(b.package.title, locale)}</h2>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">{b.package.price}</span>
              <span className="text-ju-muted">{t(b.package.tax, locale)}</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-ju-soft">
              {b.package.includes.map((line, i) => (
                <li key={i}>✔ {t(line, locale)}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ju-muted">{t(b.package.extra, locale)}</p>
            <p className="mt-2 text-sm font-bold text-ju-cyanGlow">
              {t(b.package.capacity, locale)}
            </p>
          </div>
          <BirthdayCalculator locale={locale} />
        </div>
      </Section>

      <Section>
        <SectionHeading title={t(b.gameplay.title, locale)} align="left" className="!mb-8" />
        <div className="grid gap-4 sm:grid-cols-2">
          {b.gameplay.items.map((item, i) => (
            <IconCard
              key={i}
              icon={i === 0 ? Users : i === 1 ? Trophy : i === 2 ? Brain : Zap}
              title={t(item.title, locale)}
              subtitle={t(item.sub, locale)}
            />
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black uppercase text-white">{t(b.bring.title, locale)}</h2>
            <ul className="mt-4 space-y-2 text-sm text-ju-soft">
              {b.bring.items.map((line, i) => (
                <li key={i}>{t(line, locale)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase text-white">
              {t(b.partyRoom.title, locale)}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-ju-soft">
              {b.partyRoom.items.map((line, i) => (
                <li key={i}>✔ {t(line, locale)}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title={locale === "fr" ? "Questions fréquentes" : "FAQ"}
          align="left"
          className="!mb-8"
        />
        <FaqAccordion
          items={b.faq.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))}
        />
      </Section>

      <Section className="!py-16">
        <div className="text-center">
          <h2 className="text-3xl font-black uppercase text-white">{t(b.final.title, locale)}</h2>
          <p className="mt-2 text-ju-soft">{t(b.final.sub, locale)}</p>
          <NeonButton href="/booking" className="mt-6">
            {t(b.final.cta, locale)}
          </NeonButton>
        </div>
      </Section>
    </>
  );
}
