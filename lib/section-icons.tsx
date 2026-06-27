"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  Brain,
  Building2,
  Gamepad2,
  GraduationCap,
  Heart,
  Lock,
  Music,
  PartyPopper,
  Trophy,
  Users,
  Volleyball,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { SectionItemStyle } from "@/types/section-styles";

const LUCIDE_MAP: Record<string, LucideIcon> = {
  users: Users,
  user: Users,
  trophy: Trophy,
  lock: Lock,
  gamepad: Gamepad2,
  guide: Users,
  target: Zap,
  run: Zap,
  coop: Users,
  vs: Trophy,
  brain: Brain,
  social: PartyPopper,
  move: Zap,
  rules: Lock,
  bolt: Zap,
  music: Music,
  party: PartyPopper,
  building: Building2,
  grad: GraduationCap,
  volleyball: Volleyball,
  heart: Heart,
};

export function SectionItemIcon({
  itemStyle,
  contentIcon,
  className,
  size = "size-5",
}: {
  itemStyle?: SectionItemStyle;
  contentIcon?: string;
  className?: string;
  size?: string;
}) {
  if (itemStyle?.iconImage?.trim()) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={itemStyle.iconImage}
        alt=""
        className={cn("object-contain", size, className)}
      />
    );
  }
  if (itemStyle?.iconEmoji?.trim()) {
    return <span className={cn("text-lg leading-none", className)}>{itemStyle.iconEmoji}</span>;
  }
  const key = (itemStyle?.iconLucide || contentIcon || "").toLowerCase();
  const Icon = LUCIDE_MAP[key];
  if (Icon) {
    return <Icon className={cn(size, className)} aria-hidden />;
  }
  return null;
}

export function SectionItemShell({
  itemStyle,
  className,
  children,
  style,
}: {
  itemStyle?: SectionItemStyle;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  if (itemStyle?.visible === false) return null;
  const vars = {
    "--ju-item-bg": itemStyle?.background || undefined,
    "--ju-item-title": itemStyle?.titleColor || undefined,
    "--ju-item-text": itemStyle?.textColor || undefined,
    "--ju-item-icon": itemStyle?.iconColor || undefined,
    "--ju-item-border": itemStyle?.borderColor || undefined,
  } as CSSProperties;
  return (
    <div className={cn("ju-section-item", className)} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
}
