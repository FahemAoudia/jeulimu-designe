import type { SectionButtonStyle, SectionItemStyle } from "@/types/section-styles";

/** Persist hide/show toggles: hidden = explicit false; shown = omit key (defaults to visible). */
export function withVisibilityFlag<T extends { visible?: boolean }>(
  obj: T,
  show: boolean,
): T {
  const next = { ...obj };
  if (show) delete next.visible;
  else next.visible = false;
  return next;
}

export function isSectionVisible(visible: boolean | undefined): boolean {
  return visible !== false;
}

export function isButtonVisible(config?: SectionButtonStyle): boolean {
  return config?.visible !== false;
}

export function isItemVisible(itemStyle?: SectionItemStyle): boolean {
  return itemStyle?.visible !== false;
}
