"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { sectionFontFamily, useSectionStyle } from "@/hooks/useSectionStyle";

export function SectionShell({
  id,
  className,
  children,
  as: Tag = "section",
}: {
  id: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div";
}) {
  const style = useSectionStyle(id);

  if (style.visible === false) return null;

  const cssVars = {
    "--ju-section-heading": style.headingColor || undefined,
    "--ju-section-text": style.textColor || undefined,
    "--ju-section-sub": style.subtextColor || undefined,
    "--ju-section-icon": style.iconColor || undefined,
    "--ju-section-card-bg": style.cardBackground || undefined,
    "--ju-section-card-title": style.cardHeadingColor || undefined,
    "--ju-section-card-text": style.cardTextColor || undefined,
    "--ju-section-card-icon": style.cardIconColor || undefined,
  } as CSSProperties;

  const inline: CSSProperties = {
    ...cssVars,
    background: style.background || undefined,
    color: style.textColor || undefined,
    fontFamily: sectionFontFamily(style.fontFamily),
  };

  return (
    <Tag
      data-section={id}
      className={cn("ju-section-shell", className)}
      style={inline}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("ju-section-heading text-white", className)}>{children}</div>
  );
}

export function SectionSubtext({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("ju-section-sub ju-section-text text-white/55", className)}>{children}</p>
  );
}

export function SectionIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("ju-section-icon text-ju-cyanGlow", className)}>{children}</span>;
}

export function SectionCardIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("ju-section-card-icon text-ju-cyanGlow inline-flex", className)}>
      {children}
    </span>
  );
}

export function SectionCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ju-section-card border border-white/10 bg-[#0a0a12]/80 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionCardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("ju-section-card-title font-display text-sm font-bold uppercase text-white", className)}>
      {children}
    </p>
  );
}

export function SectionCardText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("ju-section-card-text text-xs text-white/45", className)}>{children}</p>
  );
}
