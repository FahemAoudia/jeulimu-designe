"use client";

import { useMemo } from "react";
import { useSiteContext } from "@/providers/AppProviders";
import {
  defaultPricing,
  defaultSectionVisibilityV2,
  defaultTheme,
  defaultV2SiteContent,
} from "@/lib/v2-content-defaults";
import type { SiteTheme, V2Pricing, V2SectionVisibility, V2SiteContent } from "@/types/v2-site-content";

function mergeV2(patch: Partial<V2SiteContent> | undefined): V2SiteContent {
  if (!patch) return structuredClone(defaultV2SiteContent);
  return structuredClone({
    ...defaultV2SiteContent,
    ...patch,
    nav: { ...defaultV2SiteContent.nav, ...patch.nav },
    home: { ...defaultV2SiteContent.home, ...patch.home },
    birthdays: { ...defaultV2SiteContent.birthdays, ...patch.birthdays },
    groups: { ...defaultV2SiteContent.groups, ...patch.groups },
    mobile: { ...defaultV2SiteContent.mobile, ...patch.mobile },
    faq: { ...defaultV2SiteContent.faq, ...patch.faq },
    footer: { ...defaultV2SiteContent.footer, ...patch.footer },
  });
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function useV2Content() {
  const { content } = useSiteContext();

  return useMemo(
    () => ({
      v2: mergeV2(content.v2),
      pricing: content.pricingV2 ?? defaultPricing,
      theme: content.theme ?? defaultTheme,
      visibility: content.sectionVisibilityV2 ?? defaultSectionVisibilityV2,
    }),
    [content],
  );
}

export type V2ContentBundle = {
  v2: V2SiteContent;
  pricing: V2Pricing;
  theme: SiteTheme;
  visibility: V2SectionVisibility;
};
