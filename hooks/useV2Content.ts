"use client";

import { useMemo } from "react";
import { useSiteContext } from "@/providers/AppProviders";
import { mergeTheme } from "@/lib/theme-css";
import {
  defaultPricing,
  defaultSectionVisibilityV2,
  defaultV2SiteContent,
} from "@/lib/v2-content-defaults";
import type { SiteTheme, V2Pricing, V2SectionVisibility, V2SiteContent } from "@/types/v2-site-content";

function mergeV2(patch: Partial<V2SiteContent> | undefined): V2SiteContent {
  const base = structuredClone(defaultV2SiteContent);
  if (!patch) return base;

  const home = { ...base.home, ...patch.home };
  if (!home.glance?.length) home.glance = base.home.glance;
  if (!home.marquee?.length) home.marquee = base.home.marquee;
  if (!home.whatIs?.features?.length) {
    home.whatIs = { ...home.whatIs, features: base.home.whatIs.features };
  }
  if (!home.experiences?.groups?.perfectFor?.length) {
    home.experiences = {
      ...home.experiences,
      groups: {
        ...home.experiences.groups,
        perfectFor: base.home.experiences.groups.perfectFor,
      },
    };
  }

  return structuredClone({
    ...base,
    ...patch,
    nav: { ...base.nav, ...patch.nav },
    home,
    birthdays: {
      ...base.birthdays,
      ...patch.birthdays,
      package: { ...base.birthdays.package, ...patch.birthdays?.package },
    },
    groups: { ...base.groups, ...patch.groups },
    mobile: { ...base.mobile, ...patch.mobile },
    faq: { ...base.faq, ...patch.faq },
    footer: { ...base.footer, ...patch.footer },
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
      theme: mergeTheme(content.theme),
      visibility: {
        ...defaultSectionVisibilityV2,
        ...content.sectionVisibilityV2,
        glance: content.sectionVisibilityV2?.glance ?? defaultSectionVisibilityV2.glance,
      },
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
