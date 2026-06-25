"use client";

import Image from "next/image";
import { useLocaleContext, useSiteContext } from "@/providers/AppProviders";
import { defaultSiteContent } from "@/lib/site-defaults";
import { pickLocalized } from "@/types/site-content";
import { cn } from "@/lib/cn";

function normalizeLogoSize(value: unknown): "sm" | "md" | "lg" | "xl" {
  if (value === "sm" || value === "md" || value === "lg" || value === "xl") return value;
  return "md";
}

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
  const size = normalizeLogoSize(b.logoSize);

  const taglineNav =
    locale === "fr"
      ? "Plancher de jeu LED interactif"
      : "Interactive LED Game Floor";
  const taglineFooter =
    locale === "fr" ? "Plancher LED interactif" : "Interactive LED game floor";

  return (
    <span
      data-variant={variant}
      data-size={size}
      className={cn(
        "ju-site-logo inline-flex flex-col gap-0.5",
        variant === "footer" && "gap-1",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={pickLocalized(b.logoAlt, locale)}
          width={640}
          height={200}
          className="ju-site-logo-img"
          priority={variant === "nav"}
          unoptimized={/^https?:\/\//.test(src)}
        />
      ) : variant === "footer" ? (
        <span className="text-2xl font-black">
          <span className="bg-gradient-to-r from-ju-electric to-ju-cyanGlow bg-clip-text text-transparent">
            Jeu
          </span>
          <span className="bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] bg-clip-text text-transparent">
            Lumi
          </span>
        </span>
      ) : (
        <span className="text-xl font-bold tracking-tight sm:text-2xl">
          <span className="bg-gradient-to-r from-ju-electric to-ju-cyanGlow bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,245,255,0.45)]">
            Jeu
          </span>
          <span className="bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(255,45,149,0.45)]">
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
