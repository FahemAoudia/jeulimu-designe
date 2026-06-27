"use client";

import { useMemo } from "react";
import { useSiteContext } from "@/providers/AppProviders";
import type { SectionItemStyle, SectionStyle } from "@/types/section-styles";

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

export function sectionFontFamily(font?: SectionStyle["fontFamily"]): string | undefined {
  switch (font) {
    case "outfit":
      return "var(--font-outfit), system-ui, sans-serif";
    case "syne":
      return "var(--font-syne), system-ui, sans-serif";
    case "system":
      return "system-ui, sans-serif";
    default:
      return undefined;
  }
}
