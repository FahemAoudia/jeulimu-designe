"use client";

import Image from "next/image";
import { Gamepad2, Lock, Music, PartyPopper, Trophy, Users, Zap } from "lucide-react";
import { DisplayTitle } from "@/components/v3/primitives";
import { FaqAccordion } from "@/components/v2/FaqAccordion";
import { SectionPrimaryBtn, SectionGhostBtn } from "@/components/SectionButtons";
import {
  SectionCard,
  SectionCardIcon,
  SectionCardText,
  SectionCardTitle,
  SectionHeading,
  SectionIcon,
  SectionShell,
  SectionSubtext,
} from "@/components/SectionShell";
import { useSectionStyle } from "@/hooks/useSectionStyle";
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
  const heroStyle = useSectionStyle("birthdays.hero");
  const packageStyle = useSectionStyle("birthdays.package");
  const finalStyle = useSectionStyle("birthdays.final");
  const heroImg =
    content.eventsPromoImage?.trim() || content.hero.backgroundImage || "/hero-background.svg";

  return (
    <div className="ju-v3-shell">
      <SectionShell
        id="birthdays.hero"
        className="relative min-h-[55vh] border-b border-white/10"
      >
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt=""
            fill
            className="object-cover opacity-50"
            priority
            unoptimized={/^https?:\/\//.test(heroImg)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 to-[#030308]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 pb-28 ju-pt-nav sm:px-6 lg:px-10">
          <SectionIcon>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.35em]">
              {t(b.hero.sectionLabel, locale)}
            </p>
          </SectionIcon>
          <SectionHeading className="mt-4">
            <DisplayTitle as="h1" className="max-w-2xl">
              {t(b.hero.title, locale)}
            </DisplayTitle>
          </SectionHeading>
          <SectionSubtext className="mt-4 text-lg text-ju-cyanGlow">
            {t(b.hero.sub, locale)}
          </SectionSubtext>
          <SectionSubtext className="mt-4 max-w-xl text-sm">
            {t(b.hero.body, locale)}
          </SectionSubtext>
          <div className="mt-8 flex flex-wrap gap-4">
            <SectionPrimaryBtn href="/booking" config={heroStyle.primaryButton}>
              {t(b.hero.ctaBook, locale)}
            </SectionPrimaryBtn>
            <SectionGhostBtn href="/contact" config={heroStyle.secondaryButton}>
              {t(b.hero.ctaCheck, locale)}
            </SectionGhostBtn>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="birthdays.why" className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading>
            <DisplayTitle className="!text-3xl">{t(b.why.title, locale)}</DisplayTitle>
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {b.why.items.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? Gamepad2;
              return (
                <SectionCard key={i} className="!p-5">
                  <SectionCardIcon>
                    <Icon className="size-5" />
                  </SectionCardIcon>
                  <SectionCardTitle className="mt-3">
                    {t(item.title, locale)}
                  </SectionCardTitle>
                  <SectionCardText className="mt-1">
                    {t(item.sub ?? { en: "", fr: "" }, locale)}
                  </SectionCardText>
                </SectionCard>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="birthdays.gameplay"
        className="border-y border-white/10 bg-black/40 px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading>
            <DisplayTitle className="!text-3xl">{t(b.gameplay.title, locale)}</DisplayTitle>
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {b.gameplay.items.map((item, i) => {
              const Icon = INCLUDED_ICONS[i] ?? Gamepad2;
              return (
                <SectionCard key={i} className="!p-6">
                  <SectionCardIcon>
                    <Icon className="size-5" />
                  </SectionCardIcon>
                  <SectionCardTitle className="mt-3">
                    {t(item.title, locale)}
                  </SectionCardTitle>
                  <SectionCardText className="mt-2 text-sm">
                    {t(item.sub ?? { en: "", fr: "" }, locale)}
                  </SectionCardText>
                </SectionCard>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="birthdays.package" className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionCard className="!p-8 lg:!p-10">
            <SectionHeading>
              <DisplayTitle className="!text-2xl">{t(b.package.title, locale)}</DisplayTitle>
            </SectionHeading>
            <p className="ju-section-heading mt-4 font-display text-5xl font-bold">
              {b.package.price ? t(b.package.price, locale) : formatPrice(pricing.birthday.package)}
            </p>
            <SectionSubtext className="text-sm">{t(b.package.tax, locale)}</SectionSubtext>
            <ul className="ju-section-text mt-6 space-y-3 text-sm">
              {b.package.includes.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <SectionIcon>
                    <span>▸</span>
                  </SectionIcon>
                  <span>{t(line, locale)}</span>
                </li>
              ))}
            </ul>
            <SectionSubtext className="mt-6 text-xs">{t(b.package.extra, locale)}</SectionSubtext>
            <SectionSubtext className="mt-1 text-xs">{t(b.package.capacity, locale)}</SectionSubtext>
            <SectionPrimaryBtn href="/booking" config={packageStyle.primaryButton} className="mt-8">
              {t(b.final.cta, locale)}
            </SectionPrimaryBtn>
          </SectionCard>
        </div>
      </SectionShell>

      <SectionShell
        id="birthdays.faq"
        className="border-y border-white/10 bg-black/40 px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-[1400px]">
          <FaqAccordion items={b.faq.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))} />
        </div>
      </SectionShell>

      <SectionShell id="birthdays.final" className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] border border-[#FF2D95]/30 bg-gradient-to-r from-[#FF2D95]/15 to-purple-900/20 px-8 py-16 text-center">
          <SectionHeading>
            <DisplayTitle className="!text-3xl">{t(b.final.title, locale)}</DisplayTitle>
          </SectionHeading>
          <SectionSubtext className="mt-3 text-sm">{t(b.final.sub, locale)}</SectionSubtext>
          <SectionPrimaryBtn href="/booking" config={finalStyle.primaryButton} className="mt-8">
            {t(b.final.cta, locale)}
          </SectionPrimaryBtn>
        </div>
      </SectionShell>
    </div>
  );
}
