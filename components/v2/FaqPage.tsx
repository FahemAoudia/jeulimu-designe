"use client";

import { DisplayTitle, SectionLabel } from "@/components/v3/primitives";
import { FaqGrouped } from "@/components/v2/FaqAccordion";
import { useLocaleContext } from "@/providers/AppProviders";
import { t } from "@/lib/site-v2-content";
import { useV2Content } from "@/hooks/useV2Content";

export function FaqPageContent() {
  const { locale } = useLocaleContext();
  const { v2 } = useV2Content();
  const faq = v2.faq;
  const groups = faq.groups.map((g) => ({
    label: t(g.label, locale),
    items: g.items.map((item) => ({ q: t(item.q, locale), a: t(item.a, locale) })),
  }));

  return (
    <div className="ju-v3-shell ju-pt-nav ju-pt-nav-page px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[900px]">
        <SectionLabel>FAQ</SectionLabel>
        <DisplayTitle className="mt-4">{t(faq.title, locale)}</DisplayTitle>
        <div className="mt-12">
          <FaqGrouped groups={groups} />
        </div>
      </div>
    </div>
  );
}
