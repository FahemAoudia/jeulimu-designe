import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type NeonButtonVariant = "gradient" | "outline" | "outline-white" | "ghost";

type NeonButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: NeonButtonVariant;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?:
    | React.MouseEventHandler<HTMLButtonElement>
    | React.MouseEventHandler<HTMLAnchorElement>;
  disabled?: boolean;
};

export function NeonButton({
  children,
  className,
  variant = "gradient",
  icon: Icon,
  iconPosition = "right",
  type = "button",
  href,
  target,
  rel,
  onClick,
  disabled,
}: NeonButtonProps) {
  const base =
    "ju-neon-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ju-focus)] focus-visible:ring-offset-[var(--ju-ring-offset)] active:scale-[0.98]";

  const variants: Record<NeonButtonVariant, string> = {
    gradient:
      "ju-neon-gradient bg-gradient-to-r from-[#FF2D95] via-[#A259FF] to-[#7B2CFF] text-white shadow-btn-brand hover:brightness-110 hover:shadow-[0_0_36px_rgba(255,0,229,0.55)]",
    outline:
      "ju-neon-outline border border-ju-purple/90 bg-transparent text-white shadow-neon-purple hover:border-ju-cyanGlow hover:shadow-neon-cyan",
    "outline-white":
      "ju-neon-outline border border-white/40 bg-white/[0.04] text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/[0.08]",
    ghost:
      "ju-neon-outline border border-transparent bg-white/[0.06] text-white/90 hover:bg-white/[0.1]",
  };

  const content = (
    <>
      {Icon && iconPosition === "left" ? (
        <Icon className="size-4 shrink-0" aria-hidden />
      ) : null}
      {children}
      {Icon && iconPosition === "right" ? (
        <Icon className="size-4 shrink-0" aria-hidden />
      ) : null}
    </>
  );

  const classes = cn(base, variants[variant], className);

  if (href) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={rel}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
    >
      {content}
    </button>
  );
}
