"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { sectionShellInlineStyle } from "@/lib/section-style-css";
import { sectionShellInlineStyle } from "@/lib/section-style-css";
import { useSectionStyle } from "@/hooks/useSectionStyle";

export function SectionShell({
  id,
  className,
  children,
  as: Tag = "section",
}: {
  id: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "header";
}) {
  const style = useSectionStyle(id);

  if (style.visible === false) return null;

  const inline: CSSProperties = sectionShellInlineStyle(style);

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

export function SectionHeadingLine1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("ju-section-heading-line1 text-white", className)}>{children}</span>
  );
}

export function SectionHeadingLine2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("ju-section-heading-line2 ju-hero-outline", className)}>{children}</span>
  );
}

export function SectionLabelText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("ju-section-label font-display text-[11px] font-bold uppercase tracking-[0.35em]", className)}>
      {children}
    </p>
  );
}

export function SectionTitleText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("ju-section-title text-white", className)}>{children}</div>
  );
}

export function SectionBodyText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("ju-section-body text-white/55", className)}>{children}</p>
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

export function SectionAccent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("ju-section-accent", className)}>{children}</span>;
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
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "ju-section-card border border-white/10 bg-[#0a0a12]/80 backdrop-blur-md",
        className,
      )}
      style={style}
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
