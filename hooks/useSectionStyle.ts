"use client";

import { useMemo } from "react";
import { useSiteContext } from "@/providers/AppProviders";
import { normalizeSiteFontKey, siteFontFamilyCss } from "@/lib/font-catalog";
import type { SectionFontKey, SectionItemStyle, SectionStyle } from "@/types/section-styles";

export function useSectionStyle(sectionId: string): SectionStyle {
  const { content } = useSiteContext();
  return useMemo(
    () => content.sectionStyles?.[sectionId] ?? {},
    [content.sectionStyles, sectionId],
  );
}

export function useSectionItemStyle(sectionId: string, itemKey: string): SectionItemStyle {
  const style = useSectionStyle(sectionId);
  return useMemo(() => style.items?.[itemKey] ?? {}, [style.items, itemKey]);
}

export function sectionFontFamily(font?: SectionFontKey): string | undefined {
  if (!font || font === "inherit") return undefined;
  return siteFontFamilyCss(normalizeSiteFontKey(font));
}
