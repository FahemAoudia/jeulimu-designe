"use client";

import Image from "next/image";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { defaultSiteContent } from "@/lib/site-defaults";
import { pickLocalized } from "@/types/site-content";
import { cn } from "@/lib/cn";

const NAV_IMG: Record<"sm" | "md" | "lg", string> = {
  sm: "h-6 max-h-6 w-auto max-w-[min(42vw,140px)] sm:h-8 sm:max-h-8 sm:max-w-[min(40vw,195px)]",
  md: "h-8 max-h-8 w-auto max-w-[min(52vw,190px)] sm:h-10 sm:max-h-10 sm:max-w-[min(44vw,235px)]",
  lg: "h-9 max-h-9 w-auto max-w-[min(58vw,230px)] sm:h-11 sm:max-h-11 sm:max-w-[min(48vw,275px)]",
};

const FOOT_IMG: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 max-h-8 w-auto max-w-[200px] sm:h-9 sm:max-h-9 sm:max-w-[230px]",
  md: "h-9 max-h-9 w-auto max-w-[240px] sm:h-11 sm:max-h-11 sm:max-w-[290px]",
  lg: "h-10 max-h-10 w-auto max-w-[280px] sm:h-12 sm:max-h-12 sm:max-w-[340px]",
};

export function SiteLogoMark({
  variant,
  className,
}: {
  variant: "nav" | "footer";
  className?: string;
}) {
  const { content } = useSiteContext();
  const { locale } = useLocaleContext();

  const b = {
    ...defaultSiteContent.siteBranding,
    ...content.siteBranding,
  };

  const src = b.logoImage?.trim() ?? "";
  const size = b.logoSize === "sm" || b.logoSize === "lg" ? b.logoSize : "md";
  const imgClass =
    variant === "nav"
      ? cn(NAV_IMG[size], "object-contain object-left")
      : cn(FOOT_IMG[size], "object-contain object-left");

  const taglineNav =
    locale === "fr"
      ? "Plancher de jeu LED interactif"
      : "Interactive LED Game Floor";
  const taglineFooter =
    locale === "fr" ? "Plancher LED interactif" : "Interactive LED game floor";

  return (
    <span
      className={cn(
        "inline-flex flex-col gap-0.5",
        variant === "footer" && "gap-1",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={pickLocalized(b.logoAlt, locale)}
          width={480}
          height={160}
          className={imgClass}
          priority={variant === "nav"}
          unoptimized={/^https?:\/\//.test(src)}
        />
      ) : variant === "footer" ? (
        <span className="text-2xl font-black">
          <span className="bg-gradient-to-r from-ju-electric to-ju-cyanGlow bg-clip-text text-transparent">
            Jeu
          </span>
          <span className="bg-gradient-to-r from-ju-magenta to-ju-purple bg-clip-text text-transparent">
            Lumi
          </span>
        </span>
      ) : (
        <span className="text-xl font-bold tracking-tight sm:text-2xl">
          <span className="bg-gradient-to-r from-ju-electric to-ju-cyanGlow bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,245,255,0.45)]">
            Jeu
          </span>
          <span className="bg-gradient-to-r from-ju-magenta to-ju-purple bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(255,45,149,0.45)]">
            Lumi
          </span>
        </span>
      )}
      {b.showTagline ? (
        <span
          className={
            variant === "nav"
              ? "hidden text-[10px] font-medium uppercase tracking-[0.2em] text-ju-muted sm:block"
              : "text-xs uppercase tracking-[0.2em] text-ju-muted"
          }
        >
          {variant === "nav" ? taglineNav : taglineFooter}
        </span>
      ) : null}
    </span>
  );
}
