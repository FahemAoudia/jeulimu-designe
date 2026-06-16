"use client";

import { Building2, GraduationCap, Heart, Users, Volleyball } from "lucide-react";
import {
  BentoCard,
  DisplayTitle,
  GhostBtn,
  PrimaryBtn,
  SectionLabel,
} from "@/components/v3/primitives";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Groups, t } from "@/lib/site-v2-content";
import { CLIENT_PRICING, formatPrice } from "@/lib/client-pricing";
import { cn } from "@/lib/cn";

const ICONS = [Users, GraduationCap, Volleyball, Heart, Building2, Users];

export function GroupsPricingPageContent() {
  const { locale } = useLocaleContext();
  const g = v2Groups;

  return (
    <div className="ju-v3-shell">
      <section className="px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel>{locale === "fr" ? "Groupes" : "Groups"}</SectionLabel>
          <DisplayTitle className="mt-4">{t(g.hero.title, locale)}</DisplayTitle>
          <p className="mt-4 max-w-2xl text-lg text-ju-cyanGlow">{t(g.hero.sub, locale)}</p>
          <p className="mt-4 max-w-3xl text-sm text-white/50">{t(g.hero.body, locale)}</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {g.audiences.map((a, i) => {
            const Icon = ICONS[i];
            return (
              <BentoCard key={i} accent="cyan" className="!p-6">
                <Icon className="size-5 text-ju-cyanGlow" />
                <p className="mt-3 font-display font-bold uppercase text-white">{t(a.title, locale)}</p>
                <p className="mt-2 text-xs text-white/45">{t(a.desc, locale)}</p>
              </BentoCard>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <DisplayTitle className="!text-3xl">{locale === "fr" ? "Tarifs" : "Pricing"}</DisplayTitle>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                id: "small",
                title: g.pricing[0].title,
                players: g.pricing[0].players,
                duration: g.pricing[0].duration,
                price: formatPrice(CLIENT_PRICING.smallGroup.perPlayer),
                unit: g.pricing[0].unit,
                cta: g.pricing[0].cta,
                href: g.pricing[0].href,
                featured: false,
              },
              {
                id: "group",
                title: g.pricing[1].title,
                players: g.pricing[1].players,
                duration: g.pricing[1].duration,
                price: formatPrice(CLIENT_PRICING.group.perPlayer),
                unit: g.pricing[1].unit,
                cta: g.pricing[1].cta,
                href: g.pricing[1].href,
                featured: true,
              },
              {
                id: "large",
                title: g.pricing[2].title,
                players: g.pricing[2].players,
                duration: g.pricing[2].duration,
                price: formatPrice(CLIENT_PRICING.largeGroup.perPlayer),
                unit: g.pricing[2].unit,
                cta: g.pricing[2].cta,
                href: g.pricing[2].href,
                featured: false,
              },
            ].map((p) => (
              <div key={p.id} className={cn("ju-bento border bg-[#0a0a12]/80 p-8 backdrop-blur-md", p.featured ? "border-[#FF2D95]/40" : "border-white/10")}>
                <p className="font-display text-xs uppercase tracking-[0.25em] text-ju-cyanGlow">{t(p.title, locale)}</p>
                <p className="mt-2 text-sm text-white/50">{t(p.players, locale)} · {t(p.duration, locale)}</p>
                <p className="mt-6 font-display text-4xl font-bold text-white">
                  {p.price}<span className="text-sm text-white/40">{t(p.unit, locale)}</span>
                </p>
                <PrimaryBtn href={p.href} className="mt-8 w-full !text-[10px]">{t(p.cta, locale)}</PrimaryBtn>
              </div>
            ))}
          </div>
          <BentoCard accent="pink" className="mt-8 !p-8">
            <h3 className="font-display text-xl font-bold uppercase text-white">{t(g.addon.title, locale)}</h3>
            <p className="mt-2 text-white/50">
              {formatPrice(CLIENT_PRICING.partyRoom.price)} {t(g.addon.tax, locale)} · {t(g.addon.duration, locale)}
            </p>
            <GhostBtn href={g.addon.href} className="mt-6 !text-[10px]">{t(g.addon.cta, locale)}</GhostBtn>
          </BentoCard>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 px-8 py-14 text-center">
          <DisplayTitle className="!text-2xl">{t(g.contact.title, locale)}</DisplayTitle>
          <p className="mt-2 text-white/50">{t(g.contact.sub, locale)}</p>
          <PrimaryBtn href="mailto:contact@jeulumi.ca" className="mt-6">{t(g.contact.cta, locale)}</PrimaryBtn>
        </div>
      </section>
    </div>
  );
}
