"use client";

import { cn } from "@/lib/cn";
import { SectionItemIcon } from "@/lib/section-icons";
import type { SectionItemStyle } from "@/types/section-styles";

export function SectionStatPill({
  value,
  label,
  itemStyle,
  contentIcon,
  iconFirst,
}: {
  value: string;
  label: string;
  itemStyle?: SectionItemStyle;
  contentIcon?: string;
  iconFirst?: boolean;
}) {
  if (itemStyle?.visible === false) return null;

  const icon = (
    <SectionItemIcon
      itemStyle={itemStyle}
      contentIcon={contentIcon}
      className="ju-item-icon shrink-0"
      size="size-6"
    />
  );

  return (
    <div
      className={cn(
        "ju-section-item ju-stat-pill flex shrink-0 items-center gap-3 border border-white/10 bg-black/50 px-6 py-4 backdrop-blur-sm",
      )}
      style={{
        background: itemStyle?.background || undefined,
        borderColor: itemStyle?.borderColor || undefined,
      }}
    >
      {iconFirst && icon}
      <span className="ju-item-title font-display text-2xl font-bold text-ju-cyanGlow">{value}</span>
      <span className="ju-item-text text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
        {label}
      </span>
      {!iconFirst && icon}
    </div>
  );
}
