"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

export function LumiGridBg({ className }: { className?: string }) {
  return (
    <div
      className={cn("ju-lumi-grid pointer-events-none absolute inset-0", className)}
      aria-hidden
    />
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[11px] font-bold uppercase tracking-[0.35em] text-ju-cyanGlow">
      {children}
    </p>
  );
}

export function DisplayTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-3xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function PrimaryBtn({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "ju-btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition",
    className,
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

export function GhostBtn({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = cn(
    "ju-btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition",
    className,
  );
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return <a href={href} className={cls}>{children}</a>;
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

export function BentoCard({
  children,
  className,
  accent = "cyan",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: "cyan" | "pink" | "purple" | "yellow";
  href?: string;
}) {
  const accentBorder = {
    cyan: "hover:border-cyan-400/50 hover:shadow-[0_0_48px_rgba(0,245,255,0.12)]",
    pink: "hover:border-[#FF2D95]/50 hover:shadow-[0_0_48px_rgba(255,45,149,0.15)]",
    purple: "hover:border-violet-500/50 hover:shadow-[0_0_48px_rgba(123,44,255,0.15)]",
    yellow: "hover:border-amber-400/40 hover:shadow-[0_0_48px_rgba(255,195,0,0.1)]",
  };
  const inner = (
    <div
      className={cn(
        "ju-bento relative overflow-hidden border border-white/[0.08] bg-[#0a0a12]/80 p-6 backdrop-blur-md transition duration-500 sm:p-8",
        accentBorder[accent],
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
      {children}
    </div>
  );
  if (href) return <Link href={href} className="block group">{inner}</Link>;
  return inner;
}

export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="ju-stat-pill flex shrink-0 items-center gap-4 border border-white/10 bg-black/50 px-6 py-4 backdrop-blur-sm">
      <span className="font-display text-2xl font-bold text-ju-cyanGlow">{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">{label}</span>
    </div>
  );
}
