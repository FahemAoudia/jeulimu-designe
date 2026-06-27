"use client";

import { Building2, GraduationCap, Heart, Users, Volleyball } from "lucide-react";
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
import { useLocaleContext } from "@/providers/AppProviders";
import { t } from "@/lib/site-v2-content";
import { formatPrice, useV2Content } from "@/hooks/useV2Content";
import { cn } from "@/lib/cn";

const ICONS = [Users, GraduationCap, Volleyball, Heart, Building2, Users];

export function GroupsPricingPageContent() {
  const { locale } = useLocaleContext();
  const { v2, pricing } = useV2Content();
  const g = v2.groups;
  const heroStyle = useSectionStyle("groups.hero");
  const pricingStyle = useSectionStyle("groups.pricing");

  const pricingCards = [
    {
      id: "small",
      title: g.pricing[0]?.title ?? { en: "", fr: "" },
      players: g.pricing[0]?.players ?? { en: "", fr: "" },
      duration: g.pricing[0]?.duration ?? { en: "", fr: "" },
      price: formatPrice(pricing.smallGroup.perPlayer),
      unit: g.pricing[0]?.unit ?? { en: "", fr: "" },
      cta: g.pricing[0]?.cta ?? { en: "", fr: "" },
      href: g.pricing[0]?.href ?? "/booking",
      featured: false,
    },
    {
      id: "group",
      title: g.pricing[1]?.title ?? { en: "", fr: "" },
      players: g.pricing[1]?.players ?? { en: "", fr: "" },
      duration: g.pricing[1]?.duration ?? { en: "", fr: "" },
      price: formatPrice(pricing.group.perPlayer),
      unit: g.pricing[1]?.unit ?? { en: "", fr: "" },
      cta: g.pricing[1]?.cta ?? { en: "", fr: "" },
      href: g.pricing[1]?.href ?? "/booking",
      featured: true,
    },
    {
      id: "large",
      title: g.pricing[2]?.title ?? { en: "", fr: "" },
      players: g.pricing[2]?.players ?? { en: "", fr: "" },
      duration: g.pricing[2]?.duration ?? { en: "", fr: "" },
      price: formatPrice(pricing.largeGroup.perPlayer),
      unit: g.pricing[2]?.unit ?? { en: "", fr: "" },
      cta: g.pricing[2]?.cta ?? { en: "", fr: "" },
      href: g.pricing[2]?.href ?? "/contact",
      featured: false,
    },
  ];

  return (
    <div className="ju-v3-shell">
      <SectionShell id="groups.hero" className="ju-pt-nav ju-pt-nav-page px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionIcon>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.35em]">
              {t(g.hero.sectionLabel, locale)}
            </p>
          </SectionIcon>
          <SectionHeading className="mt-4">
            <DisplayTitle>{t(g.hero.title, locale)}</DisplayTitle>
          </SectionHeading>
          <SectionSubtext className="mt-4 max-w-2xl text-lg text-ju-cyanGlow">
            {t(g.hero.sub, locale)}
          </SectionSubtext>
          <SectionSubtext className="mt-4 max-w-3xl text-sm">
            {t(g.hero.body, locale)}
          </SectionSubtext>
          <div className="mt-8 flex flex-wrap gap-4">
            <SectionPrimaryBtn href="/booking" config={heroStyle.primaryButton}>
              {locale === "fr" ? "Réserver" : "Book Now"}
            </SectionPrimaryBtn>
            <SectionGhostBtn href="/contact" config={heroStyle.secondaryButton}>
              {locale === "fr" ? "Contact" : "Contact Us"}
            </SectionGhostBtn>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="groups.who"
        className="border-y border-white/10 bg-black/40 px-4 py-16 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading>
            <DisplayTitle className="!text-2xl">
              {locale === "fr" ? "Qui nous choisit" : "Who We Serve"}
            </DisplayTitle>
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.audiences.map((a, i) => {
              const Icon = ICONS[i] ?? Users;
              return (
                <SectionCard key={i} className="!p-6">
                  <SectionCardIcon>
                    <Icon className="size-5" />
                  </SectionCardIcon>
                  <SectionCardTitle className="mt-3 !normal-case">
                    {t(a.title, locale)}
                  </SectionCardTitle>
                  <SectionCardText className="mt-2">
                    {t(a.desc ?? { en: "", fr: "" }, locale)}
                  </SectionCardText>
                </SectionCard>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <DisplayTitle className="!text-2xl">{t(g.expect.title, locale)}</DisplayTitle>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {g.expect.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/65">
                <span className="text-ju-cyanGlow">▸</span>
                {t(item, locale)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionShell
        id="groups.pricing"
        className="border-y border-white/10 bg-black/40 px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading>
            <DisplayTitle className="!text-3xl">
              {locale === "fr" ? "Tarifs par groupe" : "Pricing by Group Size"}
            </DisplayTitle>
          </SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingCards.map((p) => (
              <SectionCard
                key={p.id}
                className={cn(
                  "!p-8",
                  p.featured ? "border-[#FF2D95]/40" : "border-white/10",
                )}
              >
                <SectionCardTitle className="!text-xs !tracking-[0.25em] text-ju-cyanGlow">
                  {t(p.title, locale)}
                </SectionCardTitle>
                <SectionCardText className="mt-2 text-sm">
                  {t(p.players, locale)} · {t(p.duration, locale)}
                </SectionCardText>
                <p className="ju-section-card-title mt-6 font-display text-4xl font-bold">
                  {p.price}
                  <span className="ju-section-card-text text-sm">{t(p.unit, locale)}</span>
                </p>
                <SectionPrimaryBtn
                  href={p.href}
                  config={pricingStyle.primaryButton}
                  className="mt-8 w-full !text-[10px]"
                >
                  {t(p.cta, locale)}
                </SectionPrimaryBtn>
              </SectionCard>
            ))}
          </div>
          <SectionCard className="mt-8 !p-8">
            <SectionCardTitle className="!text-xl !normal-case">
              {t(g.customQuote.title, locale)}
            </SectionCardTitle>
            <SectionCardText className="mt-3 text-sm">
              {t(g.customQuote.body, locale)}
            </SectionCardText>
            <SectionGhostBtn
              href="/contact"
              config={pricingStyle.secondaryButton}
              className="mt-6 !text-[10px]"
            >
              {t(g.customQuote.cta, locale)}
            </SectionGhostBtn>
          </SectionCard>
        </div>
      </SectionShell>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <FaqAccordion items={g.faq.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))} />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 px-8 py-14 text-center">
          <DisplayTitle className="!text-2xl">{t(g.contact.title, locale)}</DisplayTitle>
          <p className="mt-2 text-white/50">{t(g.contact.sub, locale)}</p>
          <SectionPrimaryBtn href="/contact" className="mt-6">
            {t(g.contact.cta, locale)}
          </SectionPrimaryBtn>
        </div>
      </section>
    </div>
  );
}
