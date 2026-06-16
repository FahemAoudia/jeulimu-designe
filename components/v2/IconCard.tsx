import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

export function IconCard({
  icon: Icon,
  emoji,
  title,
  subtitle,
  href,
  className,
  onClick,
}: {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  subtitle?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const inner = (
  <>
      <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-ju-electric/15 to-[#FF2D95]/15 text-2xl shadow-[0_0_24px_rgba(0,245,255,0.12)]">
        {emoji ? (
          <span aria-hidden>{emoji}</span>
        ) : Icon ? (
          <Icon className="size-6 text-ju-cyanGlow" aria-hidden />
        ) : null}
      </div>
      <div className="mt-4">
        <p className="text-sm font-bold uppercase tracking-wide text-white">{title}</p>
        {subtitle ? (
          <p className="mt-1 text-xs text-ju-muted leading-relaxed">{subtitle}</p>
        ) : null}
      </div>
    </>
  );

  const base = cn(
    "group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition duration-300 hover:border-ju-electric/35 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(0,245,255,0.08)]",
    href && "cursor-pointer",
    className,
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    );
  }

  return (
    <div className={base} onClick={onClick} role={onClick ? "button" : undefined}>
      {inner}
    </div>
  );
}

export function StatCard({
  emoji,
  title,
  subtitle,
}: {
  emoji?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/30 p-4 text-center backdrop-blur-md sm:p-5">
      {emoji ? <span className="text-2xl" aria-hidden>{emoji}</span> : null}
      <p className="mt-2 text-sm font-bold uppercase tracking-wide text-white">{title}</p>
      <p className="mt-1 text-[11px] text-ju-muted">{subtitle}</p>
    </div>
  );
}
