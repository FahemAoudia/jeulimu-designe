"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SectionButtonStyle } from "@/types/section-styles";

function btnStyle(cfg?: SectionButtonStyle): { background?: string; color?: string } {
  if (!cfg?.background && !cfg?.textColor) return {};
  return {
    background: cfg.background || undefined,
    color: cfg.textColor || undefined,
  };
}

export function SectionPrimaryBtn({
  href,
  children,
  config,
  className,
}: {
  href: string;
  children: React.ReactNode;
  config?: SectionButtonStyle;
  className?: string;
}) {
  if (config?.visible === false) return null;
  const style = btnStyle(config);
  const cls = cn(
    "ju-btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition",
    style.background || style.color ? "ju-section-btn-custom" : "",
    className,
  );
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}

export function SectionGhostBtn({
  href,
  children,
  config,
  className,
}: {
  href: string;
  children: React.ReactNode;
  config?: SectionButtonStyle;
  className?: string;
}) {
  if (config?.visible === false) return null;
  const style = btnStyle(config);
  const cls = cn(
    "ju-btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition",
    style.background || style.color ? "ju-section-btn-custom" : "",
    className,
  );
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}

export function SectionSubmitBtn({
  children,
  config,
  className,
  disabled,
}: {
  children: React.ReactNode;
  config?: SectionButtonStyle;
  className?: string;
  disabled?: boolean;
}) {
  if (config?.visible === false) return null;
  const style = btnStyle(config);
  const cls = cn(
    "ju-btn-primary inline-flex items-center justify-center px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition",
    style.background || style.color ? "ju-section-btn-custom" : "",
    className,
  );
  return (
    <button type="submit" className={cls} style={style} disabled={disabled}>
      {children}
    </button>
  );
}
