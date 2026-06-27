import type { CSSProperties } from "react";
import type { SectionItemStyle, SectionStyle } from "@/types/section-styles";
import { sectionFontFamily } from "@/hooks/useSectionStyle";

/** CSS custom properties for a section shell. */
export function sectionStyleToCssVars(style: SectionStyle): CSSProperties {
  const s = style ?? {};
  return {
    "--ju-section-heading": s.headingColor || undefined,
    "--ju-section-heading-line1": s.headingLine1Color || undefined,
    "--ju-section-heading-line2": s.headingLine2Color || undefined,
    "--ju-section-label": s.labelColor || undefined,
    "--ju-section-title": s.titleColor || undefined,
    "--ju-section-text": s.textColor || undefined,
    "--ju-section-body": s.bodyColor || undefined,
    "--ju-section-sub": s.subtextColor || undefined,
    "--ju-section-icon": s.iconColor || undefined,
    "--ju-section-accent": s.accentColor || undefined,
    "--ju-section-border": s.borderColor || undefined,
    "--ju-section-card-bg": s.cardBackground || undefined,
    "--ju-section-card-title": s.cardHeadingColor || undefined,
    "--ju-section-card-text": s.cardTextColor || undefined,
    "--ju-section-card-icon": s.cardIconColor || undefined,
    "--ju-floor-panel-bg": s.cardBackground || undefined,
    "--ju-floor-panel-border": s.borderColor || undefined,
    "--ju-floor-panel-title": s.labelColor || undefined,
    "--ju-floor-panel-accent": s.accentColor || undefined,
    "--ju-floor-panel-sub": s.subtextColor || undefined,
  } as CSSProperties;
}

export function sectionShellInlineStyle(style: SectionStyle): CSSProperties {
  return {
    ...sectionStyleToCssVars(style),
    background: style.background || undefined,
    color: style.textColor || undefined,
    fontFamily: sectionFontFamily(style.fontFamily),
    borderColor: style.borderColor || undefined,
  };
}

export function itemStyleToCssVars(item?: SectionItemStyle): CSSProperties {
  if (!item) return {};
  return {
    "--ju-item-bg": item.background || undefined,
    "--ju-item-title": item.titleColor || undefined,
    "--ju-item-text": item.textColor || undefined,
    "--ju-item-icon": item.iconColor || undefined,
    "--ju-item-border": item.borderColor || undefined,
    fontFamily: sectionFontFamily(item.fontFamily),
  } as CSSProperties;
}
