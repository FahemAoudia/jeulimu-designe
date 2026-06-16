"use client";

import { DisplayTitle, SectionLabel } from "@/components/v3/primitives";
import { FaqGrouped } from "@/components/v2/FaqAccordion";
import { useLocaleContext } from "@/providers/AppProviders";
import { v2Faq, t } from "@/lib/site-v2-content";

export function FaqPageContent() {
  const { locale } = useLocaleContext();
  const groups = v2Faq.groups.map((g) => ({
    label: t(g.label, locale),
    items: g.items.map((item) => ({ q: t(item.q, locale), a: t(item.a, locale) })),
  }));

  return (
    <div className="ju-v3-shell px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[900px]">
        <SectionLabel>FAQ</SectionLabel>
        <DisplayTitle className="mt-4">{t(v2Faq.title, locale)}</DisplayTitle>
        <div className="mt-12">
          <FaqGrouped groups={groups} />
        </div>
      </div>
    </div>
  );
}
