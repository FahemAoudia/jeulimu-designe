"use client";

import { NeonButton } from "@/components/NeonButton";
import { Section, SectionHeading } from "@/components/v2/Section";
import { IconCard } from "@/components/v2/IconCard";
import { PricingCard } from "@/components/v2/PricingCard";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Groups, t } from "@/lib/site-v2-content";
import {
  Building2,
  GraduationCap,
  Heart,
  Users,
  Volleyball,
} from "lucide-react";

const AUDIENCE_ICONS = [Users, GraduationCap, Volleyball, Heart, Building2, Users];

export function GroupsPricingPageContent() {
  const { locale } = useLocaleContext();
  const g = v2Groups;

  return (
    <>
      <Section className="!pt-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black uppercase text-white sm:text-5xl">
            {t(g.hero.title, locale)}
          </h1>
          <p className="mt-3 text-lg font-medium text-ju-cyanGlow">{t(g.hero.sub, locale)}</p>
          <p className="mt-4 text-base text-ju-soft">{t(g.hero.body, locale)}</p>
        </div>
      </Section>

      <Section dark>
        <SectionHeading
          title={locale === "fr" ? "Parfait pour" : "Perfect For"}
          align="left"
          className="!mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {g.audiences.map((a, i) => (
            <IconCard
              key={i}
              icon={AUDIENCE_ICONS[i]}
              title={t(a.title, locale)}
              subtitle={t(a.desc, locale)}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title={t(g.expect.title, locale)} align="left" className="!mb-8" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {g.expect.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ju-soft"
            >
              ✔ {t(item, locale)}
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHeading
          title={t(g.bring.title, locale)}
          align="left"
          className="!mb-6"
        />
        <ul className="flex flex-wrap gap-3">
          {g.bring.items.map((item, i) => (
            <li
              key={i}
              className="rounded-full border border-ju-electric/30 bg-ju-electric/10 px-4 py-2 text-sm font-semibold text-ju-cyanGlow"
            >
              {t(item, locale)}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="pricing">
        <SectionHeading
          title={locale === "fr" ? "Tarifs" : "Pricing"}
          align="left"
          className="!mb-8"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {g.pricing.map((p) => (
            <PricingCard
              key={p.id}
              title={t(p.title, locale)}
              players={t(p.players, locale)}
              duration={t(p.duration, locale)}
              price={p.price}
              unit={t(p.unit, locale)}
              cta={t(p.cta, locale)}
              href={p.href}
              featured={p.featured}
            />
          ))}
        </div>
        <article className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h3 className="text-lg font-bold uppercase text-white">{t(g.addon.title, locale)}</h3>
          <p className="mt-2 text-sm text-ju-soft">
            {g.addon.price} {t(g.addon.tax, locale)} · {t(g.addon.duration, locale)}
          </p>
          <NeonButton href={g.addon.href} variant="outline-white" className="mt-4 !text-xs">
            {t(g.addon.cta, locale)}
          </NeonButton>
        </article>
      </Section>

      <Section>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-ju-purple/10 to-ju-electric/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-black uppercase text-white">{t(g.contact.title, locale)}</h2>
          <p className="mt-2 text-ju-soft">{t(g.contact.sub, locale)}</p>
          <NeonButton
            href="mailto:contact@jeulumi.ca"
            className="mt-6"
          >
            {t(g.contact.cta, locale)}
          </NeonButton>
        </div>
      </Section>
    </>
  );
}
