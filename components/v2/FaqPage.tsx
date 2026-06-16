"use client";

import { Section, SectionHeading } from "@/components/v2/Section";
import { FaqGrouped } from "@/components/v2/FaqAccordion";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Faq, t } from "@/lib/site-v2-content";

export function FaqPageContent() {
  const { locale } = useLocaleContext();

  const groups = v2Faq.groups.map((g) => ({
    label: t(g.label, locale),
    items: g.items.map((item) => ({
      q: t(item.q, locale),
      a: t(item.a, locale),
    })),
  }));

  return (
    <Section className="!pt-10">
      <SectionHeading title={t(v2Faq.title, locale)} align="left" className="!mb-10" />
      <FaqGrouped groups={groups} />
    </Section>
  );
}
